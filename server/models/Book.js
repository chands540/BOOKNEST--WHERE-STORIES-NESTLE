import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide book title'],
      trim: true,
    },
    author: {
      type: String,
      required: [true, 'Please provide author name'],
      trim: true,
    },
    genre: {
      type: String,
      required: [true, 'Please provide genre'],
      enum: [
        'Fiction',
        'Non-Fiction',
        'Mystery',
        'Thriller',
        'Romance',
        'Science Fiction',
        'Fantasy',
        'Biography',
        'History',
        'Self-Help',
        'Business',
        'Children',
        'Horror',
        'Poetry',
      ],
    },
    description: {
      type: String,
      required: [true, 'Please provide description'],
    },
    price: {
      type: Number,
      required: [true, 'Please provide price'],
      min: 0,
    },
    stock: {
      type: Number,
      required: [true, 'Please provide stock quantity'],
      min: 0,
      default: 0,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    ratings: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    imageUrl: {
      type: String,
      default: 'https://via.placeholder.com/300x400?text=Book+Cover',
    },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model('Book', bookSchema);

export default Book;