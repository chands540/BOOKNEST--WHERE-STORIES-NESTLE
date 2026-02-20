import Book from '../models/Book.js';

// @desc    Get all books with filters and pagination
// @route   GET /api/books
// @access  Public
export const getBooks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    // Build query
    let query = {};

    // Filter by genre
    if (req.query.genre) {
      query.genre = req.query.genre;
    }

    // Search by title or author
    if (req.query.search) {
      query.$or = [
        { title: { $regex: req.query.search, $options: 'i' } },
        { author: { $regex: req.query.search, $options: 'i' } },
      ];
    }

    const books = await Book.find(query)
      .populate('seller', 'name email')
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: -1 });

    const total = await Book.countDocuments(query);

    res.status(200).json({
      success: true,
      data: books,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get single book
// @route   GET /api/books/:id
// @access  Public
export const getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate(
      'seller',
      'name email'
    );

    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found',
      });
    }

    res.status(200).json({
      success: true,
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Create new book
// @route   POST /api/books
// @access  Private (Seller only)
export const createBook = async (req, res) => {
  try {
    const { title, author, genre, description, price, stock, imageUrl, rating } =
      req.body;

    const book = await Book.create({
      title,
      author,
      genre,
      description,
      price,
      stock,
      imageUrl,
      ratings: rating ? Number(rating) : 0,
      seller: req.user._id,
    });

    res.status(201).json({
      success: true,
      data: book,
      message: 'Book created successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update book
// @route   PUT /api/books/:id
// @access  Private (Seller only - own books)
export const updateBook = async (req, res) => {
  try {
    let book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found',
      });
    }

    // Make sure user is book owner
    if (book.seller.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to update this book',
      });
    }

    // Map rating to ratings field if provided
    const updateData = { ...req.body };
    if (updateData.rating !== undefined) {
      updateData.ratings = Number(updateData.rating);
      delete updateData.rating;
    }

    book = await Book.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: book,
      message: 'Book updated successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Delete book
// @route   DELETE /api/books/:id
// @access  Private (Seller only - own books)
export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found',
      });
    }

    // Make sure user is book owner
    if (book.seller.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to delete this book',
      });
    }

    await book.deleteOne();

    res.status(200).json({
      success: true,
      data: {},
      message: 'Book deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get seller books
// @route   GET /api/books/seller/my-books
// @access  Private (Seller only)
export const getSellerBooks = async (req, res) => {
  try {
    const books = await Book.find({ seller: req.user._id }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      data: books,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};