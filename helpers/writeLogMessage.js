import { Log } from '../models/log.js';

export const writeLogMessage = async message => {
  try {
    const logEntry = new Log({ message });
    await logEntry.save();
    console.log('Log saved to MongoDB:', message);
  } catch (error) {
    console.error('Error saving log to MongoDB:', error);
  }
};
