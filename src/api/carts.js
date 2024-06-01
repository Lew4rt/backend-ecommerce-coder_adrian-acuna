import express from 'express';
import * as CartController from '../controllers/carts.controller.js';
import passport from 'passport';
import { permissions_middleware } from '../utils/utils.js';

const cartRouter = express.Router();

// Esta autenticación asegura que 'req.user' va a devolvernos una respuesta al momento de llamar a permissions_middleware
cartRouter.use(passport.authenticate("jwt", { session: false }));

cartRouter.post('/', CartController.createCart);
cartRouter.get('/:cid', CartController.getCart);
cartRouter.post('/:pid', permissions_middleware("user", "premium"), CartController.addProductToCart);
cartRouter.post('/:cid/product/:pid', permissions_middleware("user", "premium"), CartController.addProductWithQuantityToCart);
cartRouter.delete('/:cid/product/:pid', permissions_middleware("user", "premium"), CartController.deleteProductFromCart);
cartRouter.put('/:cid', permissions_middleware("user", "premium"), CartController.updateCartProducts);
cartRouter.put('/:cid/product/:pid', permissions_middleware("user", "premium"), CartController.updateProductQuantityInCart);
cartRouter.delete('/:cid', permissions_middleware("user", "premium"), CartController.deleteAllProductsFromCart);
cartRouter.post('/:cid/purchase', permissions_middleware("user", "premium"), CartController.purchaseCart)

export default cartRouter;