/* eslint-disable react/no-unescaped-entities */
// ====== Components ====== //
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Quote } from '@/types';

interface QuoteListProps {
    quotes: Quote[];
}

const QuoteList = ({ quotes }: QuoteListProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Existing Quotes</CardTitle>
            </CardHeader>
            <CardContent>
                <ul className='space-y-2'>
                    {quotes.map((quote) => (
                        <li
                            className='flex items-center justify-between p-2 bg-gray-100 rounded'
                            key={quote._id}
                        >
                            <span>
                                {quote.quote} - {quote.author}
                            </span>
                            <div>
                                <Button variant='ghost' size='sm'>
                                    Edit
                                </Button>
                                <Button
                                    variant='ghost'
                                    size='sm'
                                    className='text-red-500'
                                >
                                    Delete
                                </Button>
                            </div>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    );
};

export default QuoteList;
