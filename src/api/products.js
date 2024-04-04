import express from 'express';
import * as ProductController from '../controllers/products.controller.js';

const router = express.Router();

router.get('/', ProductController.parseQueryMiddleware, ProductController.getAllProducts);
router.get('/:pid', ProductController.getProductById);
router.post('/', ProductController.addProduct);
router.put('/:pid', ProductController.updateProduct);
router.delete('/:pid', ProductController.deleteProduct);

export default router;