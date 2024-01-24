import express from 'express';
import ProductManager from '../ProductManager.js';

// Me traigo ProductManager via singleton para utilizar la misma instancia
const productManager = ProductManager.getInstance();
const viewsRouter = express.Router();


viewsRouter.get('/', async (req, res) => {
    try {
        productManager.loadProducts();
        const productsData = productManager.getProducts();
        // Renderiza la vista home.handlebars y pasa la información de productos
        res.render('home', { products: productsData });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

viewsRouter.get('/realtimeproducts', async (req, res) => {
    try {
        productManager.loadProducts();
        const productsData = productManager.getProducts();
        res.render('realTimeProducts', { products: productsData });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default viewsRouter;