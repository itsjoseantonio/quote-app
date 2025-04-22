import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { Types } from 'mongoose';

import { authOptions } from '@/lib/auth';
import { Session } from '@/types';
import dbConnect from '@/lib/dbConnect';
import { Quote } from '@/app/models/Quote';

// ====== Components ====== //
import QuotesForm from '@/components/forms/QuotesForm';
import QuoteList from '@/components/forms/QuoteList';

const QuotesPage = async () => {
    const session: Session | null = await getServerSession(authOptions);

    if (!session) {
        redirect('/');
    }

    await dbConnect();
    const quotes = await Quote.find({
        user: new Types.ObjectId(session.user.id),
    }).lean();

    return (
        <div className='space-y-4'>
            <h1 className='text-2xl font-bold mb-3'>Manage quotes</h1>
            <QuotesForm />
            <QuoteList quotes={quotes} />
        </div>
    );
};

export default QuotesPage;
