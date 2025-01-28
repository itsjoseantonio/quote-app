import { FormEvent } from 'react';

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
import { toast } from 'react-hot-toast';

// ====== Assets ====== //
import { FcGoogle } from 'react-icons/fc';
import { signup } from '@/app/actions/auth/signup';

const SignupForm = () => {
    const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);

        try {
            const response = await signup(formData);
            if (!response.success) {
                toast.error(response.message);
            } else {
                toast.success(response.message);
            }
        } catch (error) {
            console.error(error);
            toast.error('An error occurred');
        }
    };

    return (
        <Card className='w-[400px]'>
            <form onSubmit={handleSignup}>
                <CardHeader>
                    <CardTitle className='text-center'>Sign Up</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className='grid w-full items-center gap-4'>
                        <div className='flex flex-col space-y-1.5'>
                            <Label htmlFor='name'>Name</Label>
                            <Input
                                id='name'
                                type='text'
                                placeholder=''
                                name='name'
                            />
                        </div>
                        <div className='flex flex-col space-y-1.5'>
                            <Label htmlFor='email'>Email</Label>
                            <Input
                                id='email'
                                type='email'
                                placeholder=''
                                name='email'
                            />
                        </div>
                        <div className='flex flex-col space-y-1.5'>
                            <Label htmlFor='password'>Password</Label>
                            <Input
                                id='password'
                                type='password'
                                name='password'
                                placeholder=''
                            />
                        </div>
                    </div>
                </CardContent>
                <CardFooter className='flex flex-col gap-3'>
                    <Button className='w-full' type='submit'>
                        Submit
                    </Button>
                    <Button variant='outline' className='w-full font-bold   '>
                        <FcGoogle size={20} />
                        Sign up with Google
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
};

export default SignupForm;
