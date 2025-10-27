import Image from 'next/image';
import AuthImage from '../../../../public/images/auth-bg.jpeg';

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='w-full h-screen flex bg-gray-100 p-3 gap-3'>
            <div className='w-1/2 rounded-xl flex items-center justify-center'>
                <Image src={AuthImage} alt={''} className='w-[75%]'></Image>
            </div>
            <main className='w-1/2 rounded-xl bg-white p-8 flex justify-center items-center flex-col gap-6 relative'>
                {children}
            </main>
        </div>
    );
};

export default Layout;
