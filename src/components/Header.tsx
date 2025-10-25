import { Button } from '@/components/ui/button';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import ThemeToggle from './ThemeToggle';
import Link from 'next/link';

const Header = async () => {
    const session = await getServerSession(authOptions);

    return (
        <header className='bg-white shadow-md py-3'>
            <div className='container mx-auto px-4 flex justify-between items-center'>
                <h1 className='text-2xl font-bold text-gray-800'>Quotely</h1>
                <div className='flex gap-2 items-center'>
                    {session ? (
                        <div></div>
                    ) : (
                        <>
                            <Button>
                                <Link href='/auth/login'>Login</Link>
                            </Button>
                            <Button variant='outline'>
                                <Link href='/auth/signup'>Sign up</Link>
                            </Button>
                        </>
                    )}
                    <ThemeToggle />
                </div>
            </div>
        </header>
    );
};

export default Header;
