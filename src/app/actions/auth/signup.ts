'use server';

import { User } from '@/app/models/User';
import dbConnect from '@/lib/dbConnect';
import bcrypt from 'bcrypt';

export const signup = async (formData: FormData) => {
    const email = formData.get('email');
    const password = formData.get('password');
    const name = formData.get('name');

    if (!email || !password) {
        throw new Error('Email and password are required');
    }

    await dbConnect();

    const user = await User.findOne({ email });

    try {
        if (user) {
            return {
                success: false,
                message: 'User already exists',
            };
        } else {
            const hashPassword = await bcrypt.hash(password.toString(), 10);

            const newUser = await User.create({
                email,
                password: hashPassword,
                name,
            });

            const plainObj = JSON.stringify(newUser.toObject());

            return {
                success: true,
                message: 'User created successfully',
                user: plainObj,
            };
        }
    } catch (error) {
        throw new Error(`Error creating user: ${error}`);
    }
};
