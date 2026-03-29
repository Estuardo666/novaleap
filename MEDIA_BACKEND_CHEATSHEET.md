# Guía y Checklist Definitivo: Media Backend (Next.js + Prisma + R2/S3)

Esta "memoria" documenta los pasos críticos, trampas comunes y soluciones para que despliegues futuros proyectos con paneles de administración y carga de multimedia a la primera y sin errores.

---

## 🏗️ 1. Checklist de la Base de Datos (Prisma)

El error más común es que la base de datos de producción recién desplegada **está vacía**.

### ⚠️ Errores Típicos
- `Error 500` en producción al listar elementos (La tabla no existe).
- `Error P1000` / `P1001` (Conexión fallida al hacer push en la terminal).

### ✅ Soluciones
1. **Símbolos en tu Contraseña:** Si tu contraseña tiene símbolos (`@`, `!`, `#`), **debes** pasarlos a formato URL Encoding (`%40`, `%21`, `%23`) en la variable `DATABASE_URL` (Ej: `mysql://user:pass%40word@ip:3306/db`). 
   *💡 Pro-tip: Mejor usar contraseñas alfanuméricas exclusivas para bases de datos conectadas a Prisma.*
2. **Whitelist de IPs en Servidores Compartidos (Hostinger, cPanel, etc.):** 
   - Casi todos los hostings bloquean conexiones externas remotas. 
   - Debes ir al panel de tu hosting -> **"Remote MySQL"** y añadir tu IP pública (o `%` temporalmente) para poder hacer `prisma db push` desde tu computadora local hacia producción.
3. **Pushear con `.env.local`:** 
   - Prisma nativamente lee `.env`. Si tienes tus variables de producción en `.env.local`, usa `dotenv-cli`:
   ```bash
   npx dotenv-cli -e .env.local -- prisma db push
   ```

---

## 🌍 2. Configuración en la Plataforma de Hosting (Vercel/Netlify)

La regla de oro: **El archivo `.env.local` NO se sube a GitHub**, por tanto, Vercel no sabe mágicamente las contraseñas.

### ⚠️ Errores Típicos
- Crash automático al visitar la ruta del API o `Error 500`. (S3 Client fallando por credenciales nulas).

### ✅ Soluciones
1. Dirígete a tu panel de Vercel/Netlify -> Settings -> **Environment Variables**.
2. Copia y pega EXACTAMENTE las mismas variables que configuraste en tu `.env.local` validado. 
   - `DATABASE_URL` (Debe ser la cadena con el HOST remoto correcto, no el string de localhost).
   - `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_ENDPOINT`, `R2_BUCKET_NAME`.
3. Haz un **Redeploy** para aplicar las variables.

---

## 🖼️ 3. Dominios Permitidos para el Componente `<Image>`

Next.js restringe estricta y dolorosamente desde dónde renderiza imágenes por seguridad.

### ⚠️ Errores Típicos
- Archivo o imagen se sube correctamente al servidor R2/S3.
- Al mostrarlo en Next.js, se rompe y la consola lanza `Failed to load resource: 400 Bad Request`.

### ✅ Soluciones
Acuerdate explícitamente de registrar la URL pública generada (en nuestro caso `pub-0a41e488741a430d8e35db210519a0a8.r2.dev`) dentro del archivo de configuración `next.config.mjs` o `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-0a41e488741a430d8e35db210519a0a8.r2.dev", // Aquí tu nuevo dominio CDN/S3/R2
      },
    ],
  },
};
export default nextConfig;
```

---

## 🚀 4. Revalidar el Caché Estático (SSG) de Next.js

Si estás construyendo una App moderna en el **App Router** (`app/`), Next.js genera las páginas de modo estático durante el despliegue para que sean híperrápidas.

### ⚠️ Errores Típicos
- Subes o actualizas una imagen desde el panel administrativo (ej. de un Hero / Tarjeta de Servicio).
- Vas a la página pública, le das F5, pero **sigue mostrándose la imagen anterior** o un hueco.
- No hay errores en la terminal.

