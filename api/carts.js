import express from 'express';
import CartManager from '../src/CartManager.js';

const cartRouter = express.Router();
const cartManager = new CartManager();

cartManager.loadCartData();

// Crea un nuevo carrito con nueva id y un array de productos vacío, utilizando los middlewares previamente creados
cartRouter.post('/', async (req, res) => {
    try{
        cartManager.addCart();
        res.status(201).json({message: 'Carrito añadido exitosamente'});
    }catch(error){
        res.status(400).json({error: error.message})
    }
});

// Obtiene los productos de un carrito específico
cartRouter.get('/:cid', async (req, res) => {
    try {
        const cartId = parseInt(req.params.cid);
        const cart = cartManager.getCartById(cartId);+
  
        res.json(cart);
     } catch (error) {
        res.status(400).json({error: error.message})
     }
});

// Añade UN producto y su cantidad (default: 1) con determinada ID a un carrito con determinada ID
cartRouter.post('/:cid/product/:pid', async (req, res) => {
    const cartId = parseInt(req.params.cid);
    const productId = parseInt(req.params.pid);
    const quantity = parseInt(req.body.quantity) || 1;
    try{
        cartManager.addProductToCart(cartId, productId, quantity)
        res.status(201).json({message: 'Producto añadido al carrito'});
    } catch (error) {
        res.status(400).json({error: error.message})
     }
});

export default cartRouter;