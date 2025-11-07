import dbConnect from '@/shared/lib/dbConnect';
import { Types } from 'mongoose';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { LuCalendarDays } from 'react-icons/lu';
import { Quote as QuoteType } from '@/types';

// ====== Models ====== //
import { User } from '@/app/models/User';
import { Quote } from '@/app/models/Quote';

// ====== Components ====== //
import QuoteCard from '@/shared/components/QuoteCard';

// ====== Assets ====== //
import Logo from '@/shared/assets/icons/logo-mini.png';
import { TiPin } from 'react-icons/ti';

const ProfilePage = async ({ params }: { params: { username: string } }) => {
    await dbConnect();
    const { username } = params;
    const userDoc = await User.findOne({ username });

    if (!userDoc) {
        return notFound();
    }

    const user = {
        ...userDoc.toObject(),
        _id: userDoc._id.toString(),
    };

    const quotesData = await Quote.find({
        user: user._id,
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
            featured: q._id.toString() === user?.featuredQuoteId?.toString(),
        }))
        .sort(
            (a: QuoteType, b: QuoteType) =>
                b.createdAt!.getTime() - a.createdAt!.getTime(),
        );

    const totalQuotes = await Quote.countDocuments({
        user: new Types.ObjectId(user._id),
    });

    const featuredQuote = quotes.find((quote) => quote.featured);

    return (
        <div className='pb-8 min-h-svh bg-[#f7f8f9]'>
            <header className='w-full px-6 py-3'>
                <div>
                    <Image src={Logo} alt='Quotely' width={48} height={48} />
                </div>
            </header>
            <div className='flex justify-center items-center flex-col max-w-lg mx-auto'>
                <div className='flex pt-4 pb-6 gap-5 w-full border-b border-gray-200'>
                    <Image
                        src={user?.image}
                        alt={user?.name}
                        width={100}
                        height={100}
                        className='rounded-full mb-1 w-24 h-24'
                    />
                    <div className='flex flex-col gap-1 text-[#4f4f4f]'>
                        <h1 className='text-xl font-semibold'>{user?.name}</h1>
                        <span className='block text-sm text-[#9b9b9b]'>{`@${user?.username}`}</span>
                        <p className='opacity-80 text-sm'>{user?.bio}</p>
                        <p className='text-xs flex items-center gap-1 text-[#9b9b9b]'>
                            <LuCalendarDays />
                            Joined June 2025
                        </p>
                        <p className='text-sm'>
                            <strong className='font-bold'>{totalQuotes}</strong>{' '}
                            Quotes
                        </p>
                    </div>
                </div>

                {featuredQuote && (
                    <div className='pt-6 pb-6 w-full border-b border-gray-200 relative'>
                        <QuoteCard
                            quote={featuredQuote.quote}
                            author={featuredQuote.author}
                            book={featuredQuote.book}
                            createdAt={featuredQuote.createdAt}
                        />
                        <span className='absolute top-2 right-2 text-xs font-weight text-gray-400 flex items-center gap-1'>
                            <TiPin />
                            Pinned
                        </span>
                    </div>
                )}

                <div className='max-w-lg m-0 flex flex-col gap-4 pt-6'>
                    {quotes
                        ?.filter((quote) => !quote.featured)
                        .map((quote) => (
                            <QuoteCard
                                key={String(quote._id)}
                                quote={quote.quote}
                                author={quote.author}
                                book={quote.book}
                                createdAt={quote.createdAt}
                            />
                        ))}
                    {quotes?.filter((quote) => !quote.featured).length ===
                        0 && (
                        <p className='text-center text-gray-500'>
                            No quotes found.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
