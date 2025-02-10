'use server';

import dbConnect from '@/lib/dbConnect';
import { authOptions } from '@/lib/auth';
import { Session } from '@/types';
import { getServerSession } from 'next-auth';

export const completeRegister = (formData: FormData) => {
    const username = formData.get('username');
    console.log(formData, 'FormData');
    console.log(username, 'Username');

    const session: Session | null = getServerSession(authOptions);
};
