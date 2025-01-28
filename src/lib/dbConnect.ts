import mongoose from 'mongoose';

const dbUrl: string = process.env.MONGODB_URI || '';

const dbConnect = async () => {
    try {
        await mongoose.connect(dbUrl, {
            serverSelectionTimeoutMS: 20000,
        });

        console.log('Connected to database');
    } catch (error) {
        console.error(error);
    }
};

export default dbConnect;
