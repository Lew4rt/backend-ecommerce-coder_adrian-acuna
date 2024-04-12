import ProductsDAO from '../dao/products.dao.js';
import { generateFakeProduct } from '../utils/utils.js';

export async function getAllProducts(req, res) {
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
}

export async function getProductById(req, res) {
   try {
      const productId = req.params.pid;
      const product = await ProductsDAO.getById(productId);

      res.json(product);
   } catch (error) {
      res.status(404).json({ error: error.message });
   }
}

export async function addProduct(req, res) {
   try {
      const productData = req.body
      await ProductsDAO.add(productData)
      res.status(201).json({ message: 'Producto añadido exitosamente' });
   } catch (error) {
      if (error.message === 'El código de producto debe ser único') {
         res.status(400).json({ error: 'El código de producto debe ser único' });
      } else {
         res.status(500).json({ error: 'Error al añadir producto' });
      }
   }
}

export async function updateProduct(req, res) {
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
}

export async function deleteProduct(req, res) {
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
}

export async function getGeneratedProducts(req, res) {
   const products = [];
   for (let i = 0; i < 100; i++) {
      products.push(generateFakeProduct())
   }
   res.json(products)
}

export function parseQueryMiddleware(req, res, next) {
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
}