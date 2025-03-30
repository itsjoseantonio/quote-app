'use server';

import dbConnect from '@/lib/dbConnect';
import { authOptions } from '@/lib/auth';
import { Session } from '@/types';
import { getServerSession } from 'next-auth';
import { User } from '@/app/models/User';

export const completeRegister = async (formData: FormData) => {
    const username = formData.get('username');

    if (!username) {
        throw new Error('Username is required');
    }

    await dbConnect();

    const session: Session | null = await getServerSession(authOptions);

    if (!session) {
        throw new Error('Session not found');
    }

    const user = await User.findOne({ username });

    if (user) {
        return {
            success: false,
            message: 'Username already exists',
        };
    }

    try {
        if (session) {
            await User.updateOne({ email: session.user.email }, { username });
            return {
                success: true,
                message: 'Registration completed successfully',
            };
        } else {
            return {
                success: false,
                message: 'Session not found',
            };
        }
    } catch (error) {
        throw new Error(`Error completing registration: ${error}`);
    }
};
