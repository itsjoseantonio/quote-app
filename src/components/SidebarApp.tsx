import Link from 'next/link';
import { getServerSession } from 'next-auth';

// ====== Components ====== //
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarHeader,
    SidebarFooter,
} from '@/components/ui/sidebar';
import LogoutButton from '@/components/buttons/LogoutButton';
import AdminMenu from './AdminMenu';

import { authOptions } from '@/lib/auth';
import { Session } from '@/types';

// ====== Assets ====== //
import User from '@/assets/images/user.png';
import { FaHome, FaQuoteLeft, FaUser } from 'react-icons/fa';

const items = [
    {
        title: 'Home',
        url: '/admin',
        icon: <FaHome />,
    },
    {
        title: 'Quotes',
        url: '/quotes',
        icon: <FaQuoteLeft />,
    },
    {
        title: 'Profile',
        url: '/profile',
        icon: <FaUser />,
    },
];

const SidebarApp = async () => {
    const session: Session | null = await getServerSession(authOptions);

    return (
        <Sidebar>
            <SidebarHeader>
                <h1 className='text-2xl font-bold text-gray-800 text-center p-2'>
                    Quotely
                </h1>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent className='py-2'>
                        <SidebarMenu className='gap-2'>
                            <AdminMenu items={items} />
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <div className='flex items-center gap-2 py-2 px-3 bg-slate-200 rounded-3xl'>
                    <img
                        src={session?.user?.image || User.src}
                        alt={session?.user.name}
                        width={40}
                        height={40}
                        className='rounded-full'
                    />
                    <div>
                        <h3 className='text-sm font-bold'>
                            {session?.user?.name}
                        </h3>
                        <p className='text-gray-500 text-xs'>
                            {session?.user.email}
                        </p>
                    </div>
                    <LogoutButton />
                </div>
            </SidebarFooter>
        </Sidebar>
    );
};

export default SidebarApp;
