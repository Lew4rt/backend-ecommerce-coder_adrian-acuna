import express from 'express';
import * as CartController from '../controllers/carts.controller.js';

const cartRouter = express.Router();

cartRouter.post('/', CartController.createCart);
cartRouter.get('/:cid', CartController.getCart);
cartRouter.post('/:pid', CartController.addProductToCart);
cartRouter.post('/:cid/product/:pid', CartController.addProductWithQuantityToCart);
cartRouter.delete('/:cid/product/:pid', CartController.deleteProductFromCart);
cartRouter.put('/:cid', CartController.updateCartProducts);
cartRouter.put('/:cid/product/:pid', CartController.updateProductQuantityInCart);
cartRouter.delete('/:cid', CartController.deleteAllProductsFromCart);

export default cartRouter;