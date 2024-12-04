import 'dotenv/config';
import { connectToDB } from './db/connectToDB.js';
import { messages } from './helpers/index.js';
import { startServer } from './helpers/startServer.js';
import { scheduleTask } from './tasks/scheduleTask.js';

const { PORT = 3000 } = process.env;

(async () => {
  try {
    await connectToDB();
    console.log(messages.db.connect.success);

    scheduleTask();

    await startServer(PORT);
  } catch (error) {
    console.error('Error during initialization:', error);
  }
})();
