import mongoose from "mongoose";

// ¿Es necesario que el formato de user sea el mismo que el del ejercicio en clase? No le veo utilidad a datos como "last_name", "age", no al proyecto que tengo pensado a futuro al menos.
const UsersSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true
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
    // El tipo de usuario decidí que lo voy a determinar con un boolean seteado desde la base de datos,
    // tal y como dijo el profesor en clase que hagamos, pero contrario a lo que pide la consigna.
    is_admin: {
        type: Boolean,
        required: true
    }
});

export default mongoose.model("users", UsersSchema);