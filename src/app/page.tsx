import Link from 'next/link';

// ======= Components ======= //
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';

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
                <section className='container mx-auto px-4 h-[calc(100vh-60px)] flex items-center justify-center bg-[url("/src/assets/images/main-banner.jpeg")]'>
                    <div className='max-w-5xl text-center'>
                        <h1 className='font-bold text-4xl mb-5'>
                            Books don't change people; paragraphs do, Sometimes
                            even sentences.
                        </h1>
                        <p className='text-xl mb-5'>
                            Quotely is where you can curate and share your
                            favorite quotes with the world. Discover, inspire
                            and connect through the power of words.
                        </p>
                        <Button
                            variant='outline'
                            className='bg-coffee text-white rounded-3xl text-2xl py-5 px-6'
                        >
                            <Link href='/auth/signup'>Get started</Link>
                        </Button>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
