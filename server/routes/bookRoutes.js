import express from 'express';
import {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
  getSellerBooks,
} from '../controllers/bookController.js';
import { protect } from '../middleware/auth.js';
import { authorize } from '../middleware/roleCheck.js';

const router = express.Router();

router.route('/').get(getBooks).post(protect, authorize('seller'), createBook);

router.get('/seller/my-books', protect, authorize('seller'), getSellerBooks);

router
  .route('/:id')
  .get(getBook)
  .put(protect, authorize('seller'), updateBook)
  .delete(protect, authorize('seller'), deleteBook);

export default router;