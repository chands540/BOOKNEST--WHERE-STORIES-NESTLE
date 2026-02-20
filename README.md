# BookNest 📚

A comprehensive full-stack MERN application for buying and selling books online. BookNest provides a platform where users can browse books, manage wishlists, place orders, and sellers can list their books for sale.

**Live Status**: Development Mode  
**API Server**: `http://localhost:5000`  
**Client Server**: `http://localhost:5173`

---

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Environment Setup](#environment-setup)
- [Installation & Setup](#installation--setup)
- [Database Schema](#database-schema)
- [API Endpoints](#api-endpoints)
- [User Roles & Permissions](#user-roles--permissions)
- [Key Features by Role](#key-features-by-role)
- [Getting Started](#getting-started)
- [Troubleshooting](#troubleshooting)

---

## Features

### Core Features
✅ **User Authentication**
- Register with email and password
- JWT-based login system
- Secure password hashing with bcrypt
- Role-based access control (User, Seller, Admin)

✅ **Book Browsing & Discovery**
- Browse all available books with pagination
- Filter books by genre
- Search books by title or author
- View detailed book information with ratings
- Add books to wishlist
- View book ratings and stock availability

✅ **Shopping Cart**
- Add/remove books from cart
- Adjust quantity of items
- Calculate total cart value
- Persistent cart management

✅ **Orders & Checkout**
- Place orders with shipping address
- Track order status (pending, processing, shipped, delivered, cancelled)
- View complete order history
- Order management dashboard

✅ **User Profile**
- View and edit profile information
- Update password
- Manage wishlist items
- View purchase history

✅ **Seller Features**
- Register as seller
- Add new books with details (title, author, genre, price, stock, rating, image)
- Edit existing books
- Delete books from inventory
- Track book sales
- View seller dashboard with statistics

✅ **Admin Features**
- Manage all users in the system
- Manage sellers
- Manage books
- Track all orders
- User deletion capabilities
- Monitor platform statistics

✅ **UI/UX Enhancements**
- Responsive design (mobile, tablet, desktop)
- Glassmorphic design elements
- Dark/light themed pages
- Smooth animations and transitions
- Professional styling with Bootstrap

---

## Technology Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT (jsonwebtoken)** - Authentication tokens
- **bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables

### Frontend
- **React 18** - UI library
- **React Router DOM** - Client-side routing
- **React Bootstrap** - UI component library
- **Axios** - HTTP client
- **Vite** - Build tool and dev server
- **CSS3** - Styling with animations

---

## Project Structure

```
BookNest/
├── server/
│   ├── config/
│   │   └── db.js                    # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js        # Auth logic
│   │   ├── bookController.js        # Book CRUD
│   │   ├── orderController.js       # Order management
│   │   ├── userController.js        # User management
│   │   └── adminController.js       # Admin operations
│   ├── models/
│   │   ├── User.js                  # User schema
│   │   ├── Book.js                  # Book schema
│   │   ├── Cart.js                  # Cart schema
│   │   └── Order.js                 # Order schema
│   ├── routes/
│   │   ├── authRoutes.js            # Auth endpoints
│   │   ├── bookRoutes.js            # Book endpoints
│   │   ├── orderRoutes.js           # Order endpoints
│   │   ├── userRoutes.js            # User endpoints
│   │   └── adminRoutes.js           # Admin endpoints
│   ├── middleware/
│   │   ├── auth.js                  # JWT verification
│   │   ├── roleCheck.js             # Role authorization
│   │   └── errorHandler.js          # Global error handling
│   ├── utils/
│   │   ├── seedData.js              # Database seeding
│   │   └── fixPasswords.js          # Password recovery utility
│   ├── server.js                    # Express app setup
│   └── package.json
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx           # Navigation bar
│   │   │   ├── BookCard.jsx         # Book card component
│   │   │   ├── Loader.jsx           # Loading spinner
│   │   │   └── PrivateRoute.jsx     # Protected routes
│   │   ├── context/
│   │   │   └── AuthContext.jsx      # Auth state management
│   │   ├── pages/
│   │   │   ├── Home.jsx             # Landing page
│   │   │   ├── Login.jsx            # Login page
│   │   │   ├── Register.jsx         # Registration page
│   │   │   ├── Books.jsx            # Books listing page
│   │   │   ├── BookDetails.jsx      # Book detail page
│   │   │   ├── Cart.jsx             # Shopping cart
│   │   │   ├── Orders.jsx           # Orders page
│   │   │   ├── Wishlist.jsx         # Wishlist page
│   │   │   ├── Profile.jsx          # User profile
│   │   │   ├── SellerDashboard.jsx  # Seller dashboard
│   │   │   ├── SellerBooks.jsx      # Seller's books
│   │   │   ├── AddBook.jsx          # Add/Edit book form
│   │   │   ├── AdminDashboard.jsx   # Admin dashboard
│   │   │   ├── AdminUsers.jsx       # Manage users
│   │   │   ├── AdminSellers.jsx     # Manage sellers
│   │   │   └── AdminOrders.jsx      # Manage orders
│   │   ├── services/
│   │   │   └── api.js               # API calls with Axios
│   │   ├── App.jsx                  # Main app component
│   │   ├── App.css                  # Global styles
│   │   ├── index.css                # Global reset styles
│   │   └── main.jsx                 # React entry point
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── README.md
```

---

## Environment Setup

### Backend Environment Variables

Create a `.env` file in the `server` directory:

```env
# Server Configuration
NODE_ENV=development
PORT=5000

# MongoDB Configuration
MONGO_URI=mongodb://localhost:27017/booknest

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here_keep_it_secure
JWT_EXPIRE=7d

# CORS Configuration
CORS_ORIGIN=http://localhost:5173
```

### Frontend Environment Variables

The frontend uses Vite and connects to the backend API at:
```
http://localhost:5000/api
```

---

## Installation & Setup

### Prerequisites
- Node.js v16 or higher
- npm or yarn
- MongoDB (local or Atlas)

### Backend Setup

```bash
cd server

# Install dependencies
npm install

# Seed initial data (optional)
npm run seed

# Start development server
npm run dev

# OR start production server
npm start
```

**Backend should run on**: `http://localhost:5000`

### Frontend Setup

```bash
cd client

# Install dependencies
npm install

# Start development server
npm run dev
```

**Frontend should run on**: `http://localhost:5173`

### Complete Startup

1. **Terminal 1 (Backend)**
   ```bash
   cd server
   npm run dev
   ```

2. **Terminal 2 (Frontend)**
   ```bash
   cd client
   npm run dev
   ```

3. Open browser to `http://localhost:5173`

---

## Database Schema

### User Schema
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  role: String (enum: ['user', 'seller', 'admin'], default: 'user'),
  wishlist: [ObjectId] (references Book),
  timestamps: { createdAt, updatedAt }
}
```

### Book Schema
```javascript
{
  title: String (required),
  author: String (required),
  genre: String (enum: 14 genres, required),
  description: String (required),
  price: Number (required, min: 0),
  stock: Number (required, default: 0),
  seller: ObjectId (references User, required),
  ratings: Number (default: 0, min: 0, max: 5),
  imageUrl: String (default: placeholder),
  timestamps: { createdAt, updatedAt }
}
```

### Cart Schema
```javascript
{
  user: ObjectId (references User, unique),
  books: [
    {
      book: ObjectId (references Book),
      quantity: Number (min: 1, default: 1)
    }
  ],
  timestamps: { createdAt, updatedAt }
}
```

### Order Schema
```javascript
{
  user: ObjectId (references User, required),
  books: [
    {
      book: ObjectId (references Book),
      quantity: Number (min: 1),
      price: Number
    }
  ],
  shippingAddress: {
    address: String (required),
    city: String (required),
    postalCode: String (required),
    country: String (required)
  },
  totalAmount: Number (required, min: 0),
  status: String (enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'], default: 'pending'),
  timestamps: { createdAt, updatedAt }
}
```

---

## API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/register` | Register new user | ✗ |
| POST | `/login` | Login user | ✗ |
| GET | `/me` | Get current user | ✓ |

### Book Routes (`/api/books`)

| Method | Endpoint | Description | Auth | Role |
|--------|----------|-------------|------|------|
| GET | `/` | Get all books (paginated) | ✗ | - |
| GET | `/:id` | Get book details | ✗ | - |
| POST | `/` | Create new book | ✓ | Seller |
| PUT | `/:id` | Update book | ✓ | Seller |
| DELETE | `/:id` | Delete book | ✓ | Seller |
| GET | `/seller/my-books` | Get seller's books | ✓ | Seller |

### User Routes (`/api/users`)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/profile` | Get user profile | ✓ |
| PUT | `/profile` | Update profile | ✓ |
| POST | `/wishlist/:bookId` | Add to wishlist | ✓ |
| DELETE | `/wishlist/:bookId` | Remove from wishlist | ✓ |

### Cart Routes (`/api/users`)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/cart` | Get user's cart | ✓ |
| POST | `/cart` | Add item to cart | ✓ |
| PUT | `/cart/:bookId` | Update cart item | ✓ |
| DELETE | `/cart/:bookId` | Remove from cart | ✓ |

### Order Routes (`/api/orders`)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/` | Get user's orders | ✓ |
| POST | `/` | Create order | ✓ |
| PUT | `/:id` | Update order status | ✓ | Admin |
| DELETE | `/:id` | Delete order | ✓ | Admin |

### Admin Routes (`/api/admin`)

| Method | Endpoint | Description | Auth | Role |
|--------|----------|-------------|------|------|
| GET | `/users` | Get all users | ✓ | Admin |
| DELETE | `/users/:id` | Delete user | ✓ | Admin |
| GET | `/sellers` | Get all sellers | ✓ | Admin |
| GET | `/orders` | Get all orders | ✓ | Admin |

---

## User Roles & Permissions

### User Role
- Browse books
- Add/remove from wishlist
- Add/remove from cart
- Place orders
- View order history
- Update profile
- View ratings

### Seller Role
- All User permissions
- Add books with ratings
- Edit own books
- Delete own books
- View sales analytics
- Track inventory
- Seller dashboard access

### Admin Role
- All permissions
- Manage all users
- Manage all sellers
- Manage all books
- Manage all orders
- Delete users
- Admin dashboard

---

## Key Features by Role

### Regular User 👤
1. **Browse & Discover**
   - Search books by title/author
   - Filter by genre
   - View ratings

2. **Shopping**
   - Add/remove books from cart
   - Adjust quantities
   - Place orders with shipping

3. **Account Management**
   - Create/update profile
   - Change password
   - Wishlist management

4. **Orders**
   - View all orders
   - Track order status
   - View order details

### Seller 🛍️
1. **Inventory Management**
   - Add new books (with title, author, genre, price, stock, rating, image)
   - Edit book details
   - Delete books
   - Update stock quantity

2. **Sales Tracking**
   - View seller dashboard
   - See sales statistics
   - Track inventory levels
   - Monitor book ratings

### Admin 👨‍💼
1. **User Management**
   - View all users
   - Delete users
   - Manage user roles

2. **Platform Management**
   - Manage all books
   - Manage all sellers
   - Review orders
   - Platform analytics

---

## Getting Started

### 1. Quick Start

```bash
# Clone repository
git clone <repository-url>
cd BookNest

# Setup Backend
cd server
cp .env.example .env  # Configure your environment
npm install
npm run seed          # Load sample data
npm run dev          # Start server

# Setup Frontend (in new terminal)
cd client
npm install
npm run dev          # Start client
```

### 2. First Time Login

**Demo Users** (created by seed script):

```
Regular User:
- Email: user@booknest.com
- Password: password123

Seller:
- Email: seller@booknest.com
- Password: password123

Admin:
- Email: admin@booknest.com
- Password: password123
```

### 3. Key Workflows

**As a Regular User:**
1. Register/Login
2. Browse books on `/books`
3. Add books to cart
4. Proceed to checkout from `/cart`
5. View orders on `/orders`
6. Manage wishlist on `/wishlist`

**As a Seller:**
1. Register/Login
2. Navigate to Seller Dashboard
3. Add new books with details and ratings
4. Track inventory in "My Books"
5. Monitor sales in dashboard
6. Edit/delete books as needed

**As an Admin:**
1. Login with admin account
2. Access Admin Dashboard
3. Manage users, sellers, orders
4. View platform statistics
5. Delete users if necessary

---

## Troubleshooting

### Backend Issues

#### Port Already in Use
```bash
# Kill process on port 5000
# Linux/Mac:
lsof -ti:5000 | xargs kill -9

# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

#### MongoDB Connection Error
```bash
# Ensure MongoDB is running
# Local MongoDB:
mongod

# Check URI in .env file matches your MongoDB setup
```

#### Login Fails with Correct Credentials
```bash
# Reset password hashes
cd server
npm run fix-passwords
```

#### JWT Error or Unauthorized
- Clear localStorage in browser
- Log out and log back in
- Check JWT_SECRET in .env matches

### Frontend Issues

#### Port 5173 Already in Use
```bash
npm run dev -- --port 3000
```

#### API Connection Error
- Verify backend is running on `http://localhost:5000`
- Check CORS configuration in backend
- Ensure `.env` variables are correct

#### Blank Page or 404
- Check browser console for errors
- Ensure Vite development server is running
- Clear browser cache and reload

### Database Issues

#### No Sample Data
```bash
cd server
npm run seed
```

#### Connection Timeout
- Check MongoDB URI in .env
- Verify MongoDB service is running
- For MongoDB Atlas, check IP whitelist

---

## Features Demo

### Book Rating Feature
- ⭐ Each book displays a rating (0-5)
- Sellers can set ratings when adding/editing books
- Ratings persist in database
- Displayed on book cards and detail pages

### Glassmorphic UI
- Modern frosted-glass effect on forms
- Smooth animations and transitions
- Responsive on all devices
- Professional appearance

### Search & Filter
- Real-time search by title or author
- Genre-based filtering
- Pagination support
- 12 books per page

---

## Contributing

Guidelines for contributing:
1. Create feature branches
2. Follow existing code style
3. Test changes thoroughly
4. Submit pull requests with descriptions

---

## Support

For issues or questions:
1. Check [Troubleshooting](#troubleshooting) section
2. Review API documentation
3. Check console for error messages
4. Ensure all environment variables are set

---

## License

ISC License - See LICENSE file for details

---

## Version

**Current Version**: 1.0.0  
**Last Updated**: February 2026

---

**Happy Reading with BookNest! 📚✨**
