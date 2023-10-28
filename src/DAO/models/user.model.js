import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  firstName: { type: String, required: true, max: 100 },
  lastName: { type: String, required: true, max: 100 },
  email: { type: String, required: true, max: 100, unique: true },
  age: { type: Number, required: true },
  password: { type: String, required: true, max: 100 },
  isAdmin: { type: Boolean, required: true }
});

export const userModel = model('users', userSchema);