import { Schema, model } from 'mongoose';

const logSchema = new Schema({
  timestamp: { type: Date, default: Date.now },
  message: { type: String, required: true },
});

export const Log = model('Log', logSchema);
