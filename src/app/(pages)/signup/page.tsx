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

// ====== Assets ====== //
import { FcGoogle } from 'react-icons/fc';

const SignupPage = () => {
    return (
        <div className='w-full h-screen flex bg-gray-100 p-3'>
            <div className='w-1/2'>
                <p>Image</p>
            </div>
            <div className='w-1/2 rounded-xl bg-white p-8 flex justify-center items-center flex-col gap-6 relative'>
                <div className='flex flex-col items-center gap-1'>
                    <h1 className='text-3xl font-bold'>Create an account</h1>
                    <p className='text-gray-500'>
                        Sign up to get started with Quotely
                    </p>
                </div>
                <Card className='w-[400px]'>
                    <CardHeader>
                        <CardTitle className='text-center'>Sign Up</CardTitle>
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
                        <Button
                            variant='outline'
                            className='w-full font-bold   '
                        >
                            <FcGoogle size={20} />
                            Sign up with Google
                        </Button>
                    </CardFooter>
                </Card>
                <p className='absolute bottom-6 mx-auto text-sm text-gray-500'>
                    Already have an account?&nbsp;
                    <Link href='/login' className='underline'>
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignupPage;
