import { writeLogMessage } from './writeLogMessage';

export const detectChanges = async (previousData, currentData) => {
  const { data: previousContent, metadata: previousMetadata } = previousData;
  const { data: currentContent, metadata: currentMetadata } = currentData;

  if (previousContent && !previousContent.equals(currentContent)) {
    console.log('Content has changed.');
    writeLogMessage('Content has changed.');
    return true;
  }

  if (previousMetadata?.hash !== currentMetadata.hash) {
    console.log('Hash has changed.');
    writeLogMessage('Hash has changed.');
    return true;
  }

  if (previousMetadata?.size !== currentMetadata.size) {
    console.log('File size has changed.');
    writeLogMessage('File size has changed.');
    return true;
  }

  if (previousMetadata?.lastModified !== currentMetadata.lastModified) {
    console.log('Last-Modified header has changed.');
    writeLogMessage('Last-Modified header has changed.');
    return true;
  }

  console.log('No changes detected.');
  writeLogMessage('No changes detected.');
  return false;
};
