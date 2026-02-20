import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import Book from '../models/Book.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const createOrder = async (req, res) => {
  try {
    const { books, shippingAddress } = req.body;

    if (!books || books.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No books in order',
      });
    }

    // Calculate total and verify stock
    let totalAmount = 0;
    const orderBooks = [];

    for (const item of books) {
      const book = await Book.findById(item.book);

      if (!book) {
        return res.status(404).json({
          success: false,
          message: `Book not found: ${item.book}`,
        });
      }

      if (book.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for ${book.title}`,
        });
      }

      totalAmount += book.price * item.quantity;
      orderBooks.push({
        book: book._id,
        quantity: item.quantity,
        price: book.price,
      });

      // Update book stock
      book.stock -= item.quantity;
      await book.save();
    }

    const order = await Order.create({
      user: req.user._id,
      books: orderBooks,
      shippingAddress,
      totalAmount,
    });

    // Clear user's cart after order
    await Cart.findOneAndUpdate(
      { user: req.user._id },
      { $set: { books: [] } }
    );

    res.status(201).json({
      success: true,
      data: order,
      message: 'Order placed successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get user orders
// @route   GET /api/orders/my-orders
// @access  Private
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('books.book')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get single order
// @route   GET /api/orders/:id
// @access  Private
export const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name email')
      .populate('books.book');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    // Make sure user owns this order
    if (order.user._id.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to view this order',
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get all orders (Admin/Seller)
// @route   GET /api/orders
// @access  Private (Admin/Seller)
export const getAllOrders = async (req, res) => {
  try {
    let query = {};

    // If seller, only show orders containing their books
    if (req.user.role === 'seller') {
      const sellerBooks = await Book.find({ seller: req.user._id }).select(
        '_id'
      );
      const bookIds = sellerBooks.map((book) => book._id);
      query = { 'books.book': { $in: bookIds } };
    }

    const orders = await Order.find(query)
      .populate('user', 'name email')
      .populate('books.book')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private (Seller/Admin)
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    order.status = status;
    await order.save();

    res.status(200).json({
      success: true,
      data: order,
      message: 'Order status updated successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};