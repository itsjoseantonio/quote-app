import QuotesForm from '@/components/forms/QuotesForm';

const QuotesPage = () => {
    return (
        <div className='space-y-4'>
            <h1 className='text-2xl font-bold mb-3'>Manage quotes</h1>
            <QuotesForm />
        </div>
    );
};

export default QuotesPage;
