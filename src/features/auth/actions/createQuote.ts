'use server';

import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';

import { Session, QuoteFormData } from '@/types';
import dbConnect from '@/shared/lib/dbConnect';
import { authOptions } from '@/shared/lib/auth';
import { Quote } from '@/features/admin/quotes/models/Quote';
import { User } from '@/features/admin/profile/models/User';

export const createQuote = async (quoteData: QuoteFormData) => {
    const { quote, author, book, featured } = quoteData;

    if (!quote || !author || !book) {
        return {
            success: false,
            message: 'All fields are required',
        };
    }

    await dbConnect();

    const session: Session | null = await getServerSession(authOptions);

    if (!session) {
        return {
            success: false,
            message: 'You must be logged in to create a quote',
        };
    }

    try {
        const newQuote = await Quote.create({
            quote,
            author,
            book,
            user: session.user.id,
        });

        if (!newQuote) {
            return {
                success: false,
                message: 'Error creating quote',
            };
        }

        if (featured) {
            const userUpdated = await User.findByIdAndUpdate(
                session.user.id,
                {
                    featuredQuoteId: newQuote._id,
                },
                { new: true, runValidators: true },
            );

            if (!userUpdated) {
                throw new Error('Error updating user with featured quote');
            }
        }

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
    } catch (error) {
        console.log(error, 'Error saving quote');
    }
};
