export interface User {
    name: string;
    email: string;
    image: string;
    bio?: string;
    username: string;
}

export interface Session {
    user: User;
}
