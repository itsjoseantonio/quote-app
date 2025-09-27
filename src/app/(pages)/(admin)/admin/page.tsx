import React from 'react';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

// ====== Components ====== //
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// ====== Auth ====== //
import { authOptions } from '@/lib/auth';
import { Session } from '@/types';

const AdminPage = async () => {
    const session: Session | null = await getServerSession(authOptions);

    if (!session) {
        redirect('/');
    }

    return (
        <div className='space-y-4'>
            <h1 className='text-2xl font-bold mb-3'>Dashboard</h1>
            <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
                <Card>
                    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                        <CardTitle className='text-sm font-medium'>
                            Total Quotes
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className='text-2xl font-bold'>127</div>
                        <p className='text-xs text-muted-foreground'>
                            +12 from last month
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                        <CardTitle className='text-sm font-medium'>
                            Total Views
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className='text-2xl font-bold'>15,234</div>
                        <p className='text-xs text-muted-foreground'>
                            +2,341 from last month
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                        <CardTitle className='text-sm font-medium'>
                            Favorites
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className='text-2xl font-bold'>3,456</div>
                        <p className='text-xs text-muted-foreground'>
                            +456 from last month
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                        <CardTitle className='text-sm font-medium'>
                            Daily Average
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className='text-2xl font-bold'>89</div>
                        <p className='text-xs text-muted-foreground'>
                            views per day
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default AdminPage;
