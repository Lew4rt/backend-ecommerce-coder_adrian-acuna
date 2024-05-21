import { use, expect } from 'chai';
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import ProductsDAO from '../dao/products.dao.js';

dotenv.config();
const connectionString = process.env.MONGODB_CONNECTION_STRING;


describe('Products Router', function () {

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

  describe('getAll from ProductsDAO', () => {
    it('Debería traer todos los productos en forma de array', async () => {
      const result = await ProductsDAO.getAll()
      expect(result.status).to.be.eq("success")
      expect(result.payload).to.be.an("array")
    });
  });

  describe('add from ProductsDAO', () => {
    it("Debería añadir un producto a la base de datos", async () => {
      const newTestingProduct = {
        title: "Product from testing env",
        description: "Product description from testing env",
        price: "1.99",
        code: "tes111",
        stock: "10"
      }
      const result = await ProductsDAO.add(newTestingProduct)
      expect(result).to.be.true;
    })
    it("Debería no añadir un producto con un código duplicado", async () => {
      const newTestingProduct = {
        title: "Product from testing env",
        description: "Product description from testing env",
        price: "1.99",
        code: "tes111",
        stock: "10"
      }
      try {
        await ProductsDAO.add(newTestingProduct);
      } catch (err) {
        expect(err).to.be.an('error');
        expect(err.message).to.equal('El código de producto debe ser único');
      }
    })
  })

  describe('delete from ProductsDAO', () => {
    it("Debería eliminar de la base de datos el producto previamente creado", async () => {
      const products = await ProductsDAO.getAll()
      const productsLastPage = await ProductsDAO.getAll({ page: products.totalPages })
      const lastProductCreated = productsLastPage.payload[productsLastPage.payload.length - 1]
      expect(lastProductCreated).to.exist
      const result = await ProductsDAO.delete(lastProductCreated._id.toString())
      expect(result).to.be.true
    })
  })
});