### ✅ Soluciones
Todo endpoint (API) que sirva para actualizar/modificar información de la Base de Datos, **DEBE** decírle al caché que se rompa.
   - En tu API route de edición / borrado (Ej: `src/app/api/site-media/[key]/route.ts`), incluye un revalidate.

```typescript
import { revalidatePath } from "next/cache";

// Dentro de tu function PUT o POST al final:
await prisma.siteMedia.update({ data });
revalidatePath("/", "layout"); // Rompe el caché de todo el sitio y repuebla al instante
```

Guarda esta memoria en tus apuntes como tu manual contra las frustraciones de infraestructura. 🚀

---

## 💥 5. Picos de Procesos en el Servidor (Hostinger / Shared Hosting)

Los picos de CPU/procesos que llegan al límite del hosting (ej. 600 de 600 procesos disponibles) casi siempre tienen estas causas en un backend Next.js + Prisma.

### ⚠️ Errores Típicos
- Gráfico de "Max Processes" en Hostinger sube agresivamente después de cada deploy.
- El servidor activa "Resource Boosting" automáticamente (RAM +100%, CPU +20%).
- La app funciona, pero el servidor está al límite constantemente.

### 🔍 Causa #1: `new PrismaClient()` fuera del Singleton (¡El más peligroso!)

**Nunca** hagas esto en un API route de Next.js:

```typescript
// ❌ MAL — Crea un nuevo pool de conexiones en cada hot-reload o request
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
```

Cada vez que Next.js recarga el módulo o recibe un request, crea un pool entero de conexiones nuevas (usualmente 10 por instancia) y nunca los cierra. Con tráfico normal esto puede fácilmente llegar a 300–600 procesos activos en minutos.

**✅ SIEMPRE usa el singleton centralizado:**

```typescript
// ✅ BIEN — Reutiliza una sola instancia y pool de conexiones
import { prisma } from "@/lib/prisma";
```

Y el singleton (`src/lib/prisma.ts`) debe verse así:

```typescript
import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({ log: ["error"] });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
```

### 🔍 Causa #2: Transacción masiva disparada en cada request de usuario

Si tienes lógica de "seed" (sembrado inicial) en un `GET` que compara resultados **filtrados** contra el total de defaults, se dispara en cada visita:

```typescript
// ❌ MAL — page="services" devuelve 6 entradas, pero hay 30 defaults.
// Resultado: lanza 30 queries en transacción en CADA carga del panel admin.
const entries = await prisma.siteMedia.findMany({ where: { page } });
if (entries.length < siteMediaDefaults.length) {
  await prisma.$transaction([...30 upserts...]);
}
```

**✅ BIEN — Cuenta el total sin filtros primero (1 query ligera):**

```typescript
const totalCount = await prisma.siteMedia.count(); // sin filtros
if (totalCount < siteMediaDefaults.length) {
  await prisma.$transaction([...30 upserts...]); // solo si realmente faltan
}

// Ahora sí aplica el filtro de página para la respuesta
const entries = await prisma.siteMedia.findMany({ where: { page } });
```

---

## 🗝️ 6. Sincronización de Llaves CMS con las Rutas de la App

Si las imágenes que subes en el panel de administración no se reflejan en el frontend, casi siempre es un **mismatch de llaves** entre el CMS y el slug de la URL.

### ⚠️ Error Típico
- Subes una imagen en el panel para "Evaluación".
- La página `/services/evaluations-and-assessments` sigue mostrando la imagen antigua.
- No hay errores en la consola.

### 🔍 Causa
El slug real de la URL (`evaluations-and-assessments`) no coincide con la llave usada en `siteMediaDefaults.ts` (`evaluation`):

```typescript
// ❌ MAL — La llave no coincide con el slug de la URL
{ key: "services.evaluation.feature-image" }

// La página busca:
media[`services.evaluations-and-assessments.feature-image`] // → undefined
```

### ✅ Regla de Oro
**Las llaves en `siteMediaDefaults.ts` deben coincidir EXACTAMENTE con el `id` del elemento en el catálogo.**

