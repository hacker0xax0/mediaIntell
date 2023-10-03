import mongoose from 'mongoose';

const Connection = async () => {
    try {
        const URL = process.env.MONGO_URI;
        await mongoose.connect(URL, { useNewUrlParser: true });
        console.log('connected to database');
    } catch (error) {
        console.log('Error while connecting database', error.message);
    }
};
export { Connection };