import Link from 'next/link';

// ======= Components ======= //
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';

// ======= Auth ======= //
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

import banner from '@/assets/images/main-banner.jpeg';

export default async function HomePage() {
    const session = await getServerSession(authOptions);

    if (session) {
        redirect('/admin');
    }

    return (
        <>
            <Header />
            <main>
                <section className='mx-auto px-4 h-[calc(100vh-60px)] bg-[url("/images/main-banner.jpeg")] bg-cover flex items-center justify-center w-full'>
                    <div className='max-w-5xl text-center'>
                        <h1 className='font-bold text-5xl mb-6 max-w-4xl mx-auto text-white'>
                            Books do not change people; paragraphs do, Sometimes
                            even sentences.
                        </h1>
                        <p className='text-xl mb-6 max-w-3xl mx-auto'>
                            Quotely is where you can curate and share your
                            favorite quotes with the world. Discover, inspire
                            and connect through the power of words.
                        </p>
                        <Button
                            variant='outline'
                            className='bg-coffee text-white rounded-3xl text-xl py-5 px-6 border-none'
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
