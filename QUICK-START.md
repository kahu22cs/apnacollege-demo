# Quick Start Guide

Get your E-Commerce application running in minutes!

## Prerequisites

- Node.js (v14 or higher)
- MySQL (v5.7 or higher)
- npm or yarn

## Installation

### Option 1: Automated Setup (Recommended)

```bash
# Run the setup script
chmod +x setup.sh
./setup.sh
```

### Option 2: Manual Setup

**1. Install Backend Dependencies**
```bash
cd backend
npm install
```

**2. Install Frontend Dependencies**
```bash
cd frontend
npm install
```

**3. Configure Environment**
```bash
# Create .env file in backend directory
cp backend/.env.example backend/.env

# Edit backend/.env with your settings:
# - DB_PASSWORD: Your MySQL password
# - JWT_SECRET: A secure random string
```

**4. Create Database**
```sql
CREATE DATABASE ecommerce_db;
```

## Running the Application

### Start Backend Server
```bash
cd backend
npm start
```
Backend will run on: http://localhost:5000

### Start Frontend Development Server
```bash
cd frontend
npm run dev
```
Frontend will run on: http://localhost:5173

## First Time Use

1. Open http://localhost:5173 in your browser
2. Click "Sign Up" to create an account
3. Fill in your name, email, and password
4. You'll be automatically logged in
5. Browse products and add items to your cart!

## Sample Products

The application comes pre-loaded with 6 sample products:
- Wireless Headphones ($99.99)
- Smart Watch ($199.99)
- Laptop Backpack ($49.99)
- Coffee Maker ($79.99)
- Running Shoes ($89.99)
- Yoga Mat ($29.99)

## Testing the API

### Using cURL

**Health Check:**
```bash
curl http://localhost:5000/api/health
```

**Get Products:**
```bash
curl http://localhost:5000/api/products
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### Using Postman

Import the included Postman collection:
1. Open Postman
2. Click "Import"
3. Select `E-Commerce-API.postman_collection.json`
4. Start testing!

## Project Structure

```
├── backend/               # Node.js + Express backend
│   ├── src/
│   │   ├── config/       # Database configuration
│   │   ├── controllers/  # Route controllers
│   │   ├── middleware/   # Auth & rate limiting
│   │   ├── models/       # Sequelize models
│   │   ├── routes/       # API routes
│   │   └── server.js     # Entry point
│   └── package.json
│
├── frontend/             # React + Vite frontend
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── contexts/     # Auth & Cart contexts
│   │   ├── pages/        # Page components
│   │   ├── utils/        # API utilities
│   │   ├── App.jsx       # Main app component
│   │   └── main.jsx      # Entry point
│   └── package.json
│
├── API-DOCUMENTATION.md           # Full API docs
├── README-ECOMMERCE.md           # Detailed readme
└── E-Commerce-API.postman_collection.json  # Postman collection
```

## Available Scripts

### Backend
- `npm start` - Start the server
- `npm run dev` - Start with auto-reload (Node.js --watch)

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Common Issues

### Port Already in Use
If port 5000 or 5173 is already in use, update:
- Backend: Change `PORT` in `backend/.env`
- Frontend: Change port in `frontend/vite.config.js`

### Database Connection Error
- Ensure MySQL is running
- Check credentials in `backend/.env`
- Verify database `ecommerce_db` exists

### CORS Error
The backend has CORS enabled by default. If you change the frontend URL, update the CORS configuration in `backend/src/server.js`

## Security Features

✅ Password hashing with bcrypt  
✅ JWT authentication  
✅ Rate limiting on all routes  
✅ Protected API endpoints  
✅ No known vulnerabilities in dependencies  

## Next Steps

- Read the [Full Documentation](README-ECOMMERCE.md)
- Check out [API Documentation](API-DOCUMENTATION.md)
- Import the Postman collection for testing
- Customize the application for your needs

## Need Help?

- Check the documentation files
- Review the code comments
- Test with the Postman collection
- Ensure all services are running

Happy coding! 🚀
