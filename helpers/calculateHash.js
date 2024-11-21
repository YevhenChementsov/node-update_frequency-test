import { createHash } from 'node:crypto';

export const calculateHash = data =>
  createHash('sha256').update(data).digest('hex');
