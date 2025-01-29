import { SidebarProvider } from '@/components/ui/sidebar';
import SidebarApp from '@/components/SidebarApp';

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <SidebarProvider>
            <SidebarApp />
            <main>{children}</main>
        </SidebarProvider>
    );
};

export default Layout;
