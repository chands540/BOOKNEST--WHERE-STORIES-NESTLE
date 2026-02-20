import express from 'express';
import {
  getProfile,
  updateProfile,
  addToWishlist,
  removeFromWishlist,
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/profile').get(protect, getProfile).put(protect, updateProfile);

router
  .route('/wishlist/:bookId')
  .post(protect, addToWishlist)
  .delete(protect, removeFromWishlist);

router
  .route('/cart')
  .get(protect, getCart)
  .post(protect, addToCart)
  .delete(protect, clearCart);

router
  .route('/cart/:bookId')
  .put(protect, updateCartItem)
  .delete(protect, removeFromCart);

export default router;