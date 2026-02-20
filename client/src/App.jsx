import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Books from './pages/Books';
import BookDetails from './pages/BookDetails';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import Wishlist from './pages/Wishlist';
import Profile from './pages/Profile';
import SellerDashboard from './pages/SellerDashboard';
import SellerBooks from './pages/SellerBooks';
import AddBook from './pages/AddBook';
import AdminDashboard from './pages/AdminDashboard';
import AdminUsers from './pages/AdminUsers';
import AdminSellers from './pages/AdminSellers';
import AdminOrders from './pages/AdminOrders';

import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/books" element={<Books />} />
              <Route path="/books/:id" element={<BookDetails />} />
              
              {/* Protected User Routes */}
              <Route
                path="/cart"
                element={
                  <PrivateRoute>
                    <Cart />
                  </PrivateRoute>
                }
              />
              <Route
                path="/orders"
                element={
                  <PrivateRoute>
                    <Orders />
                  </PrivateRoute>
                }
              />
              <Route
                path="/wishlist"
                element={
                  <PrivateRoute>
                    <Wishlist />
                  </PrivateRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                }
              />

              {/* Seller Routes */}
              <Route
                path="/seller/dashboard"
                element={
                  <PrivateRoute requiredRole="seller">
                    <SellerDashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/seller/books"
                element={
                  <PrivateRoute requiredRole="seller">
                    <SellerBooks />
                  </PrivateRoute>
                }
              />
              <Route
                path="/seller/add-book"
                element={
                  <PrivateRoute requiredRole="seller">
                    <AddBook />
                  </PrivateRoute>
                }
              />
              <Route
                path="/seller/edit-book/:id"
                element={
                  <PrivateRoute requiredRole="seller">
                    <AddBook />
                  </PrivateRoute>
                }
              />

              {/* Admin Routes */}
              <Route
                path="/admin/dashboard"
                element={
                  <PrivateRoute requiredRole="admin">
                    <AdminDashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/admin/users"
                element={
                  <PrivateRoute requiredRole="admin">
                    <AdminUsers />
                  </PrivateRoute>
                }
              />
              <Route
                path="/admin/sellers"
                element={
                  <PrivateRoute requiredRole="admin">
                    <AdminSellers />
                  </PrivateRoute>
                }
              />
              <Route
                path="/admin/orders"
                element={
                  <PrivateRoute requiredRole="admin">
                    <AdminOrders />
                  </PrivateRoute>
                }
              />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;