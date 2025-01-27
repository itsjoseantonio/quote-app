import { MongoDBAdapter } from '@auth/mongodb-adapter';
import { AuthOptions } from 'next-auth';
import Google from 'next-auth/providers/google';
import client from './MongoDB';

export const authOptions: AuthOptions = {
    adapter: MongoDBAdapter(client),
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
};
