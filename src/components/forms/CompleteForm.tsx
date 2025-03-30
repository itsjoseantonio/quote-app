'use client';

import { FormEvent } from 'react';
import { useRouter } from 'next/navigation';

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
import { completeRegister } from '@/app/actions/auth/complete';
import { toast } from 'react-hot-toast';

const CompleteForm = () => {
    const router = useRouter();
    const handleComplete = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);

        try {
            const response = await completeRegister(formData);

            if (!response.success) {
                toast.error(response.message);
            } else {
                toast.success(response.message);
                router.push('/admin');
            }
        } catch (error) {
            console.error(error);
            toast.error('An error occurred');
        }
    };

    return (
        <Card className='w-[400px]'>
            <form onSubmit={handleComplete}>
                <CardHeader>
                    <CardTitle className='text-center'>Complete</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className='grid w-full items-center gap-4'>
                        <div className='flex flex-col space-y-1.5'>
                            <Label htmlFor='username'>Username</Label>
                            <Input
                                id='username'
                                placeholder=''
                                name='username'
                                type='text'
                            />
                        </div>
                    </div>
                </CardContent>
                <CardFooter className='flex flex-col gap-3'>
                    <Button className='w-full'>Continue</Button>
                </CardFooter>
            </form>
        </Card>
    );
};

export default CompleteForm;
