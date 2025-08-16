import dbConnect from '@/lib/dbConnect';
import { User } from '@/app/models/User';
import { Quote } from '@/app/models/Quote';
import { Types } from 'mongoose';
import Image from 'next/image';

const ProfilePage = async ({ params }: { params: { username: string } }) => {
    await dbConnect();
    const { username } = params;
    const userDoc = await User.findOne({ username });
    const user = {
        ...userDoc.toObject(),
        _id: userDoc._id.toString(),
    };

    const quotes = await Quote.find({
        user: new Types.ObjectId(user._id),
    }).lean();

    return (
        <div>
            <div>
                <div className=''>
                    <Image
                        src={user?.image}
                        alt={user?.name}
                        width={100}
                        height={100}
                    />
                    <h1>{user?.name}</h1>
                    <p>{user?.bio}</p>
                </div>

                <div>
                    {quotes?.map((quote) => (
                        <div key={String(quote._id)}>
                            <p>{quote?.quote}</p>
                            <span>{quote?.author}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
