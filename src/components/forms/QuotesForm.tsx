'use client';

import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// ====== Server Actions ====== //
import { createQuote } from '@/app/actions/admin/quotes/createQuote';
import { updateQuote } from '@/app/actions/admin/quotes/updateQuote';

// ====== Components ====== //
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip';

// ====== Utils ====== //
import { QuoteSchema } from '@/app/schemas/quote.schema';
import { QuoteFormData } from '@/types';
import { FiInfo } from 'react-icons/fi';

interface QuotesFormProps {
    mode?: 'create' | 'edit';
    initialValues?: any | null;
    handleSave?: () => void;
    handleCancel?: () => void;
}

const EMPTY_VALUES = {
    quote: '',
    book: '',
    author: '',
    featured: false,
};

const QuotesForm = ({
    mode,
    initialValues,
    handleSave,
    handleCancel,
}: QuotesFormProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        control,
        watch,
    } = useForm({
        defaultValues: initialValues ?? {
            ...EMPTY_VALUES,
        },
        resolver: zodResolver(QuoteSchema),
    });

    const handleCreateQuote = async (data: QuoteFormData) => {
        try {
            const response = await createQuote(data);

            if (!response?.success) {
                toast.error(response?.message || 'An error occurred');
            } else {
                toast.success(response.message);
                reset(EMPTY_VALUES);
                handleSave?.();
            }
        } catch (error) {
            console.error(error, 'error');
        }
    };

    const handleEditQuote = async (id: string, data: QuoteFormData) => {
        try {
            const response = await updateQuote(id, data);

            if (!response?.success) {
                toast.error(response?.message || 'An error occurred');
            } else {
                toast.success(response.message);
                reset(EMPTY_VALUES);
                handleSave?.();
            }
        } catch (error) {
            console.error(error, 'error');
        }
    };

    const FeaturedInfoTooltip = () => {
        return (
            <Tooltip>
                <TooltipTrigger>
                    <FiInfo className='cursor-pointer' />
                </TooltipTrigger>
                <TooltipContent>
                    <p>This will replace your current featured quote.</p>
                </TooltipContent>
            </Tooltip>
        );
    };

    useEffect(() => {
        if (initialValues) {
            reset(initialValues);
        }
    }, [initialValues]);

    return (
        <div className='space-y-4'>
            <Card>
                <CardHeader>
                    <CardTitle>Add New Quote</CardTitle>
                </CardHeader>
                <CardContent>
                    <form
                        onSubmit={
                            mode === 'edit'
                                ? handleSubmit((data) =>
                                      handleEditQuote(initialValues?._id, data),
                                  )
                                : handleSubmit(handleCreateQuote)
                        }
                        className='space-y-4'
                    >
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <div>
                                <Label htmlFor='author'>Author</Label>
                                <Input id='author' {...register('author')} />
                                {errors?.author?.message && (
                                    <span className='text-xs text-red-500'>
                                        {String(errors.author.message)}
                                    </span>
                                )}
                            </div>
                            <div>
                                <Label htmlFor='book'>Book</Label>
                                <Input id='book' {...register('book')} />
                                {errors?.book?.message && (
                                    <span className='text-xs text-red-500'>
                                        {String(errors.book.message)}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div>
                            <Label htmlFor='quote'>Quote</Label>
                            <Textarea id='quote' {...register('quote')} />
                            {errors?.quote?.message && (
                                <span className='text-xs text-red-500'>
                                    {String(errors.quote.message)}
                                </span>
                            )}
                        </div>
                        <div>
                            <div className='flex items-center space-x-2'>
                                <Controller
                                    control={control}
                                    name='featured'
                                    render={({ field }) => {
                                        return (
                                            <>
                                                <Switch
                                                    id='featured'
                                                    checked={field.value}
                                                    onCheckedChange={(
                                                        val: boolean,
                                                    ) => field.onChange(val)}
                                                />
                                                <Label
                                                    htmlFor='featured'
                                                    className='flex items-center gap-1'
                                                >
                                                    Featured Quote
                                                    <FeaturedInfoTooltip />
                                                </Label>
                                            </>
                                        );
                                    }}
                                />
                            </div>
                        </div>
                        {mode === 'create' ? (
                            <Button type='submit'>Create Quote</Button>
                        ) : (
                            <div className='space-x-2'>
                                <Button type='submit'>Update Quote</Button>
                                <Button
                                    onClick={() => {
                                        handleCancel?.();
                                        reset(EMPTY_VALUES);
                                    }}
                                    variant='outline'
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
