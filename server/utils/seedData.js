import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import User from '../models/User.js';
import Book from '../models/Book.js';
import connectDB from '../config/db.js';

dotenv.config();

const users = [
  {
    name: 'Admin User',
    email: 'admin@booknest.com',
    password: 'admin123',
    role: 'admin',
  },
  {
    name: 'John Seller',
    email: 'seller@booknest.com',
    password: 'seller123',
    role: 'seller',
  },
  {
    name: 'Jane Doe',
    email: 'user@booknest.com',
    password: 'user123',
    role: 'user',
  },
];

const books = [
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    genre: 'Fiction',
    description:
      'A classic American novel set in the Jazz Age, exploring themes of wealth, love, and the American Dream.',
    price: 299,
    stock: 50,
    ratings: 4.5,
    imageUrl: 'https://m.media-amazon.com/images/I/81UCPjk5F7L._AC_UY218_.jpg',
  },
  {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    genre: 'Fiction',
    description:
      'A gripping tale of racial injustice and childhood innocence in the American South.',
    price: 349,
    stock: 45,
    ratings: 4.8,
    imageUrl: 'https://m.media-amazon.com/images/I/81gepf1eMqL._SY466_.jpg',
  },
  {
    title: '1984',
    author: 'George Orwell',
    genre: 'Science Fiction',
    description:
      'A dystopian masterpiece about totalitarianism and surveillance.',
    price: 279,
    stock: 60,
    ratings: 4.7,
    imageUrl: 'https://m.media-amazon.com/images/I/61HkdyBpKOL._SY466_.jpg',
  },
  {
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    genre: 'Romance',
    description:
      'A timeless romance exploring manners, marriage, and morality in Georgian England.',
    price: 259,
    stock: 40,
    ratings: 4.6,
    imageUrl: 'https://m.media-amazon.com/images/I/81Scutrtj4L._SY425_.jpg',
  },
  {
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    genre: 'Fantasy',
    description:
      'An enchanting adventure of Bilbo Baggins in Middle-earth.',
    price: 399,
    stock: 55,
    ratings: 4.9,
    imageUrl: 'https://m.media-amazon.com/images/I/81hylMcxa3L._AC_UF1000,1000_QL80_.jpg',
  },
  {
    title: 'Harry Potter and the Philosopher\'s Stone',
    author: 'J.K. Rowling',
    genre: 'Fantasy',
    description:
      'The magical journey of a young wizard begins at Hogwarts.',
    price: 449,
    stock: 70,
    ratings: 4.9,
    imageUrl: 'https://m.media-amazon.com/images/I/81q77Q39nEL._SY425_.jpg',
  },
  {
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    genre: 'Fiction',
    description:
      'A story of teenage rebellion and alienation in 1950s America.',
    price: 289,
    stock: 35,
    ratings: 4.3,
    imageUrl: 'https://m.media-amazon.com/images/I/61cfToP7pgL._SY425_.jpg',
  },
  {
    title: 'The Da Vinci Code',
    author: 'Dan Brown',
    genre: 'Thriller',
    description: 'A gripping mystery involving art, history, and conspiracy.',
    price: 359,
    stock: 48,
    ratings: 4.4,
    imageUrl: 'https://m.media-amazon.com/images/I/815WORuYMML._SY425_.jpg',
  },
  {
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
    genre: 'Non-Fiction',
    description:
      'A brief history of humankind from the Stone Age to modern times.',
    price: 499,
    stock: 42,
    ratings: 4.7,
    imageUrl: 'https://m.media-amazon.com/images/I/713jIoMO3UL._SY425_.jpg',
  },
  {
    title: 'Atomic Habits',
    author: 'James Clear',
    genre: 'Self-Help',
    description:
      'An easy and proven way to build good habits and break bad ones.',
    price: 399,
    stock: 65,
    ratings: 4.8,
    imageUrl: 'https://m.media-amazon.com/images/I/817HaeblezL._SY425_.jpg',
  },
];

const importData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany();
    await Book.deleteMany();

    // Hash passwords before seeding (CRITICAL: insertMany bypasses pre-save hooks)
    const hashedUsers = await Promise.all(
      users.map(async (user) => {
        const salt = await bcrypt.genSalt(10);
        return {
          ...user,
          password: await bcrypt.hash(user.password, salt),
        };
      })
    );

    // Create users with hashed passwords
    const createdUsers = await User.insertMany(hashedUsers);
    const sellerId = createdUsers[1]._id; // Get seller ID

    // Add seller to books
    const booksWithSeller = books.map((book) => {
      return { ...book, seller: sellerId };
    });

    await Book.insertMany(booksWithSeller);

    console.log('✓ Data Imported Successfully!');
    console.log('\n✓ All passwords are securely hashed');
    console.log('\nLogin Credentials:');
    console.log('Admin - Email: admin@booknest.com, Password: admin123');
    console.log('Seller - Email: seller@booknest.com, Password: seller123');
    console.log('User - Email: user@booknest.com, Password: user123');
    
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await connectDB();

    await User.deleteMany();
    await Book.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}