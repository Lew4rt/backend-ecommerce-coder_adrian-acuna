import { expect } from 'chai';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import CartsDAO from '../dao/carts.dao.js';
import ProductsDAO from '../dao/products.dao.js';

dotenv.config();
const connectionString = process.env.MONGODB_CONNECTION_STRING;

describe('Carts Router', function () {
  let createdCartIds = [];
  let createdProductId = null

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
    if (createdCartIds.length > 0) {
      await Promise.all(createdCartIds.map(async (cartId) => {
        await CartsDAO.delete(cartId);
      }));
      createdCartIds = [];
    }
    if(createdProductId){
      await ProductsDAO.delete(createdProductId)
    }
  });
  describe('add from CartsDAO', () => {
    it("Debería añadir un carrito a la base de datos", async () => {
      const cartId = await CartsDAO.add();
      createdCartIds.push(cartId);
      expect(cartId).to.be.a('string');
    });
  });

  describe('getById from CartsDAO', () => {
    it('Debería obtener un carrito por su ID', async () => {
      const cartId = await CartsDAO.add();
      createdCartIds.push(cartId);

      const result = await CartsDAO.getById(cartId);
      expect(result).to.exist;
      expect(result._id.toString()).to.equal(cartId);
    });

    it('Debería devolver error si el ID no existe', async () => {
      const nonExistentID = new mongoose.Types.ObjectId();
      try {
        await CartsDAO.getById(nonExistentID.toString());
      } catch (err) {
        expect(err).to.be.an('error');
        expect(err.message).to.include("Failed to get cart by ID");
      }
    });
  });

  describe('addProduct from CartsDAO', () => {
    it('Debería añadir un producto a un carrito existente', async () => {
      const cartId = await CartsDAO.add();
      createdCartIds.push(cartId);
      const returnProduct = true
      const newTestingProduct = {
        title: "Product from testing env",
        description: "Product description from testing env",
        price: "1.99",
        code: "tes110",
        stock: "10"
      }
      const productInDb = await ProductsDAO.add(newTestingProduct, returnProduct)
      createdProductId = productInDb._id
      await CartsDAO.addProduct(cartId, productInDb._id.toString(), 1);

      const cart = await CartsDAO.getById(cartId);
      expect(cart).to.exist;
      expect(cart.products).to.have.lengthOf(1);
      expect(cart.products[0].productId._id.toString()).to.equal(productInDb._id.toString());
      expect(cart.products[0].quantity).to.equal(1);
    });
  });

  describe('deleteProduct from CartsDAO', () => {
    it('Debería eliminar un producto de un carrito existente', async () => {
      const cartId = await CartsDAO.add();
      createdCartIds.push(cartId);

      const productId = new mongoose.Types.ObjectId();
      await CartsDAO.addProduct(cartId, productId, 1);
      let cart = await CartsDAO.getById(cartId);
      expect(cart).to.exist;
      expect(cart.products).to.have.lengthOf(1);

      await CartsDAO.deleteProduct(cartId, productId);
      cart = await CartsDAO.getById(cartId);
      expect(cart.products).to.have.lengthOf(0);
    });
  });

  describe('deleteAllProducts from CartsDAO', () => {
    it('Debería eliminar todos los productos de un carrito existente', async () => {
      const cartId = await CartsDAO.add();
      createdCartIds.push(cartId);

      await CartsDAO.addProduct(cartId, new mongoose.Types.ObjectId(), 1);
      await CartsDAO.addProduct(cartId, new mongoose.Types.ObjectId(), 2);

      let cart = await CartsDAO.getById(cartId);
      expect(cart).to.exist;
      expect(cart.products).to.have.lengthOf(2);

      await CartsDAO.deleteAllProducts(cartId);
      cart = await CartsDAO.getById(cartId);
      expect(cart.products).to.have.lengthOf(0);
    });
  });
});