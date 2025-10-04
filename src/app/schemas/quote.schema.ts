import * as z from 'zod';

export const QuoteSchema = z.object({
    quote: z.string().min(1, 'Quote is required'),
    book: z.string().min(1, 'Book is required'),
    author: z.string().min(1, 'Author is required'),
    featured: z.boolean().optional(),
});
