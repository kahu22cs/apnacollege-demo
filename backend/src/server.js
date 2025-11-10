import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './config/database.js';
import { User, Product, CartItem } from './models/index.js';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Database sync and seed
const initDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');

    await sequelize.sync({ alter: true });
    console.log('Database synchronized.');

    // Seed some products if none exist
    const productCount = await Product.count();
    if (productCount === 0) {
      await Product.bulkCreate([
        {
          name: 'Wireless Headphones',
          description: 'High-quality wireless headphones with noise cancellation',
          price: 99.99,
          image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
          category: 'Electronics',
          stock: 50
        },
        {
          name: 'Smart Watch',
          description: 'Feature-rich smartwatch with fitness tracking',
          price: 199.99,
          image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
          category: 'Electronics',
          stock: 30
        },
        {
          name: 'Laptop Backpack',
          description: 'Durable backpack with laptop compartment',
          price: 49.99,
          image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
          category: 'Accessories',
          stock: 100
        },
        {
          name: 'Coffee Maker',
          description: 'Programmable coffee maker with thermal carafe',
          price: 79.99,
          image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500',
          category: 'Home',
          stock: 25
        },
        {
          name: 'Running Shoes',
          description: 'Comfortable running shoes with excellent support',
          price: 89.99,
          image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
          category: 'Sports',
          stock: 60
        },
        {
          name: 'Yoga Mat',
          description: 'Non-slip yoga mat with carrying strap',
          price: 29.99,
          image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500',
          category: 'Sports',
          stock: 80
        }
      ]);
      console.log('Sample products created.');
    }
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

// Start server
const startServer = async () => {
  await initDatabase();
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

startServer();