```typescript
// ✅ BIEN — La llave usa el mismo ID que el slug
{ key: "services.evaluations-and-assessments.feature-image" }
// Y en el catálogo: { id: "evaluations-and-assessments", href: "/services/evaluations-and-assessments" }
```

### ✅ Convención de Naming para Llaves CMS

```
{page}.{slug-exacto}.{slot}

Ejemplos:
- services.evaluations-and-assessments.hero-image
- services.evaluations-and-assessments.feature-image
- services.treatment.hero-image
- home.hero-video
- global.logo-light
```

> 💡 **Pro-tip:** Agrega siempre un slot `hero-image` por cada página de servicio para que el fondo grande del hero también sea configurable desde el CMS. Sin esto, el fondo estará hardcoded en el código.

---

## 🔄 7. Pipeline de Revalidación Completa (SSG / ISR)

Next.js genera las páginas estáticamente durante el build (`generateStaticParams`). Eso significa que **actualizar la base de datos NO actualiza automáticamente las páginas visibles**. Necesitas una cadena de revalidación completa.

### ⚠️ Error Típico
- Subes una imagen nueva desde el panel admin.
- La DB se actualiza correctamente (puedes verificar via API).
- El frontend sigue mostrando la imagen anterior indefinidamente.
- No hay errores en consola — simplemente no cambia.

### 🔍 Causa
Hay **3 puntos de revalidación** que deben estar activos. Si falta uno solo, la cadena se rompe:

```
         Admin sube imagen
              ↓
  1. PUT /api/site-media/[key]  ← Actualiza la DB
              ↓
  2. revalidatePath("/", "layout")  ← Rompe el caché SSG
              ↓
  3. Next request → ISR rebuild  ← Regenera la página con datos nuevos
```

### ✅ Checklist de Revalidación

1. **Todo endpoint que modifica datos DEBE llamar `revalidatePath`:**
```typescript
import { revalidatePath } from "next/cache";

export async function PUT(request: Request) {
  // ... update DB ...
  revalidatePath("/", "layout"); // ← NUNCA OLVIDAR ESTO
  return NextResponse.json(updated);
}
```

2. **Endpoints de migración/seed TAMBIÉN deben revalidar:**
```typescript
// ❌ MAL — Migración que modifica datos pero NO revalida
await prisma.siteMedia.update({ data });
return NextResponse.json({ ok: true });

// ✅ BIEN — Revalida después de cualquier cambio de datos
await prisma.siteMedia.update({ data });
revalidatePath("/", "layout");
return NextResponse.json({ ok: true });
```

3. **Después de un nuevo deploy, las páginas estáticas usan datos del BUILD.**
   Si la DB cambia después del build (ej. por una migración), debes forzar revalidación visitando un endpoint que llame `revalidatePath`, o haciendo cualquier actualización desde el admin.

### 🧪 Cómo verificar que la revalidación funciona
1. Cambia una imagen desde el admin.
2. Espera 5 segundos.
3. Abre la página en una **ventana de incógnito** (para evitar cache del navegador).
4. Si sigue igual → falta `revalidatePath` en el endpoint que usaste.

---

## 🪜 8. Cadenas de Fallback para Slots de Media

Cuando tienes múltiples slots por entidad (hero-image, card-image, feature-image), la regla es: **siempre define una cadena de fallback** para que el usuario no tenga que subir la misma imagen en 3 lugares.

### ⚠️ Error Típico
- El usuario sube una imagen al slot "Card de Servicio".
- Espera que el hero (fondo grande) también cambie.
- No cambia porque el hero lee de un slot diferente (`hero-image`) que tiene la URL default.

### 🔍 Causa
Cada slot es independiente. Si el `hero-image` tiene la misma URL default que el código hardcodeado, `heroImage || s.image` no produce ningún cambio visible porque ambos valores son iguales.

### ✅ Solución: Fallback Cascading
Siempre conecta los slots con una cadena de prioridad:

```typescript
// En la página del servidor ([slug]/page.tsx):
<ServiceDetailPage
  slug={service.id}
  // Cadena: hero-image → card-image → hardcoded default
  heroImage={media[`services.${service.id}.hero-image`] || media[`services.${service.id}.card-image`]}
  featureMediaPoster={media[`services.${service.id}.feature-image`]}
/>
```

