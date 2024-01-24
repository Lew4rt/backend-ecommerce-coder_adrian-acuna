import express from 'express';
const router = express.Router();

import ProductManager from '../src/ProductManager.js';
const productManager = ProductManager.getInstance();

productManager.loadProducts();

router.get('/', async (req, res) => {
    try {
       let limit = req.query.limit;
       let products;
 
       if (limit) {
          products = productManager.getProducts().slice(0, +limit);
       } else {
          products = productManager.getProducts();
       }
 
       res.json(products);
    } catch (error) {
       res.status(500).json({ error: error.message });
    }
});

router.get('/:pid', async (req, res) => {
    try {
       const productId = parseInt(req.params.pid);
       const product = productManager.getProductById(productId);
 
       res.json(product);
    } catch (error) {
       res.status(404).json({ error: error.message });
    }
 });

 router.post('/', async (req, res) => {
   try {
      const productData = req.body
      productManager.addProduct(productData)
      res.status(201).json({message: 'Producto añadido exitosamente'});
   }catch (error){
      res.status(400).json({error: error.message})
   }
 })

 router.put('/:pid', async (req, res) => {
   try {
       const productId = parseInt(req.params.pid);
       const updatedFields = req.body;

       const success = productManager.updateProduct(productId, updatedFields);

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
       const productId = parseInt(req.params.pid);

       const success = productManager.deleteProduct(productId);

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