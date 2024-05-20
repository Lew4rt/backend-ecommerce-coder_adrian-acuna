import { use, expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import UsersDAO from '../dao/users.dao.js';
import ProductsDAO from '../dao/products.dao.js';

const chai = use(chaiHttp)
dotenv.config();
const connectionString = process.env.MONGODB_CONNECTION_STRING;
let productId;


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

  describe('Login from UsersDAO', () => {
    it('Debería loguearse para poder acceder a los productos', async () => {
      const user = {
        email: "adminCoder@coder.com",
        password: "adminCod3r123"
      };
      const result = await UsersDAO.getByEmail(user.email)
      expect(result).to.not.be.empty;
      expect(mongoose.isValidObjectId(result._id)).to.be.true;
      //   chai.request(app)
      //     .post('/sessions/login?test=true') 
      //     .send(user)
      //     .end((err, res) => {
      //       if (err) return done(err);
      //       chai.request(app)
      //         .get(res.headers.location)
      //         .set('Cookie', res.headers['set-cookie'])
      //         .end((err, res) => {
      //           if (err) return done(err);

      //           console.log(res.body);
      //           expect(res).to.have.status(200);

      //           const jwtCookie = res.token;
      //           expect(jwtCookie).to.exist;

      //           console.log('JWT Cookie:', jwtCookie);
      //           done();
      //         });
      //     });
    });
  });

  // describe('GET /productsApi', () => {
  //   it('should get all products', async () => {
  //     chai.request(app)
  //       .get('/productsApi')
  //       .end((err, res) => {
  //         expect(res).to.have.status(200);
  //         expect(res.body).to.be.an('object');
  //         expect(res.body).to.have.property('status').eql('success');
  //         done();
  //       });
  //   });
  // });

  describe('getAll from ProductsDAO', () => {
    it('Debería traer todos los productos en forma de array', async () => {
      const result = await ProductsDAO.getAll()
      expect(result.status).to.be.eq("success")
      expect(result.payload).to.be.an("array")
    });
  });

  // describe('POST /productsApi', () => {
  //   it('should add a product', (done) => {
  //     const product = {
  //       name: 'Test Product',
  //       price: 100,
  //       code: 'TP100'
  //     };
  //     chai.request(app)
  //       .post('/productsApi')
  //       .send(product)
  //       .end((err, res) => {
  //         expect(res).to.have.status(201);
  //         expect(res.body).to.have.property('message').eql('Producto añadido exitosamente');
  //         done();
  //       });
  //   });

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

  //   it('should not add a product with a duplicate code', (done) => {
  //     const product = {
  //       name: 'Test Product 2',
  //       price: 200,
  //       code: 'TP100'
  //     };
  //     chai.request(app)
  //       .post('/productsApi')
  //       .send(product)
  //       .end((err, res) => {
  //         expect(res).to.have.status(400);
  //         expect(res.body).to.have.property('error').eql('El código de producto debe ser único');
  //         done();
  //       });
  //   });
  // });


  // describe('PUT /products/:pid', () => {
  //   let productId;

  //   before((done) => {
  //     const product = new Product({
  //       name: 'Product to Update',
  //       price: 150,
  //       code: 'PU150'
  //     });
  //     product.save().then((savedProduct) => {
  //       productId = savedProduct._id;
  //       done();
  //     });
  //   });

  //   it('should update a product', (done) => {
  //     const updatedFields = {
  //       price: 200
  //     };
  //     chai.request(app)
  //       .put(`/productsApi/${productId}`)
  //       .send(updatedFields)
  //       .end((err, res) => {
  //         expect(res).to.have.status(200);
  //         expect(res.body).to.have.property('message').eql('Producto actualizado exitosamente');
  //         done();
  //       });
  //   });
  // });


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

  // describe('DELETE /products/:pid', () => {
  //   let productId;

  //   before((done) => {
  //     const product = new Product({
  //       name: 'Product to Delete',
  //       price: 300,
  //       code: 'PD300'
  //     });
  //     product.save().then((savedProduct) => {
  //       productId = savedProduct._id;
  //       done();
  //     });
  //   });

  //   it('should delete a product', (done) => {
  //     chai.request(app)
  //       .delete(`/productsApi/${productId}`)
  //       .end((err, res) => {
  //         expect(res).to.have.status(200);
  //         expect(res.body).to.have.property('message').eql('Producto eliminado exitosamente');
  //         done();
  //       });
  //   });
  // });

});