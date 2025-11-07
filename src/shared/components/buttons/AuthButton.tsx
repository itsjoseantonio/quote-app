'use client';

import { signIn } from 'next-auth/react';
import { Button } from '../ui/button';

interface AuthButtonProps {
    provider: 'google' | 'github';
    label: string;
    children: React.ReactNode;
}

const AuthButton = ({ provider, label, children }: AuthButtonProps) => {
    return (
        <Button
            className='w-full  font-bold'
            variant='outline'
            onClick={() => signIn(provider)}
        >
            {children}
            {`Sign in with ${label}`}
        </Button>
    );
};

export default AuthButton;
