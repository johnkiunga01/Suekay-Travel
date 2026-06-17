/**
 * JSON-LD Schema.org generators for SueKay Tours & Travel
 * Generates structured data for SEO and rich snippets
 */

// Type definitions for schema objects
export interface SchemaBase {
  "@context": string;
  "@type": string;
}

export interface PostalAddress extends SchemaBase {
  "@type": "PostalAddress";
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  addressCountry: string;
}

export interface ContactPoint extends SchemaBase {
  "@type": "ContactPoint";
  telephone: string;
  contactType: string;
}

export interface TravelAgencySchema extends SchemaBase {
  "@type": "TravelAgency";
  name: string;
  url: string;
  logo: string;
  address: PostalAddress;
  telephone: string;
  email: string;
  areaServed: string | string[];
  priceRange: string;
  sameAs: string[];
}

export interface TouristTripSchema extends SchemaBase {
  "@type": "TouristTrip";
  name: string;
  description: string;
  duration: string;
  price: number | string;
  priceCurrency: string;
  areaServed: string | string[];
}

export interface ArticleSchema extends SchemaBase {
  "@type": "Article";
  headline: string;
  description: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  author: {
    "@type": "Organization";
    name: string;
  };
  publisher: {
    "@type": "Organization";
    name: string;
    logo: {
      "@type": "ImageObject";
      url: string;
    };
  };
}

export interface FAQItem {
  "@type": "Question";
  name: string;
  acceptedAnswer: {
    "@type": "Answer";
    text: string;
  };
}

export interface FAQPageSchema extends SchemaBase {
  "@type": "FAQPage";
  mainEntity: FAQItem[];
}

export interface ReviewSchema extends SchemaBase {
  "@type": "Review";
  name: string;
  reviewRating: {
    "@type": "Rating";
    ratingValue: number;
    bestRating: number;
    worstRating: number;
  };
  reviewBody: string;
  author: {
    "@type": "Person";
    name: string;
  };
  publisher: {
    "@type": "Organization";
    name: string;
  };
}

export interface BreadcrumbItem {
  "@type": "ListItem";
  position: number;
  name: string;
  item: string;
}

export interface BreadcrumbListSchema extends SchemaBase {
  "@type": "BreadcrumbList";
  itemListElement: BreadcrumbItem[];
}

export interface OrganizationSchema extends SchemaBase {
  "@type": "Organization";
  name: string;
  url: string;
  logo: string;
  description: string;
  sameAs: string[];
  contactPoint: {
    "@type": "ContactPoint";
    contactType: string;
    telephone: string;
    email: string;
  };
}

export interface LocalBusinessSchema extends SchemaBase {
  "@type": "LocalBusiness";
  name: string;
  image: string;
  description: string;
  address: PostalAddress;
  telephone: string;
  email: string;
  url: string;
  sameAs: string[];
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification";
    dayOfWeek: string[];
    opens: string;
    closes: string;
  }[];
}

export interface TourObject {
  title: string;
  description: string;
  duration: string;
  price: number | string;
}

export interface PostObject {
  title: string;
  description: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
}

export interface FAQObject {
  question: string;
  answer: string;
}

export interface TestimonialObject {
  name: string;
  text: string;
  rating?: number;
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

const BASE_URL = "https://suekaytours.com";
const SITE_NAME = "SueKay Tours & Travel";
const LOGO_URL = `${BASE_URL}/logo.png`;
const DEFAULT_IMAGE = `${BASE_URL}/og-image.jpg`;

/**
 * Generates TravelAgency schema for the organization
 */
export function generateTravelAgency(
  overrides?: Partial<TravelAgencySchema>
): TravelAgencySchema {
  const schema: TravelAgencySchema = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: SITE_NAME,
    url: BASE_URL,
    logo: LOGO_URL,
    address: {
      "@context": "https://schema.org",
      "@type": "PostalAddress",
      streetAddress: "123 Safari Street",
      addressLocality: "Nairobi",
      addressRegion: "Nairobi County",
      postalCode: "00100",
      addressCountry: "KE",
    },
    telephone: "+254 (0)20 1234 567",
    email: "info@suekaytours.com",
    areaServed: "East Africa",
    priceRange: "$$",
    sameAs: [
      "https://www.facebook.com/suekaytours",
      "https://www.instagram.com/suekaytours",
      "https://www.twitter.com/suekaytours",
    ],
    ...overrides,
  };
  return schema;
}

/**
 * Generates TouristTrip schema for individual tours
 */
export function generateTouristTrip(tour: TourObject): TouristTripSchema {
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: tour.title,
    description: tour.description,
    duration: tour.duration,
    price: tour.price,
    priceCurrency: "USD",
    areaServed: "East Africa",
  };
}

/**
 * Generates Article schema for blog posts
 */
export function generateArticle(post: PostObject): ArticleSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    image: post.image || DEFAULT_IMAGE,
    datePublished: post.datePublished,
    dateModified: post.dateModified || post.datePublished,
    author: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: LOGO_URL,
      },
    },
  };
}

/**
 * Generates FAQPage schema from array of FAQ items
 */
export function generateFAQPage(faqs: FAQObject[]): FAQPageSchema {
  const mainEntity: FAQItem[] = faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  }));

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity,
  };
}

/**
 * Generates Review schema from testimonial
 */
export function generateReview(testimonial: TestimonialObject): ReviewSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    name: `${testimonial.name}'s Review`,
    reviewRating: {
      "@type": "Rating",
      ratingValue: testimonial.rating || 5,
      bestRating: 5,
      worstRating: 1,
    },
    reviewBody: testimonial.text,
    author: {
      "@type": "Person",
      name: testimonial.name,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
    },
  };
}

/**
 * Generates BreadcrumbList schema from array of items
 */
export function generateBreadcrumbList(
  items: BreadcrumbItem[]
): BreadcrumbListSchema {
  const itemListElement: BreadcrumbItem[] = items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url,
  }));

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement,
  };
}

/**
 * Generates Organization schema
 */
export function generateOrganization(): OrganizationSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: BASE_URL,
    logo: LOGO_URL,
    description: "Premium tours and travel experiences across East Africa",
    sameAs: [
      "https://www.facebook.com/suekaytours",
      "https://www.instagram.com/suekaytours",
      "https://www.twitter.com/suekaytours",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      telephone: "+254 (0)20 1234 567",
      email: "info@suekaytours.com",
    },
  };
}

/**
 * Generates LocalBusiness schema for travel agency
 */
export function generateLocalBusiness(): LocalBusinessSchema {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE_NAME,
    image: LOGO_URL,
    description: "Premium tours and travel experiences across East Africa",
    address: {
      "@context": "https://schema.org",
      "@type": "PostalAddress",
      streetAddress: "123 Safari Street",
      addressLocality: "Nairobi",
      addressRegion: "Nairobi County",
      postalCode: "00100",
      addressCountry: "KE",
    },
    telephone: "+254 (0)20 1234 567",
    email: "info@suekaytours.com",
    url: BASE_URL,
    sameAs: [
      "https://www.facebook.com/suekaytours",
      "https://www.instagram.com/suekaytours",
      "https://www.twitter.com/suekaytours",
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday"],
        opens: "10:00",
        closes: "16:00",
      },
    ],
  };
}
