import React from 'react';
import { Card, CardContent } from './ui/card';

const QuoteCard = (props: { quote: string; author: string }) => {
    const { quote, author } = props;
    return (
        <Card className='bg-white'>
            <CardContent className='p-6'>
                <blockquote className={`text-lg leading-relaxed mb-3`}>
                    {quote}
                </blockquote>

                <div className='flex items-center justify-between'>
                    <cite className={`opacity-70 not-italic`}>— {author}</cite>
                </div>
            </CardContent>
        </Card>
    );
};

export default QuoteCard;
