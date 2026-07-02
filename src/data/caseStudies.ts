import { CaseStudyMetaIcon, CaseStudyTextSectionLayout, type CaseStudy } from "../types/site";
import ekohubImage from "../assets/images/projects/ekohub.jpg";
import kiiraImage from "../assets/images/projects/kiira.png";
import pamojaImage from "../assets/images/projects/pamoja.jpg";
import qoreImage from "../assets/images/projects/qore.png";
import signatureBankImage from "../assets/images/projects/signature-bank.png";
import spoxioImage from "../assets/images/projects/spoxio.png";
import vbanThumbnailImage from "../assets/images/projects/vban-thumbnail.png";
import {
  ekohubGalleryItems,
  kiiraHealthGalleryItems,
  pamojaGalleryItems,
  qoreGalleryItems,
  signatureBankGalleryItems,
  spoxioGalleryItems,
} from "./projectGalleryImages";

export const caseStudyFallbackCopy = {
  categoryFallback: "Digital Product",
  roleLabel: "Product designer",
  leadDesignerLabel: "Lead designer: Ayodeji Osindele",
  teamLabel: "3-man design team",
  contextTitle: "The Context",
  challengeTitle: "The Challenge",
  discoveryTitle: "The Discovery",
  explorationTitle: "The Exploration",
  impactTitle: "The Impact",
  reflectionTitle: "Reflection",
  galleryTitle: "Visual Gallery",
  moreProjectsTitle: "More Projects",
  coverImageDescriptionPrefix: "Dark placeholder for",
  coverImageDescriptionSuffix: "case study hero media.",
  contextBodyPrefix: "This case study documents the product direction and design thinking behind",
  contextBodySuffix: "with emphasis on clarity, trust, and practical user value.",
  challengeBody:
    "The main challenge was translating a complex product into an interface that feels simple, focused, and dependable for the people using it.",
  discoveryBody:
    "The discovery phase focused on understanding user expectations, product constraints, and the moments where the experience needed to create confidence.",
  explorationBody:
    "The exploration phase shaped the visual system, content structure, and interaction patterns into a reusable product experience.",
  impactCardOneTitle: "Created a clearer product narrative and a more confident user-facing experience",
  impactCardTwoTitle: "Improved interaction structure with reusable patterns for future product pages",
  impactCardThreeTitle: "Established a stronger foundation for content, product education, and conversion",
  impactCardLabel: "Product outcome",
  reflectionBody:
    "The work reinforced the value of disciplined visual systems, concise product storytelling, and consistent interaction patterns.",
} as const;

