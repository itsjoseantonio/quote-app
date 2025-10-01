'use client';

import React, { useState } from 'react';

import { Quote } from '@/types';
import QuotesForm from '@/components/forms/QuotesForm';
import QuoteList from '@/components/forms/QuoteList';

type Mode = 'create' | 'edit';

interface QuotesClientProps {
    quotes: Quote[];
}

const QuotesClient = ({ quotes }: QuotesClientProps) => {
    const [mode, setMode] = useState<Mode>('create');
    const [editingQuote, setEditingQuote] = useState<Quote | null>(null);

    const handleEdit = (quote: Quote) => {
        console.log(quote, 'editing quote');
        setEditingQuote(quote);
        setMode('edit');
    };

    const handleCancel = () => {
        setEditingQuote(null);
        setMode('create');
    };

    const handleSave = () => {
        setMode('create');
        setEditingQuote(null);
    };

    return (
        <div className='space-y-4'>
            <QuotesForm
                mode={mode}
                initialValues={editingQuote}
                handleCancel={handleCancel}
                handleSave={handleSave}
            />
            <QuoteList quotes={quotes} handleEdit={handleEdit} />
        </div>
    );
};

export default QuotesClient;
