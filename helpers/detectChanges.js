import { messages } from './getMessage.js';
import { writeLogMessage } from './index.js';

const { changed, noUpdates } = messages;

export const detectChanges = async (previousMetadata, currentMetadata) => {
  const changes = [];

  if (previousMetadata?.contentLength !== currentMetadata.contentLength) {
    console.log(changed.content);
    changes.push(changed.content);
  }

  if (previousMetadata?.hash !== currentMetadata.hash) {
    console.log(changed.hash);
    changes.push(changed.hash);
  }

  if (previousMetadata?.size !== currentMetadata.size) {
    console.log(changed.fileSize);
    changes.push(changed.fileSize);
  }

  if (previousMetadata?.lastModified !== currentMetadata.lastModified) {
    console.log(changed.lastModified);
    changes.push(changed.lastModified);
  }

  if (changes.length > 0) {
    await writeLogMessage(`Update detected: ${changes.join(', ')}.`);
    return true;
  } else {
    console.log(noUpdates);
    await writeLogMessage(noUpdates);
    return false;
  }
};
