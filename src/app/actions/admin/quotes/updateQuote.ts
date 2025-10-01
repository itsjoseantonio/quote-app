'use server';

import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';

import { Session, QuoteFormData } from '@/types';
import dbConnect from '@/lib/dbConnect';
import { authOptions } from '@/lib/auth';
import { Quote } from '@/app/models/Quote';

export const updateQuote = async (id: string, quoteData: QuoteFormData) => {
    const { quote, author, book } = quoteData;

    if (!quote || !author || !book) {
        return {
            success: false,
            message: 'All fields are required',
        };
    }

    await dbConnect();

    const session: Session | null = await getServerSession(authOptions);

    try {
        if (!session) {
            return {
                success: false,
                message: 'You must be logged in to update a quote',
            };
        }

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
