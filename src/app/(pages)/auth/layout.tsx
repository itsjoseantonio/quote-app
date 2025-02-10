import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='w-full h-screen flex bg-gray-100 p-3'>
            <div className='w-1/2'>
                <p>Image</p>
            </div>
            <main className='w-1/2 rounded-xl bg-white p-8 flex justify-center items-center flex-col gap-6 relative'>
                {children}
            </main>
        </div>
    );
};

export default Layout;
