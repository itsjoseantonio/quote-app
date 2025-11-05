'use server';

import { User } from '@/app/models/User';
import dbConnect from '@/lib/dbConnect';
import bcrypt from 'bcrypt';

export const login = async (formData: FormData) => {
    const email = formData.get('email');
    const password = formData.get('password');

    if (!email || !password) {
        throw new Error('Email and password are required');
    }

    await dbConnect();

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return {
                success: false,
                message: 'Invalid email',
            };
        }

        const isPasswordValid = await bcrypt.compare(
            password.toString(),
            user.password,
        );

        if (!isPasswordValid) {
            return {
                success: false,
                message: 'Invalid password',
            };
        }

        return {
            success: true,
            message: 'Logged in successfully',
            user: JSON.stringify(user.toObject()),
        };
    } catch (error) {
        throw new Error(`Error logging in: ${error}`);
    }
};
