export interface User {
    id: string;
    name: string;
    email: string;
    image: string;
    bio?: string;
    username: string;
}
export interface Session {
    user: User;
}

export interface Quote {
    _id: string;
    quote: string;
    author: string;
    book: string;
    user: string;
    createdAt?: Date;
    updatedAt?: Date;
    __v?: number;
}

export type QuoteFormData = Omit<Quote, '_id' | 'user'>;
