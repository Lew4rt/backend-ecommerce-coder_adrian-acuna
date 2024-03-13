import mongoose from "mongoose";

// ¿Es necesario que el formato de user sea el mismo que el del ejercicio en clase? No le veo utilidad a datos como "last_name", "age", no al proyecto que tengo pensado a futuro al menos.
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
        required: false
    },
    role: {
        type: String,
        required: true,
        default: "user"
    }
});

export default mongoose.model("users", UsersSchema);