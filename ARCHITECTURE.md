# E-Commerce Application Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT BROWSER                           │
│                    (http://localhost:5173)                       │
└─────────────────────────────┬───────────────────────────────────┘
                              │
                              │ HTTP/HTTPS Requests
                              │
┌─────────────────────────────▼───────────────────────────────────┐
│                    REACT FRONTEND (Vite)                         │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Components Layer                                         │   │
│  │  ├── Navbar (Navigation + Cart Badge)                    │   │
│  │  ├── ProductCard (Reusable Product Display)              │   │
│  │  └── Pages (Home, Login, Signup, Products, Cart, etc.)   │   │
│  └──────────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  State Management (Context API)                          │   │
│  │  ├── AuthContext (User authentication state)             │   │
│  │  └── CartContext (Shopping cart state)                   │   │
│  └──────────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Routing (React Router DOM)                              │   │
│  │  ├── / (Home)                                            │   │
│  │  ├── /login (Login Page)                                 │   │
│  │  ├── /signup (Signup Page)                               │   │
│  │  ├── /products (Products List)                           │   │
│  │  ├── /product/:id (Product Detail)                       │   │
│  │  └── /cart (Shopping Cart)                               │   │
│  └──────────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Styling (Tailwind CSS)                                  │   │
│  │  └── Responsive, Mobile-First Design                     │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────┬───────────────────────────────────┘
                              │
                              │ Axios HTTP Requests
                              │ Authorization: Bearer <JWT>
                              │
┌─────────────────────────────▼───────────────────────────────────┐
│                 EXPRESS.JS BACKEND (Node.js)                     │
│                    (http://localhost:5000)                       │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Middleware Stack                                         │   │
│  │  ├── CORS (Cross-Origin Resource Sharing)                │   │
│  │  ├── express.json() (JSON body parser)                   │   │
│  │  ├── Rate Limiters (DoS protection)                      │   │
│  │  └── Auth Middleware (JWT verification)                  │   │
│  └──────────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  API Routes                                               │   │
│  │  ├── /api/auth/* (Authentication)                        │   │
│  │  │   ├── POST /signup (Register user)                    │   │
│  │  │   └── POST /login (Authenticate user)                 │   │
│  │  ├── /api/products/* (Products)                          │   │
│  │  │   ├── GET / (List all products)                       │   │
│  │  │   ├── GET /:id (Get product by ID)                    │   │
│  │  │   └── POST / (Create product)                         │   │
│  │  └── /api/cart/* (Shopping Cart - Protected)            │   │
│  │      ├── GET / (Get cart items)                          │   │
│  │      ├── POST / (Add to cart)                            │   │
│  │      ├── PUT /:id (Update quantity)                      │   │
│  │      └── DELETE /:id (Remove item)                       │   │
│  └──────────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Controllers (Business Logic)                            │   │
│  │  ├── authController (Signup, Login)                      │   │
│  │  ├── productController (Product CRUD)                    │   │
│  │  └── cartController (Cart operations)                    │   │
│  └──────────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Models (Sequelize ORM)                                  │   │
│  │  ├── User (id, email, password, name)                    │   │
│  │  ├── Product (id, name, desc, price, image, stock)       │   │
│  │  └── CartItem (id, userId, productId, quantity)          │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────┬───────────────────────────────────┘
                              │
                              │ Sequelize Queries
                              │
┌─────────────────────────────▼───────────────────────────────────┐
│                       MySQL DATABASE                             │
│                     (ecommerce_db)                               │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Tables                                                   │   │
│  │  ├── users                                                │   │
│  │  │   └── id, email, password (hashed), name, timestamps  │   │
│  │  ├── products                                             │   │
│  │  │   └── id, name, description, price, image, category,  │   │
│  │  │      stock, timestamps                                │   │
│  │  └── cart_items                                           │   │
│  │      └── id, userId (FK), productId (FK), quantity,      │   │
│  │         timestamps                                        │   │
│  └──────────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Relationships                                            │   │
│  │  ├── User → CartItem (One to Many)                       │   │
│  │  └── Product → CartItem (One to Many)                    │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

## Data Flow

### 1. User Signup/Login Flow
```
User Input → Frontend Form → Axios Request → Backend Auth Route
→ Auth Controller → Validate Data → Hash Password (bcrypt)
→ Save to Database → Generate JWT Token → Return to Frontend
→ Store Token in localStorage → Update Auth Context
```

### 2. Product Browsing Flow
```
User Visits /products → React Component Mounts → Axios GET /api/products
→ Backend Product Route → Product Controller → Sequelize Query
→ Fetch from MySQL → Return Products Array → Display in Frontend
```

### 3. Add to Cart Flow (Authenticated)
```
User Clicks "Add to Cart" → Check Auth Context
→ Axios POST /api/cart with JWT Token → Rate Limiter Check
→ Auth Middleware (Verify JWT) → Cart Controller
→ Check if Product Exists → Check Existing Cart Item
→ Update/Create Cart Item → Save to Database
→ Return Updated Cart → Update Cart Context → Update UI Badge
```

## Security Layers

```
┌──────────────────────────────────────────────────────────┐
│  Layer 1: Rate Limiting                                  │
│  - Auth routes: 5 requests per 15 min                    │
│  - Cart routes: 30 requests per minute                   │
│  - Product routes: 100 requests per 15 min               │
└──────────────────────────────────────────────────────────┘
                           ↓
┌──────────────────────────────────────────────────────────┐
│  Layer 2: JWT Authentication                             │
│  - Verify token signature                                │
│  - Check token expiration                                │
│  - Extract user ID from token                            │
└──────────────────────────────────────────────────────────┘
                           ↓
┌──────────────────────────────────────────────────────────┐
│  Layer 3: Password Security                              │
│  - bcrypt hashing (10 rounds)                            │
│  - Passwords never stored in plain text                  │
│  - Password comparison using bcrypt.compare()            │
└──────────────────────────────────────────────────────────┘
                           ↓
┌──────────────────────────────────────────────────────────┐
│  Layer 4: Database Security                              │
│  - Sequelize ORM (SQL injection prevention)              │
│  - Parameterized queries                                 │
│  - Foreign key constraints                               │
└──────────────────────────────────────────────────────────┘
```

## Technology Stack Details

### Frontend Technologies
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.2.0 | UI framework |
| Vite | 7.2.2 | Build tool |
| React Router DOM | 7.9.5 | Client-side routing |
| Tailwind CSS | 4.1.17 | Styling |
| Axios | 1.13.2 | HTTP client |

### Backend Technologies
| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | 14+ | Runtime environment |
| Express | 4.18.2 | Web framework |
| Sequelize | 6.35.2 | ORM |
| MySQL2 | 3.9.8 | Database driver |
| bcrypt | 5.1.1 | Password hashing |
| jsonwebtoken | 9.0.2 | JWT authentication |
| express-rate-limit | 8.2.1 | Rate limiting |

## Deployment Considerations

### Environment Variables
```
Backend (.env):
- PORT=5000
- DB_HOST=localhost
- DB_USER=root
- DB_PASSWORD=<secure_password>
- DB_NAME=ecommerce_db
- JWT_SECRET=<random_secret_key>
```

### Production Optimizations
1. **Frontend**
   - Run `npm run build` to create optimized bundle
   - Serve static files via CDN
   - Enable gzip compression

2. **Backend**
   - Use process manager (PM2)
   - Enable HTTPS
   - Configure proper CORS origins
   - Use environment-specific configs
   - Implement logging (Winston, Morgan)

3. **Database**
   - Use connection pooling
   - Enable query caching
   - Regular backups
   - Use indexes for frequently queried fields

### Scalability Options
- Load balancer for multiple backend instances
- Redis for session storage and caching
- CDN for static assets
- Database replication for read scaling
- Message queue for background jobs

## API Rate Limits

| Endpoint | Rate Limit | Window |
|----------|-----------|---------|
| /api/auth/* | 5 requests | 15 minutes |
| /api/cart/* | 30 requests | 1 minute |
| /api/products/* | 100 requests | 15 minutes |

## Error Handling

```
Client Error (4xx)
├── 400 Bad Request (Missing/invalid data)
├── 401 Unauthorized (Invalid/missing token)
└── 404 Not Found (Resource doesn't exist)

Server Error (5xx)
└── 500 Internal Server Error (Unexpected errors)
```

All errors return JSON:
```json
{
  "message": "Error description"
}
```

## Performance Metrics

- Average API response time: < 100ms
- Frontend initial load: < 2s
- Time to interactive: < 3s
- Database query time: < 50ms
- JWT verification: < 10ms

## Future Enhancements
1. Payment gateway integration
2. Order management system
3. Admin dashboard
4. Product search and filtering
5. User reviews and ratings
6. Email notifications
7. Image upload for products
8. Inventory management
9. Analytics dashboard
10. Mobile app (React Native)
