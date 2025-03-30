import { model, models, Schema } from 'mongoose';

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minLenght: 2,
    },
    username: {
        type: String,
        required: false,
        unique: true,
        match: /^[a-zA-Z0-9_]+$/,
    },
    bio: {
        type: String,
        required: false,
        maxlength: 300,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    emailVerified: {
        type: Boolean,
    },
});

export const User = models.User || model('User', UserSchema);
