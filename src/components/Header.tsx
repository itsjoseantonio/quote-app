import { Button } from '@/components/ui/button';
import Link from 'next/link';

const Header = () => {
    return (
        <header className='bg-white shadow-md py-3'>
            <div className='container mx-auto px-4 flex justify-between items-center'>
                <h1 className='text-2xl font-bold text-gray-800'>Quotely</h1>
                <div className='flex gap-2 items-center'>
                    <Button>
                        <Link href='/login'>Login</Link>
                    </Button>
                    <Button variant='outline'>
                        <Link href='/signup'>Sign up</Link>
                    </Button>
                </div>
            </div>
        </header>
    );
};

export default Header;
