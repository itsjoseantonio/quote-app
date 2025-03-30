'use client';

import { FaPowerOff } from 'react-icons/fa6';
import { signOut } from 'next-auth/react';

const LogoutButton = () => {
    return (
        <span
            title='Logout'
            onClick={() => signOut({ callbackUrl: '/' })}
            className='cursor-pointer ml-auto'
        >
            <FaPowerOff size={20} />
        </span>
    );
};

export default LogoutButton;
