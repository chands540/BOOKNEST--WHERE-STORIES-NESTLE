import express from 'express';
import {
  createOrder,
  getUserOrders,
  getOrder,
  getAllOrders,
  updateOrderStatus,
} from '../controllers/orderController.js';
import { protect } from '../middleware/auth.js';
import { authorize } from '../middleware/roleCheck.js';

const router = express.Router();

router
  .route('/')
  .post(protect, createOrder)
  .get(protect, authorize('admin', 'seller'), getAllOrders);

router.get('/my-orders', protect, getUserOrders);

router.route('/:id').get(protect, getOrder);

router.put(
  '/:id/status',
  protect,
  authorize('seller', 'admin'),
  updateOrderStatus
);

export default router;