import {
  Activity,
  Brain,
  Heart,
  Puzzle,
  Search,
  Stethoscope,
  Users,
  Zap,
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

export interface ServiceWhySection {
  pretitle: string;
  title: string;
  description: string;
  signsTitle: string;
  signs: string[];
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
    id: "pediatric-physical-therapy",
    pretitle: "Core movement support",
    title: "Pediatric Physical Therapy",
    titleLines: ["Pediatric Physical", "Therapy"],
    description: "Building confidence through movement, coordination, and everyday strength.",
    menuDescription: "Movement, coordination, and strength support for everyday milestones.",
    icon: Heart,
    accentColor: "navy",
    image:
      "https://images.pexels.com/photos/3938023/pexels-photo-3938023.jpeg?auto=compress&cs=tinysrgb&w=1600",
    imageAlt: "A therapist supporting a child during a walking activity in a bright therapy space.",
    href: "/services/pediatric-physical-therapy",
    hero: {
      pretitle: "Specialized Care",
      description:
        "Helping your child build strength, balance, and confidence through the power of play. We turn hard work into joyful victories.",
      primaryButtonLabel: "Book an Evaluation",
      primaryButtonHref: "/contact",
      heroImageAlt:
        "A child smiling while moving with support from a pediatric physical therapist.",
    },
    whySection: {
      pretitle: "Why Families Start Here",
      title: "Movement is the foundation of childhood.",
      description:
        "Physical therapy is not just about muscles. It is about giving your child the freedom to explore their world. Whether your child is experiencing developmental delays, recovering from an injury, or navigating a specific diagnosis, our expert therapists are here to guide them toward their highest potential.",
      signsTitle: "Signs your child might benefit",
      signs: [
        "Delays in rolling, crawling, or walking.",
        "Frequent tripping, clumsiness, or poor balance.",
        'Low muscle tone ("floppiness") or high muscle tone (stiffness).',
        "Difficulty keeping up with peers on the playground.",
      ],
      signImages: [
        "https://images.pexels.com/photos/3662845/pexels-photo-3662845.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/4473360/pexels-photo-4473360.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/8613319/pexels-photo-8613319.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/3938023/pexels-photo-3938023.jpeg?auto=compress&cs=tinysrgb&w=600",
      ],
    },
    featureMedia: {
      pretitle: "See Therapy In Action",
      title: "Play with a Purpose.",
      description:
        "Watch how we blend evidence-based clinical techniques with engaging, sensory-rich play. To your child, it feels like an indoor playground. To us, it is targeted neuro-motor development.",
      posterImage:
        "https://images.pexels.com/photos/8613314/pexels-photo-8613314.jpeg?auto=compress&cs=tinysrgb&w=1600",
      posterAlt: "A child exploring a therapy activity designed to build balance and confidence.",
    },
    pillarsPretitle: "Our Approach",
    pillars: [
      {
        title: "Assessment & Discovery",
        description:
          "We start with a comprehensive, stress-free evaluation to understand your child's unique movement patterns and structural needs.",
        icon: Search,
      },
      {
        title: "Customized Play-Plans",
        description:
          "No two children are alike. We design individualized sessions using obstacle courses, sensory tools, and specialized equipment.",
        icon: Puzzle,
      },
      {
        title: "Parent Empowerment",
        description:
          "We equip you with home-exercise routines that fit daily life, turning everyday moments into therapeutic growth.",
        icon: Users,
      },
    ],
    testimonialPretitle: "Parent Story",
    testimonial: {
      quote:
        "When we started Physical Therapy, my son was frustrated he could not keep up with his brother. The NovaLeap team transformed his physical strength while protecting his self-esteem. Today, he ran across the park without falling once. We cried happy tears.",
      author: "David M.",
      role: "Parent",
    },
    faqPretitle: "Service FAQs",
    faqs: [
      {
        question: "Do I need a doctor's referral for Physical Therapy?",
        answer:
          "In New York State, you may have direct access to physical therapy for a limited time, but a referral from your pediatrician is often recommended and may be required by your insurance plan.",
      },
      {
        question: "How long does a typical session last?",
        answer:
          "Sessions typically last 45 to 60 minutes, depending on your child's age, stamina, and personalized care plan.",
      },
      {
        question: "Will my child be in pain during therapy?",
        answer:
          "No. Our approach is gentle and child-led. While we do challenge muscles and coordination, we prioritize safety, comfort, and motivation throughout each session.",
      },
    ],
    bottomCtaPretitle: "Take The Next Step",
    bottomCta: {
      title: "Ready to see what your child can achieve?",
      description: "Schedule an evaluation today and let us start this journey together.",
      buttonLabel: "Book an Evaluation",
      buttonHref: "/contact",
    },
    metadataTitle: "Pediatric Physical Therapy | NovaLeap",
    metadataDescription:
      "Discover NovaLeap pediatric physical therapy services that build strength, balance, and confidence through evidence-based, play-centered care.",
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
      "https://images.pexels.com/photos/8613314/pexels-photo-8613314.jpeg?auto=compress&cs=tinysrgb&w=1600",
    imageAlt: "A child smiling during a playful therapy activity designed around movement and exploration.",
    href: "/services/play-based-therapy",
    hero: {
      pretitle: "Joyful Clinical Care",
      description:
        "We transform therapeutic goals into games your child wants to repeat. Every session feels playful, while every activity is grounded in a clear clinical purpose.",
      primaryButtonLabel: "Book an Evaluation",
      primaryButtonHref: "/contact",
      heroImageAlt: "A child laughing during a sensory-rich therapy game with a NovaLeap therapist.",
    },
    whySection: {
      pretitle: "Why Play Matters",
      title: "Children learn best when they feel safe, curious, and engaged.",
      description:
        "Play-based therapy helps children practice difficult skills without the pressure of a clinical environment. By following your child's interests, we create more repetition, more motivation, and more meaningful progress.",
      signsTitle: "Play-based therapy may be a great fit if your child",
      signs: [
        "Struggles to stay engaged in structured exercises.",
        "Needs support with transitions, sensory regulation, or flexibility.",
        "Learns best through games, imagination, and movement.",
        "Benefits from therapy that feels encouraging instead of overwhelming.",
      ],
    },
    featureMedia: {
      pretitle: "Inside A Session",
      title: "Therapy that feels like discovery.",
      description:
        "From obstacle courses to sensory-rich pretend play, each session is designed to keep your child motivated while we target real developmental goals.",
      posterImage:
        "https://images.pexels.com/photos/8943180/pexels-photo-8943180.jpeg?auto=compress&cs=tinysrgb&w=1600",
      posterAlt: "A therapist guiding a child through a colorful play-based motor activity.",
    },
    pillarsPretitle: "How We Structure Play",
    pillars: [
      {
        title: "Observe What Sparks Joy",
        description:
          "We notice what naturally motivates your child, then build sessions around activities that create trust and momentum.",
        icon: Search,
      },
      {
        title: "Target Skills Through Games",
        description:
          "Balance, coordination, attention, and regulation are woven into games that feel fresh and rewarding.",
        icon: Puzzle,
      },
      {
        title: "Coach Families For Carryover",
        description:
          "We share simple ways to extend progress at home so the work continues in routines your family already knows.",
        icon: Users,
      },
    ],
    testimonialPretitle: "Parent Story",
    testimonial: {
      quote:
        "My daughter used to shut down the moment she thought something felt hard. At NovaLeap, therapy became the best part of her week. She is stronger, more regulated, and so much more confident.",
      author: "Rachel T.",
      role: "Parent",
    },
    faqPretitle: "Service FAQs",
    faqs: [
      {
        question: "Is play-based therapy still clinically effective?",
        answer:
          "Yes. Every activity is intentionally selected to support specific goals such as strength, coordination, sensory processing, or motor planning. The play is the delivery system, not the distraction.",
      },
      {
        question: "What if my child is shy or slow to warm up?",
        answer:
          "That is common. We use child-led pacing, familiar routines, and relationship-based strategies to help your child feel secure before we ask for harder work.",
      },
      {
        question: "Can play-based therapy be combined with other services?",
        answer:
          "Absolutely. It often complements physical therapy, motor development support, and personalized therapy programs by making difficult skills more approachable.",
      },
    ],
    bottomCtaPretitle: "Keep Therapy Encouraging",
    bottomCta: {
      title: "Want therapy to feel motivating from the start?",
      description: "Book an evaluation and let us build a plan around your child's strengths, interests, and goals.",
      buttonLabel: "Book an Evaluation",
      buttonHref: "/contact",
    },
    metadataTitle: "Play-Based Therapy | NovaLeap",
    metadataDescription:
      "Explore NovaLeap play-based therapy services that turn therapeutic goals into joyful, evidence-based progress for children and families.",
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
      "https://images.pexels.com/photos/8943180/pexels-photo-8943180.jpeg?auto=compress&cs=tinysrgb&w=1600",
    imageAlt: "An infant practicing supported movement with guidance from a therapist.",
    href: "/services/motor-development-therapy",
    hero: {
      pretitle: "Early Milestone Support",
      description:
        "From tummy time to first steps, we help your child build the movement foundations that make everyday life feel easier, steadier, and more confident.",
      primaryButtonLabel: "Book an Evaluation",
      primaryButtonHref: "/contact",
      heroImageAlt: "A young child practicing early motor milestones in a supportive therapy session.",
    },
    whySection: {
      pretitle: "Why Early Support Helps",
      title: "Small movement patterns shape big developmental leaps.",
      description:
        "Motor development therapy focuses on the building blocks behind sitting, crawling, standing, walking, and coordinated play. Early guidance can improve strength, body awareness, and confidence while giving parents a clearer roadmap.",
      signsTitle: "Families often seek support when they notice",
      signs: [
        "Difficulty with tummy time, rolling, or sitting independently.",
        "Delays in crawling, pulling to stand, or walking.",
        "Asymmetrical movement or a strong preference for one side.",
        "Challenges with coordination, body awareness, or confidence during play.",
      ],
    },
    featureMedia: {
      pretitle: "What Sessions Look Like",
      title: "Gentle guidance for every milestone.",
      description:
        "We use positioning, sensory input, strengthening, and playful repetition to help new movement patterns become more natural over time.",
      posterImage:
        "https://images.pexels.com/photos/3938023/pexels-photo-3938023.jpeg?auto=compress&cs=tinysrgb&w=1600",
      posterAlt: "A therapist supporting a child during a milestone-focused movement activity.",
    },
    pillarsPretitle: "Our Milestone Framework",
    pillars: [
      {
        title: "Pinpoint The Foundation",
        description:
          "We identify which movement patterns need support so therapy can focus on the root of the delay, not just the visible symptom.",
        icon: Search,
      },
      {
        title: "Build Skills Step By Step",
        description:
          "Sessions are sequenced to help your child practice one manageable success after another.",
        icon: Puzzle,
      },
      {
        title: "Support Progress At Home",
        description:
          "You will leave with simple strategies that fit feeding, playtime, floor time, and other daily rhythms.",
        icon: Users,
      },
    ],
    testimonialPretitle: "Parent Story",
    testimonial: {
      quote:
        "We were worried our baby was falling behind, and we did not know where to begin. NovaLeap gave us clarity, simple home strategies, and so much hope. Each new milestone felt possible again.",
      author: "Melissa R.",
      role: "Parent",
    },
    faqPretitle: "Service FAQs",
    faqs: [
      {
        question: "What ages can benefit from motor development therapy?",
        answer:
          "This service can support infants, toddlers, and older children who need help strengthening the core movement patterns behind gross motor development.",
      },
      {
        question: "Do developmental delays always mean something serious is wrong?",
        answer:
          "Not necessarily. Some children simply need targeted support, practice, and monitoring. An evaluation helps us understand what is typical, what needs support, and what next steps make sense.",
      },
      {
        question: "How much parent involvement is expected?",
        answer:
          "Parent involvement is a major part of progress. We coach you through practical strategies so your child can practice new skills in familiar environments between visits.",
      },
    ],
    bottomCtaPretitle: "Start Early, Support Deeply",
    bottomCta: {
      title: "Looking for a clearer path to your child's next milestone?",
      description: "Book an evaluation and let us map out supportive, realistic steps forward together.",
      buttonLabel: "Book an Evaluation",
      buttonHref: "/contact",
    },
    metadataTitle: "Motor Development Therapy | NovaLeap",
    metadataDescription:
      "Learn how NovaLeap motor development therapy supports sitting, crawling, walking, balance, and coordination through individualized pediatric care.",
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
      "https://images.pexels.com/photos/7089636/pexels-photo-7089636.jpeg?auto=compress&cs=tinysrgb&w=1600",
    imageAlt: "A therapist evaluating a child's movement and posture in a calm, welcoming setting.",
    href: "/services/evaluations-and-assessments",
    hero: {
      pretitle: "Clarity Before Everything Else",
      description:
        "Our evaluations give you a clearer understanding of your child's movement patterns, strengths, and next steps so you can make decisions with confidence.",
      primaryButtonLabel: "Book an Evaluation",
      primaryButtonHref: "/contact",
      heroImageAlt: "A NovaLeap therapist observing a child's movement during an evaluation.",
    },
    whySection: {
      pretitle: "Why Evaluation Matters",
      title: "Parents deserve answers that feel calm, clear, and actionable.",
      description:
        "A thoughtful assessment helps us understand not only what is challenging your child, but also what is already working well. That balance gives families peace of mind and a realistic plan for progress.",
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
        "We blend observation, conversation, and hands-on screening to create an evaluation that feels thorough without feeling intimidating.",
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
          "Strength, balance, coordination, posture, and movement quality are examined through age-appropriate activities.",
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
    metadataTitle: "Evaluations & Assessments | NovaLeap",
    metadataDescription:
      "Schedule a NovaLeap pediatric therapy evaluation to better understand your child's strengths, challenges, and next best steps.",
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
      "https://images.pexels.com/photos/7088524/pexels-photo-7088524.jpeg?auto=compress&cs=tinysrgb&w=1600",
    imageAlt: "A therapist and parent reviewing a customized therapy plan together.",
    href: "/services/personalized-therapy-programs",
    hero: {
      pretitle: "Care Built Around Your Child",
      description:
        "Every child grows differently. Our personalized therapy programs align therapeutic goals with your child's needs, your family's routines, and the progress that matters most.",
      primaryButtonLabel: "Book an Evaluation",
      primaryButtonHref: "/contact",
      heroImageAlt: "A parent and therapist collaborating on a customized pediatric therapy plan.",
    },
    whySection: {
      pretitle: "Why Personalization Matters",
      title: "The best plan is the one your family can truly use.",
      description:
        "A personalized therapy program helps us move beyond generic recommendations. We shape care around your child's diagnosis, energy, schedule, environment, and goals so progress feels sustainable.",
      signsTitle: "A tailored therapy plan can help when your family needs",
      signs: [
        "A roadmap that matches your child's exact strengths and challenges.",
        "Goals that fit school, home, and community routines.",
        "Support coordinating multiple needs or overlapping services.",
        "A plan that evolves as your child grows and changes.",
      ],
    },
    featureMedia: {
      pretitle: "How Plans Come Together",
      title: "Thoughtful care that adapts with progress.",
      description:
        "We combine evaluation findings, family priorities, and real-world routines to build a program your child can grow with over time.",
      posterImage:
        "https://images.pexels.com/photos/7089636/pexels-photo-7089636.jpeg?auto=compress&cs=tinysrgb&w=1600",
      posterAlt: "A therapist demonstrating a home-friendly therapy activity for a parent and child.",
    },
    pillarsPretitle: "How We Personalize Care",
    pillars: [
      {
        title: "Define Meaningful Goals",
        description:
          "We focus on outcomes that matter to your child and family, from playground confidence to smoother daily routines.",
        icon: Search,
      },
      {
        title: "Build A Flexible Plan",
        description:
          "Therapy frequency, activities, and home support are designed around what is realistic and effective for your family.",
        icon: Puzzle,
      },
      {
        title: "Adjust As Your Child Grows",
        description:
          "We revisit goals regularly so the plan keeps pace with new strengths, new needs, and new milestones.",
        icon: Users,
      },
    ],
    testimonialPretitle: "Parent Story",
    testimonial: {
      quote:
        "What we needed was not one more generic checklist. We needed a plan that fit our child and our life. NovaLeap gave us that, and the difference in follow-through has been huge.",
      author: "Erin W.",
      role: "Parent",
    },
    faqPretitle: "Service FAQs",
    faqs: [
      {
        question: "How is a personalized program different from regular therapy?",
        answer:
          "The therapy remains evidence-based, but the goals, strategies, pacing, and home recommendations are shaped around your child's unique profile and family routines.",
      },
      {
        question: "Will the plan change over time?",
        answer:
          "Yes. We expect it to. As your child makes progress or new priorities emerge, we update the plan so it stays relevant and useful.",
      },
      {
        question: "Can siblings, caregivers, or teachers be included in the plan?",
        answer:
          "When helpful, yes. We believe strong carryover happens when the adults in your child's world understand the goals and feel confident supporting them.",
      },
    ],
    bottomCtaPretitle: "Create A Plan That Fits",
    bottomCta: {
      title: "Ready for a therapy plan shaped around real life?",
      description: "Schedule an evaluation and let us design a personalized path forward for your child and family.",
      buttonLabel: "Book an Evaluation",
      buttonHref: "/contact",
    },
    metadataTitle: "Personalized Therapy Programs | NovaLeap",
    metadataDescription:
      "See how NovaLeap personalized therapy programs create family-centered pediatric care plans built around your child's goals and daily routines.",
  },
];

export const getServiceBySlug = (slug: string) =>
  servicesCatalog.find((service) => service.id === slug);