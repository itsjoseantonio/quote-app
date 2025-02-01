import Link from 'next/link';
import { getServerSession } from 'next-auth';

// ====== Components ====== //
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarHeader,
    SidebarFooter,
} from '@/components/ui/sidebar';
import LogoutButton from '@/components/buttons/LogoutButton';

import { authOptions } from '@/lib/auth';
import { Session } from '@/types';

// ====== Assets ====== //
import User from '@/assets/images/user.png';

const items = [
    {
        title: 'Home',
        url: '/admin',
    },
    {
        title: 'Quotes',
        url: '/quotes',
    },
    {
        title: 'Profile',
        url: '/profile',
    },
];

const SidebarApp = async () => {
    const session: Session | null = await getServerSession(authOptions);
    console.log(session, 'session');

    return (
        <Sidebar>
            <SidebarHeader>
                <h1 className='text-2xl font-bold text-gray-800 text-center p-2'>
                    Quotely
                </h1>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className='text-sm'>
                        Application
                    </SidebarGroupLabel>
                    <SidebarGroupContent className='py-2'>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        asChild
                                        className='text-base h-9'
                                    >
                                        <Link href={item.url}>
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
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
