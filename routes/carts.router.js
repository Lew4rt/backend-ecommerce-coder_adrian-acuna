const express = require('express');
const fs = require('fs/promises');

const cartRouter = express.Router();

const cartFilePath = './cart.json';

// Autoincrementación de id con cada carrito creado
class IdGenerator {
    constructor() {
        this.nextId = 1;
    }
    generateId() {
        return (this.nextId++).toString();
    }
}

const cartIdGenerator = new IdGenerator();

// Para este router, a diferencia de los productos que usé funciones en una clase aparte,
// decidí implementar custom middlewares para tener un código más prolijo y mantenible

async function loadCartData(req, res, next) {
    try {
        const data = await fs.readFile(cartFilePath, 'utf-8');
        req.cartData = JSON.parse(data);
    } catch (error) {
        req.cartData = { carts: [] };
    }
    next();
}

async function saveCartData(req, res, next) {
    try {
        const data = JSON.stringify(req.cartData, null, 2);
        await fs.writeFile(cartFilePath, data, 'utf-8');
    } catch (error) {
        console.error('Error guardando datos del carrito:', error);
    }
    next();
}

// Crea un nuevo carrito con nueva id y un array de productos vacío, utilizando los middlewares previamente creados
cartRouter.post('/', loadCartData, (req, res, next) => {
    const newCart = {
        id: cartIdGenerator.generateId(),
        products: [],
    };

    req.cartData.carts.push(newCart);
    res.status(201).json(newCart);

    next();
}, saveCartData);

// Obtiene los productos de un carrito específico
cartRouter.get('/:cid', loadCartData, (req, res) => {
    const cartId = req.params.cid;
    const cart = req.cartData.carts.find((c) => c.id === cartId);

    if (!cart) {
        return res.status(404).json({ error: 'Carrito no encontrado' });
    }

    res.json(cart.products);
});

// Añade UN producto y su cantidad (default: 1) con determinada ID a un carrito con determinada ID
cartRouter.post('/:cid/product/:pid', loadCartData, (req, res, next) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const quantity = parseInt(req.body.quantity) || 1;

    const cart = req.cartData.carts.find((c) => c.id === cartId);

    if (!cart) {
        return res.status(404).json({ error: 'Carrito no encontrado' });
    }

    const existingProduct = cart.products.find((p) => p.product === productId);

    if (existingProduct) {
        existingProduct.quantity += quantity;
    } else {
        cart.products.push({ product: productId, quantity });
    }

    res.status(201).json({ message: 'Producto añadido al carrito con éxito' });

    next();
}, saveCartData);

module.exports = cartRouter;