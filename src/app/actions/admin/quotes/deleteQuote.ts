'use server';

import dbConnect from '@/lib/dbConnect';
import { Quote } from '@/app/models/Quote';
import { revalidatePath } from 'next/cache';

export const deleteQuote = async (quoteId: string) => {
    await dbConnect();

    try {
        const deletedQuote = await Quote.findByIdAndDelete(quoteId);
        if (!deletedQuote) {
            return {
                success: false,
                message: 'Quote not found',
            };
        }

        revalidatePath('/quotes');

        return {
            success: true,
            message: 'Quote deleted successfully',
        };
    } catch (error) {
        console.error('Error deleting quote:', error);
        return {
            success: false,
            message: 'Error deleting quote',
        };
    }
};
