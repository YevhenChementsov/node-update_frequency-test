import { messages } from './getMessage.js';
import { writeLogMessage } from './index.js';

const { changed, noUpdates } = messages;

export const detectChanges = async (previousData, currentData) => {
  const { data: previousContent, metadata: previousMetadata } = previousData;
  const { data: currentContent, metadata: currentMetadata } = currentData;

  if (JSON.stringify(previousContent) !== JSON.stringify(currentContent)) {
    console.log(changed.content);
    await writeLogMessage(changed.content);
    return true;
  }

  if (previousMetadata?.hash !== currentMetadata.hash) {
    console.log(changed.hash);
    await writeLogMessage(changed.hash);
    return true;
  }

  if (previousMetadata?.size !== currentMetadata.size) {
    console.log(changed.fileSize);
    await writeLogMessage(changed.fileSize);
    return true;
  }

  if (previousMetadata?.lastModified !== currentMetadata.lastModified) {
    console.log(changed.lastModified);
    await writeLogMessage(changed.lastModified);
    return true;
  }

  console.log(noUpdates);
  await writeLogMessage(noUpdates);
  return false;
};
