'use client';

import { toast } from 'react-hot-toast';

// ====== Server Actions ====== //
import { createQuote } from '@/app/actions/admin/quotes/createQuote';

// ====== Components ====== //
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface QuotesFormProps {
    mode?: 'create' | 'edit';
    initialValues?: any | null;
    onSave?: (data: any) => void;
    handleCancel?: () => void;
}

const QuotesForm = ({
    mode,
    initialValues,
    onSave,
    handleCancel,
}: QuotesFormProps) => {
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        try {
            const response = await createQuote(formData);

            if (!response?.success) {
                toast.error(response?.message || 'An error occurred');
            } else {
                toast.success(response.message);
            }
        } catch (error) {
            console.error(error, 'error');
        }
    };

    const { quote, author, book } = initialValues || {};

    return (
        <div className='space-y-4'>
            <Card>
                <CardHeader>
                    <CardTitle>Add New Quote</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className='space-y-4'>
                        <div>
                            <Label htmlFor='quote'>Quote</Label>
                            <Textarea
                                id='quote'
                                name='quote'
                                required
                                value={quote || ''}
                            />
                        </div>
                        <div>
                            <Label htmlFor='author'>Author</Label>
                            <Input
                                id='author'
                                name='author'
                                value={author || ''}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor='book'>Book</Label>
                            <Input
                                id='book'
                                name='book'
                                value={book || ''}
                                required
                            />
                        </div>
                        {mode === 'create' ? (
                            <Button type='submit'>Add Quote</Button>
                        ) : (
                            <div className='space-x-2'>
                                <Button type='submit'>Update Quote</Button>
                                <Button onClick={handleCancel}>Cancel</Button>
                            </div>
                        )}
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default QuotesForm;
