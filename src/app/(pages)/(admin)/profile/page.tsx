import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

import { Session } from '@/types';
import { authOptions } from '@/lib/auth';
import { User } from '@/app/models/User';
import dbConnect from '@/lib/dbConnect';

// ====== Components ====== //
import ProfileForm from '@/components/forms/ProfileForm';

const ProfilePage = async () => {
    const session: Session | null = await getServerSession(authOptions);

    if (!session) {
        redirect('/');
    }

    await dbConnect();
    const userDoc = await User.findById(session.user.id);

    const user = {
        ...userDoc.toObject(),
        _id: userDoc._id.toString(),
    };

    return (
        <div className='space-y-4'>
            <h1 className='text-2xl font-bold mb-3'>Edit Profile</h1>
            {user && <ProfileForm user={user} />}
        </div>
    );
};

export default ProfilePage;
