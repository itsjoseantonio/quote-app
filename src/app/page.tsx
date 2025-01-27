import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function HomePage() {
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
