import express from 'express';
import ProductsDAO from '../dao/products.dao.js';

const viewsRouter = express.Router();

viewsRouter.get('/', async (req, res) => {
    try {
        const productsData = await ProductsDAO.getAll();
        // Renderiza la vista home.handlebars y pasa la información de productos
        res.render('home', { products: productsData });
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

export default viewsRouter;