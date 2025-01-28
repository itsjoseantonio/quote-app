import Link from 'next/link';

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

// ====== Assets ====== //
import { FcGoogle } from 'react-icons/fc';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const LoginPage = async () => {
    const session = await getServerSession(authOptions);

    console.log(session, 'session');

    return (
        <div className='w-full h-screen flex bg-gray-100 p-3'>
            <div className='w-1/2'>
                <p>Image</p>
            </div>
            <div className='w-1/2 rounded-xl bg-white p-8 flex justify-center items-center flex-col gap-6 relative'>
                <div className='flex flex-col items-center gap-1'>
                    <h1 className='text-3xl font-bold'>Welcome back!</h1>
                    <p className='text-gray-500'>
                        Please enter your credentials
                    </p>
                </div>
                <Card className='w-[400px]'>
                    <CardHeader>
                        <CardTitle className='text-center'>Log in</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form>
                            <div className='grid w-full items-center gap-4'>
                                <div className='flex flex-col space-y-1.5'>
                                    <Label htmlFor='username'>Username</Label>
                                    <Input id='username' placeholder='' />
                                </div>
                                <div className='flex flex-col space-y-1.5'>
                                    <Label htmlFor='password'>Password</Label>
                                    <Input id='password' placeholder='' />
                                </div>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className='flex flex-col gap-3'>
                        <Button className='w-full'>Submit</Button>
                        <AuthButton provider='google' label='Google'>
                            <FcGoogle size={20} />
                        </AuthButton>
                    </CardFooter>
                </Card>
                <p className='absolute bottom-6 mx-auto text-sm text-gray-500'>
                    Don&apos;t have an account?&nbsp;
                    <Link href='/signup' className='underline'>
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
