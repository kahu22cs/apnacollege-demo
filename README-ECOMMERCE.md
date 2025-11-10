# E-Commerce Web Application

A full-stack e-commerce application built with React, Node.js, Express, and MySQL.

## 🛠️ Tech Stack

### Frontend
- **React.js** with Vite setup
- **React Router DOM** for routing
- **Tailwind CSS** for styling
- **Context API** for state management (Auth & Cart)
- **Axios** for API calls

### Backend
- **Node.js** with Express.js
- **MySQL** database with Sequelize ORM
- **JWT** for authentication
- **bcrypt** for password hashing
- **CORS** enabled

## 📋 Features

### User Authentication
- User signup with email and password
- Secure login with JWT tokens
- Password hashing with bcrypt
- Protected routes

### Product Management
- Browse all products
- View product details
- Product categories
- Product images from Unsplash

### Shopping Cart
- Add products to cart
- Update product quantity
- Remove items from cart
- Clear entire cart
- Cart total calculation
- Cart item count badge

### Responsive Design
- Mobile-first responsive layout
- Clean and modern UI
- Smooth transitions and animations

## 🚀 Installation

### Prerequisites
- Node.js (v14 or higher)
- MySQL database server
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=ecommerce_db
JWT_SECRET=your_secret_key_here
```

4. Create the MySQL database:
```sql
CREATE DATABASE ecommerce_db;
```

5. Start the backend server:
```bash
npm start
```

The backend will run on `http://localhost:5000` and automatically:
- Connect to MySQL database
- Create necessary tables (users, products, cart_items)
- Seed sample products

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173` (or another port if 5173 is busy).

## 📡 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create new product

### Cart (Protected Routes)
- `GET /api/cart` - Get user's cart items
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:id` - Update cart item quantity
- `DELETE /api/cart/:id` - Remove item from cart
- `DELETE /api/cart` - Clear entire cart

## 🗄️ Database Schema

### Users Table
- id (Primary Key)
- email (Unique)
- password (Hashed)
- name
- createdAt
- updatedAt

### Products Table
- id (Primary Key)
- name
- description
- price
- image
- category
- stock
- createdAt
- updatedAt

### Cart Items Table
- id (Primary Key)
- userId (Foreign Key -> users.id)
- productId (Foreign Key -> products.id)
- quantity
- createdAt
- updatedAt

## 🔐 Authentication Flow

1. User signs up with name, email, and password
2. Password is hashed using bcrypt
3. JWT token is generated and returned
4. Token is stored in localStorage
5. Token is included in Authorization header for protected routes
6. Token is verified on backend for protected endpoints

## 🎨 Frontend Pages

- **Home** (`/`) - Landing page with features
- **Products** (`/products`) - Product listing page
- **Product Detail** (`/product/:id`) - Individual product page
- **Login** (`/login`) - User login page
- **Signup** (`/signup`) - User registration page
- **Cart** (`/cart`) - Shopping cart page

## 🧪 Testing the Application

### Using the Application

1. Start both backend and frontend servers
2. Open browser to `http://localhost:5173`
3. Sign up for a new account
4. Browse products
5. Add products to cart
6. View and manage cart

### API Testing with Postman/Thunder Client

#### Signup
```
POST http://localhost:5000/api/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login
```
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Products
```
GET http://localhost:5000/api/products
```

#### Add to Cart (requires JWT token)
```
POST http://localhost:5000/api/cart
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "productId": 1,
  "quantity": 2
}
```

## 📁 Project Structure

```
apnacollege-demo/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── cartController.js
│   │   │   └── productController.js
│   │   ├── middleware/
│   │   │   └── auth.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Product.js
│   │   │   ├── CartItem.js
│   │   │   └── index.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── cartRoutes.js
│   │   │   └── productRoutes.js
│   │   └── server.js
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── ProductCard.jsx
│   │   ├── contexts/
│   │   │   ├── AuthContext.jsx
│   │   │   └── CartContext.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── Products.jsx
│   │   │   ├── ProductDetail.jsx
│   │   │   └── Cart.jsx
│   │   ├── utils/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── package.json
├── .gitignore
└── README-ECOMMERCE.md
```

## 🔧 Configuration

### Backend Configuration
- Port: 5000 (configurable via .env)
- Database: MySQL (configurable via .env)
- JWT expiration: 7 days

### Frontend Configuration
- API URL: http://localhost:5000/api (in `src/utils/api.js`)
- Development server: Vite default (usually 5173)

## 🚨 Common Issues

### Database Connection Error
- Ensure MySQL server is running
- Check database credentials in `.env` file
- Verify database exists

### CORS Error
- Backend has CORS enabled
- Ensure frontend is making requests to correct backend URL

### JWT Token Issues
- Check token is stored in localStorage
- Verify token format in Authorization header
- Ensure JWT_SECRET matches between signup and login

## 📝 Sample Products

The application comes with 6 pre-seeded products:
1. Wireless Headphones
2. Smart Watch
3. Laptop Backpack
4. Coffee Maker
5. Running Shoes
6. Yoga Mat

## 🔒 Security Features

- Password hashing with bcrypt (10 salt rounds)
- JWT-based authentication
- Protected API routes
- Input validation on backend
- SQL injection prevention via Sequelize ORM

## 🎯 Future Enhancements

- Order management
- Payment integration (Stripe/PayPal)
- User profile management
- Product search and filters
- Product reviews and ratings
- Admin dashboard
- Order history
- Email notifications
- Image upload for products
- Wishlist functionality

## 👨‍💻 Author

Karthik Hugar from Gangavathi

## 📄 License

ISC License
