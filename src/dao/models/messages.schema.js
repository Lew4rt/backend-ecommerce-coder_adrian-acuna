import mongoose from "mongoose";

// Tuve que mover el schema y el dao adentro de public para funcionar client side

const MessagesSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
})

export default mongoose.model('messages', MessagesSchema);
