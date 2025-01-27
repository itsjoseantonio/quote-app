import { Button } from '@/components/ui/button';
import Link from 'next/link';

const Header = () => {
    return (
        <header className='bg-white shadow-md py-3'>
            <div className='container mx-auto px-4 flex justify-between items-center'>
                <h1 className='text-2xl font-bold text-gray-800'>Quotely</h1>
                <Button>
                    <Link href='/login'>Login</Link>
                </Button>
            </div>
        </header>
    );
};

export default Header;
