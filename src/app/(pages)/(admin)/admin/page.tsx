import React from 'react';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

import { authOptions } from '@/lib/auth';
import { Session } from '@/types';

const AdminPage = async () => {
    const session: Session | null = await getServerSession(authOptions);

    if (!session) {
        redirect('/');
    }

    return <div>AdminPage</div>;
};

export default AdminPage;
