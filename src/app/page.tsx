import Link from 'next/link';

// ======= Components ======= //
import Footer from '@/shared/components/layout/Footer';
import Header from '@/shared/components/layout/Header';
import { Button } from '@/shared/components/ui/button';

// ======= Auth ======= //
import { authOptions } from '@/shared/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

// ======= Assets ======== //
import { LuUserCheck } from 'react-icons/lu';
import { PiQuotesBold } from 'react-icons/pi';
import { RiShareLine } from 'react-icons/ri';

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
                        <h1
                            className='font-bold text-5xl mb-6 max-w-4xl mx-auto text-white text-shadow-xs'
                            style={{ textShadow: '1px 1px 3px rgba(0,0,0,.4)' }}
                        >
                            Books do not change people; paragraphs do, Sometimes
                            even sentences.
                        </h1>
                        <p className='text-xl mb-6 max-w-3xl mx-auto text-white'>
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
                <section className='bg-lightGray py-28'>
                    <div className='text-center mb-16'>
                        <h2 className='text-3xl font-bold mb-2'>
                            How it works
                        </h2>
                        <p>
                            Sharing your favorite quotes is just a few steps
                            away
                        </p>
                    </div>
                    <div className='grid gap-12 text-center md:grid-cols-3'>
                        <div className='flex flex-col items-center text-richBlack'>
                            <div
                                className='mb-3 text-coffee w-[44px] h-[44px] flex items-center justify-center rounded-full'
                                style={{
                                    backgroundColor: 'rgba(169, 146, 125, .5)',
                                }}
                            >
                                <LuUserCheck fontSize={24} />
                            </div>
                            <h3 className='text-xl font-semibold mb-3'>
                                1. Create your profile
                            </h3>
                            <p className=' max-w-xs'>
                                Sign up and create your personalized profile to
                                start your quote-sharing journey
                            </p>
                        </div>
                        <div className='flex flex-col items-center text-richBlack'>
                            <div
                                className='mb-3 text-coffee w-[44px] h-[44px] flex items-center justify-center rounded-full'
                                style={{
                                    backgroundColor: 'rgba(169, 146, 125, .5)',
                                }}
                            >
                                <PiQuotesBold fontSize={24} />
                            </div>
                            <h3 className='text-xl font-semibold mb-3'>
                                2. Add your favorite quotes
                            </h3>
                            <p className=' max-w-xs'>
                                Easily add quotes from your favorites authors,
                                books or movies to your collections.
                            </p>
                        </div>
                        <div className='flex flex-col items-center text-richBlack'>
                            <div
                                className='mb-3 text-coffee w-[44px] h-[44px] flex items-center justify-center rounded-full'
                                style={{
                                    backgroundColor: 'rgba(169, 146, 125, .5)',
                                }}
                            >
                                <RiShareLine fontSize={24} />
                            </div>
                            <h3 className='text-xl font-semibold mb-3'>
                                3. Share your unique Link
                            </h3>
                            <p className=' max-w-xs'>
                                Share your unique link with friends and
                                followers on any platform
                            </p>
                        </div>
                    </div>
                </section>
                <section className='bg-white'>
                    <div className='py-28 text-center'>
                        <h2 className='text-3xl font-bold mb-4'>
                            Ready to start Sharing?
                        </h2>
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
