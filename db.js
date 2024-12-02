import 'dotenv/config';
import mongoose from 'mongoose';

const { DB_HOST } = process.env;

mongoose.set('strictQuery', true);

export const connectToDB = async () => {
  try {
    await mongoose.connect(DB_HOST);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};
