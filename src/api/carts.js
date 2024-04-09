import express from 'express';
import * as CartController from '../controllers/carts.controller.js';
import passport from 'passport';
import { permissions_middleware } from '../utils.js';

const cartRouter = express.Router();

// Esta autenticación asegura que 'req.user' va a devolvernos una respuesta al momento de llamar a permissions_middleware
cartRouter.use(passport.authenticate("jwt", {session:false}));

cartRouter.post('/', CartController.createCart);
cartRouter.get('/:cid', CartController.getCart);
cartRouter.post('/:pid', permissions_middleware("user"), CartController.addProductToCart);
cartRouter.post('/:cid/product/:pid', permissions_middleware("user"), CartController.addProductWithQuantityToCart);
cartRouter.delete('/:cid/product/:pid', permissions_middleware("user"), CartController.deleteProductFromCart);
cartRouter.put('/:cid', permissions_middleware("user"), CartController.updateCartProducts);
cartRouter.put('/:cid/product/:pid', permissions_middleware("user"), CartController.updateProductQuantityInCart);
cartRouter.delete('/:cid', CartController.deleteAllProductsFromCart);
cartRouter.post('/:cid/purchase', CartController.purchaseCart)

export default cartRouter;