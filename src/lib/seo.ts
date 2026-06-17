/**
 * SEO utility functions for SueKay Tours & Travel
 * Generates metadata, Open Graph, Twitter Card, and canonical URLs
 */

export interface Metadata {
  title: string;
  description: string;
  openGraph: OpenGraphMeta;
  twitter: TwitterCardMeta;
  canonical: string;
}

export interface OpenGraphMeta {
  title: string;
  description: string;
  image: string;
  url: string;
  type: string;
  siteName: string;
}

export interface TwitterCardMeta {
  card: string;
  title: string;
  description: string;
  image: string;
  creator?: string;
}

const BASE_URL = "https://suekaytours.com";
const SITE_NAME = "SueKay Tours & Travel";
const DEFAULT_IMAGE = `${BASE_URL}/og-image.jpg`;

/**
 * Generates complete metadata object for a page
 */
export function generateMetadata(
  title: string,
  description: string,
  image: string = DEFAULT_IMAGE,
  url: string = BASE_URL,
  type: string = "website"
): Metadata {
  return {
    title,
    description,
    openGraph: generateOpenGraph(title, description, image, url, type),
    twitter: generateTwitterCard(title, description, image),
    canonical: generateCanonicalURL(new URL(url).pathname),
  };
}

/**
 * Generates Open Graph metadata for social media sharing
 */
export function generateOpenGraph(
  title: string,
  description: string,
  image: string,
  url: string,
  type: string = "website"
): OpenGraphMeta {
  return {
    title,
    description,
    image,
    url,
    type,
    siteName: SITE_NAME,
  };
}

/**
 * Generates Twitter Card metadata for tweets
 */
export function generateTwitterCard(
  title: string,
  description: string,
  image: string,
  creator: string = "@SueKayTours"
): TwitterCardMeta {
  return {
    card: "summary_large_image",
    title,
    description,
    image,
    creator,
  };
}

/**
 * Generates canonical URL for a given path
 */
export function generateCanonicalURL(path: string): string {
  // Normalize path to remove trailing slashes (except for root)
  const normalizedPath = path === "/" ? "/" : path.replace(/\/$/, "");
  return `${BASE_URL}${normalizedPath}`;
}

/**
 * Returns the base URL for the site
 */
export function getBaseURL(): string {
  return BASE_URL;
}

/**
 * Returns the site name
 */
export function getSiteName(): string {
  return SITE_NAME;
}

/**
 * Returns the default OG image URL
 */
export function getDefaultImage(): string {
  return DEFAULT_IMAGE;
}
