import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";
import { AnimatedPageBackground, ServiceDetailPage } from "@/components/organisms";
import { getServiceBySlug, servicesCatalog } from "@/lib/servicesCatalog";
import { getSiteMediaMap } from "@/lib/getSiteMedia";

interface ServiceDetailPageRouteProps {
  params: {
    slug: string;
  };
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://novaleap.com";

export function generateStaticParams() {
  return servicesCatalog.map((service) => ({ slug: service.id }));
}

export function generateMetadata({ params }: ServiceDetailPageRouteProps): Metadata {
  const service = getServiceBySlug(params.slug);

  if (!service) {
    return {
      title: "Service Not Found | NovaLeap",
    };
  }

  const canonicalUrl = `${siteUrl}/services/${service.id}`;

  return {
    title: service.metadataTitle,
    description: service.metadataDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: service.metadataTitle,
      description: service.metadataDescription,
      url: canonicalUrl,
      images: [
        {
          url: service.image,
          alt: service.imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: service.metadataTitle,
      description: service.metadataDescription,
      images: [service.image],
    },
  };
}

export default async function ServiceDetailRoute({ params }: ServiceDetailPageRouteProps) {
  const service = getServiceBySlug(params.slug);
  const media = await getSiteMediaMap();

  if (!service) {
    notFound();
  }

  const canonicalUrl = `${siteUrl}/services/${service.id}`;
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalTherapy",
    name: service.title,
    description: service.metadataDescription,
    provider: {
      "@type": ["MedicalClinic", "LocalBusiness"],
      name: "NovaLeap",
      url: siteUrl,
    },
    areaServed: "United States",
    url: canonicalUrl,
  };
  const clinicSchema = {
    "@context": "https://schema.org",
    "@type": ["MedicalClinic", "LocalBusiness"],
    name: "NovaLeap",
    url: siteUrl,
    description:
      "NovaLeap is a pediatric physical therapy center delivering compassionate, playful, evidence-based care for children and families.",
    medicalSpecialty: "Pediatric Physical Therapy",
    availableService: [
      {
        "@type": "MedicalTherapy",
        name: service.title,
      },
    ],
    areaServed: "United States",
  };

  return (
    <AnimatedPageBackground>
      <Script
        id={`service-schema-${service.id}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id={`clinic-schema-${service.id}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(clinicSchema) }}
      />
      <ServiceDetailPage 
        slug={service.id}
        heroImage={media[`services.${service.id}.hero-image`] || media[`services.${service.id}.card-image`]}
        featureMediaPoster={media[`services.${service.id}.feature-image`]}
        featureMediaVideo={media[`services.${service.id}.feature-video`]}
      />
    </AnimatedPageBackground>
  );
}