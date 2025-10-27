import Link from 'next/link';

// ======= Components ======= //
import { Button } from '@/components/ui/button';
import ThemeToggle from './ThemeToggle';

// ======= Auth ======= //
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';

const Header = async () => {
    const session = await getServerSession(authOptions);

    return (
        <header className='bg-lightGray dark:bg-richBlack shadow-md py-3'>
            <div className='container mx-auto px-4 flex justify-between items-center'>
                <h1 className='text-2xl font-bold text-gray-800'>Quotely</h1>
                <div className='flex gap-4 items-center'>
                    {/** <ThemeToggle /> */}
                    {session ? (
                        <div></div>
                    ) : (
                        <>
                            <Link href='/auth/login' className='text-sm'>
                                Log In
                            </Link>
                            <Button
                                variant='outline'
                                className='bg-coffee text-white rounded-3xl'
                            >
                                <Link href='/auth/signup'>Get started</Link>
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
