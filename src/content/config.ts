import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('SueKay Tours'),
    heroImage: z.string().optional(),
    tags: z.array(z.string()).default([]),
    category: z.enum(['safari', 'travel-tips', 'destinations', 'corporate', 'adventure', 'culture']).default('safari'),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
  }),
});

const destinations = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    heroImage: z.string(),
    gallery: z.array(z.string()).default([]),
    region: z.enum(['kenya', 'tanzania', 'uganda', 'rwanda']),
    highlights: z.array(z.string()).default([]),
    bestTimeToVisit: z.string(),
    activities: z.array(z.string()).default([]),
    accommodation: z.array(z.object({
      name: z.string(),
      type: z.enum(['luxury', 'mid-range', 'budget']),
      description: z.string(),
    })).default([]),
    featured: z.boolean().default(false),
    faq: z.array(z.object({
      question: z.string(),
      answer: z.string(),
    })).default([]),
  }),
});

const tours = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    heroImage: z.string(),
    gallery: z.array(z.string()).default([]),
    destination: z.string(),
    duration: z.string(),
    price: z.number(),
    priceUnit: z.string().default('USD'),
    groupSize: z.string(),
    difficulty: z.enum(['easy', 'moderate', 'challenging']),
    itinerary: z.array(z.object({
      day: z.number(),
      title: z.string(),
      description: z.string(),
      accommodation: z.string().optional(),
      meals: z.string().optional(),
    })),
    inclusions: z.array(z.string()).default([]),
    exclusions: z.array(z.string()).default([]),
    departureDates: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    category: z.enum(['safari', 'beach', 'corporate', 'adventure', 'gorilla-trekking', 'day-trip']).default('safari'),
    faq: z.array(z.object({
      question: z.string(),
      answer: z.string(),
    })).default([]),
    relatedTours: z.array(z.string()).default([]),
  }),
});

const testimonials = defineCollection({
  type: 'data',
  schema: z.object({
    author: z.string(),
    role: z.string().optional(),
    company: z.string().optional(),
    content: z.string(),
    rating: z.number().min(1).max(5),
    avatar: z.string().optional(),
    tourName: z.string().optional(),
    date: z.coerce.date(),
    featured: z.boolean().default(false),
  }),
});

const faqs = defineCollection({
  type: 'data',
  schema: z.object({
    question: z.string(),
    answer: z.string(),
    category: z.enum(['safaris', 'corporate', 'transport', 'general', 'bookings']),
    order: z.number().default(0),
  }),
});

const services = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    heroImage: z.string(),
    icon: z.string(),
    features: z.array(z.string()).default([]),
    process: z.array(z.object({
      step: z.number(),
      title: z.string(),
      description: z.string(),
    })).default([]),
    gallery: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    faq: z.array(z.object({
      question: z.string(),
      answer: z.string(),
    })).default([]),
  }),
});

export const collections = { blog, destinations, tours, testimonials, faqs, services };
