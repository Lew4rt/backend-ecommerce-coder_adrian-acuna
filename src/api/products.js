import express from 'express';
import * as ProductController from '../controllers/products.controller.js';
import { permissions_middleware } from '../utils/utils.js';
import passport from 'passport';

const router = express.Router();

// Esta autenticación asegura que 'req.user' va a devolvernos una respuesta al momento de llamar a permissions_middleware
router.use(passport.authenticate("jwt", { session: false }));

router.get('/mockingproducts', ProductController.getGeneratedProducts);
router.get('/', ProductController.parseQueryMiddleware, ProductController.getAllProducts);
router.get('/:pid', ProductController.getProductById);
router.post('/', permissions_middleware("admin"), ProductController.addProduct);
router.put('/:pid', permissions_middleware("admin"), ProductController.updateProduct);
router.delete('/:pid', permissions_middleware("admin"), ProductController.deleteProduct);

export default router;