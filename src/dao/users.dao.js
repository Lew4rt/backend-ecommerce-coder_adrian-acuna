import users from "./models/users.schema.js";

class UsersDAO {

    static async getByEmail(email) {
        try {
            return await users.findOne({ email }); 
        } catch (error) {
            throw new Error("Error obteniendo el usuario con su email: " + error.message);
        }
    }

    static async getByCreds(email, password) {
        try {
            return await users.findOne({ email, password });
        } catch (error) {
            throw new Error("Error obteniendo el usuario con sus credenciales: " + error.message);
        }
    }

    static async add(first_name, last_name, age, email, password) {
        try {
            return await new users({ first_name, last_name, age, email, password}).save();
        } catch (error) {
            throw new Error("Error añadiendo un usuario: " + error.message);
        }
    }

    static async getByID(id) {
        try {
            return await users.findOne(
                { _id: id },
                { first_name: 1, last_name: 1, age: 1, email: 1, role: 1 }
            ).lean();
        } catch (error) {
            throw new Error("Error in getUserByID: " + error.message);
        }
    }

    static async update(id, updatedFields) {
        try {
            const result = await users.findByIdAndUpdate(id, updatedFields, { new: true });
            return result !== null;
        } catch (err) {
            throw new Error('Failed to update user');
        }
    }
}

export default UsersDAO;