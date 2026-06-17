import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async ({ site }) => {
  const posts = await getCollection('blog');

  // Filter out draft posts and sort by date
  const sortedPosts = posts
    .filter(post => !post.data.draft)
    .sort((a, b) => new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime());

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>SueKay Tours &amp; Travel Blog</title>
    <link>${site?.href || 'https://suekaytours.com'}</link>
    <atom:link href="${site?.href || 'https://suekaytours.com'}rss.xml" rel="self" type="application/rss+xml" />
    <description>Safari stories, travel tips, and East African destination guides</description>
    <language>en-us</language>
    <copyright>Copyright ${new Date().getFullYear()} SueKay Tours &amp; Travel. All rights reserved.</copyright>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <image>
      <url>${site?.href || 'https://suekaytours.com'}favicon.svg</url>
      <title>SueKay Tours &amp; Travel Blog</title>
      <link>${site?.href || 'https://suekaytours.com'}</link>
    </image>
    ${sortedPosts
      .map(post => {
        const postUrl = `${site?.href || 'https://suekaytours.com'}blog/${post.slug}`;
        const description = post.data.description || 'Read more about this safari and travel story from SueKay Tours & Travel.';

        return `    <item>
      <title>${escapeXml(post.data.title)}</title>
      <link>${postUrl}</link>
      <guid>${postUrl}</guid>
      <pubDate>${new Date(post.data.pubDate).toUTCString()}</pubDate>
      <description>${escapeXml(description)}</description>
      ${post.data.heroImage ? `<image>${escapeXml(post.data.heroImage)}</image>` : ''}
      ${post.data.category ? `<category>${escapeXml(post.data.category)}</category>` : ''}
      ${post.data.author ? `<author>${escapeXml(post.data.author)}</author>` : ''}
      <content:encoded><![CDATA[
        <p>${escapeXml(description)}</p>
        ${post.data.heroImage ? `<img src="${escapeXml(post.data.heroImage)}" alt="${escapeXml(post.data.title)}" />` : ''}
        <p><a href="${postUrl}">Read the full article on SueKay Tours &amp; Travel</a></p>
      ]]></content:encoded>
    </item>`;
      })
      .join('\n')}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
};

function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
