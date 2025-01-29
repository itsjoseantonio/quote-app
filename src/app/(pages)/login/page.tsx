import Link from 'next/link';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import LoginForm from '@/components/forms/LoginForm';

const LoginPage = async () => {
    const session = await getServerSession(authOptions);

    console.log(session, 'session');

    return (
        <div className='w-full h-screen flex bg-gray-100 p-3'>
            <div className='w-1/2'>
                <p>Image</p>
            </div>
            <div className='w-1/2 rounded-xl bg-white p-8 flex justify-center items-center flex-col gap-6 relative'>
                <div className='flex flex-col items-center gap-1'>
                    <h1 className='text-3xl font-bold'>Welcome back!</h1>
                    <p className='text-gray-500'>
                        Please enter your credentials
                    </p>
                </div>
                <LoginForm />
                <p className='absolute bottom-6 mx-auto text-sm text-gray-500'>
                    Don&apos;t have an account?&nbsp;
                    <Link href='/signup' className='underline'>
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
