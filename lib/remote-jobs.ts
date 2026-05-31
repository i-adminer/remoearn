export type RemoteJob = Readonly<{
  slug: string;
  title: string;
  company: string;
  category: string;
  employmentType: "full-time" | "contract" | "freelance" | "part-time" | "other";
  level: "entry-level" | "junior" | "mid-level" | "senior" | "lead" | "executive" | "student";
  salary: string;
  locations: string[];
  posted: string;
  featured?: boolean;
  summary: string;
  overview: string[];
  responsibilities: string[];
  requirements: string[];
  perks: string[];
}>;

export const remoteJobFilters = {
  categories: [
    "All roles",
    "Software Development",
    "Product Management",
    "Design",
    "Marketing",
    "Customer Service",
    "Sales",
    "Operations",
    "Data and Analytics",
  ],
  employmentTypes: ["All types", "full-time", "contract", "freelance", "part-time"],
  levels: ["All levels", "entry-level", "junior", "mid-level", "senior", "lead", "executive"],
} as const;

export const remoteJobStats = [
  { label: "Curated roles", value: "8" },
  { label: "Categories", value: "8" },
  { label: "Upgrade path", value: "1 click" },
] as const;

export const jobUpgradeBenefits = [
  "Unlock more verified job links",
  "Access early-role alerts",
  "Browse by category, salary, and location",
  "Keep a cleaner shortlist",
] as const;

