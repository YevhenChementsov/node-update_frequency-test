import { messages, writeLogMessage } from './index.js';

export const detectChanges = async (previousMetadata, currentMetadata) => {
  const changes = [];

  if (previousMetadata?.contentLength !== currentMetadata.contentLength) {
    console.log(messages.data.changed.content);
    changes.push(messages.data.changed.content);
  }

  if (previousMetadata?.hash !== currentMetadata.hash) {
    console.log(messages.data.changed.hash);
    changes.push(messages.data.changed.hash);
  }

  if (previousMetadata?.size !== currentMetadata.size) {
    console.log(messages.data.changed.fileSize);
    changes.push(messages.data.changed.fileSize);
  }

  if (previousMetadata?.lastModified !== currentMetadata.lastModified) {
    console.log(messages.data.changed.lastModified);
    changes.push(messages.data.changed.lastModified);
  }

  if (changes.length > 0) {
    await writeLogMessage(`Update detected: ${changes.join(', ')}.`);
    return true;
  } else {
    console.log(messages.data.update.noUpdates);
    await writeLogMessage(messages.data.update.noUpdates);
    return false;
  }
};
