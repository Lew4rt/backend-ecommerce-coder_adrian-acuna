import mongoose from "mongoose";

const TicketSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
    },
    purchase_datetime: {
        type: Date,
        default: Date.now,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    purchaser: {
        type: String,
        required: true,
    },
})

export default mongoose.model('tickets', TicketSchema);
