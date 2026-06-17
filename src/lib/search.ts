import Fuse from 'fuse.js';
import { getCollection } from 'astro:content';

export type SearchCategory = 'tour' | 'destination' | 'blog';

export interface SearchItem {
  id: string;
  title: string;
  description: string;
  category: SearchCategory;
  url: string;
  image?: string;
  tags: string[];
}

/**
 * Builds a Fuse.js search index from search items
 */
export function buildSearchIndex(items: SearchItem[]): Fuse<SearchItem> {
  return new Fuse(items, {
    keys: [
      {
        name: 'title',
        weight: 2,
      },
      {
        name: 'description',
        weight: 1,
      },
      {
        name: 'tags',
        weight: 1.5,
      },
    ],
    threshold: 0.4,
    minMatchCharLength: 2,
  });
}

/**
 * Performs a search using Fuse.js and returns results
 */
export function searchContent(
  fuse: Fuse<SearchItem>,
  query: string,
  limit: number = 10
): SearchItem[] {
  if (!query || query.trim().length === 0) {
    return [];
  }

  const results = fuse.search(query, { limit });
  return results.map(result => result.item);
}

/**
 * Generates search data by collecting and mapping content from all collections
 */
export async function generateSearchData(): Promise<SearchItem[]> {
  const searchItems: SearchItem[] = [];

  try {
    // Collect tours
    const tours = await getCollection('tours');
    tours.forEach(tour => {
      searchItems.push({
        id: `tour-${tour.slug}`,
        title: String(tour.data.title || ''),
        description: String(tour.data.description || ''),
        category: 'tour',
        url: `/tours/${tour.slug}`,
        image: tour.data.image ? String(tour.data.image) : undefined,
        tags: Array.isArray(tour.data.tags) ? (tour.data.tags as string[]) : [],
      });
    });
  } catch (error) {
    console.warn('Error collecting tours:', error);
  }

  try {
    // Collect destinations
    const destinations = await getCollection('destinations');
    destinations.forEach(destination => {
      searchItems.push({
        id: `destination-${destination.slug}`,
        title: String(destination.data.title || ''),
        description: String(destination.data.description || ''),
        category: 'destination',
        url: `/destinations/${destination.slug}`,
        image: destination.data.image ? String(destination.data.image) : undefined,
        tags: Array.isArray(destination.data.tags) ? (destination.data.tags as string[]) : [],
      });
    });
  } catch (error) {
    console.warn('Error collecting destinations:', error);
  }

  try {
    // Collect blog posts
    const blogPosts = await getCollection('blog');
    blogPosts.forEach(post => {
      searchItems.push({
        id: `blog-${post.slug}`,
        title: String(post.data.title || ''),
        description: String(post.data.description || ''),
        category: 'blog',
        url: `/blog/${post.slug}`,
        image: post.data.image ? String(post.data.image) : undefined,
        tags: Array.isArray(post.data.tags) ? (post.data.tags as string[]) : [],
      });
    });
  } catch (error) {
    console.warn('Error collecting blog posts:', error);
  }

  return searchItems;
}
