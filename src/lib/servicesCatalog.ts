import { Brain, Heart, Stethoscope, Users, Zap, type LucideIcon } from "lucide-react";

export interface ServiceCatalogItem {
  id: string;
  pretitle: string;
  title: string;
  titleLines: string[];
  description: string;
  menuDescription: string;
  icon: LucideIcon;
  accentColor: "navy" | "purple" | "aqua";
  image: string;
  href: string;
}

export const servicesCatalog: ServiceCatalogItem[] = [
  {
    id: "pediatric-physical-therapy",
    pretitle: "Core movement support",
    title: "Pediatric Physical Therapy",
    titleLines: ["Pediatric Physical", "Therapy"],
    description: "Building confidence through movement, coordination, and everyday strength.",
    menuDescription: "Movement, coordination, and strength support for everyday milestones.",
    icon: Heart,
    accentColor: "navy",
    image:
      "https://images.pexels.com/photos/3938023/pexels-photo-3938023.jpeg?auto=compress&cs=tinysrgb&w=1200",
    href: "/services#pediatric-physical-therapy",
  },
  {
    id: "play-based-therapy",
    pretitle: "Playful progress",
    title: "Play-Based Therapy",
    titleLines: ["Play-Based", "Therapy"],
    description: "Learning through joy, exploration, and purposeful therapeutic play.",
    menuDescription: "Therapeutic goals delivered through joyful, motivating play.",
    icon: Zap,
    accentColor: "purple",
    image:
      "https://images.pexels.com/photos/8613314/pexels-photo-8613314.jpeg?auto=compress&cs=tinysrgb&w=1200",
    href: "/services#play-based-therapy",
  },
  {
    id: "motor-development-therapy",
    pretitle: "Milestone support",
    title: "Motor Development Therapy",
    titleLines: ["Motor Development", "Therapy"],
    description: "Helping children reach key physical milestones at a pace that feels right.",
    menuDescription: "Support for sitting, crawling, walking, balance, and coordination.",
    icon: Brain,
    accentColor: "aqua",
    image:
      "https://images.pexels.com/photos/8943180/pexels-photo-8943180.jpeg?auto=compress&cs=tinysrgb&w=1200",
    href: "/services#motor-development-therapy",
  },
  {
    id: "evaluations-and-assessments",
    pretitle: "Clear next steps",
    title: "Evaluations & Assessments",
    titleLines: ["Evaluations", "& Assessments"],
    description: "Understanding your child's needs with clarity, guidance, and confidence.",
    menuDescription: "Evidence-based screenings that define the right next step with clarity.",
    icon: Stethoscope,
    accentColor: "navy",
    image:
      "https://images.pexels.com/photos/7089636/pexels-photo-7089636.jpeg?auto=compress&cs=tinysrgb&w=1200",
    href: "/services#evaluations-and-assessments",
  },
  {
    id: "personalized-therapy-programs",
    pretitle: "Family-centered care",
    title: "Personalized Therapy Programs",
    titleLines: ["Personalized Therapy", "Programs"],
    description: "Tailored plans designed to fit your child's goals, routine, and family life.",
    menuDescription: "Customized care plans shaped around your child, routine, and goals.",
    icon: Users,
    accentColor: "purple",
    image:
      "https://images.pexels.com/photos/7088524/pexels-photo-7088524.jpeg?auto=compress&cs=tinysrgb&w=1200",
    href: "/services#personalized-therapy-programs",
  },
];