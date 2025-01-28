'use client';

import Link from 'next/link';

// ====== Components ====== //
import SignupForm from '@/components/forms/SignupForm';

const SignupPage = () => {
    return (
        <div className='w-full h-screen flex bg-gray-100 p-3'>
            <div className='w-1/2'>
                <p>Image</p>
            </div>
            <div className='w-1/2 rounded-xl bg-white p-8 flex justify-center items-center flex-col gap-6 relative'>
                <div className='flex flex-col items-center gap-1'>
                    <h1 className='text-3xl font-bold'>Create an account</h1>
                    <p className='text-gray-500'>
                        Sign up to get started with Quotely
                    </p>
                </div>
                <SignupForm />
                <p className='absolute bottom-6 mx-auto text-sm text-gray-500'>
                    Already have an account?&nbsp;
                    <Link href='/login' className='underline'>
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignupPage;
