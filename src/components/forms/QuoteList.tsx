/* eslint-disable react/no-unescaped-entities */
'use client';

import { useState } from 'react';
import { toast } from 'react-hot-toast';

import { deleteQuote } from '@/app/actions/admin/quotes/deleteQuote';
import { Quote } from '@/types';

// ====== Components ====== //
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ConfirmModal from '@/components/modals/ConfirmModal';

interface QuoteListProps {
    quotes: Quote[];
    handleEdit?: (quote: Quote) => void;
}

const QuoteList = ({ quotes, handleEdit }: QuoteListProps) => {
    const [selectedQuoteId, setSelectedQuoteId] = useState<string | null>(null);
    const [showModal, setShowModal] = useState<boolean>(false);

    const handleDelete = async () => {
        if (selectedQuoteId) {
            setShowModal(false);
            setSelectedQuoteId(null);
            try {
                const response = await deleteQuote(selectedQuoteId);
                if (!response?.success) {
                    toast.error(response?.message || 'An error occurred');
                } else {
                    toast.success(response.message);
                }
            } catch (error) {
                console.error(error, 'error');
                toast.error('An error occurred while deleting the quote');
            }
        }
    };

    return (
        <>
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
                                    <Button
                                        variant='ghost'
                                        size='sm'
                                        onClick={
                                            handleEdit
                                                ? () => handleEdit(quote)
                                                : undefined
                                        }
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant='ghost'
                                        size='sm'
                                        className='text-red-500'
                                        onClick={() => {
                                            setSelectedQuoteId(quote._id);
                                            setShowModal(true);
                                        }}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
            <ConfirmModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={handleDelete}
            />
        </>
    );
};

export default QuoteList;
