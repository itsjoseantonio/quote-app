import React from 'react';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { Types } from 'mongoose';

// ====== Components ====== //
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/shared/components/ui/card';

// ====== Auth ====== //
import { authOptions } from '@/shared/lib/auth';
import { Session } from '@/shared/types';
import dbConnect from '@/shared/lib/dbConnect';
import { Quote } from '@/features/admin/quotes/models/Quote';

const AdminPage = async () => {
    const session: Session | null = await getServerSession(authOptions);

    if (!session) {
        redirect('/');
    }

    await dbConnect();

    const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000); // 30 days ago
    const endDate = new Date();

    const monthlyQuotes = await Quote.countDocuments({
        user: new Types.ObjectId(session.user.id),
        createdAt: { $gte: startDate, $lte: endDate },
    });

    const totalQuotes = await Quote.countDocuments({
        user: new Types.ObjectId(session.user.id),
    });

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
                        <div className='text-2xl font-bold'>{totalQuotes}</div>
                        <p className='text-xs text-muted-foreground'>
                            +{monthlyQuotes} from last month
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
