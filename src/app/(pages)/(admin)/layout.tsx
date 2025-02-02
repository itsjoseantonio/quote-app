import { SidebarProvider } from '@/components/ui/sidebar';
import SidebarApp from '@/components/SidebarApp';

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <SidebarProvider
            style={{ '--sidebar-width': '15rem' } as React.CSSProperties}
        >
            <SidebarApp />
            <main className='w-full p-6'>{children}</main>
        </SidebarProvider>
    );
};

export default Layout;
