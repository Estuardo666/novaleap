import {
  Activity,
  Puzzle,
  Search,
  Stethoscope,
  Users,
  type LucideIcon,
} from "lucide-react";

export interface ServiceFaqItem {
  question: string;
  answer: string;
}

export interface ServicePillar {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface ServiceTestimonial {
  quote: string;
  author: string;
  role: string;
}

export interface ServiceFeatureMedia {
  pretitle: string;
  title: string;
  description: string;
  posterImage: string;
  posterAlt: string;
  videoSrc?: string;
}

export interface ServiceHeroContent {
  pretitle: string;
  description: string;
  primaryButtonLabel: string;
  primaryButtonHref: string;
  heroImageAlt: string;
  heroVideoSrc?: string;
}

export interface ServiceSignGroup {
  groupTitle: string;
  items: string[];
}

export interface ServiceWhySection {
  pretitle: string;
  title: string;
  description: string;
  signsTitle: string;
  signs: string[];
  signGroups?: ServiceSignGroup[];
  signImages?: string[];
}

export interface ServiceBottomCta {
  title: string;
  description: string;
  buttonLabel: string;
  buttonHref: string;
}

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
  imageAlt: string;
  href: string;
  hero: ServiceHeroContent;
  whySection: ServiceWhySection;
  featureMedia: ServiceFeatureMedia;
  pillarsPretitle: string;
  pillars: ServicePillar[];
  testimonialPretitle: string;
  testimonial: ServiceTestimonial;
  faqPretitle: string;
  faqs: ServiceFaqItem[];
  bottomCtaPretitle: string;
  bottomCta: ServiceBottomCta;
  metadataTitle: string;
  metadataDescription: string;
}

