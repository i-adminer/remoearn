export type NavigationItem = {
  label: string;
  href: string;
};

export type HeroAction = {
  label: string;
  href: string;
  variant?: "default" | "outline" | "secondary" | "ghost";
};

export type HeroStat = {
  label: string;
  value: string;
};

export type Product = {
  slug: string;
  title: string;
  category: string;
  price: string;
  priceCents: number;
  description: string;
  image: string;
  images?: string[];
  highlights: string[];
};

export type ProxyPlan = {
  badge: string;
  name: string;
  price: string;
  description: string;
  locations: string[];
  features: string[];
};

type PageSection =
  | {
      type: "bullets";
      title: string;
      description?: string;
      items: string[];
      columns?: 2 | 3;
    }
  | {
      type: "cards";
      title: string;
      description?: string;
      items: {
        title: string;
        description: string;
        href?: string;
        badge?: string;
      }[];
    }
  | {
      type: "faq";
      title: string;
      description?: string;
      items: {
        question: string;
        answer: string;
      }[];
    }
  | {
      type: "cta";
      title: string;
      description: string;
      primaryLabel: string;
      primaryHref: string;
      secondaryLabel?: string;
      secondaryHref?: string;
    }
  | {
      type: "notice";
      title?: string;
      description: string;
    };

export type MarketingPage = {
  seo: {
    title: string;
    description: string;
  };
  hero: {
    eyebrow?: string;
    title: string;
    description: string;
    actions: HeroAction[];
    stats?: HeroStat[];
    panel?: {
      title: string;
      description?: string;
      items: string[];
      note?: string;
    };
  };
  sections: PageSection[];
};

export const navigation: NavigationItem[] = [
  { label: "Home", href: "/" },
  { label: "Proxy Services", href: "/#proxy-services" },
  { label: "Contact Us", href: "/contact" },
];

export const footerLinks: NavigationItem[] = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Proxy Services", href: "/#proxy-services" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact Us", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
];

export const heroStats: HeroStat[] = [
  { value: "100%", label: "digital delivery" },
  { value: "24h", label: "support response" },
  { value: "Global", label: "access anywhere" },
];

export const features = [
  {
    title: "Remote Work Guides",
    description:
      "Step-by-step PDF resources teaching practical online earning methods, freelancing, remote jobs, and digital business opportunities.",
  },
  {
    title: "Verified Remote Job Sites",
    description:
      "Discover trusted platforms where people worldwide find remote work, freelance gigs, and online opportunities.",
  },
  {
    title: "Instant Downloads",
    description:
      "Receive your purchased digital products instantly after secure payment confirmation.",
  },
  {
    title: "Secure Payments",
    description:
      "Pay safely using Stripe, M-Pesa, bank transfer, or supported online payment methods.",
  },
  {
    title: "Worldwide Access",
    description:
      "RemoEarn is available globally for students, freelancers, entrepreneurs, and remote workers.",
  },
  {
    title: "Proxy Solutions",
    description:
      "Reliable proxy offerings for online work, research, and digital operations with a clean buying flow.",
  },
];

export const whyChoose = [
  "Easy-to-follow digital guides",
  "Global remote work opportunities",
  "Beginner-friendly resources",
  "Secure and fast downloads",
  "Constantly updated online job resources",
  "Reliable customer support",
];

