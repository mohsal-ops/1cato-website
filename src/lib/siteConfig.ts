// Single source of truth for every brand-specific value on the site.
// To onboard a new client, this is the main file that should need to change
// (plus swapping image assets in /public).
//
// Rebranded for 1Cato Snow Cones. ⚠️ TODO markers = values not confirmed from
// the source site; verify with the owner.

export const SITE_CONFIG = {
  // Brand
  name: "1Cato Snow Cones",
  tagline: "Refreshing, healthy, and guilt-free snow cones",
  subTagline:
    "Always gluten-free, fat-free, and made to be a treat you can enjoy without worry.",
  legalName: "1Cato Snow Cones", // TODO: confirm registered legal entity
  trademark: "1Cato Snow Cones",

  // Contact & Location
  address: "921 E 86th St, Brooklyn, NY 11236",
  street: "921 E 86th St",
  city: "Brooklyn",
  state: "NY",
  zip: "11236",
  phone: "(619) 443-2165",
  email: "1catosnowcone@gmail.com",
  cateringEmail: "1catosnowcone@gmail.com",
  timezone: "America/New_York",
  lat: 40.6398, // TODO: approximate (Canarsie, Brooklyn) — verify exact coords
  lng: -73.9009, // TODO: approximate — verify
  googleMapsUrl: "", // TODO: add the Google Maps place URL

  // Social
  instagram: "1cato",
  instagramUrl: "https://www.instagram.com/1cato",
  facebookUrl: "https://www.facebook.com/1cato",
  tiktokUrl: "", // none found in source
  beholdFeedId: "", // Instagram feed removed per request

  // SEO
  siteUrl: "https://1cato.com",
  seoTitle: "1Cato Snow Cones | Refreshing Snow Cones in NYC",
  seoDescription:
    "Order delicious, gluten-free, fat-free snow cones for schools, corporate events, and festivals in NYC. Book online or request a quote!",
  seoKeywords: [
    "snow cones NYC",
    "snow cones Brooklyn",
    "gluten-free snow cones",
    "fat-free snow cones",
    "event catering Brooklyn",
    "festival snow cones New York",
  ],
  ogImage: "/general/generalPages/mainImage.jpg",

  // Colors (Tailwind hex values)
  primaryColor: "#ea580c", // orange-600
  secondaryColor: "#0ea5e9", // TODO: no secondary in source — icy blue chosen to fit snow cones
  accentColor: "#f97316", // orange-500

  // Hours (used for open/closed status) — hour values are 24h local time.
  // ⚠️ Source only stated "Wednesday to Sunday" with NO times. Placeholders
  // below keep the site functional — confirm real hours (live hours are managed
  // from the admin Hours editor / BusinessHours table).
  hours: [
    { day: "Sunday", open: 12, close: 20 }, // TODO confirm
    { day: "Monday", open: null, close: null }, // closed
    { day: "Tuesday", open: null, close: null }, // closed
    { day: "Wednesday", open: 12, close: 20 }, // TODO confirm
    { day: "Thursday", open: 12, close: 20 }, // TODO confirm
    { day: "Friday", open: 12, close: 20 }, // TODO confirm
    { day: "Saturday", open: 12, close: 20 }, // TODO confirm
  ] as { day: string; open: number | null; close: number | null }[],

  // Home page text sections
  home: {
    heroHeadline: "Refreshing",
    heroSubHeadline: "healthy, and guilt-free snow cones",
    heroTagHeadline:
      "They're always gluten-free, fat-free, and made to be a treat you can enjoy without worry.",
    galleryTitle: "1Cato Snow Cones",
    gallerySubtitle: "Exotic Natural Flavors",
    distinctiveFeatures: [
      {
        title: "Only refreshing snow cones",
        description:
          "We invest in quality ingredients to ensure our customers get the great taste we're famous for. Because we believe that you deserve the best.",
        image: "/general/generalPages/enjoy.jpg",
      },
      {
        title: "Sip, chill, and smile",
        description:
          "Our drinks are made to refresh your day, using real fruits, balanced flavors, and the perfect chill for every moment.",
        image: "/general/generalPages/vibe.jpg",
      },
    ],
    featuring: [
      { name: "Takeaway", icon: "PiPackageFill" },
      { name: "Family friendly", icon: "MdOutlineFamilyRestroom" },
      { name: "Catering", icon: "BsBagCheckFill" },
      { name: "Gluten-Free Options", icon: "TbPlant2Off" },
    ],
    faq: [
      {
        question: "What are you known for?",
        answer:
          "We're known for our refreshing snow cones made with exotic and tropical flavors — like mango chili, passion fruit, blue raspberry, and coconut dream. Our signature blends are crafted with premium syrups, fresh ingredients, and just the right crunch of shaved ice.",
      },
      {
        question: "What do you serve?",
        answer: "Snow cones — always gluten-free and fat-free.",
      },
      {
        question: "Do you offer delivery or takeout?",
        answer: "Yes! We offer takeout, plus catering for events.",
      },
      {
        question: "Where are you located?",
        answer: "We are located in Canarsie, Brooklyn 11236.",
      },
    ],
  },

  // Navbar links
  navLinks: [
    { label: "Home", href: "/" },
    { label: "Menu", href: "/Menu" },
    { label: "Catering", href: "/catering" },
    { label: "Brand Marketing", href: "/BrandMarketing" },
    { label: "Gift Card", href: "/GiftCard" },
    // { label: "Kids Zone", href: "/KidsZone" },
    { label: "Blog", href: "/Blog" },
  ],

  // Footer
  footer: {
    get copyright() {
      return `© ${new Date().getFullYear()} 1Cato Snow Cones. All rights reserved.`;
    },
    links: [
      { label: "Menu", href: "/Menu" },
      { label: "Catering", href: "/catering" },
      { label: "Gift Cards", href: "/GiftCard" },
      { label: "Terms", href: "/terms" },
    ],
  },
};

export type SiteConfig = typeof SITE_CONFIG;
