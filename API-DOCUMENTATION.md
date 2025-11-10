# E-Commerce API Documentation

Base URL: `http://localhost:5000/api`

## Authentication

All authentication endpoints return a JWT token that should be included in subsequent requests using the `Authorization: Bearer <token>` header.

### 1. Sign Up

Create a new user account.

**Endpoint:** `POST /auth/signup`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Success Response (201):**
```json
{
  "message": "User created successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "john@example.com",
    "name": "John Doe"
  }
}
```

**Error Responses:**
- `400`: All fields are required / User already exists
- `500`: Server error

### 2. Login

Authenticate an existing user.

**Endpoint:** `POST /auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Success Response (200):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "john@example.com",
    "name": "John Doe"
  }
}
```

**Error Responses:**
- `400`: Email and password are required
- `401`: Invalid credentials
- `500`: Server error

---

## Products

### 1. Get All Products

Retrieve all products from the database.

**Endpoint:** `GET /products`

**Headers:** None required (public endpoint)

**Success Response (200):**
```json
[
  {
    "id": 1,
    "name": "Wireless Headphones",
    "description": "High-quality wireless headphones with noise cancellation",
    "price": "99.99",
    "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    "category": "Electronics",
    "stock": 50,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  },
  {
    "id": 2,
    "name": "Smart Watch",
    "description": "Feature-rich smartwatch with fitness tracking",
    "price": "199.99",
    "image": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    "category": "Electronics",
    "stock": 30,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

**Error Response:**
- `500`: Server error

### 2. Get Product By ID

Retrieve a specific product by its ID.

**Endpoint:** `GET /products/:id`

**Headers:** None required (public endpoint)

**URL Parameters:**
- `id` (integer) - Product ID

**Success Response (200):**
```json
{
  "id": 1,
  "name": "Wireless Headphones",
  "description": "High-quality wireless headphones with noise cancellation",
  "price": "99.99",
  "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
  "category": "Electronics",
  "stock": 50,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

**Error Responses:**
- `404`: Product not found
- `500`: Server error

### 3. Create Product

Create a new product (admin functionality).

**Endpoint:** `POST /products`

**Headers:** None required for now (can be protected later)

**Request Body:**
```json
{
  "name": "Laptop Stand",
  "description": "Ergonomic laptop stand for better posture",
  "price": 34.99,
  "image": "https://example.com/laptop-stand.jpg",
  "category": "Accessories",
  "stock": 75
}
```

**Success Response (201):**
```json
{
  "id": 7,
  "name": "Laptop Stand",
  "description": "Ergonomic laptop stand for better posture",
  "price": "34.99",
  "image": "https://example.com/laptop-stand.jpg",
  "category": "Accessories",
  "stock": 75,
  "updatedAt": "2024-01-01T00:00:00.000Z",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

**Error Responses:**
- `400`: Required fields are missing
- `500`: Server error

---

## Cart

All cart endpoints require authentication. Include the JWT token in the `Authorization` header:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 1. Get Cart

Retrieve all items in the user's cart.

**Endpoint:** `GET /cart`

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
[
  {
    "id": 1,
    "userId": 1,
    "productId": 1,
    "quantity": 2,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z",
    "Product": {
      "id": 1,
      "name": "Wireless Headphones",
      "price": "99.99",
      "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"
    }
  },
  {
    "id": 2,
    "userId": 1,
    "productId": 2,
    "quantity": 1,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z",
    "Product": {
      "id": 2,
      "name": "Smart Watch",
      "price": "199.99",
      "image": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"
    }
  }
]
```

**Error Responses:**
- `401`: No token provided / Invalid or expired token
- `500`: Server error

### 2. Add to Cart

Add a product to the cart or update quantity if it already exists.

**Endpoint:** `POST /cart`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "productId": 1,
  "quantity": 2
}
```

**Success Response (200 or 201):**
```json
{
  "id": 1,
  "userId": 1,
  "productId": 1,
  "quantity": 2,
  "updatedAt": "2024-01-01T00:00:00.000Z",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

**Error Responses:**
- `400`: Product ID is required
- `401`: No token provided / Invalid or expired token
- `404`: Product not found
- `500`: Server error

### 3. Update Cart Item

Update the quantity of a cart item.

**Endpoint:** `PUT /cart/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**URL Parameters:**
- `id` (integer) - Cart item ID

**Request Body:**
```json
{
  "quantity": 3
}
```

**Success Response (200):**
```json
{
  "id": 1,
  "userId": 1,
  "productId": 1,
  "quantity": 3,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

**Error Responses:**
- `400`: Valid quantity is required
- `401`: No token provided / Invalid or expired token
- `404`: Cart item not found
- `500`: Server error

### 4. Remove from Cart

Remove a specific item from the cart.

**Endpoint:** `DELETE /cart/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**URL Parameters:**
- `id` (integer) - Cart item ID

**Success Response (200):**
```json
{
  "message": "Item removed from cart"
}
```

**Error Responses:**
- `401`: No token provided / Invalid or expired token
- `404`: Cart item not found
- `500`: Server error

### 5. Clear Cart

Remove all items from the user's cart.

**Endpoint:** `DELETE /cart`

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "message": "Cart cleared"
}
```

**Error Responses:**
- `401`: No token provided / Invalid or expired token
- `500`: Server error

---

## Testing with cURL

### Sign Up
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Get All Products
```bash
curl http://localhost:5000/api/products
```

### Get Product by ID
```bash
curl http://localhost:5000/api/products/1
```

### Add to Cart (requires token)
```bash
curl -X POST http://localhost:5000/api/cart \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "productId": 1,
    "quantity": 2
  }'
```

### Get Cart (requires token)
```bash
curl http://localhost:5000/api/cart \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Update Cart Item (requires token)
```bash
curl -X PUT http://localhost:5000/api/cart/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "quantity": 3
  }'
```

### Remove from Cart (requires token)
```bash
curl -X DELETE http://localhost:5000/api/cart/1 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Clear Cart (requires token)
```bash
curl -X DELETE http://localhost:5000/api/cart \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## Health Check

Check if the server is running.

**Endpoint:** `GET /health`

**Success Response (200):**
```json
{
  "status": "ok",
  "message": "Server is running"
}
```

---

## Error Codes Summary

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created successfully |
| 400 | Bad request / Missing required fields |
| 401 | Unauthorized / Invalid token |
| 404 | Resource not found |
| 500 | Internal server error |

---

## Notes

- All timestamps are in ISO 8601 format
- JWT tokens expire after 7 days
- Passwords are hashed using bcrypt with 10 salt rounds
- Product images use Unsplash URLs in the seed data
- Cart items automatically include related Product data
