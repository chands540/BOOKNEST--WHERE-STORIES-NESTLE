import axios from "axios";

const API = axios.create({
  baseURL: "/api",
});

// SAFE TOKEN ATTACHER
API.interceptors.request.use((config) => {
  try {
    const stored = localStorage.getItem("user");

    if (stored && stored !== "undefined") {
      const user = JSON.parse(stored);

      if (user?.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
      }
    }
  } catch (err) {
    console.error("Token parse error:", err);
    localStorage.removeItem("user");
  }

  return config;
});


// AUTH APIs
export const register = (userData) => API.post("/auth/register", userData);
export const login = (credentials) => API.post("/auth/login", credentials);
export const getMe = () => API.get("/auth/me");

// BOOK APIs
export const getBooks = (params) => API.get("/books", { params });
export const getBook = (id) => API.get(`/books/${id}`);
export const createBook = (bookData) => API.post("/books", bookData);
export const updateBook = (id, bookData) => API.put(`/books/${id}`, bookData);
export const deleteBook = (id) => API.delete(`/books/${id}`);
export const getSellerBooks = () => API.get("/books/seller/my-books");

// USER APIs
export const getProfile = () => API.get("/users/profile");
export const updateProfile = (userData) =>
  API.put("/users/profile", userData);
export const addToWishlist = (bookId) =>
  API.post(`/users/wishlist/${bookId}`);
export const removeFromWishlist = (bookId) =>
  API.delete(`/users/wishlist/${bookId}`);

// CART APIs
export const getCart = () => API.get("/users/cart");
export const addToCart = (data) => API.post("/users/cart", data);
export const updateCartItem = (bookId, data) =>
  API.put(`/users/cart/${bookId}`, data);
export const removeFromCart = (bookId) =>
  API.delete(`/users/cart/${bookId}`);
export const clearCart = () => API.delete("/users/cart");

// ORDER APIs
export const createOrder = (orderData) => API.post("/orders", orderData);
export const getUserOrders = () => API.get("/orders/my-orders");
export const getAllOrders = () => API.get("/orders");
export const updateOrderStatus = (id, data) =>
  API.put(`/orders/${id}/status`, data);

// ADMIN APIs
export const getAllUsers = () => API.get("/admin/users");
export const getAllSellers = () => API.get("/admin/sellers");
export const deleteUser = (id) => API.delete(`/admin/users/${id}`);
export const getAdminStats = () => API.get("/admin/stats");
export const getSellerStats = () => API.get("/admin/seller/stats");

export default API;
