import type { Metadata } from "next";
import Link from "next/link";
import { getButtonClasses } from "@/components/atoms/Button";
import { AnimatedPageBackground } from "@/components/organisms";

export const metadata: Metadata = {
  title: "Presentación | NovaLeap",
  description:
    "Presentación temporal del concepto y dirección visual del sitio web de NovaLeap.",
};

const presentationSections = [
  {
    title: "El concepto principal",
    body: "Desde el primer segundo, la web de NovaLeap está diseñada para transmitir seguridad, calidez y profesionalismo. Hemos evitado el estilo de una página médica fría para crear un espacio que se siente humano y cercano. Queremos que, al entrar, los padres sientan que han encontrado el lugar adecuado para sus hijos.",
  },
  {
    title: "Diseño y Sensaciones",
    body: "Hemos elegido una estética moderna y despejada. El uso de los espacios en blanco es clave aquí: permite que el diseño respire y no abrume al usuario. Esto ayuda a transmitir una sensación de orden, claridad y, sobre todo, mucha calma. Los colores y la organización están pensados para que el mensaje principal se entienda de inmediato, guiando a los padres de forma natural hacia los servicios y el contacto.",
  },
  {
    title: "Facilidad de uso",
    body: "Sabemos que los padres suelen buscar estos servicios desde su celular y en momentos de poco tiempo. Por eso, la navegación es muy sencilla e intuitiva. El recorrido guía al usuario paso a paso: quiénes son, qué hacen y cómo agendar, sin vueltas innecesarias y funcionando a la perfección en cualquier dispositivo.",
  },
  {
    title: "Detalles y Movimiento",
    body: "Notarán que la página tiene movimientos suaves y transiciones fluidas al navegar. Estos detalles no son solo decorativos; sirven para que el sitio se sienta vivo y cuidado. Es una forma de reflejar la atención al detalle y la calidad que ustedes mismos ofrecen en sus terapias.",
  },
  {
    title: "Sobre el prototipo y los contenidos",
    body: "Es importante mencionar que lo que estamos viendo hoy es un prototipo inicial y está totalmente abierto a cambios. Tanto las imágenes como los textos son borradores que sirven para visualizar la estructura y el tono. Todo este contenido se ajustará y refinará para que el resultado final represente con total precisión la identidad de NovaLeap.",
  },
  {
    title: "Conclusión",
    body: "En resumen, es una herramienta pensada para generar confianza desde el primer clic y facilitar que los padres den el siguiente paso. Es una base sólida, clara y lista para evolucionar con ustedes.",
  },
];

export default function PresentacionPage() {
  return (
    <AnimatedPageBackground>
      <section className="px-4 pb-24 pt-36 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-white/70 bg-white/82 shadow-[0_26px_70px_-48px_rgba(17,34,78,0.45)] backdrop-blur-xl">
          <div className="border-b border-novaleap-navy/10 px-6 py-8 sm:px-10 sm:py-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-novaleap-aqua/70 bg-novaleap-aqua/5 px-3 py-1">
              <p className="text-xs font-semibold uppercase tracking-wide text-novaleap-aqua">
                Presentación Temporal
              </p>
            </div>

            <h1 className="mt-5 text-4xl font-bold leading-[1.1] tracking-tight text-novaleap-navy sm:text-5xl">
              Presentación del concepto web de NovaLeap
            </h1>

            <p className="mt-5 max-w-3xl text-justify text-lg leading-relaxed text-novaleap-navy/75 sm:text-xl">
              Hola, Jennifer. Este documento resume la dirección creativa y funcional propuesta para el sitio,
              pensado para transmitir confianza, claridad y cercanía desde el primer momento.
            </p>
          </div>

          <div className="space-y-6 px-6 py-8 sm:px-10 sm:py-10">
            {presentationSections.map((section) => (
              <article
                key={section.title}
                className="rounded-[1.5rem] border border-novaleap-navy/10 bg-white/75 p-6 sm:p-7"
              >
                <h2 className="text-2xl font-bold tracking-tight text-novaleap-navy">
                  {section.title}
                </h2>
                <p className="mt-3 text-justify text-base leading-relaxed text-novaleap-navy/80 sm:text-lg">
                  {section.body}
                </p>
              </article>
            ))}

            <div className="pt-2 text-center">
              <Link
                href="/"
                className={getButtonClasses({
                  variant: "secondary",
                  size: "md",
                  className: "text-sm sm:text-base",
                })}
              >
                Ir al sitio
              </Link>
            </div>
          </div>
        </div>
      </section>
    </AnimatedPageBackground>
  );
}