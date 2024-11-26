import { messages } from './getMessage.js';
import { writeLogMessage } from './index.js';

const { changed, noUpdates } = messages;

export const detectChanges = async (previousMetadata, currentMetadata) => {
  let changeCount = 0;

  if (previousMetadata?.contentLength !== currentMetadata.contentLength) {
    console.log(changed.content);
    changeCount += 1;
    await writeLogMessage(
      `${changed.content}\n Was: ${previousMetadata?.contentLength}\n Now: ${currentMetadata.contentLength}.`,
    );
  }

  if (previousMetadata?.hash !== currentMetadata.hash) {
    console.log(changed.hash);
    changeCount += 1;
    await writeLogMessage(
      `${changed.hash}\n Was: ${previousMetadata?.hash}\n Now: ${currentMetadata.hash}.`,
    );
  }

  if (previousMetadata?.size !== currentMetadata.size) {
    console.log(changed.fileSize);
    changeCount += 1;
    await writeLogMessage(
      `${changed.fileSize}\n Was: ${previousMetadata?.size}\n Now: ${currentMetadata.size}.`,
    );
  }

  if (previousMetadata?.lastModified !== currentMetadata.lastModified) {
    console.log(changed.lastModified);
    changeCount += 1;
    await writeLogMessage(
      `${changed.lastModified}\n Was: ${previousMetadata?.lastModified}\n Now: ${currentMetadata.lastModified}.`,
    );
  }

  if (changeCount > 0) {
    return true;
  } else {
    console.log(noUpdates);
    await writeLogMessage(noUpdates);
    return false;
  }
};
