import express from 'express';
import { getCart, addToCart, updateCartItem, removeFromCart, clearCart } from '../controllers/cartController.js';
import { authMiddleware } from '../middleware/auth.js';
import { cartLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.use(authMiddleware);
router.use(cartLimiter);

router.get('/', getCart);
router.post('/', addToCart);
router.put('/:id', updateCartItem);
router.delete('/:id', removeFromCart);
router.delete('/', clearCart);

export default router;
