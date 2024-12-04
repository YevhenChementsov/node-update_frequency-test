import { scheduleJob } from 'node-schedule';

import { messages, monitorFile } from '../helpers/index.js';

export const scheduleTask = () => {
  scheduleJob('Hourly update detection', '0 * * * *', async () => {
    console.log(messages.data.monitor);
    await monitorFile();
  });
};
