import { SidebarProvider } from '@/components/ui/sidebar';
import SidebarApp from '@/components/SidebarApp';

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <SidebarProvider
            style={{ '--sidebar-width': '14rem' } as React.CSSProperties}
        >
            <SidebarApp />
            <main>{children}</main>
        </SidebarProvider>
    );
};

export default Layout;
