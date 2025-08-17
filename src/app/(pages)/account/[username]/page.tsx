import dbConnect from '@/lib/dbConnect';
import { User } from '@/app/models/User';
import { Quote } from '@/app/models/Quote';
import Image from 'next/image';
import QuoteCard from '@/components/QuoteCard';

const ProfilePage = async ({ params }: { params: { username: string } }) => {
    await dbConnect();
    const { username } = params;
    const userDoc = await User.findOne({ username });
    const user = {
        ...userDoc.toObject(),
        _id: userDoc._id.toString(),
    };

    const quotes = await Quote.find({
        user: user._id,
    }).lean();

    return (
        <div className='pt-3 pb-3 min-h-svh bg-[#eeeeee]'>
            <div className='flex justify-center items-center flex-col'>
                <div className='flex justify-center items-center flex-col pt-3 pb-3'>
                    <Image
                        src={user?.image}
                        alt={user?.name}
                        width={100}
                        height={100}
                        className='rounded-full mb-1 w-24 h-24'
                    />
                    <h1 className='text-2xl'>{user?.name}</h1>
                    <p className='opacity-80 text-base'>{user?.bio}</p>
                </div>

                <div className='max-w-lg m-0 flex flex-col gap-3'>
                    {quotes?.map((quote) => (
                        <QuoteCard
                            key={String(quote._id)}
                            quote={quote.quote}
                            author={quote.author}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
