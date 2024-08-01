import { defineCollection, z } from 'astro:content';


export const collections = {
    work: defineCollection({
        type: 'content',
        schema: z.object({
            title: z.string(),
            description: z.string(),
            publishDate: z.coerce.date(),
            tags: z.array(z.string()),
            img: z.string(),
            img_alt: z.string().optional(),
        }),
    }),
    blog: defineCollection({
        type: 'content',
        schema: z.object({
            title: z.string(),
            description: z.string(),
            publishDate: z.coerce.date(),
            tags: z.array(z.string()),
            img: z.string(),
            img_alt: z.string().optional(),
        }),
    }),
    albums: defineCollection({
        type: 'data',
        schema: ({ image }) => z.object({
            title: z.string(),
            description: z.string(),
            publishDate: z.coerce.date(),
            alt: z.string().optional(),
            img: image(),
        }),
    }),
};
