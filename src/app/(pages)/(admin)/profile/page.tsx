import { getServerSession } from 'next-auth';

// ====== Components ====== //
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Session } from '@/types';
import { redirect } from 'next/navigation';

const ProfilePage = async () => {
    const session: Session | null = await getServerSession();
    const user = session?.user;

    if (!session) {
        redirect('/');
    }

    return (
        <div className='space-y-4'>
            <h1 className='text-2xl font-bold mb-3'>Edit Profile</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                </CardHeader>
                <CardContent>
                    <form className='space-y-4'>
                        <div>
                            <Label htmlFor='name'>Name</Label>
                            <Input id='name' defaultValue='José Antonio' />
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
                            <Input
                                id='email'
                                defaultValue={user?.email}
                                disabled
                            />
                        </div>
                        <div>
                            <Label htmlFor='bio'>Bio</Label>
                            <Textarea
                                id='bio'
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
        </div>
    );
};

export default ProfilePage;
