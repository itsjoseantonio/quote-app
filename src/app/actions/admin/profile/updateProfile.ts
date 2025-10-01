'use server';

import { Session } from '@/types';
import dbConnect from '@/lib/dbConnect';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { User } from '@/app/models/User';

export const updateProfile = async (formData: FormData) => {
    const name = formData.get('name');
    const bio = formData.get('bio');

    await dbConnect();

    const session: Session | null = await getServerSession(authOptions);

    try {
        if (session) {
            const userInfo = {
                name,
                bio,
            };

            await User.updateOne(
                {
                    email: session.user.email,
                },
                userInfo,
            );

            return {
                success: true,
                message: 'User updated successfully',
            };
        }
    } catch (error) {
        console.log(error, 'Error updating User');
    }
};
