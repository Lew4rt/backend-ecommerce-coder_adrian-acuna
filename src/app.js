const express = require('express');
const ProductManager = require('./ProductManager');
const PORT = 8080;

const app = express();
const productManager = new ProductManager();

// Cargo los productos al iniciar el servidor
productManager.loadProducts();

// Endpoint para obtener los productos
app.get('/products', async (req, res) => {
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

// Endpoint para obtener un producto por ID
app.get('/products/:pid', async (req, res) => {
   try {
      const productId = parseInt(req.params.pid);
      const product = productManager.getProductById(productId);

      res.json(product);
   } catch (error) {
      res.status(404).json({ error: error.message });
   }
});

app.listen(PORT, () => {
   console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});