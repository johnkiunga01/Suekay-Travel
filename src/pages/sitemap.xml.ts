import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

const SITE_URL = 'https://suekaytours.com';

export const GET: APIRoute = async ({ site }) => {
  const [blog, destinations, tours, services] = await Promise.all([
    getCollection('blog'),
    getCollection('destinations'),
    getCollection('tours'),
    getCollection('services'),
  ]);

  const staticPages = [
    '',
    'about',
    'contact',
    'gallery',
    'testimonials',
    'faq',
    'blog',
    'destinations',
    'tours',
    'privacy',
    'terms',
  ];

  const allUrls = [
    ...staticPages.map(page => ({
      loc: `${SITE_URL}/${page}`,
      lastmod: new Date().toISOString().split('T')[0],
      priority: page === '' ? '1.0' : '0.8',
      changefreq: page === '' ? 'daily' : 'weekly',
    })),
    ...blog.map(post => ({
      loc: `${SITE_URL}/blog/${post.slug}`,
      lastmod: (post.data.updatedDate || post.data.pubDate)
        ? new Date(post.data.updatedDate || post.data.pubDate).toISOString().split('T')[0]
        : new Date().toISOString().split('T')[0],
      priority: '0.6',
      changefreq: 'monthly',
    })),
    ...destinations.map(dest => ({
      loc: `${SITE_URL}/destinations/${dest.slug}`,
      lastmod: new Date().toISOString().split('T')[0],
      priority: '0.7',
      changefreq: 'monthly',
    })),
    ...tours.map(tour => ({
      loc: `${SITE_URL}/tours/${tour.slug}`,
      lastmod: new Date().toISOString().split('T')[0],
      priority: '0.7',
      changefreq: 'weekly',
    })),
    ...services.map(service => ({
      loc: `${SITE_URL}/services/${service.slug}`,
      lastmod: new Date().toISOString().split('T')[0],
      priority: '0.6',
      changefreq: 'monthly',
    })),
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'max-age=3600',
    },
  });
};
