import express from 'express';
import {
  getAllUsers,
  getAllSellers,
  deleteUser,
  getAdminStats,
  getSellerStats,
} from '../controllers/adminController.js';
import { protect } from '../middleware/auth.js';
import { authorize } from '../middleware/roleCheck.js';

const router = express.Router();

router.get('/users', protect, authorize('admin'), getAllUsers);
router.get('/sellers', protect, authorize('admin'), getAllSellers);
router.delete('/users/:id', protect, authorize('admin'), deleteUser);
router.get('/stats', protect, authorize('admin'), getAdminStats);
router.get('/seller/stats', protect, authorize('seller'), getSellerStats);

export default router;