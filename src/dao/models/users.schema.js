import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: false
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: "user"
    },
    documents: [{
        name: {
            type: String,
        },
        reference: {
            type: String,
        }
    }],
    last_connection: {
        type: String,
        default: "",
    }
});

export default mongoose.model("users", UsersSchema);