import React from 'react';
import { Card, CardContent } from './ui/card';
import { Quote } from '@/types';
import { QuoteFormData } from '@/types';
import { formatDate } from '@/shared/utils';

const QuoteCard = (props: QuoteFormData) => {
    const { quote, author, book, createdAt } = props;

    return (
        <Card className='bg-transparent border-0 shadow-none border-l-[3px] border-[#759a92] rounded-none'>
            <CardContent className='py-2 px-3 pb-1'>
                <h2
                    className={`text-base leading-relaxed mb-1 font-bold`}
                >{`${book}, ${author}`}</h2>
                <div className='text-sm'>
                    <cite className={`opacity-70 not-italic`}>— {quote}</cite>
                    {createdAt && (
                        <span className='block text-gray-400 text-xs mt-1 text-right'>
                            {formatDate(createdAt)}
                        </span>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default QuoteCard;
