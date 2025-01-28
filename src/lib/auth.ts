import { MongoDBAdapter } from '@auth/mongodb-adapter';
import { AuthOptions } from 'next-auth';
import Google from 'next-auth/providers/google';
import client from './mongoDB';
import Credentials from 'next-auth/providers/credentials';
import dbConnect from './dbConnect';
import { User } from '@/app/models/User';
import bcrypt from 'bcrypt';

export const authOptions: AuthOptions = {
    adapter: MongoDBAdapter(client),
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        Credentials({
            name: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            authorize: async (credentials) => {
                const { email, password } = credentials || {};

                if (!email || !password) {
                    throw new Error('Email and password are required');
                }

                await dbConnect();

                try {
                    const user = await User.findOne({ email });

                    if (!user) {
                        throw new Error('User not found!');
                    }

                    const isPasswordValid = await bcrypt.compare(
                        password,
                        user.password
                    );

                    if (!isPasswordValid) {
                        throw new Error('Invalid password');
                    }

                    return user;
                } catch (error) {
                    console.log(error, 'err');
                }
            },
        }),
    ],
    session: {
        strategy: 'jwt',
    },
};