export const remoteJobs: RemoteJob[] = [
  {
    slug: "senior-full-stack-engineer",
    title: "Senior Full-Stack Engineer",
    company: "Northstar Labs",
    category: "Software Development",
    employmentType: "contract",
    level: "senior",
    salary: "$90k - $140k / year",
    locations: ["Americas", "Europe"],
    posted: "1wk ago",
    featured: true,
    summary:
      "Build polished customer-facing products, move fast with a small team, and own features from idea to deployment.",
    overview: [
      "Northstar Labs builds product tools for distributed teams. They want a senior engineer who can move between frontend detail and backend reliability without losing pace.",
      "The role suits someone who likes modern TypeScript, clean API design, and shipping product work with a strong sense of ownership.",
    ],
    responsibilities: [
      "Ship interface and API work across the stack",
      "Improve product quality, performance, and reliability",
      "Collaborate with design and product on scoped releases",
      "Help shape technical direction for a small team",
    ],
    requirements: [
      "Strong TypeScript and React experience",
      "Comfortable working across frontend and backend tasks",
      "Clear communication in a remote team",
      "Able to work independently and deliver on deadlines",
    ],
    perks: ["Flexible schedule", "High-ownership work", "Remote-first team"],
  },
  {
    slug: "product-designer",
    title: "Product Designer",
    company: "Aurora Commerce",
    category: "Design",
    employmentType: "full-time",
    level: "mid-level",
    salary: "$75k - $110k / year",
    locations: ["Worldwide"],
    posted: "New",
    featured: true,
    summary:
      "Shape a premium digital product, simplify complex flows, and create interfaces that feel modern on every screen size.",
    overview: [
      "Aurora Commerce is looking for a product designer who can turn complex ecommerce workflows into clear and confident interactions.",
      "This is a strong fit for a designer who enjoys systems thinking, lightweight motion, and careful polish.",
    ],
    responsibilities: [
      "Design end-to-end product journeys",
      "Create wireframes, prototypes, and handoff-ready specs",
      "Work closely with engineering and growth",
      "Refine the visual language across web and mobile",
    ],
    requirements: [
      "Portfolio showing product-focused design work",
      "Comfort with Figma and responsive layouts",
      "Attention to detail and clear rationale",
      "Experience working in a distributed team",
    ],
    perks: ["Creative ownership", "Fast feedback loops", "Global team"],
  },
  {
    slug: "customer-success-specialist",
    title: "Customer Success Specialist",
    company: "Luma Support",
    category: "Customer Service",
    employmentType: "full-time",
    level: "mid-level",
    salary: "$24 - $32 / hour",
    locations: ["USA", "Canada"],
    posted: "1wk ago",
    summary:
      "Support customers with clarity, solve account issues quickly, and keep the experience calm and professional.",
    overview: [
      "Luma Support helps digital products keep a premium post-purchase experience. They value fast responses and strong written communication.",
      "This role is ideal for someone who likes helping users, organizing workflows, and keeping the support queue under control.",
    ],
    responsibilities: [
      "Respond to customer questions and issues",
      "Track common problems and surface trends",
      "Coordinate with product and payment teams",
      "Maintain a high-quality support experience",
    ],
    requirements: [
      "Strong written communication",
      "Experience in support or account management",
      "Reliable internet and a focused work setup",
      "Comfort with ticketing tools and documentation",
    ],
    perks: ["People-first team", "Clear processes", "Remote flexibility"],
  },
  {
    slug: "growth-marketer",
    title: "Growth Marketer",
    company: "Beacon Commerce",
    category: "Marketing",
    employmentType: "freelance",
    level: "mid-level",
    salary: "$65k - $95k / year",
    locations: ["Worldwide"],
    posted: "2wks ago",
    summary:
      "Own campaigns, sharpen messaging, and help a product-led business reach more customers with less friction.",
    overview: [
      "Beacon Commerce wants a marketer who can test quickly, think in funnels, and improve acquisition without unnecessary complexity.",
      "If you enjoy copy, experiments, and practical analytics, this role keeps the work focused and measurable.",
    ],
    responsibilities: [
      "Plan and launch acquisition campaigns",
      "Measure funnel performance and optimize copy",
      "Collaborate on landing pages and email flows",
      "Use data to prioritize the next experiments",
    ],
    requirements: [
      "Hands-on campaign experience",
      "Comfort with conversion metrics",
      "Strong copy and positioning skills",
      "Able to work independently and iterate fast",
    ],
    perks: ["Flexible client work", "Creative problem solving", "Remote delivery"],
  },
  {
    slug: "data-operations-analyst",
    title: "Data Operations Analyst",
    company: "Verity AI",
    category: "Data and Analytics",
    employmentType: "full-time",
    level: "entry-level",
    salary: "$18 - $22 / hour",
    locations: ["USA Only"],
    posted: "YDay",
    summary:
      "Review data quality, organize inputs carefully, and help systems stay accurate with strong attention to detail.",
    overview: [
      "Verity AI hires careful operators who can handle repetitive digital work without losing focus or accuracy.",
      "This role works well for candidates who like structured tasks, clean communication, and clear expectations.",
    ],
    responsibilities: [
      "Review and validate data entries",
      "Flag inconsistencies and quality issues",
      "Document workflows and updates clearly",
      "Support the team with operational checks",
    ],
    requirements: [
      "Strong attention to detail",
      "Comfort with spreadsheets and forms",
      "Reliable computer and internet setup",
      "Ability to follow instructions consistently",
    ],
    perks: ["Structured work", "Useful early-career role", "Remote flexibility"],
  },
  {
    slug: "sales-development-representative",
    title: "Sales Development Representative",
    company: "Orbit Growth",
    category: "Sales",
    employmentType: "full-time",
    level: "junior",
    salary: "OTE $40k - $60k / year",
    locations: ["Latin America", "Europe"],
    posted: "New",
    summary:
      "Open conversations, qualify leads, and help a growing team build a cleaner pipeline with a simple workflow.",
    overview: [
      "Orbit Growth is looking for a junior SDR who enjoys outreach, disciplined follow-up, and learning the sales process the right way.",
      "This is a good fit if you want a clear playbook and direct feedback in a remote-first environment.",
    ],
    responsibilities: [
      "Prospect and qualify inbound and outbound leads",
      "Book discovery calls for the sales team",
      "Keep CRM data organized and current",
      "Improve messaging with weekly feedback",
    ],
    requirements: [
      "Strong written and verbal communication",
      "Comfort with CRM tools",
      "Interest in learning sales fundamentals",
      "Ability to work across time zones",
    ],
    perks: ["Clear commission plan", "Fast learning curve", "Remote mentorship"],
  },
  {
    slug: "community-partnerships-manager",
    title: "Community & Partnerships Manager",
    company: "RemoteFirst Co",
    category: "Operations",
    employmentType: "contract",
    level: "lead",
    salary: "$55k - $78k / year",
    locations: ["Worldwide"],
    posted: "2wks ago",
    summary:
      "Build relationships, manage community programs, and coordinate operational work with a polished remote rhythm.",
    overview: [
      "RemoteFirst Co needs someone who can keep partnerships organized while representing the brand with confidence and clarity.",
      "The role combines relationship management, lightweight operations, and content coordination.",
    ],
    responsibilities: [
      "Coordinate partnerships and outreach",
      "Manage community programs and events",
      "Track operational tasks and follow-ups",
      "Support cross-functional initiatives",
    ],
    requirements: [
      "Leadership or partnership experience",
      "Strong organization and communication",
      "Comfort with remote coordination",
      "Ability to manage multiple priorities",
    ],
    perks: ["Strategic work", "Cross-functional exposure", "Flexible location"],
  },
  {
    slug: "remote-product-manager",
    title: "Remote Product Manager",
    company: "Vector Health",
    category: "Product Management",
    employmentType: "full-time",
    level: "lead",
    salary: "$120k - $155k / year",
    locations: ["USA", "Canada", "Europe"],
    posted: "4wks ago",
    summary:
      "Lead product decisions, sharpen priorities, and keep the roadmap focused on useful outcomes instead of noise.",
    overview: [
      "Vector Health is hiring a product manager who can bring structure to a high-impact digital product team.",
      "The right person will know how to balance user needs, business goals, and execution without overcomplicating the work.",
    ],
    responsibilities: [
      "Define roadmap priorities and release goals",
      "Work with design, engineering, and support",
      "Translate customer feedback into product decisions",
      "Track product success and business impact",
    ],
    requirements: [
      "Product management experience in a remote setting",
      "Strong planning and stakeholder communication",
      "Comfort with metrics and iterative delivery",
      "Able to lead without constant supervision",
    ],
    perks: ["Strategic ownership", "Senior-level influence", "Global team"],
  },
];

export function getRemoteJob(slug: string) {
  return remoteJobs.find((job) => job.slug === slug);
}

export function getRelatedRemoteJobs(slug: string, category: string) {
  return remoteJobs.filter((job) => job.slug !== slug && job.category === category).slice(0, 3);
}