export const servicesCatalog: ServiceCatalogItem[] = [
  {
    id: "evaluations-and-assessments",
    pretitle: "Clear next steps",
    title: "Evaluation",
    titleLines: ["Evaluation", ""],
    description: "In-depth evaluation of movement skills, strengths, and support areas.",
    menuDescription: "Comprehensive pediatric assessment using age-appropriate standardized tools.",
    icon: Stethoscope,
    accentColor: "navy",
    image:
      "https://images.pexels.com/photos/7089636/pexels-photo-7089636.jpeg?auto=compress&cs=tinysrgb&w=1600",
    imageAlt: "A therapist evaluating a child's movement and posture in a calm, welcoming setting.",
    href: "/services/evaluations-and-assessments",
    hero: {
      pretitle: "Clarity Before Everything Else",
      description:
        "In-depth assessment of your child's mobility, balance, strength, postural control, coordination, and functional abilities while incorporating your family's goals and priorities.",
      primaryButtonLabel: "Book an Evaluation",
      primaryButtonHref: "/contact",
      heroImageAlt: "A NovaLeap therapist observing a child's movement during an evaluation.",
    },
    whySection: {
      pretitle: "Why Evaluation Matters",
      title: "Parents deserve answers that feel calm, clear, and actionable.",
      description:
        "In addition, we utilize age-appropriate pediatric standardized tools. These tools provide objective and standardized information about your child's skills, allowing us to compare their development to age-based norms and identify strengths as well as areas where they need support.",
      signsTitle: "An evaluation can be helpful when you are wondering about",
      signs: [
        "Movement delays or coordination concerns.",
        "Balance, strength, or endurance challenges.",
        "Recovery after injury, surgery, or a change in function.",
        "Whether therapy is needed now and what type of support fits best.",
      ],
    },
    featureMedia: {
      pretitle: "What To Expect",
      title: "A welcoming first step for your family.",
      description:
        "We combine parent interview, clinical observation, and structured testing so your family leaves with a clear and practical roadmap.",
      posterImage:
        "https://images.pexels.com/photos/7088524/pexels-photo-7088524.jpeg?auto=compress&cs=tinysrgb&w=1600",
      posterAlt: "A therapist talking with a parent while guiding a child through an assessment activity.",
    },
    pillarsPretitle: "Our Evaluation Process",
    pillars: [
      {
        title: "Listen First",
        description:
          "We begin by understanding your concerns, your child's history, and what day-to-day challenges matter most to your family.",
        icon: Search,
      },
      {
        title: "Assess With Intention",
        description:
            "Mobility, balance, strength, postural control, coordination, and function are examined through age-appropriate activities and standardized tools.",
        icon: Activity,
      },
      {
        title: "Leave With A Plan",
        description:
          "You will know what we noticed, what it means, and what next steps are most likely to help your child move forward.",
        icon: Users,
      },
    ],
    testimonialPretitle: "Parent Story",
    testimonial: {
      quote:
        "Before our evaluation, we felt overwhelmed by conflicting advice. NovaLeap explained everything in a way that made sense, and for the first time we felt like we had a real roadmap.",
      author: "Caroline S.",
      role: "Parent",
    },
    faqPretitle: "Service FAQs",
    faqs: [
      {
        question: "How long is an evaluation appointment?",
        answer:
          "Most evaluations last about 60 minutes so we have time to learn your concerns, observe movement, and answer questions without rushing.",
      },
      {
        question: "Will I receive recommendations after the evaluation?",
        answer:
          "Yes. We review our findings, explain what they mean, and outline whether therapy is recommended along with the kind of support that may help most.",
      },
      {
        question: "Can I book an evaluation even if I am not sure therapy is needed?",
        answer:
          "Yes. Evaluations are often the best place to start when you want professional guidance before committing to an ongoing therapy plan.",
      },
    ],
    bottomCtaPretitle: "Get Clear Answers",
    bottomCta: {
      title: "Need clarity before choosing the next step?",
      description: "Schedule an evaluation and get a grounded, compassionate view of your child's movement needs.",
      buttonLabel: "Book an Evaluation",
      buttonHref: "/contact",
    },
    metadataTitle: "Evaluation | NovaLeap",
    metadataDescription:
      "Schedule a NovaLeap pediatric therapy evaluation to better understand your child's strengths, challenges, and next best steps.",
  },
  {
    id: "treatment",
    pretitle: "One-to-one care",
    title: "Treatment",
    titleLines: ["Treatment", ""],
    description: "Individual 45 and 60 minute play-based sessions tailored to your child.",
    menuDescription: "One-to-one play-based sessions with caregiver coaching and home activities.",
    icon: Activity,
    accentColor: "purple",
    image:
      "https://images.pexels.com/photos/8613314/pexels-photo-8613314.jpeg?auto=compress&cs=tinysrgb&w=1600",
    imageAlt: "A therapist guiding a child through a one-to-one play-based treatment session.",
    href: "/services/treatment",
    hero: {
      pretitle: "Personalized Sessions",
      description:
        "We offer one-to-one 45 and 60 minute play-based sessions tailored to your child's unique needs and strengths.",
      primaryButtonLabel: "Book an Evaluation",
      primaryButtonHref: "/contact",
      heroImageAlt: "A child in a one-to-one play-based treatment session with a NovaLeap therapist.",
    },
    whySection: {
      pretitle: "How Treatment Works",
      title: "Consistent, child-led treatment with strong family participation.",
      description:
        "We encourage parent and caregiver participation and provide home activities that can be incorporated into your child and family daily routine. Video recording of home activities is encouraged for review at home.",
      signsTitle: "Challenges we address",
      signs: [],
      signGroups: [
        {
          groupTitle: "Specialized Pediatric Support For",
          items: [
            "Torticollis",
            "Head shape & positioning (plagiocephaly)",
            "Early development & prematurity",
            "Developmental delays",
            "Ehlers-Danlos syndrome",
            "Low muscle tone & joint hypermobility",
            "Walking differences (toe walking, intoeing/out-toeing)",
            "Balance, coordination & motor planning",
          ],
        },
        {
          groupTitle: "Including support for children with",
          items: [
            "Cerebral palsy",
            "Erb's palsy",
            "Down syndrome",
            "Other neurological or genetic conditions",
          ],
        },
        {
          groupTitle: "Musculoskeletal & orthopedic concerns",
          items: [
            "Osgood Schlatter",
            "Scoliosis and Spine Care",
            "Deconditioning",
          ],
        },
      ],
    },
    featureMedia: {
      pretitle: "Inside Treatment",
      title: "Play-based sessions with measurable purpose.",
      description:
        "Each session is tailored to your child while staying focused on function, confidence, and carryover at home.",
      posterImage:
        "https://images.pexels.com/photos/8943180/pexels-photo-8943180.jpeg?auto=compress&cs=tinysrgb&w=1600",
      posterAlt: "A therapist using a playful activity to target strength and coordination goals.",
    },
    pillarsPretitle: "Treatment Framework",
    pillars: [
      {
        title: "Targeted Session Goals",
        description:
          "Every session focuses on specific movement and functional goals matched to your child's needs and strengths.",
        icon: Search,
      },
      {
        title: "Caregiver Partnership",
        description:
          "Parents and caregivers are actively involved so home routines support progress between visits.",
        icon: Puzzle,
      },
      {
        title: "Home Carryover",
        description:
          "We provide practical home activities and encourage video review to reinforce learning outside the clinic.",
        icon: Users,
      },
    ],
    testimonialPretitle: "Parent Story",
    testimonial: {
      quote:
        "The one-to-one treatment format helped our child stay engaged and confident. The home activities made it easy for us to keep momentum between sessions.",
      author: "Parent at NovaLeap",
      role: "Parent",
    },
    faqPretitle: "Service FAQs",
    faqs: [
      {
        question: "How long are treatment sessions?",
        answer:
          "Sessions are one-to-one and typically 45 or 60 minutes based on your child's plan.",
      },
      {
        question: "Can caregivers participate during treatment?",
        answer:
          "Yes. Caregiver participation is encouraged to improve confidence and carryover at home.",
      },
      {
        question: "Do you provide home activities?",
        answer:
          "Yes. We provide home activities that fit daily routines, and we encourage families to record videos for review at home.",
      },
    ],
    bottomCtaPretitle: "Continue The Progress",
    bottomCta: {
      title: "Ready to begin treatment tailored to your child?",
      description: "Schedule an evaluation and we will build a focused, play-based treatment plan with your family.",
      buttonLabel: "Book an Evaluation",
      buttonHref: "/contact",
    },
    metadataTitle: "Treatment | NovaLeap",
    metadataDescription:
      "Explore one-to-one 45 and 60 minute play-based treatment sessions tailored to your child's strengths, goals, and daily routines.",
  },
];

export const getServiceBySlug = (slug: string) =>
  servicesCatalog.find((service) => service.id === slug);