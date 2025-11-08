import { model, models, Schema, Types } from 'mongoose';

const QuoteSchema = new Schema(
    {
        quote: {
            type: String,
            required: true,
            minLength: 2,
            trim: true,
        },
        book: {
            type: String,
            required: true,
            trim: true,
            minLength: 2,
        },
        author: {
            type: String,
            required: true,
            trim: true,
            minLength: 2,
        },
        user: {
            type: Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

export const Quote = models.Quote || model('Quote', QuoteSchema);
