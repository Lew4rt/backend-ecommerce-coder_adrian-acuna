import express from 'express';
import ProductsDAO from '../dao/products.dao.js';
import CartsDAO from '../dao/carts.dao.js';

const viewsRouter = express.Router();

// --- Alerta para segunda preentrega ---
// Con el nuevo formato en el que recibimos los productos, '/' queda deprecado, en su lugar se redirije al usuario a /products, que es el endpoint que pide la consigna
viewsRouter.get('/', async (req, res) => {
    try {
        res.redirect('/products');
        // const productsData = await ProductsDAO.getAll();
        // // Renderiza la vista home.handlebars y pasa la información de productos
        // res.render('home', { products: productsData });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

viewsRouter.get('/realtimeproducts', async (req, res) => {
    try {
        const productsData = await ProductsDAO.getAll();
        res.render('realTimeProducts', { products: productsData });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

viewsRouter.get('/chat', async (req, res) => {
    try {
        res.render('chat', {})
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

// --- Segunda entrega ---

// Acá decidí implementar un middleware que convierte lo que recibo en query a objeto Json, para que pueda funcionar con el filter del método paginate.
// Para su uso, por ejemplo, podríamos buscar por params http://localhost:8080/products?query=stock=8, y traerá el/los productos con 8 de stock.
// Sinceramente no me gusta como está implementado esto, pero siguiendo la consigna no se me ocurrió una mejor manera.
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

viewsRouter.get('/products', parseQueryMiddleware, async (req, res) => {
    try {
        const { limit, page, sort } = req.query;
        const query = req.parsedQuery;
        const productsData = await ProductsDAO.getAll({
            limit,
            page,
            sort,
            query: query,
        });

        res.render('products', { data: productsData })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

viewsRouter.get('/products/:productId', async (req, res) => {
    try {
      const productId = req.params.productId;
      const product = await ProductsDAO.getById(productId);
  
      res.render('productDetail', { product });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });


 viewsRouter.get('/carts/:cid', async (req, res) => {
   try {
     const cartId = req.params.cid;
     const cart = await CartsDAO.getById(cartId);
 
     res.render('cart', { cart });
   } catch (error) {
     res.status(500).json({ error: error.message });
   }
 });

export default viewsRouter;