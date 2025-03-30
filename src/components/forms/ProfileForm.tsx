'use client';

import { FormEvent } from 'react';

// ====== Server Actions ====== //
import { updateProfile } from '@/app/actions/admin/updateProfile';

// ====== Components ====== //
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Session } from '@/types';

const ProfileForm = ({ user }: Session) => {
    const handleUpdateProfile = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);

        try {
            const response = await updateProfile(formData);
            console.log(response, 'response');
        } catch (error) {
            console.log(error, 'error');
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent>
                <form className='space-y-4' onSubmit={handleUpdateProfile}>
                    <div>
                        <Label htmlFor='name'>Name</Label>
                        <Input id='name' defaultValue={user?.name} />
                    </div>
                    <div>
                        <Label htmlFor='username'>Username</Label>
                        <Input
                            id='username'
                            defaultValue={user?.username}
                            disabled
                        />
                    </div>
                    <div>
                        <Label htmlFor='email'>Email</Label>
                        <Input id='email' defaultValue={user?.email} disabled />
                    </div>
                    <div>
                        <Label htmlFor='bio'>Bio</Label>
                        <Textarea
                            id='bio'
                            name='bio'
                            defaultValue={user?.bio}
                            rows={3}
                        />
                    </div>
                    <div>
                        <Label htmlFor='avatar'>Avatar URL</Label>
                        <Input
                            id='avatar'
                            type='url'
                            defaultValue={user?.image}
                        />
                    </div>
                    <Button type='submit'>Update Profile</Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default ProfileForm;
