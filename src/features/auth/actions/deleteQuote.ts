'use server';

import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';

import dbConnect from '@/shared/lib/dbConnect';
import { Quote } from '@/features/admin/quotes/models/Quote';
import { authOptions } from '@/shared/lib/auth';
import { Session } from '@/types';
import { User } from '@/features/admin/profile/models/User';

export const deleteQuote = async (quoteId: string) => {
    const session: Session | null = await getServerSession(authOptions);

    if (!session) {
        return {
            success: false,
            message: 'You must be logged in to update a quote',
        };
    }

    await dbConnect();

    try {
        const deletedQuote = await Quote.findByIdAndDelete({
            _id: quoteId,
            user: session.user.id,
        });

        if (!deletedQuote) {
            return {
                success: false,
                message:
                    'Quote not found or you do not have permission to delete it',
            };
        }

        await User.updateOne(
            { _id: session.user.id },
            { $set: { featuredQuoteId: null } },
        );

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
