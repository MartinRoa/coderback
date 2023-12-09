import { Schema, model } from 'mongoose';

const msgSchema = new Schema({
  user: { type: String, required: true, max: 100 },
  message: { type: String, required: true, max: 100 },
  // comments: [
  //   {
  //     text: String,
  //   },
  // ],
});

export const msgModel = model('messages', msgSchema);