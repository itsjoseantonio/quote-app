import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { Types } from 'mongoose';

import { authOptions } from '@/lib/auth';
import { Session } from '@/types';
import dbConnect from '@/lib/dbConnect';
import { Quote } from '@/app/models/Quote';
import { Quote as QuoteType } from '@/types';

// ====== Components ====== //
import QuotesClient from './QuotesClient';

const QuotesPage = async () => {
    const session: Session | null = await getServerSession(authOptions);

    if (!session) {
        redirect('/');
    }

    await dbConnect();

    const quotesData = await Quote.find({
        user: new Types.ObjectId(session.user.id),
    }).lean();

    const quotes = quotesData
        .map((q: any) => ({
            _id: q._id,
            quote: q.quote,
            author: q.author,
            book: q.book,
            user: q.user,
            __v: q.__v,
            createdAt: q.createdAt,
            updatedAt: q.updatedAt,
        }))
        .sort(
            (a: QuoteType, b: QuoteType) =>
                b.createdAt!.getTime() - a.createdAt!.getTime(),
        );

    return (
        <div className='space-y-4'>
            <h1 className='text-2xl font-bold mb-3'>Manage quotes</h1>
            <QuotesClient quotes={quotes} />
        </div>
    );
};

export default QuotesPage;
