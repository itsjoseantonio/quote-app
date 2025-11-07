import { SidebarProvider } from '@/shared/components/ui/sidebar';
import SidebarApp from '@/shared/components/SidebarApp';

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <SidebarProvider
            style={{ '--sidebar-width': '16rem' } as React.CSSProperties}
        >
            <SidebarApp />
            <main className='w-full p-6'>{children}</main>
        </SidebarProvider>
    );
};

export default Layout;
