// ======= Components ======= //
import Footer from '@/components/Footer';
import Header from '@/components/Header';

// ======= Auth ======= //
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function HomePage() {
    const session = await getServerSession(authOptions);

    if (session) {
        redirect('/admin');
    }

    return (
        <>
            <Header />
            <main>
                <div className='container mx-auto px-4'>
                    <h2>Home page</h2>
                </div>
            </main>
            <Footer />
        </>
    );
}
