import CartsDAO from '../dao/carts.dao.js';
import TicketsDAO from '../dao/tickets.dao.js';
import ProductsDAO from '../dao/products.dao.js';
import logger from '../logs/logger.js';

export async function createCart(req, res) {
    try {
        logger.info("Añadiendo nuevo carrito...")
        const cartId = await CartsDAO.add();
        logger.info("Carrito añadido exitosamente")
        res.status(201).json({ message: 'Carrito añadido exitosamente', cartId: cartId });
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

export async function getCart(req, res) {
    try {
        logger.info("Buscando carrito por ID...")
        const cartId = req.params.cid;
        const cart = await CartsDAO.getById(cartId);
        if(cart){
            logger.info("Carrito encontrado por ID")
            res.json(cart);
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

export async function addProductToCart(req, res) {
    try {
        logger.info("Añadiendo producto al carrito...")
        const cartId = req.body.cartId;
        if (!cartId) {
            logger.error("No se encontró ID del carrito")
            return res.status(400).json({ error: 'cartId is required' });
        }

        const productId = req.params.pid;
        if(req.user && req.user.role === "premium"){
            const productToBeAdded = await ProductsDAO.getById(productId)
            
            if(productToBeAdded.owner === req.user._id.toString()){
                logger.error("El usuario no puede agregar su propio producto al carrito")
                return res.status(400).json({ error: 'No puedes añadir tu propio producto al carrito'})
            }
        }

        const quantity = 1;

        await CartsDAO.addProduct(cartId, productId, quantity);

        logger.info('Producto añadido exitosamente')
        res.status(201).json({ message: 'Producto añadido exitosamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function addProductWithQuantityToCart(req, res) {
    logger.info("Añadiendo producto al carrito...")

    const cartId = req.params.cid;
    const productId = req.params.pid;
    const quantity = parseInt(req.body.quantity) || 1;
    try {
        await CartsDAO.addProduct(cartId, productId, quantity)
        logger.info('Producto añadido exitosamente')
        res.status(201).json({ message: 'Producto añadido al carrito' });
    } catch (error) {
        logger.error('Ocurrió un error al añadir el producto al carrito')
        res.status(400).json({ error: error.message })
    }
}

export async function deleteProductFromCart(req, res) {
    logger.info("Eliminando producto del carrito...")

    const cartId = req.params.cid;
    const productId = req.params.pid;
    try {
        await CartsDAO.deleteProduct(cartId, productId);
        logger.info('Producto eliminado del carrito exitosamente')
        res.json({ message: 'Producto eliminado del carrito exitosamente' })
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export async function updateCartProducts(req, res) {
    logger.info("Actualizando producto/s del carrito...")

    const cartId = req.params.cid;
    const products = req.body.products;
    try {
        await CartsDAO.updateProducts(cartId, products);
        logger.info('Carrito actualizado exitosamente')
        res.json({ message: 'Carrito actualizado exitosamente' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export async function updateProductQuantityInCart(req, res) {
    logger.info("Actualizando cantidad de productos en el carrito...")

    const cartId = req.params.cid;
    const productId = req.params.pid;
    const quantity = parseInt(req.body.quantity) || 1;
    try {
        await CartsDAO.updateProductQuantity(cartId, productId, quantity);
        logger.info('Cantidad de productos actualizada exitosamente')
        res.json({ message: 'Cantidad de productos actualizada exitosamente' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export async function deleteAllProductsFromCart(req, res) {
    logger.info("Eliminando todos los productos del carrito")
    const cartId = req.params.cid;
    try {
        await CartsDAO.deleteAllProducts(cartId);
        logger.info('Todos los productos eliminados del carrito exitosamente')
        res.json({ message: 'Todos los productos eliminados del carrito exitosamente' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// La feature de purchase será testeable solo vía postman por el momento
export async function purchaseCart(req, res) {
    const cartId = req.params.cid;
    try {
        const cart = await CartsDAO.getById(cartId);
        const purchaser = req.user.email;

        let failedProducts = [];
        let totalAmount = 0;

        // Separo los items con y sin stock, y actualizo el stock de cada producto
        for (const item of cart.products) {
            const product = await ProductsDAO.getById(item.productId);
            if (product.stock >= item.quantity) {
                totalAmount += product.price * item.quantity;
                const newStock = product.stock - item.quantity;
                await ProductsDAO.update(item.productId, {stock: newStock});
            } else {
                failedProducts.push(item.productId);
            }
        }

        const ticketId = await TicketsDAO.add(totalAmount, purchaser);

        // Actualizo el carrito para contener solo los productos que no se pudieron comprar
        if (failedProducts.length > 0) {
            const filteredProducts = cart.products.filter(item => !failedProducts.includes(item.productId));
            await CartsDAO.updateProducts(cartId, filteredProducts);
        } else {
            await CartsDAO.deleteAllProducts(cartId);
        }

        res.json({ ticketId: ticketId, failedProducts: failedProducts });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}