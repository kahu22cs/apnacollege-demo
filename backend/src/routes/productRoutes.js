import express from 'express';
import { getAllProducts, getProductById, createProduct } from '../controllers/productController.js';
import { apiLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.get('/', apiLimiter, getAllProducts);
router.get('/:id', apiLimiter, getProductById);
router.post('/', apiLimiter, createProduct);

export default router;
