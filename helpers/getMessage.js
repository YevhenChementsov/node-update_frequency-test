export const messages = {
  db: {
    connect: {
      success: 'Connected to MongoDB successfully.',
      error: 'Error connecting to MongoDB:',
    },
    fetch: {
      log: {
        error: 'Error fetching logs from MongoDB:',
      },
    },
    load: {
      metadata: {
        error: 'Error loading metadata from MongoDB:',
      },
    },
    save: {
      metadata: {
        success: 'Metadata saved to MongoDB.',
        error: 'Error saving metadata to MongoDB:',
      },
      log: {
        success: 'Log saved to MongoDB:',
        error: 'Error saving log to MongoDB:',
      },
    },
  },
  data: {
    monitor: 'Starting update detection...',
    fetch: 'Fetching data...',
    update: {
      success: 'New data was saved successfully.',
      noUpdates: 'No updates were detected.',
    },
    noLocalData: 'No local data files found. The first download has started.',
    changed: {
      content: 'Content has changed',
      hash: 'Hash has changed',
      fileSize: 'File size has changed',
      lastModified: 'Last-Modified header has changed',
    },
  },
};
