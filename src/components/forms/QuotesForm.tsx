'use client';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// ====== Server Actions ====== //
import { createQuote } from '@/app/actions/admin/quotes/createQuote';

// ====== Components ====== //
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

// ====== Utils ====== //
import { QuoteSchema } from '@/app/schemas/quote.schema';

interface QuotesFormProps {
    mode?: 'create' | 'edit';
    initialValues?: any | null;
    onSave?: (data: any) => void;
    handleCancel?: () => void;
}

const EMPTY_VALUES = {
    quote: '',
    book: '',
    author: '',
};

const QuotesForm = ({
    mode,
    initialValues,
    onSave,
    handleCancel,
}: QuotesFormProps) => {
    const {
        register,
        handleSubmit: HS,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: initialValues ?? {
            quote: '',
            book: '',
            author: '',
        },
        resolver: zodResolver(QuoteSchema),
    });

    console.log(errors, 'errors');

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

    useEffect(() => {
        if (initialValues) {
            reset(initialValues);
        }
    }, [initialValues]);

    console.log(initialValues, 'initialValues');

    return (
        <div className='space-y-4'>
            <Card>
                <CardHeader>
                    <CardTitle>Add New Quote</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={HS(handleSubmit)} className='space-y-4'>
                        <div>
                            <Label htmlFor='quote'>Quote</Label>
                            <Textarea id='quote' {...register('quote')} />
                            {errors?.quote?.message && (
                                <span className='text-sm text-red-500'>
                                    {String(errors.quote.message)}
                                </span>
                            )}
                        </div>
                        <div>
                            <Label htmlFor='author'>Author</Label>
                            <Input id='author' {...register('author')} />
                            {errors?.author?.message && (
                                <span className='text-sm text-red-500'>
                                    {String(errors.author.message)}
                                </span>
                            )}
                        </div>
                        <div>
                            <Label htmlFor='book'>Book</Label>
                            <Input id='book' {...register('book')} />
                            {errors?.book?.message && (
                                <span className='text-sm text-red-500'>
                                    {String(errors.book.message)}
                                </span>
                            )}
                        </div>
                        {mode === 'create' ? (
                            <Button type='submit'>Add Quote</Button>
                        ) : (
                            <div className='space-x-2'>
                                <Button type='submit'>Update Quote</Button>
                                <Button
                                    onClick={() => {
                                        handleCancel?.();
                                        reset(EMPTY_VALUES);
                                    }}
                                >
                                    Cancel
                                </Button>
                            </div>
                        )}
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default QuotesForm;
