import { Schema, model } from 'mongoose';

const ticketSchema = new Schema({
    code: { type: String, required: true, max: 100, unique: true },
    purchase_datetime: { type: Date, default: Date.now },
    amount: { type: Number, required: true },
    purchaser: { type: String, required: true, max: 100 }
});

export const ticketsModel = model('tickets', ticketSchema);