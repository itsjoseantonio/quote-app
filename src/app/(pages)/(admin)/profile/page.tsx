import { getServerSession } from 'next-auth';
import { Session } from '@/types';
import { redirect } from 'next/navigation';
import ProfileForm from '@/components/forms/ProfileForm';
import { authOptions } from '@/lib/auth';

const ProfilePage = async () => {
    const session: Session | null = await getServerSession(authOptions);
    const user = session?.user;

    if (!session) {
        redirect('/');
    }

    return (
        <div className='space-y-4'>
            <h1 className='text-2xl font-bold mb-3'>Edit Profile</h1>
            {user && <ProfileForm user={user} />}
        </div>
    );
};

export default ProfilePage;
