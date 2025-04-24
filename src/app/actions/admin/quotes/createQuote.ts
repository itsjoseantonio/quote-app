'use server';

import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';

import { Session } from '@/types';
import dbConnect from '@/lib/dbConnect';
import { authOptions } from '@/lib/auth';
import { Quote } from '@/app/models/Quote';

export const createQuote = async (formData: FormData) => {
    const quote = formData.get('quote') as string;
    const author = formData.get('author') as string;
    const book = formData.get('book') as string;

    await dbConnect();

    const session: Session | null = await getServerSession(authOptions);

    try {
        if (session) {
            const newQuote = await Quote.create({
                quote,
                author,
                book,
                user: session.user.id,
            });

            const plainObj = {
                ...newQuote.toObject(),
                _id: newQuote._id.toString(),
                user: newQuote.user.toString(),
                createdAt: newQuote.createdAt.toISOString(),
                updatedAt: newQuote.updatedAt.toISOString(),
            };

            revalidatePath('/quotes');

            return {
                success: true,
                message: 'Quote saved successfully',
                data: plainObj,
            };
        }
    } catch (error) {
        console.log(error, 'Error saving quote');
    }
};
