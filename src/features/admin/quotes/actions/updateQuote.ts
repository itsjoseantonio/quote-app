'use server';

import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';

import { Session, QuoteFormData } from '@/types';
import dbConnect from '@/shared/lib/dbConnect';
import { authOptions } from '@/shared/lib/auth';
import { Quote } from '@/features/admin/quotes/models/Quote';
import { User } from '@/features/admin/profile/models/User';

export const updateQuote = async (id: string, quoteData: QuoteFormData) => {
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
            message: 'You must be logged in to update a quote',
        };
    }

    try {
        const updatedQuote = await Quote.findOneAndUpdate(
            { _id: id, user: session.user.id },
            { quote, author, book },
            { new: true, runValidators: true },
        );

        if (!updatedQuote) {
            return {
                success: false,
                message:
                    'Quote not found or you do not have permission to update it',
            };
        }

        if (featured) {
            const userUpdated = await User.findByIdAndUpdate(
                session.user.id,
                {
                    featuredQuoteId: updatedQuote._id,
                },
                { new: true, runValidators: true },
            );

            if (!userUpdated) {
                throw new Error('Error updating user with featured quote');
            }
        }

        revalidatePath('/quotes');

        return {
            success: true,
            message: 'Quote updated successfully',
            data: updatedQuote,
        };
    } catch (error) {
        console.log(error, 'Error updating quote');
    }
};
