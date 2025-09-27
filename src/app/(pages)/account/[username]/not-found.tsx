import Link from 'next/link';

const NotFound = () => {
    return (
        <div className='h-screen flex flex-col items-center justify-center'>
            <div className='flex align-center justify-center mb-4 text-xl'>
                <h1 className='mr-2 pr-2 border-r border-gray-700'>404</h1>
                <p>User could not be found</p>
            </div>
            <Link href='/' className='text-sm underline decoration-1'>
                Return home
            </Link>
        </div>
    );
};

export default NotFound;
