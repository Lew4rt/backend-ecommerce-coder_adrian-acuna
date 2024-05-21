import { expect } from 'chai';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import UsersDAO from '../dao/users.dao.js';

dotenv.config();
const connectionString = process.env.MONGODB_CONNECTION_STRING;

describe('Users Router', function () {
  let createdUserIds = [];

  before((done) => {
    mongoose.connect(connectionString, { dbName: 'test' })
      .then(() => done())
      .catch(err => done(err));
  });

  after((done) => {
    mongoose.connection.close()
      .then(() => done())
      .catch(err => done(err));
  });

  // Agregué esta función para mantener limpia la base de datos a medida que repetimos los tests
  afterEach(async () => {
    if (createdUserIds.length > 0) {
      await UsersDAO.deleteAll(createdUserIds);
      createdUserIds = [];
    }
  });

  describe('getByEmail from UsersDAO', () => {
    it('Debería obtener un usuario por su email', async () => {
      const testEmail = "testuser@example.com";
      const user = await UsersDAO.add("Test", "User", 30, testEmail, "password123");
      createdUserIds.push(user._id.toString());
      const result = await UsersDAO.getByEmail(testEmail);
      expect(result).to.exist;
      expect(result.email).to.equal(testEmail);
    });
  });

  describe('getByCreds from UsersDAO', () => {
    it('Debería obtener un usuario por sus credenciales', async () => {
      const testEmail = "testuser2@example.com";
      const testPassword = "password123";
      const user = await UsersDAO.add("Test", "User", 30, testEmail, testPassword);
      createdUserIds.push(user._id.toString());
      const result = await UsersDAO.getByCreds(testEmail, testPassword);
      expect(result).to.exist;
      expect(result.email).to.equal(testEmail);
    });

    it('Debería devolver null si las credenciales no coinciden', async () => {
      const result = await UsersDAO.getByCreds("nonexistent@example.com", "wrongpassword");
      expect(result).to.be.null;
    });
  });

  describe('add from UsersDAO', () => {
    it("Debería añadir un usuario a la base de datos", async () => {
      const newUser = {
        first_name: "New",
        last_name: "User",
        age: 25,
        email: "newuser@example.com",
        password: "password123"
      };
      const result = await UsersDAO.add(newUser.first_name, newUser.last_name, newUser.age, newUser.email, newUser.password);
      createdUserIds.push(result._id.toString());
      expect(result).to.have.property('_id');
    });

    it("Debería no añadir un usuario con un email duplicado", async () => {
      const duplicateEmail = "duplicate@example.com";
      const user = await UsersDAO.add("First", "User", 25, duplicateEmail, "password123");
      createdUserIds.push(user._id.toString());

      try {
        await UsersDAO.add("Second", "User", 30, duplicateEmail, "password123");
      } catch (err) {
        expect(err).to.be.an('error');
        expect(err.message).to.include('El email está en uso');
      }
    });
  });

  describe('getByID from UsersDAO', () => {
    it('Debería obtener un usuario por su ID', async () => {
      const user = await UsersDAO.add("Another", "User", 30, "anotheruser@example.com", "password123");
      createdUserIds.push(user._id.toString());
      const result = await UsersDAO.getByID(user._id.toString());
      expect(result).to.exist;
      expect(result.email).to.equal("anotheruser@example.com");
    });

    it('Debería devolver null si el ID no existe', async () => {
      const nonExistentID = new mongoose.Types.ObjectId();
      const result = await UsersDAO.getByID(nonExistentID.toString());
      expect(result).to.be.null;
    });
  });

  describe('update from UsersDAO', () => {
    it('Debería actualizar los campos del usuario', async () => {
      const user = await UsersDAO.add("User", "ToUpdate", 30, "updateuser@example.com", "password123");
      createdUserIds.push(user._id.toString());
      const updatedFields = { first_name: "Updated", age: 35 };
      const result = await UsersDAO.update(user._id.toString(), updatedFields);
      expect(result).to.be.true;

      const updatedUser = await UsersDAO.getByID(user._id.toString());
      expect(updatedUser.first_name).to.equal("Updated");
      expect(updatedUser.age).to.equal(35);
    });

    it('Debería devolver false si el ID no existe', async () => {
      const nonExistentID = new mongoose.Types.ObjectId();
      const result = await UsersDAO.update(nonExistentID.toString(), { first_name: "NonExistent" });
      expect(result).to.be.false;
    });
  });
});
