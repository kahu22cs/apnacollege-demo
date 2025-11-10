import { CartItem, Product } from '../models/index.js';

export const getCart = async (req, res) => {
  try {
    const userId = req.userId;
    const cartItems = await CartItem.findAll({
      where: { userId },
      include: [{
        model: Product,
        attributes: ['id', 'name', 'price', 'image']
      }]
    });

    res.json(cartItems);
  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const addToCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId, quantity = 1 } = req.body;

    if (!productId) {
      return res.status(400).json({ message: 'Product ID is required' });
    }

    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const existingCartItem = await CartItem.findOne({
      where: { userId, productId }
    });

    if (existingCartItem) {
      existingCartItem.quantity += quantity;
      await existingCartItem.save();
      res.json(existingCartItem);
    } else {
      const cartItem = await CartItem.create({
        userId,
        productId,
        quantity
      });
      res.status(201).json(cartItem);
    }
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const updateCartItem = async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({ message: 'Valid quantity is required' });
    }

    const cartItem = await CartItem.findOne({
      where: { id, userId }
    });

    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    cartItem.quantity = quantity;
    await cartItem.save();

    res.json(cartItem);
  } catch (error) {
    console.error('Update cart error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;

    const cartItem = await CartItem.findOne({
      where: { id, userId }
    });

    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    await cartItem.destroy();
    res.json({ message: 'Item removed from cart' });
  } catch (error) {
    console.error('Remove from cart error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const clearCart = async (req, res) => {
  try {
    const userId = req.userId;
    await CartItem.destroy({ where: { userId } });
    res.json({ message: 'Cart cleared' });
  } catch (error) {
    console.error('Clear cart error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
