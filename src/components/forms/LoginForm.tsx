'use client';

import { FormEvent } from 'react';
import { redirect } from 'next/navigation';

// ====== Components ====== //
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import AuthButton from '@/components/buttons/AuthButton';
import { toast } from 'react-hot-toast';
import { signIn } from 'next-auth/react';

// ====== Assets ====== //
import { FcGoogle } from 'react-icons/fc';

const LoginForm = () => {
    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);

        try {
            const response = await signIn('credentials', {
                email: formData.get('email') as string,
                password: formData.get('password') as string,
                redirect: false,
            });
            if (response?.error) {
                toast.error('Invalid email or password');
            } else {
                toast.success('Logged in successfully');
                redirect('/');
            }
        } catch (error) {
            console.error(error);
            toast.error('An error occurred');
        }
    };

    return (
        <Card className='w-[400px]'>
            <form onSubmit={handleLogin}>
                <CardHeader>
                    <CardTitle className='text-center'>Log in</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className='grid w-full items-center gap-4'>
                        <div className='flex flex-col space-y-1.5'>
                            <Label htmlFor='username'>Email</Label>
                            <Input
                                id='email'
                                placeholder=''
                                name='email'
                                type='email'
                            />
                        </div>
                        <div className='flex flex-col space-y-1.5'>
                            <Label htmlFor='password'>Password</Label>
                            <Input
                                id='password'
                                placeholder=''
                                name='password'
                                type='password'
                            />
                        </div>
                    </div>
                </CardContent>
                <CardFooter className='flex flex-col gap-3'>
                    <Button className='w-full'>Submit</Button>
                    <AuthButton provider='google' label='Google'>
                        <FcGoogle size={20} />
                    </AuthButton>
                </CardFooter>
            </form>
        </Card>
    );
};

export default LoginForm;
