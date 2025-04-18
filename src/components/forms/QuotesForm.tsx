'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const QuotesForm = () => {
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        console.log(formData, 'formData');
    };

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
                            <Textarea id='quote' name='quote' required />
                        </div>
                        <div>
                            <Label htmlFor='author'>Author</Label>
                            <Input id='author' name='author' required />
                        </div>
                        <div>
                            <Label htmlFor='book'>Book</Label>
                            <Input id='book' name='book' required />
                        </div>
                        <Button type='submit'>Add Quote</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default QuotesForm;
