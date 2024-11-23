import { writeLogMessage } from './index.js';

export const detectChanges = async (previousData, currentData) => {
  const { data: previousContent, metadata: previousMetadata } = previousData;
  const { data: currentContent, metadata: currentMetadata } = currentData;

  if (JSON.stringify(previousContent) !== JSON.stringify(currentContent)) {
    console.log('Content has changed.');
    await writeLogMessage('Content has changed.');
    return true;
  }

  if (previousMetadata?.hash !== currentMetadata.hash) {
    console.log('Hash has changed.');
    await writeLogMessage('Hash has changed.');
    return true;
  }

  if (previousMetadata?.size !== currentMetadata.size) {
    console.log('File size has changed.');
    await writeLogMessage('File size has changed.');
    return true;
  }

  if (previousMetadata?.lastModified !== currentMetadata.lastModified) {
    console.log('Last-Modified header has changed.');
    await writeLogMessage('Last-Modified header has changed.');
    return true;
  }

  console.log('No changes detected.');
  await writeLogMessage('No updates were detected.');
  return false;
};
