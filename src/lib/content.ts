import { getCollection } from 'astro:content';

export interface ContentItem {
  id: string;
  slug: string;
  data: {
    title: string;
    description?: string;
    tags?: string[];
    featured?: boolean;
    pubDate?: Date;
    image?: string;
    region?: string;
    category?: string;
    author?: string;
    content?: string;
  };
}

export interface Tour extends ContentItem {
  data: ContentItem['data'] & {
    featured: boolean;
    price: number;
    duration: string;
    destination: string;
  };
}

export interface Destination extends ContentItem {
  data: ContentItem['data'] & {
    featured: boolean;
    region: string;
    image: string;
  };
}

export interface BlogPost extends ContentItem {
  data: ContentItem['data'] & {
    pubDate: Date;
    author: string;
    content: string;
  };
}

export interface Testimonial extends ContentItem {
  data: ContentItem['data'] & {
    author: string;
    role?: string;
    featured?: boolean;
    rating?: number;
  };
}

export interface FAQ extends ContentItem {
  data: ContentItem['data'] & {
    category: string;
    answer: string;
  };
}

/**
 * Finds related content by matching tags
 */
export async function getRelatedContent(
  collection: string,
  currentSlug: string,
  tags: string[] = [],
  limit: number = 3
): Promise<ContentItem[]> {
  const items = await getCollection(collection);

  if (tags.length === 0) {
    return items
      .filter(item => item.slug !== currentSlug)
      .slice(0, limit);
  }

  const related = items
    .filter(item => item.slug !== currentSlug)
    .map(item => {
      const itemTags = (item.data.tags as string[] | undefined) || [];
      const matchingTags = itemTags.filter(tag => tags.includes(tag));
      return { item, matchCount: matchingTags.length };
    })
    .filter(({ matchCount }) => matchCount > 0)
    .sort((a, b) => b.matchCount - a.matchCount)
    .slice(0, limit)
    .map(({ item }) => item);

  return related;
}

/**
 * Gets featured tours
 */
export async function getFeaturedTours(limit: number = 6): Promise<Tour[]> {
  const tours = await getCollection('tours');
  return tours
    .filter(tour => tour.data.featured === true)
    .slice(0, limit) as Tour[];
}

/**
 * Filters destinations by region
 */
export async function getDestinationsByRegion(region: string): Promise<Destination[]> {
  const destinations = await getCollection('destinations');
  return destinations
    .filter(dest => (dest.data.region as string | undefined)?.toLowerCase() === region.toLowerCase())
    .slice(0, 100) as Destination[];
}

/**
 * Gets recent blog posts sorted by publication date
 */
export async function getRecentPosts(limit: number = 5): Promise<BlogPost[]> {
  const posts = await getCollection('blog');
  return posts
    .filter(post => post.data.pubDate instanceof Date)
    .sort((a, b) => {
      const dateA = a.data.pubDate as Date;
      const dateB = b.data.pubDate as Date;
      return dateB.getTime() - dateA.getTime();
    })
    .slice(0, limit) as BlogPost[];
}

/**
 * Gets featured destinations
 */
export async function getFeaturedDestinations(limit: number = 6): Promise<Destination[]> {
  const destinations = await getCollection('destinations');
  return destinations
    .filter(dest => dest.data.featured === true)
    .slice(0, limit) as Destination[];
}

/**
 * Gets testimonials, optionally filtered to featured only
 */
export async function getTestimonials(
  featuredOnly: boolean = false,
  limit: number = Infinity
): Promise<Testimonial[]> {
  const testimonials = await getCollection('testimonials');
  let filtered = testimonials;

  if (featuredOnly) {
    filtered = testimonials.filter(t => t.data.featured === true);
  }

  return filtered.slice(0, limit) as Testimonial[];
}

/**
 * Filters FAQs by category
 */
export async function getFAQsByCategory(category: string): Promise<FAQ[]> {
  const faqs = await getCollection('faqs');
  return faqs
    .filter(faq => (faq.data.category as string | undefined)?.toLowerCase() === category.toLowerCase())
    .slice(0, 100) as FAQ[];
}

/**
 * Formats date to "Month Day, Year" format
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;

  if (isNaN(d.getTime())) {
    return '';
  }

  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Formats price with currency symbol
 */
export function formatPrice(price: number, unit: string = 'USD'): string {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: unit,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  return formatter.format(price);
}

/**
 * Converts text to URL-safe slug
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Truncates text with ellipsis
 */
export function truncateText(text: string, maxLength: number = 160): string {
  if (text.length <= maxLength) {
    return text;
  }

  return text.slice(0, maxLength).trim() + '...';
}

/**
 * Estimates reading time from content string
 * Assumes average reading speed of 200 words per minute
 */
export function getReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  return Math.max(1, readingTime);
}
