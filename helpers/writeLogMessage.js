import { Log } from '../db/models/log.js';
import { messages } from './index.js';

export const writeLogMessage = async message => {
  try {
    const logEntry = new Log({ message });
    await logEntry.save();
    console.log(messages.db.save.log.success, message);
  } catch (error) {
    console.error(messages.db.save.log.error, error);
  }
};