```typescript
// En el componente cliente (ServiceDetailPage.tsx):
const service = useMemo(() => {
  const s = getServiceBySlug(slug);
  return {
    ...s,
    image: heroImage || s.image,  // heroImage ya viene con fallback del server
    featureMedia: {
      ...s.featureMedia,
      posterImage: featureMediaPoster || s.featureMedia.posterImage,
    },
  };
}, [slug, heroImage, featureMediaPoster]);
```

### ✅ Regla de Diseño para Slots

```
Prioridad de imagen por zona:

HERO (fondo grande):     hero-image → card-image → hardcoded default
CARD (tarjeta homepage): card-image → hardcoded default
FEATURE (sección media): feature-image → hardcoded default
VIDEO (modal):           feature-video → (vacío = sin botón de video)
```

> 💡 **Pro-tip:** Al crear nuevos slots en `siteMediaDefaults.ts`, **NO uses la misma URL default que el código hardcoded**. Usa una URL diferente o vacía (`""`). Así es fácil detectar si el slot fue actualizado: si es igual al default, no fue tocado → usa el fallback.

---

## 🛠️ 9. Sincronización y Migración de Datos en Producción

A medida que el proyecto crece, es común cambiar nombres de llaves o agregar nuevos slots de media. Si la base de datos de producción ya tiene datos, un simple "redeploy" no aplicará estos cambios lógicos.

### ⚠️ Error Típico
- Cambias una llave de `service.old` a `service.new` en el código.
- El panel admin sigue mostrando la vieja o no guarda nada.
- El frontend muestra defaults porque no encuentra la llave nueva en la DB.

### ✅ Solución: Endpoint de Migración (Solo una vez)
Crea un API route temporal (`/api/admin/migrate-keys`) para orquestar cambios de datos complejos.

1.  **Renombrar llaves huérfanas**: Busca llaves viejas y actualízalas a las nuevas.
2.  **Sincronización Inteligente**: Si creaste un slot nuevo (ej: `hero-image`), haz que la migración lo rellene automáticamente con el valor de un slot existente (ej: `card-image`) si el slot nuevo está vacío o con defaults.
3.  **Forzar Revalidación**: Al final de la migración, llama siempre a `revalidatePath` para que el sitio se reconstruya con los nuevos mapeos.

```typescript
// Ejemplo de lógica de sincronización:
const heroIsDefault = !hero.url || PEXELS_DEFAULTS.has(hero.url);
const cardIsCustomised = card.url && !PEXELS_DEFAULTS.has(card.url);

if (heroIsDefault && cardIsCustomised) {
  await prisma.siteMedia.update({
    where: { key: heroKey },
    data: { url: card.url },
  });
}
```

---

## 📋 Resumen: Checklist Pre-Deploy de Media Backend

Antes de cada despliegue a producción, verifica estos 9 puntos:

- [ ] **1. DB:** `prisma db push` exitoso contra la DB de producción
- [ ] **2. Env Vars:** Variables copiadas a Vercel/Netlify (DATABASE_URL, R2_*)
- [ ] **3. Dominios:** `next.config.mjs` incluye el hostname de tu CDN/R2/S3
- [ ] **4. Revalidación:** Todo endpoint PUT/POST/DELETE llama `revalidatePath`
- [ ] **5. Singleton:** Todos los archivos usan `import { prisma } from "@/lib/prisma"` (NO `new PrismaClient()`)
- [ ] **6. Seed eficiente:** La lógica de seed usa `count()` sin filtros, no compara resultados filtrados
- [ ] **7. Llaves CMS:** Las llaves en `siteMediaDefaults.ts` coinciden exactamente con los slugs/IDs de las rutas
- [ ] **8. Fallbacks:** Cada zona visual (hero, card, feature) tiene una cadena de fallback definida
- [ ] **9. Migración de Datos:** Si cambiaste llaves, ejecutaste el endpoint de migración en producción.
