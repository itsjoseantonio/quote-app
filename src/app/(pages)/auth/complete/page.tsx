import Link from 'next/link';
import CompleteForm from '@/components/forms/CompleteForm';

const CompletePage = () => {
    return (
        <>
            <div className='flex flex-col items-center gap-1'>
                <h1 className='text-3xl font-bold'>Welcome to Quotely!</h1>
                <p className='text-gray-500'>Choose your Quotely username</p>
            </div>
            <CompleteForm />
            <p className='absolute bottom-6 mx-auto text-sm text-gray-500'>
                Already have an account?&nbsp;
                <Link href='/auth/login' className='underline'>
                    Sign in
                </Link>
            </p>
        </>
    );
};

export default CompletePage;
