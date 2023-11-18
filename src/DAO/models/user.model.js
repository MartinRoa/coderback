import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  firstName: { type: String, required: true, max: 100 },
  lastName: { type: String || null, max: 100 },
  email: { type: String, required: true, max: 100, unique: true },
  age: { type: Number || null },
  password: { type: String, max: 8 },
  cart: { type: String, required:  true },
  role: { type: String, required: true, max: 100, default: "user" }
});

export const userModel = model('users', userSchema);