import express from 'express';
import ProductsDAO from '../src/dao/products.dao.js';

const router = express.Router();

// Actualizo los servicios para que funcionen con Mongo en vez de FileSystem

// import ProductManager from '../src/dao/ProductManager.js';
// const productManager = ProductManager.getInstance();

// productManager.loadProducts();

router.get('/', async (req, res) => {
   try {
      let limit = req.query.limit;
      let products;

      if (limit) {
         products = await ProductsDAO.getAll().slice(0, +limit);
      } else {
         products = await ProductsDAO.getAll();
      }

      res.json(products);
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
});

router.get('/:pid', async (req, res) => {
   try {
      const productId = req.params.pid;
      const product = await ProductsDAO.getById(productId);

      res.json(product);
   } catch (error) {
      res.status(404).json({ error: error.message });
   }
});

router.post('/', async (req, res) => {
   try {
      const productData = req.body
      await ProductsDAO.add(productData)
      res.status(201).json({ message: 'Producto añadido exitosamente' });
   } catch (error) {
      res.status(400).json({ error: error.message })
   }
})

router.put('/:pid', async (req, res) => {
   try {
      const productId = req.params.pid;
      const updatedFields = req.body;

      const success = await ProductsDAO.update(productId, updatedFields);

      if (success) {
         res.json({ message: 'Producto actualizado exitosamente' });
      } else {
         res.status(404).json({ error: 'Producto no encontrado' });
      }
   } catch (error) {
      res.status(400).json({ error: error.message });
   }
});

router.delete('/:pid', async (req, res) => {
   try {
      const productId = req.params.pid;

      const success = await ProductsDAO.delete(productId);

      if (success) {
         res.json({ message: 'Producto eliminado exitosamente' });
      } else {
         res.status(404).json({ error: 'Producto no encontrado' });
      }
   } catch (error) {
      res.status(400).json({ error: error.message });
   }
});

export default router;