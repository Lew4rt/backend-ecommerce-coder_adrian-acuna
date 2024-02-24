import express from 'express';
// import CartManager from '../src/dao/CartManager.js';
import CartsDAO from '../dao/carts.dao.js';

const cartRouter = express.Router();

// Actualizo los servicios para que funcionen con Mongo en vez de FileSystem

// const cartManager = new CartManager();
// cartManager.loadCartData();

// Crea un nuevo carrito con nueva id y un array de productos vacío, utilizando los middlewares previamente creados
cartRouter.post('/', async (req, res) => {
    try {
        const cartId = await CartsDAO.add();
        res.status(201).json({ message: 'Carrito añadido exitosamente', cartId: cartId });
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
});

// Obtiene los productos de un carrito específico
cartRouter.get('/:cid', async (req, res) => {
    try {
        const cartId = req.params.cid;
        const cart = await CartsDAO.getById(cartId);
        res.json(cart);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
});

// Añade un producto a un carrito existente en client-side
cartRouter.post('/:pid', async (req, res) => {
    try {
        const cartId = req.body.cartId;

        if (!cartId) {
          return res.status(400).json({ error: 'cartId is required' });
        }

        const productId = req.params.pid;
        const quantity = 1;

        await CartsDAO.addProduct(cartId, productId, quantity);

        res.status(201).json({ message: 'Producto añadido exitosamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Añade UN producto y su cantidad (default: 1) con determinada ID a un carrito con determinada ID
cartRouter.post('/:cid/product/:pid', async (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const quantity = parseInt(req.body.quantity) || 1;
    try {
        await CartsDAO.addProduct(cartId, productId, quantity)
        res.status(201).json({ message: 'Producto añadido al carrito' });
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
});

// Elimina un producto del carrito (Y toda su quantity)
cartRouter.delete('/:cid/product/:pid', async (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    try {
        await CartsDAO.deleteProduct(cartId, productId);
        res.json({ message: 'Producto eliminado del carrito exitosamente' })
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

// Actualiza el array de productos en el carrito
cartRouter.put('/:cid', async (req, res) => {
    const cartId = req.params.cid;
    const products = req.body.products;
    try {
        await CartsDAO.updateProducts(cartId, products);
        res.json({ message: 'Carrito actualizado exitosamente' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Actualiza la cantidad del producto seleccionado en el carrito
cartRouter.put('/:cid/product/:pid', async (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const quantity = parseInt(req.body.quantity) || 1;
    try {
        await CartsDAO.updateProductQuantity(cartId, productId, quantity);
        res.json({ message: 'Cantidad de productos actualizada exitosamente' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Elimina todos los productos existentes en el carrito
cartRouter.delete('/:cid', async (req, res) => {
    const cartId = req.params.cid;
    try {
        await CartsDAO.deleteAllProducts(cartId);
        res.json({ message: 'Todos los productos eliminados del carrito exitosamente' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

export default cartRouter;