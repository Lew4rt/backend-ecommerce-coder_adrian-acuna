import express from 'express';
import ProductsDAO from '../src/dao/products.dao.js';

const router = express.Router();

// Actualizo los servicios para que funcionen con Mongo en vez de FileSystem

// import ProductManager from '../src/dao/ProductManager.js';
// const productManager = ProductManager.getInstance();

// productManager.loadProducts();

// Acá al igual que en views, decidí implementar un middleware que convierte lo que recibo en query a objeto Json, para que pueda funcionar con el filter del método paginate
const parseQueryMiddleware = (req, res, next) => {
   const { query } = req.query;

   if (query) {
       try {
           const parsedQuery = query.split('&').reduce((acc, pair) => {
               const [key, value] = pair.split('=');
               acc[key] = value;
               return acc;
           }, {});

           req.parsedQuery = parsedQuery;
       } catch (error) {
           return res.status(400).json({ error: 'Invalid query parameter format' });
       }
   }

   next();
};


router.get('/', parseQueryMiddleware, async (req, res) => {
   try {
      const { limit, page, sort } = req.query;
      const query = req.parsedQuery;

      const products = await ProductsDAO.getAll({
         limit,
         page,
         sort,
         query: query,
      });

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