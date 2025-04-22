import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

import { authOptions } from '@/lib/auth';
import { Session } from '@/types';

// ====== Components ====== //
import LoginForm from '@/components/forms/LoginForm';

const LoginPage = async () => {
    const session: Session | null = await getServerSession(authOptions);

    if (session) {
        redirect('/admin');
    }

    return (
        <>
            <div className='flex flex-col items-center gap-1'>
                <h1 className='text-3xl font-bold'>Welcome back!</h1>
                <p className='text-gray-500'>Please enter your credentials</p>
            </div>
            <LoginForm />
            <p className='absolute bottom-6 mx-auto text-sm text-gray-500'>
                Don&apos;t have an account?&nbsp;
                <Link href='/auth/signup' className='underline'>
                    Sign up
                </Link>
            </p>
        </>
    );
};

export default LoginPage;
