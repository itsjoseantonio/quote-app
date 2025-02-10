'use client';

import Link from 'next/link';

// ====== Components ====== //
import SignupForm from '@/components/forms/SignupForm';

const SignupPage = () => {
    return (
        <>
            <div className='flex flex-col items-center gap-1'>
                <h1 className='text-3xl font-bold'>Create an account</h1>
                <p className='text-gray-500'>
                    Sign up to get started with <strong>Quotely</strong>
                </p>
            </div>
            <SignupForm />
            <p className='absolute bottom-6 mx-auto text-sm text-gray-500'>
                Already have an account?&nbsp;
                <Link href='/auth/login' className='underline'>
                    Sign in
                </Link>
            </p>
        </>
    );
};

export default SignupPage;
