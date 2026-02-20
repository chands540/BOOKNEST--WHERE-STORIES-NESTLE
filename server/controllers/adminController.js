import User from '../models/User.js';
import Book from '../models/Book.js';
import Order from '../models/Order.js';

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private (Admin only)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: 'user' }).select('-password');

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get all sellers
// @route   GET /api/admin/sellers
// @access  Private (Admin only)
export const getAllSellers = async (req, res) => {
  try {
    const sellers = await User.find({ role: 'seller' }).select('-password');

    res.status(200).json({
      success: true,
      data: sellers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private (Admin only)
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    if (user.role === 'admin') {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete admin user',
      });
    }

    await user.deleteOne();

    res.status(200).json({
      success: true,
      data: {},
      message: 'User deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get admin dashboard stats
// @route   GET /api/admin/stats
// @access  Private (Admin only)
export const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: 'user' });
    const totalSellers = await User.countDocuments({ role: 'seller' });
    const totalBooks = await Book.countDocuments();
    const totalOrders = await Order.countDocuments();

    // Calculate total revenue
    const orders = await Order.find({ status: { $ne: 'cancelled' } });
    const totalRevenue = orders.reduce(
      (sum, order) => sum + order.totalAmount,
      0
    );

    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        totalSellers,
        totalBooks,
        totalOrders,
        totalRevenue,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get seller dashboard stats
// @route   GET /api/admin/seller/stats
// @access  Private (Seller only)
export const getSellerStats = async (req, res) => {
  try {
    const totalBooks = await Book.countDocuments({ seller: req.user._id });

    // Get seller's books
    const sellerBooks = await Book.find({ seller: req.user._id }).select('_id');
    const bookIds = sellerBooks.map((book) => book._id);

    // Get orders containing seller's books
    const orders = await Order.find({
      'books.book': { $in: bookIds },
      status: { $ne: 'cancelled' },
    });

    let totalSales = 0;
    let totalOrders = 0;

    orders.forEach((order) => {
      order.books.forEach((item) => {
        if (bookIds.some((id) => id.equals(item.book))) {
          totalSales += item.price * item.quantity;
          totalOrders++;
        }
      });
    });

    res.status(200).json({
      success: true,
      data: {
        totalBooks,
        totalOrders,
        totalSales,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};