export const featuredProducts: Product[] = [
  {
    slug: "remote-income-starter-guide",
    title: "Remote Income Starter Guide",
    category: "PDF Guide",
    price: "KSh 999",
    priceCents: 99900,
    description:
      "A beginner-friendly playbook for building income online with remote jobs, freelancing, and digital services. Learn the fundamentals of earning money remotely with proven strategies.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
    ],
    highlights: [
      "Simple launch framework",
      "Freelance platform list",
      "Remote income workflows",
    ],
  },
  {
    slug: "verified-job-links-pack",
    title: "Verified Job Links Pack",
    category: "Resource List",
    price: "KSh 799",
    priceCents: 79900,
    description:
      "Curated remote job websites and online work platforms for freelancers, students, and virtual assistants. Access verified links to start earning today.",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80",
    ],
    highlights: ["Trusted websites", "Fast access", "Worldwide use"],
  },
  {
    slug: "proxy-setup-toolkit",
    title: "Proxy Setup Toolkit",
    category: "Digital Tool",
    price: "KSh 1,499",
    priceCents: 149900,
    description:
      "A simple proxy setup toolkit for secure browsing, research, and digital operations. Get step-by-step instructions for configuring proxies.",
    image:
      "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
    ],
    highlights: ["Secure access", "Setup steps", "Usage guide"],
  },
  {
    slug: "freelancing-growth-blueprint",
    title: "Freelancing Growth Blueprint",
    category: "PDF Guide",
    price: "KSh 1,299",
    priceCents: 129900,
    description:
      "Practical guidance on building a freelance profile, finding clients, and delivering work remotely. Scale your freelance business effectively.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=800&q=80",
    ],
    highlights: ["Client acquisition", "Pricing strategy", "Delivery systems"],
  },
];

export const proxyPlans: ProxyPlan[] = [
  {
    badge: "Starter Proxy",
    name: "Monthly 1 GB",
    price: "KSh 650 / month",
    description: "A lean residential bundle for browsing, account checks, and light research runs.",
    locations: ["🇺🇸 US East", "🇬🇧 London", "🇩🇪 Frankfurt"],
    features: ["User/password login", "Unlimited threads", "Sticky or rotating sessions", "Sub-100 Mbps routing"],
  },
  {
    badge: "Residential Proxy",
    name: "Monthly 5 GB+",
    price: "KSh 2,950 / month",
    description: "Built for freelancers and small teams that need more headroom without losing speed.",
    locations: ["🇺🇸 US East", "🇫🇷 Paris", "🇦🇺 Sydney", "🇬🇧 London"],
    features: ["Higher monthly allowance", "Fast session rotation", "Team-friendly access", "Priority support"],
  },
  {
    badge: "Business Proxy",
    name: "Custom 50 GB+",
    price: "Contact sales",
    description: "For larger monthly usage, bespoke routing, and tailored residential infrastructure.",
    locations: ["🇺🇸 US East", "🇫🇷 Paris", "🇦🇺 Sydney", "🇬🇧 London", "🇩🇪 Frankfurt"],
    features: ["Custom bandwidth bundles", "Dedicated onboarding", "Enterprise-ready controls"],
  },
];

export const remoteJobCategories = [
  "Virtual Assistant Jobs",
  "Customer Support Jobs",
  "Freelance Writing",
  "Graphic Design",
  "Social Media Management",
  "Web Development",
  "Data Entry",
  "Online Tutoring",
  "Digital Marketing",
  "Remote Tech Jobs",
];

export const blogTopics = [
  "Remote Work Tips",
  "Freelancing",
  "Online Business",
  "Productivity",
  "Digital Marketing",
  "Work From Home Guides",
  "Online Tools & Resources",
];

export const faqItems = [
  {
    question: "How do I receive my product?",
    answer:
      "After payment confirmation, your digital product will be available for instant download and sent to your email.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We support M-Pesa, card payments, bank transfers, and selected online payment options.",
  },
  {
    question: "Is checkout secure?",
    answer: "Yes. Checkout uses encrypted payment flows and protected delivery for every order.",
  },
  {
    question: "Are the guides beginner-friendly?",
    answer:
      "Yes. The guides are written for beginners and people who want a clear starting point.",
  },
  {
    question: "Can I access products on mobile?",
    answer:
      "Yes. PDFs and digital resources work on smartphones, tablets, laptops, and desktop devices.",
  },
  {
    question: "How often are remote job resources updated?",
    answer:
      "We review and refresh remote job resources regularly so the listings stay useful and current.",
  },
  {
    question: "What do the proxy plans include?",
    answer:
      "The proxy plans include monthly bandwidth bundles, flexible access, and support for research and browsing.",
  },
  {
    question: "How do I get help after purchase?",
    answer:
      "If you need help, use the contact page and our team will assist with orders, downloads, or product questions.",
  },
];

