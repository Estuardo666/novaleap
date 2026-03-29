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
