import 'dotenv/config';
import mongoose from 'mongoose';

import { messages } from '../helpers/index.js';

const { DB_HOST } = process.env;

mongoose.set('strictQuery', true);

export const connectToDB = async () => {
  try {
    await mongoose.connect(DB_HOST);
  } catch (error) {
    console.error(messages.db.connect.error, error);
    process.exit(1);
  }
};