export const testimonials = [
  {
    name: "Amina K.",
    role: "Freelancer",
    quote:
      "The layout feels premium and simple. I found the guides and job resources fast without digging through clutter.",
  },
  {
    name: "Daniel M.",
    role: "Student",
    quote:
      "The site makes it easy to understand what to buy and where to start. The mobile experience is clean.",
  },
  {
    name: "Grace N.",
    role: "Digital Marketer",
    quote:
      "The proxy and remote work flow is organized like a real store. It feels trustworthy and focused.",
  },
];

export const marketingPages: Record<string, MarketingPage> = {
  about: {
    seo: {
      title: "About RemoEarn | Global Remote Work & Online Income Platform",
      description:
        "Learn about RemoEarn, a global platform helping users access remote jobs, online income guides, proxy services, and digital resources designed for freelancers, students, and remote workers worldwide.",
    },
    hero: {
      eyebrow: "About RemoEarn",
      title: "Build remote income with practical digital resources.",
      description:
        "RemoEarn is a digital platform dedicated to helping people worldwide earn money online remotely. We provide downloadable PDF guides, remote work resources, verified online job websites, proxy services, and practical online earning strategies.",
      actions: [
        { label: "Browse Products", href: "/products" },
        { label: "Explore Jobs", href: "/remote-jobs", variant: "outline" },
      ],
      stats: heroStats,
      panel: {
        title: "Who we serve",
        description: "Practical digital help for modern workers.",
        items: [
          "Students starting online",
          "Freelancers growing income",
          "Entrepreneurs building digital offers",
          "Remote workers needing reliable tools",
        ],
        note: "Simple guidance. Global access. Clean delivery.",
      },
    },
    sections: [
      {
        type: "bullets",
        title: "Our mission",
        description: "We make remote work easier to understand and easier to start.",
        items: [
          "Simplify remote income for beginners",
          "Share actionable online work resources",
          "Deliver products instantly and securely",
          "Support users across mobile and desktop",
        ],
        columns: 2,
      },
      {
        type: "cta",
        title: "Ready to start?",
        description: "Access digital guides and remote opportunities today.",
        primaryLabel: "Start Learning",
        primaryHref: "/products",
        secondaryLabel: "Contact Support",
        secondaryHref: "/contact",
      },
    ],
  },
  shop: {
    seo: {
      title: "Buy Remote Work PDFs & Online Income Guides | RemoEarn",
      description:
        "Browse premium PDF guides on remote work, freelancing, online jobs, digital income strategies, proxy setup tutorials, and work-from-home opportunities available for instant download worldwide.",
    },
    hero: {
      eyebrow: "Shop Digital Products",
      title: "Browse premium resources built for online income.",
      description:
        "Explore our collection of digital products designed to help you succeed online. Get access to remote job guides, freelance strategies, online earning methods, proxy solutions, and downloadable resources delivered instantly after payment.",
      actions: [
        { label: "View Product Catalog", href: "/products" },
        { label: "Proxy Solutions", href: "/proxy-services", variant: "outline" },
      ],
      stats: [
        { value: "Instant", label: "download access" },
        { value: "Stripe", label: "payment ready" },
        { value: "M-Pesa", label: "payment ready" },
      ],
      panel: {
        title: "What you’ll find",
        items: [
          "Remote work starter guides",
          "Freelancing tutorials",
          "Online income strategies",
          "Proxy setup and internet tools",
        ],
        note: "Built like a clean digital storefront.",
      },
    },
    sections: [
      {
        type: "cards",
        title: "Product categories",
        items: [
          { title: "Remote Work Guides", description: "Actionable PDFs for online income." },
          { title: "Freelancing Tutorials", description: "Learn how to get clients and deliver well." },
          { title: "Proxy Tools", description: "Reliable proxy solutions and setup guidance." },
          { title: "Digital Business Tools", description: "Resources for modern online operators." },
        ],
      },
      {
        type: "notice",
        title: "Instant delivery",
        description:
          "All digital products are delivered instantly after payment confirmation through download links or email delivery.",
      },
    ],
  },
  "remote-jobs": {
    seo: {
      title: "Remote Jobs & Online Work Opportunities | RemoEarn",
      description:
        "Find remote job websites, work-from-home opportunities, freelance platforms, online side hustles, and digital income resources curated for global remote workers.",
    },
    hero: {
      eyebrow: "Remote Jobs Worldwide",
      title: "Find flexible work opportunities across the web.",
      description:
        "Discover trusted platforms and opportunities for remote work across multiple industries. Learn where to find online jobs, freelance gigs, virtual assistant work, customer support roles, and digital business opportunities.",
      actions: [
        { label: "Explore Job Resources", href: "/products" },
        { label: "Read the Blog", href: "/blog", variant: "outline" },
      ],
      panel: {
        title: "Popular categories",
        items: remoteJobCategories.slice(0, 5),
        note: "Curated for beginners and experienced workers.",
      },
    },
    sections: [
      {
        type: "cards",
        title: "Popular categories",
        items: remoteJobCategories.map((item) => ({
          title: item,
          description: "A growing area of online work and client demand.",
        })),
      },
      {
        type: "bullets",
        title: "Why remote work?",
        items: [
          "Flexible schedules",
          "Global opportunities",
          "Earn from anywhere with internet access",
          "Beginner-friendly entry points",
        ],
      },
    ],
  },
  "proxy-services": {
    seo: {
      title: "Premium Proxy Solutions for Remote Work | RemoEarn",
      description:
        "Get reliable proxy solutions for remote work, online research, secure browsing, account management, and digital business operations with worldwide access and secure delivery.",
    },
    hero: {
      eyebrow: "Proxy Services",
      title: "Reliable proxy solutions with a clean buying flow.",
      description:
        "RemoEarn offers digital proxy solutions designed for professionals, freelancers, marketers, and remote workers who require secure and reliable internet access for online tasks and business operations.",
      actions: [
        { label: "View Proxy Plans", href: "/products" },
        { label: "Contact Sales", href: "/contact", variant: "outline" },
      ],
      panel: {
        title: "Benefits",
        items: [
          "Enhanced online privacy",
          "Stable internet access",
          "Secure browsing",
          "Worldwide accessibility",
        ],
        note: "Responsible use only, according to applicable laws.",
      },
    },
    sections: [
      {
        type: "cards",
        title: "Proxy plans",
        description: "A simple product ladder similar to modern proxy storefronts.",
        items: proxyPlans.map((plan) => ({
          title: `${plan.name} - ${plan.price}`,
          description: plan.description,
          badge: plan.features[0],
        })),
      },
      {
        type: "notice",
        title: "Important notice",
        description:
          "Users are responsible for using digital tools and services responsibly and in accordance with applicable laws and platform policies.",
      },
    ],
  },
  blog: {
    seo: {
      title: "Remote Work & Online Income Blog | RemoEarn",
      description:
        "Read expert articles about remote jobs, freelancing, online business ideas, digital income strategies, work-from-home tips, and internet tools for global users.",
    },
    hero: {
      eyebrow: "RemoEarn Blog",
      title: "Stay updated with practical remote work insights.",
      description:
        "Stay updated with remote work trends, online income ideas, freelancing strategies, digital tools, and productivity tips.",
      actions: [
        { label: "Browse Categories", href: "/products" },
        { label: "Contact RemoEarn", href: "/contact", variant: "outline" },
      ],
      panel: {
        title: "Blog categories",
        items: blogTopics,
      },
    },
    sections: [
      {
        type: "cards",
        title: "Featured categories",
        items: blogTopics.map((topic) => ({
          title: topic,
          description: "Fresh articles and practical guides.",
        })),
      },
      {
        type: "cta",
        title: "Need a guide first?",
        description: "Start with a product that matches your remote work goal.",
        primaryLabel: "Shop Products",
        primaryHref: "/products",
      },
    ],
  },
  faq: {
    seo: {
      title: "Frequently Asked Questions | RemoEarn Support",
      description:
        "Find answers about payments, PDF downloads, email delivery, proxy services, remote job resources, refunds, and digital products on RemoEarn.",
    },
    hero: {
      eyebrow: "Support Center",
      title: "Frequently asked questions.",
      description:
        "Find answers about payments, PDF downloads, email delivery, proxy services, remote job resources, refunds, and digital products on RemoEarn.",
      actions: [
        { label: "Contact Support", href: "/contact" },
        { label: "Shop Products", href: "/products", variant: "outline" },
      ],
      panel: {
        title: "Quick help",
        items: ["Payments", "Downloads", "Email delivery", "Product questions"],
      },
    },
    sections: [
      {
        type: "faq",
        title: "Common questions",
        items: faqItems,
      },
    ],
  },
  contact: {
    seo: {
      title: "Contact RemoEarn | Customer Support & Assistance",
      description:
        "Contact RemoEarn for support, digital product assistance, payment help, remote work inquiries, and customer service available for users worldwide.",
    },
    hero: {
      eyebrow: "Contact RemoEarn",
      title: "Support that feels simple and direct.",
      description:
        "Need help with your order, downloads, or digital products? Our support team is ready to assist you.",
      actions: [
        { label: "Email Support", href: "mailto:support@remoearn.com" },
        { label: "View FAQ", href: "/faq", variant: "outline" },
      ],
    },
    sections: [],
  },
  download: {
    seo: {
      title: "Download Your Digital Products | RemoEarn",
      description:
        "Securely download your purchased PDF guides, remote work resources, online income tutorials, and digital products instantly after payment confirmation.",
    },
    hero: {
      eyebrow: "Download Ready",
      title: "Your download is ready.",
      description:
        "Thank you for your purchase. Your digital product is now available for secure download.",
      actions: [
        { label: "Go to Downloads", href: "/products" },
        { label: "Need Help?", href: "/contact", variant: "outline" },
      ],
      panel: {
        title: "What happens next?",
        items: ["Click download", "Save securely", "Check your email", "Start learning"],
      },
    },
    sections: [
      {
        type: "notice",
        title: "Support",
        description: "If you experience download issues, contact our support team for assistance.",
      },
    ],
  },
  "email-delivery": {
    seo: {
      title: "Receive Digital Products by Email | RemoEarn",
      description:
        "Get your purchased remote work guides, online earning PDFs, and digital resources delivered directly to your email securely and instantly.",
    },
    hero: {
      eyebrow: "Email Delivery",
      title: "Product sent successfully.",
      description:
        "Your purchased digital product has been sent to your email address.",
      actions: [
        { label: "Check Email", href: "/contact" },
        { label: "Browse Products", href: "/products", variant: "outline" },
      ],
      panel: {
        title: "Please check",
        items: ["Inbox", "Spam/Junk", "Promotions folder"],
        note: "If it Onuong'as not arrive within a few minutes, contact support.",
      },
    },
    sections: [
      {
        type: "notice",
        title: "Need another copy?",
        description: "Contact support and we will help resend the delivery link.",
      },
    ],
  },
  "privacy-policy": {
    seo: {
      title: "Privacy Policy | RemoEarn",
      description:
        "Effective February 2026. Learn how RemoEarn protects user information, payment data, downloads, and customer privacy for digital products and remote work services.",
    },
    hero: {
      eyebrow: "Privacy Policy",
      title: "Privacy built for February 2026.",
      description:
        "Effective February 2026. Learn how RemoEarn handles user information, payment data, downloads, and support requests.",
      actions: [
        { label: "Contact Support", href: "/contact" },
        { label: "Terms", href: "/terms-and-conditions", variant: "outline" },
      ],
      panel: {
        title: "Effective date",
        items: ["February 2026", "Encrypted checkout", "Limited retention", "Support requests"],
        note: "Short, practical privacy terms for a digital storefront.",
      },
    },
    sections: [
      {
        type: "bullets",
        title: "Information we collect",
        items: [
          "We collect contact details you submit through forms or checkout, along with order and payment references needed to complete delivery.",
          "We also keep support messages and inquiry history so we can respond to requests and resolve problems.",
          "Basic device and browser data may be collected for performance, security, and fraud prevention.",
        ],
      },
      {
        type: "bullets",
        title: "How we use data",
        items: [
          "We use information to process purchases and deliver downloads after payment is confirmed.",
          "We use support details to respond to account requests and customer service questions.",
          "We may use technical data to improve site performance, reliability, and security.",
          "We may review activity to prevent fraud, abuse, and unauthorized access.",
        ],
      },
      {
        type: "bullets",
        title: "Sharing and retention",
        items: [
          "We share data only with trusted processors needed to run the service.",
          "We do not sell personal information.",
          "Records are kept only as long as needed for orders, support, and compliance.",
          "Data may be removed or anonymized when it is no longer required.",
        ],
      },
      {
        type: "notice",
        title: "Your choices",
        description:
          "If you need access, correction, or removal of your details, contact support@remoearn.com and include the email used for your order.",
      },
    ],
  },
  "terms-and-conditions": {
    seo: {
      title: "Terms and Conditions | RemoEarn Digital Services",
      description:
        "Effective February 2026. Read the terms and conditions for using RemoEarn services, purchasing digital products, accessing remote work resources, and using proxy solutions.",
    },
    hero: {
      eyebrow: "Terms & Conditions",
      title: "Clear terms for a simple digital store.",
      description:
        "Effective February 2026. Read the terms and conditions for using RemoEarn services, purchasing digital products, accessing remote work resources, and using proxy solutions.",
      actions: [
        { label: "Privacy Policy", href: "/privacy-policy" },
        { label: "Contact", href: "/contact", variant: "outline" },
      ],
      panel: {
        title: "Key points",
        items: ["Digital goods are non-physical", "Use services responsibly", "Support is available", "Payments are handled securely"],
        note: "Updated for February 2026.",
      },
    },
    sections: [
      {
        type: "bullets",
        title: "Purchases and delivery",
        items: [
          "Digital purchases are delivered electronically after confirmed payment.",
          "Product availability and pricing may change over time.",
          "Download links may expire or be refreshed for security.",
          "All purchases are intended for the buyer’s personal or business use unless stated otherwise.",
        ],
      },
      {
        type: "bullets",
        title: "Acceptable use",
        items: [
          "You must use the platform and products lawfully.",
          "You must not resell or redistribute files without permission.",
          "You must not attempt to disrupt or abuse the service.",
          "Proxy services must follow local laws and provider rules.",
        ],
      },
      {
        type: "bullets",
        title: "Payments and support",
        items: [
          "Payments are processed by third-party providers and their own terms may apply.",
          "Processing or network fees may apply depending on the payment method.",
          "Refunds follow the product-specific policy where applicable.",
          "Support can assist with orders, downloads, and access issues.",
        ],
      },
      {
        type: "notice",
        title: "Updates",
        description:
          "We may revise these terms as the service grows. The most recent version is the one posted on this page.",
      },
    ],
  },
};

export function getMarketingPage(slug: string) {
  return marketingPages[slug];
}