export const caseStudies: CaseStudy[] = [
  {
    slug: "qore",
    title: "Qore",
    category: "Website - Core banking platform",
    liveHref: "https://qore.inc",
    coverImageDescription: "Dark placeholder for Qore case study hero media.",
    coverImageSource: qoreImage,
    metaItems: [
      { id: "role", icon: CaseStudyMetaIcon.Role, label: "Product designer" },
      { id: "lead-designer", icon: CaseStudyMetaIcon.Lead, label: "Lead designer: Ayodeji Osindele" },
      { id: "design-team", icon: CaseStudyMetaIcon.Team, label: "3-man design team" },
      { id: "year", icon: CaseStudyMetaIcon.Calendar, label: "2022" },
    ],
    textSections: [
      {
        id: "context",
        title: "The Context",
        paragraphs: [
          {
            text:
              "Qore (formerly Appzone Switch) is the backbone for fully digital and automated banks — powering the digital operations of over 500 financial institutions. I was part of the design team brought in for the end-to-end transformation of their brand and digital presence. The goal was to move away from a legacy identity and build a cohesive ecosystem — from logo to digital platform to physical collateral — that could hold its own as a secure, enterprise-grade product.",
          },
        ],
      },
      {
        id: "challenge",
        title: "The Challenge",
        paragraphs: [
          {
            text:
              "The project required balancing two things that don't always sit well together: technical authority and modern accessibility.",
          },
          {
            text:
              "The rebrand needed an identity stable enough for commercial banks but innovative enough for the next generation of fintechs. The site also had to house a massive range of products — core banking, lending solutions — without creating cognitive overload for a C-suite audience. And with ₦130 billion in daily balances flowing through their systems, the brand's digital storefront had to radiate security.",
          },
        ],
      },
      {
        id: "craft",
        title: "The Craft",
        layout: CaseStudyTextSectionLayout.Wide,
        paragraphs: [
          {
            text:
              "I worked on the brand and identity side — we went through five iterations before landing on the final Black and Green identity, selected for its balance of institutional trust and digital-forward energy. The project extended into the physical world too: letterheads, business cards, employee apparel, and roll-up banners to ensure a unified internal culture.",
          },
          {
            text:
              "On the digital side, I worked on a navigation system that helped diverse users — from bank executives to developers — find specific products quickly. I used card-based layouts and custom diagrams to simplify complex concepts like API Gateway Integrations and Automated Lending Services. We also built a bespoke backend with a full database and CMS, so the Qore team could manage their blog and white papers independently while maintaining strict security standards.",
          },
        ],
      },
    ],    impactTitle: "The Impact",
    impactCards: [
      { id: "commercial-banks", title: "19+", label: "Commercial Banks" },
      { id: "monthly-transactions", title: "191M+", label: "Monthly Transactions" },
      { id: "monthly-loan-volume", title: "₦125B", label: "Monthly Loan Volume" },
      { id: "countries-served", title: "9", label: "Countries Served" },
    ],
    reflection: {
      id: "reflection",
      title: "Reflection",
      paragraphs: [
        {
          text:
            "Working on Qore reinforced something I carry into every project since: in infrastructure design, reliability is the aesthetic. The goal wasn't to make it pretty — it was to make it feel as stable and powerful as the core banking code it represents.",
        },
      ],
    },
    galleryTitle: "Visual Gallery",
    galleryItems: qoreGalleryItems,
    moreProjectsTitle: "More Projects",
  },
  {
    slug: "ekohub",
    title: "Eko Hub",
    category: "Digital Marketplace Platform",
    coverImageDescription: "Dark placeholder for Eko Hub case study hero media.",
    coverImageSource: ekohubImage,
    metaItems: [
      { id: "role", icon: CaseStudyMetaIcon.Role, label: "Product designer" },
      { id: "lead-designer", icon: CaseStudyMetaIcon.Lead, label: "Lead designer: Ayodeji Osindele" },
      { id: "design-team", icon: CaseStudyMetaIcon.Team, label: "3-man design team" },
      { id: "year", icon: CaseStudyMetaIcon.Calendar, label: "2020" },
    ],
    textSections: [
      {
        id: "context",
        title: "The Context",
        paragraphs: [
          {
            text:
              'Nigeria has a vibrant but physically demanding marketplace. By 2020, over a third of the country\'s population were online buyers, yet a massive gap remained for local traders who found the cost of physical storefronts unbearable. I led the design of Eko Hub to digitize this experience, providing a "verified" platform that simplifies how commodities are bought and sold without either party needing to leave their home.',
          },
          {
            text: "Solving the accessibility and trust crisis for buyers and sellers in the traditional Nigerian marketplace.",
          },
        ],
      },
      {
        id: "challenge",
        title: "The Challenge",
        paragraphs: [
          {
            text:
              'Market research revealed that the hurdle was not just "buying stuff"--it was the physical and emotional cost of the "hustle."',
          },
          {
            lead: "Physical Friction:",
            text: "Merchants faced high overheads and the unbearable cost of owning physical shops.",
          },
          {
            lead: "Logistical Stress:",
            text: "Shoppers complained about the sheer stress and time-loss of navigating physical markets.",
          },
          {
            lead: "The Safety Gap:",
            text:
              "A significant fear of area boys, hijackers, and general theft made both buyers and sellers hesitant to engage in high-value commerce.",
          },
        ],
      },
      {
        id: "discovery",
        title: "The Discovery",
        paragraphs: [
          {
            lead: "Persona Deep-Dive:",
            text:
              "We centered our design on users like Deji Ajayi, a 30-year-old online trader who needed real-time communication and fast delivery to survive in a competitive market.",
          },
          {
            lead: "Core Pillars:",
            text:
              "Research synthesized three non-negotiables for the solution: Interaction (real-time connection), Efficiency (removing the stress of travel), and Security (mitigating the fear of theft).",
          },
        ],
      },
      {
        id: "craft",
        title: "The Craft",
        paragraphs: [
          {
            lead: "Visual Trust:",
            text:
              'I used high-contrast UI and "verified reseller" badging to immediately address the safety concerns found during research. Iterative Design: We began with low-fidelity sketches on paper to ensure the user flow for "starting a sale" was as friction-free as possible, eventually moving to high-fidelity prototypes for both mobile and web.',
          },
          {
            lead: 'The "Start Selling" Flow:',
            text:
              'I prioritised a "verified upload" system, allowing merchants to take a photo of their item and get paid as soon as it sells, effectively removing the need for an expensive physical storefront.',
          },
        ],
      },
    ],    impactTitle: "The Impact",
    impactCards: [
      { id: "digital-shoppers", title: "76.7M+", label: "Digital Shoppers" },
      { id: "year-of-context", title: "2020", label: "Year of Context" },
      { id: "platform-coverage", title: "Mobile & Web", label: "Platform Coverage" },
    ],
    reflection: {
      id: "reflection",
      title: "Reflection",
      paragraphs: [
        {
          text:
            'Eko Hub taught me that digital transformation is not just about moving products from a shelf to a screen. It is about understanding the socio-economic stressors--like the cost of physical space and the threat of theft--and using design to provide a "safe harbor" for commerce to thrive.',
        },
      ],
    },
    galleryTitle: "Visual Gallery",
    galleryItems: ekohubGalleryItems,
    moreProjectsTitle: "More Projects",
  },
  {
    slug: "kiira-health",
    title: "Kiira Health",
    category: "Virtual Care for Students",
    liveHref: "https://kiira.webflow.io/",
    coverImageDescription: "Dark placeholder for Kiira Health case study hero media.",
    coverImageSource: kiiraImage,
    metaItems: [
      { id: "role", icon: CaseStudyMetaIcon.Role, label: "Product designer" },
      { id: "lead-designer", icon: CaseStudyMetaIcon.Lead, label: "Lead designer: Ayodeji Osindele" },
      { id: "design-team", icon: CaseStudyMetaIcon.Team, label: "3-man design team" },
      { id: "year", icon: CaseStudyMetaIcon.Calendar, label: "2023" },
    ],
    textSections: [
      {
        id: "context",
        title: "The Context",
        paragraphs: [
          {
            text:
              "Kiira is a Los Angeles-based virtual health clinic dedicated to the holistic wellbeing of young women and gender-diverse students. I worked as part of the design team to redesign their web platform, focusing on creating a seamless, user-friendly interface that puts the needs of the multicultural student population first.",
          },
        ],
      },
      {
        id: "challenge",
        title: "The Challenge",
        paragraphs: [
          {
            text:
              "Healthcare can be intimidating, especially for students navigating sensitive topics like reproductive or mental health for the first time.",
          },
          {
            lead: "The Clinical Coldness:",
            text:
              "The original site felt like a standard medical directory, lacking the warmth needed to engage a younger, digitally-native audience.",
          },
          {
            lead: "Navigation Friction:",
            text:
              "Complex data sets (insurance, pricing, provider bios) needed to be organized so students could find care seamlessly and easily.",
          },
          {
            lead: "The Trust Gap:",
            text: "How do we make a virtual clinic feel as safe and personal as a face-to-face visit?",
          },
        ],
      },
      {
        id: "discovery",
        title: "The Discovery",
        paragraphs: [
          {
            lead: "The Research Core:",
            text:
              "We conducted in-depth research to understand why students were abandoning their health journeys midway. The 3D Mascot Breakthrough: I realized that a clinical interface alone would not bridge the trust gap. We needed a human (or in this case, a friendly 3D) anchor.",
          },
          {
            lead: "Aha Moment:",
            text:
              "By creating Kiira the Penguin, a custom 3D mascot, we could guide users through stressful tasks like insurance verification or symptom checking with a sense of playfulness and care.",
          },
        ],
      },
      {
        id: "exploration",
        title: "The Exploration",
        paragraphs: [
          {
            lead: "Visual Class and Uniqueness:",
            text:
              "I moved away from standard flat icons in favor of custom 3D assets. These were not just decorative; they served as calls-to-action on cards and as welcoming avatars.",
          },
          {
            lead: "Design Alternatives:",
            text:
              "We experimented with various color palettes, ultimately landing on Kiira Blue (#3F84FF) and Kiira Dark (#000B1E) to balance medical authority with modern tech aesthetics.",
          },
        ],
      },
      {
        id: "craft",
        title: "The Craft",
        layout: CaseStudyTextSectionLayout.Wide,
        paragraphs: [
          {
            lead: "High-Fidelity Onboarding:",
            text:
              "Designed an intuitive UI that allows students to step into a world of tailored healthcare via a streamlined landing page and service selection.",
          },
          {
            lead: "Accessibility-First UI:",
            text:
              "I designed Preview Cards and pop-up screens that allow students to view provider availability and bios without losing their place in the user journey.",
          },
          {
            lead: "3D Integration:",
            text:
              "Every key health category from Primary Care to Mental Health was paired with a unique 3D icon I built, ensuring the design felt high-end and cohesive.",
          },
        ],
      },
    ],    impactTitle: "The Impact",
    impactCards: [
      { id: "engagement", title: "500% Increase", label: "User Engagement" },
      { id: "platform-feel", title: "Class & Uniqueness", label: "Platform Feel" },
      { id: "sentiment", title: "Well-being takes center stage", label: "User Sentiment" },
      { id: "students-served", title: "2,000+", label: "Students Served" },
    ],
    reflection: {
      id: "reflection",
      title: "Reflection",
      paragraphs: [
        {
          text:
            "Personal Growth: Kiira was a masterclass in combining UX Strategy with Brand Artistry. It proved that when you are designing for high-anxiety sectors like health, the visual vibe is just as functional as the navigation. Key Lesson: Do not be afraid to bring non-standard elements like 3D mascots into professional spaces. Sometimes, a friendly penguin is exactly what is needed to help a user complete a daunting medical form.",
        },
      ],
    },
    galleryTitle: "Visual Gallery",
    galleryItems: kiiraHealthGalleryItems,
    moreProjectsTitle: "More Projects",
  },
  {
    slug: "spoxio",
    title: "Spoxio",
    category: "Sports Social Platform",
    liveHref: "https://spoxio.com",
    coverImageDescription: "Dark placeholder for Spoxio case study hero media.",
    coverImageSource: spoxioImage,
    metaItems: [
      { id: "role", icon: CaseStudyMetaIcon.Role, label: "Product designer" },
      { id: "lead-designer", icon: CaseStudyMetaIcon.Lead, label: "Lead designer: Ayodeji Osindele" },
      { id: "year", icon: CaseStudyMetaIcon.Calendar, label: "2021" },
    ],
    textSections: [
      {
        id: "context",
        title: "The Context",
        paragraphs: [
          {
            text:
              "Spoxio was an existing sports social platform in need of a strategic overhaul to better serve the global sports community. I was part of the design team, contributing to collecting and organising insights from stakeholders — including athletes, product owners, and sports fans — to help shape a more engaging, high-performance social platform built specifically for the unique needs of sports professionals, enthusiasts, and scouts.",
          },
        ],
      },
      {
        id: "challenge",
        title: "The Challenge",
        paragraphs: [
          {
            text:
              "The primary objective was to move beyond the limitations of mainstream social media and address the specific functional requirements of the sports industry.",
          },
          {
            text:
              "We had to reconcile the goals of diverse users — from a Talent looking to be discovered, to a Scout needing exclusive stats and talent rankings. We also needed to understand how the existing concept was perceived and identify the missing links in how people currently enjoy and interact with sports digitally.",
          },
        ],
      },
      {
        id: "discovery",
        title: "The Discovery",
        paragraphs: [
          {
            text:
              "I was involved in the discovery phase — conducting in-depth research through discovery sessions and 11 interviews. I helped schedule 10 targeted participants across platforms like Teams, Zoom, and Google Meet to discuss their sporting habits and requirements.",
          },
          {
            text:
              "The research highlighted a clear demand for specialised features like exclusive talent rankings and bulk messaging for professional networking — things generic social platforms simply don't offer.",
          },
        ],
      },
      {
        id: "exploration",
        title: "The Exploration",
        paragraphs: [
          {
            text:
              "I immersed myself in the problem space using divergent thinking to explore how buyers and sellers of sports talent could interact without friction.",
          },
          {
            text:
              "I mapped out four distinct entry points — Scout, Talent, Fan, and Club — to ensure the interface adapted perfectly to each user's specific intent rather than forcing everyone through the same generic experience.",
          },
        ],
      },
      {
        id: "craft",
        title: "The Craft",
        layout: CaseStudyTextSectionLayout.Wide,
        paragraphs: [
          {
            text:
              "I worked on designing an interface that allows scouts to access exclusive stats and rankings directly from the feed. I contributed to integrating contact flows — direct and bulk messaging — enabling real-time recruitment and professional communication across user types.",
          },
          {
            text:
              "On the visual side, I worked on a sleek, high-contrast dark theme that highlights sports media and athlete profiles, creating an immersive, premium environment for enthusiasts.",
          },
        ],
      },
    ],    impactTitle: "The Impact",
    impactCards: [
      { id: "user-types", title: "4 (Scout, Talent, Fan, Club)", label: "User Types" },
      { id: "research-participants", title: "10", label: "Research Participants" },
      { id: "methodology", title: "Full-cycle revamp", label: "Methodology" },
    ],
    reflection: {
      id: "reflection",
      title: "Reflection",
      paragraphs: [
        {
          text:
            "Being part of the Spoxio project reinforced the power of niche empathy. Designing for the scout, the club owner, and the aspiring athlete at the same time taught me that true innovation often comes from creating specialised tools that standard platforms are too broad to address.",
        },
      ],
    },
    galleryTitle: "Visual Gallery",
    galleryItems: spoxioGalleryItems,
    moreProjectsTitle: "More Projects",
  },
  {
    slug: "vban",
    title: "vban",
    category: "Simplifying global payments for African freelancers",
    liveHref: "https://vban.com",
    coverImageDescription: "VBAN product thumbnail for the case study hero media.",
    coverImageSource: vbanThumbnailImage,
    metaItems: [
      { id: "role", icon: CaseStudyMetaIcon.Role, label: "Product designer" },
      { id: "ownership", icon: CaseStudyMetaIcon.Lead, label: "Ownership of Design" },
      { id: "year", icon: CaseStudyMetaIcon.Calendar, label: "2025" },
    ],
    textSections: [
      {
        id: "context",
        title: "The Context",
        paragraphs: [
          {
            text:
              "vban was built at a time when more Nigerians were earning in foreign currencies through freelancing, remote work, and digital businesses. While access to global income had improved, the infrastructure to receive and manage that income locally remained fragmented. Users often relied on multiple platforms to handle payments, conversions, and withdrawals, creating a disjointed and inefficient experience. vban was conceived to unify this process into a single, seamless system.",
          },
        ],
      },
      {
        id: "challenge",
        title: "The Challenge",
        paragraphs: [
          {
            text:
              "The primary challenge was not just enabling international payments, but simplifying the entire financial journey. Users faced limited options for receiving USD, GBP, and EUR, high fees from multiple currency conversions, and long delays when accessing their funds. Onboarding processes were often complex due to KYC requirements, and existing solutions were unreliable or difficult to navigate. Ultimately, users lacked a dependable platform that could handle receiving, managing, and spending money in one place.",
          },
        ],
      },
      {
        id: "discovery",
        title: "The Discovery",
        paragraphs: [
          {
            text:
              "Through product exploration, it became clear that users were not interested in fragmented features--they were trying to accomplish a single goal: receiving their money and using it without friction. This revealed that the product needed to support the full financial flow, from receiving funds to converting and withdrawing them. Trust also emerged as a critical factor, with users needing clear visibility into transaction statuses, fees, and timelines. Additionally, flexibility was essential, as users interacted with both traditional banking systems and crypto-based funding methods.",
          },
        ],
      },
      {
        id: "exploration",
        title: "The Exploration",
        paragraphs: [
          {
            text:
              "Different approaches were considered during the design phase. A single-function payment tool was explored but proved too limited, as it did not address the broader financial workflow. A crypto-only system was also evaluated but was not accessible enough for mainstream users. The final direction was to build a multi-currency financial hub that integrates virtual foreign accounts, local payout systems, and flexible funding options. This approach allowed vban to abstract complexity while still giving users control over their money.",
          },
        ],
      },
      {
        id: "craft",
        title: "The Craft",
        layout: CaseStudyTextSectionLayout.Wide,
        paragraphs: [
          {
            text:
              "vban was designed as a complete financial ecosystem centered around usability and clarity. Users can create virtual accounts in USD, GBP, and EUR, enabling them to receive international payments as if they had local bank accounts in those regions. Funding options were built to be flexible, allowing users to receive money via bank transfers, convert currencies within the app, or deposit stablecoins like USDT and USDC.",
          },
          {
            text:
              "The sending experience was structured to be simple and predictable, supporting bank transfers, mobile money payouts, and instant peer-to-peer transfers using vban tags. Virtual cards were introduced to enable global online spending directly from users' balances. Across all features, transaction flows follow a consistent pattern--input, review, and confirm--ensuring ease of use. Transparency was also a core principle, with clear fee breakdowns, exchange rates, and real-time transaction statuses integrated throughout the experience.",
          },
        ],
      },
    ],    impactTitle: "The Impact",
    impactCards: [
      {
        id: "unified-flow",
        title: "Unified the entire financial flow (receive, convert, send, spend) into one platform",
        label: "Product Outcome",
      },
      {
        id: "reduced-friction",
        title: "Reduced friction and delays in accessing international payments",
        label: "User Experience",
      },
      {
        id: "transparency",
        title: "Improved transparency with clear fees, rates, and transaction statuses",
        label: "Trust",
      },
      {
        id: "control",
        title: "Gave users full control over managing multi-currency finances",
        label: "Financial Control",
      },
    ],
    reflection: {
      id: "reflection",
      title: "Reflection",
      paragraphs: [
        {
          text:
            "The strength of vban lies in its focus on the core user journey and its ability to combine multiple financial systems into one cohesive experience. By prioritising simplicity, flexibility, and transparency, the product successfully addresses the most critical pain points of its users. However, there are clear opportunities for growth, including deeper integrations with global payment platforms, the introduction of automation features such as recurring payments, and more advanced financial tools like savings and analytics.",
        },
        {
          text:
            "Ultimately, vban shifts the user experience from struggling to receive money to confidently managing global income, laying the groundwork for a more inclusive financial ecosystem.",
        },
      ],
    },
    galleryTitle: "Visual Gallery",
    galleryItems: [
      { id: "gallery-one", label: "VBAN gallery placeholder one" },
      { id: "gallery-two", label: "VBAN gallery placeholder two" },
      { id: "gallery-three", label: "VBAN gallery placeholder three" },
      { id: "gallery-four", label: "VBAN gallery placeholder four" },
    ],
    moreProjectsTitle: "More Projects",
  },
  {
    slug: "pamoja",
    title: "Pamoja",
    category: "Redefining Payment Experience",
    coverImageDescription: "Pamoja mobile payment platform case study hero media.",
    coverImageSource: pamojaImage,
    metaItems: [
      { id: "role", icon: CaseStudyMetaIcon.Role, label: "Product designer" },
      { id: "lead-designer", icon: CaseStudyMetaIcon.Lead, label: "Lead designer: Ayodeji Osindele" },
      { id: "year", icon: CaseStudyMetaIcon.Calendar, label: "2022" },
    ],
    textSections: [
      {
        id: "context",
        title: "The Context",
        paragraphs: [
          {
            text:
              "Pamoja is a payment platform designed to bridge the gap between a user's daily life and their finances — streamlining everything from local grocery spending to international remittances. I was part of the design team working to ensure that financial access is no longer a privilege of the few but a standard for everyone.",
          },
        ],
      },
      {
        id: "challenge",
        title: "The Challenge",
        paragraphs: [
          {
            text:
              "Designing for the Nigerian banking sector means working within a landscape defined by real friction.",
          },
          {
            text:
              "Constant network issues make even simple transactions feel like a gamble. Slow chargeback processes leave users without their funds for days. The lack of international transfer options and better banking services drives users toward alternatives to traditional institutions. And without formal financial systems, millions are excluded from the economy — limiting their ability to grow businesses or manage personal wealth securely.",
          },
        ],
      },
      {
        id: "discovery",
        title: "The Discovery",
        paragraphs: [
          {
            text:
              "I was involved in qualitative user interviews with target participants aged 18 to 60 — covering Gen Z, Millennials, and Gen X. A key persona that emerged was users like Zoe Micheais, a content creator whose feedback emphasised the need for fast track recovery on failed transactions and UI flows that felt swift and intuitive.",
          },
          {
            text:
              "The pivot came when we realised the research consistently pointed toward simple spend features — accessible and affordable payment products delivered in a responsible, sustainable way.",
          },
        ],
      },
      {
        id: "exploration",
        title: "The Exploration",
        paragraphs: [
          {
            text:
              "I worked on mapping out a high-security onboarding process — including BVN verification, Secret Q&A, and ID uploads — to ensure compliance without sacrificing speed.",
          },
          {
            text:
              "For navigation, I contributed to a four-pillar system — Home, Spend, Card, and More — to separate daily utility from long-term financial management. Every screen was drafted on paper first to make sure the information density never became overwhelming for users in high-stress financial situations.",
          },
        ],
      },
      {
        id: "craft",
        title: "The Craft",
        layout: CaseStudyTextSectionLayout.Wide,
        paragraphs: [
          {
            text:
              "The entire product was designed in Figma to facilitate high-fidelity prototyping and smooth handoffs. I worked on visual trust elements — a deep, professional teal palette paired with vibrant status indicators for income and expenses to provide instant financial clarity.",
          },
          {
            text:
              "I also contributed to feature integration flows — Government Remittance, Bill Payments, and Virtual Card creation — helping position Pamoja as a complete digital wallet rather than just a transfer tool.",
          },
        ],
      },
    ],    impactTitle: "The Impact",
    impactCards: [
      { id: "financial-inclusion", title: "Targeting 20% Gap", label: "Financial Inclusion" },
      { id: "sdg-alignment", title: "Financial Access Goals", label: "SDG Alignment" },
      { id: "target-demographic", title: "Ages 18-60", label: "Target Demographic" },
      { id: "design-cycle", title: "3 Months End-to-End", label: "Design Cycle" },
    ],
    reflection: {
      id: "reflection",
      title: "Reflection",
      paragraphs: [
        {
          text:
            "Pamoja taught me that in fintech, clarity is a security feature. When a user sees their income and expenses summarised accurately in real-time, it builds the trust necessary to move away from cash-only habits.",
        },
        {
          text:
            "The biggest takeaway: research is only valuable if it translates into deterministic UI. My goal was to take the frustration of traditional banking and turn it into a swift, predictable experience.",
        },
      ],
    },
    galleryTitle: "Visual Gallery",
    galleryItems: pamojaGalleryItems,
    moreProjectsTitle: "More Projects",
  },
  {
    slug: "signature-bank",
    title: "Signature Bank",
    category: "Commercial Bank",
    liveHref: "https://www.signaturebankng.com/",
    coverImageDescription: "Dark placeholder for Signature Bank case study hero media.",
    coverImageSource: signatureBankImage,
    metaItems: [
      { id: "role", icon: CaseStudyMetaIcon.Role, label: "Product designer" },
      { id: "lead-designer", icon: CaseStudyMetaIcon.Lead, label: "Lead designer: Ayodeji Osindele" },
      { id: "design-team", icon: CaseStudyMetaIcon.Team, label: "3-man design team" },
      { id: "year", icon: CaseStudyMetaIcon.Calendar, label: "2023" },
    ],
    textSections: [
      {
        id: "context",
        title: "The Context",
        paragraphs: [
          {
            text:
              'Signature Bank is a modern financial institution built to accelerate growth through technology. I headed the end-to-end team responsible for creating their primary digital storefront. Our goal was to move beyond the "one-size-fits-all" approach of traditional Nigerian banks and build a "Signature" experience that feels as unique and secure as a person\'s fingerprint.',
          },
        ],
      },
      {
        id: "challenge",
        title: "The Challenge",
        paragraphs: [
          {
            text:
              'The Nigerian banking sector is crowded with legacy giants. To stand out, Signature Bank could not just be "another bank"; it had to be a top-tier competitor from day one.',
          },
          {
            lead: "The Identity Crisis:",
            text:
              'How do you design a site that feels premium enough for "Private & Institutional" wealth, but accessible enough for "Personal & Digital" banking?',
          },
          {
            lead: "Trust in Security:",
            text:
              'In a market sensitive to fraud, the UI had to visually communicate "Maximum Security" without feeling cold or restrictive.',
          },
          {
            lead: "The Stake:",
            text: "A poor digital entry point would undermine the bank's goal of being a trusted, world-class institution.",
          },
        ],
      },
      {
        id: "discovery",
        title: "The Discovery",
        paragraphs: [
          {
            text:
              'We researched the "Signature Experience" -- what makes a service feel bespoke? We found that users value predictive personalization over generic features.',
          },
          {
            lead: "The Pivot:",
            text:
              'We realized the website should not just be a list of products (Accounts, Cards, Loans); it had to be an "Opportunity Accelerator."',
          },
          {
            lead: "Key Insight:",
            text:
              "Users felt constrained by traditional banking limits. This led to our core direction: make every pathway feel clear, secure, and growth-oriented.",
          },
        ],
      },
      {
        id: "exploration",
        title: "The Exploration",
        paragraphs: [
          {
            text:
              'We moved through multiple iterations to find the right balance of whitespace, high-end photography, and custom iconography that reflects the "Bespoke" nature of the bank.',
          },
          {
            lead: "Modular Architecture:",
            text:
              "I led the team in designing a modular framework that allows the site to serve diverse audiences (Private Wealth clients and Business owners) without diluting the brand voice.",
          },
        ],
      },
    ],
    impactTitle: "The Impact",
    impactCards: [
      {
        id: "competitive-positioning",
        title:
          "Launched platform competing with Nigeria's top banks, providing a modern, technology-leveraged alternative",
        label: "Competitive Positioning",
      },
      {
        id: "stakeholder-engagement",
        title: "Clean, secure design became primary tool for stakeholder engagement and national development visits",
        label: "Competitive Positioning",
      },
      {
        id: "account-opening",
        title:
          "Seamless account opening flow and clear product pathways accelerating financial growth for users",
        label: "Competitive Positioning",
      },
    ],
    reflection: {
      id: "reflection",
      title: "Reflection",
      paragraphs: [
        {
          text:
            'Heading the end-to-end team for Signature Bank was a lesson in Strategic Consistency. It required ensuring that the "Bespoke" brand promise was reflected in every line of code and every pixel.',
        },
        {
          lead: "The Takeaway:",
          text:
            "In high-end banking, design is the silent partner of security. When a site looks this polished and intentional, users feel more confident that their wealth is being managed with the same level of care.",
        },
      ],
    },
    galleryTitle: "Visual Gallery",
    galleryItems: signatureBankGalleryItems,
    moreProjectsTitle: "More Projects",
  },
];
