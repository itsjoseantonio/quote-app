'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

// ====== Components ====== //
import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';

interface AdminMenuProps {
    title: string;
    url: string;
    icon: React.ReactNode;
}

interface AdminMenuItems {
    items: AdminMenuProps[];
}

const AdminMenu = ({ items }: AdminMenuItems) => {
    const pathname = usePathname();

    return (
        <>
            {items.map((item: AdminMenuProps) => (
                <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                        asChild
                        className={`${item.url === pathname ? 'bg-gray-200' : ''} text-base h-9 rounded-md px-4 hover:bg-gray-200`}
                    >
                        <Link href={item.url}>
                            {item.icon}
                            <span>{item.title}</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            ))}
        </>
    );
};

export default AdminMenu;
