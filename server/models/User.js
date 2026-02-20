import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 6,
      select: false,
    },
    role: {
      type: String,
      enum: ['user', 'seller', 'admin'],
      default: 'user',
    },
    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Hash password before saving (only if modified)
userSchema.pre('save', async function (next) {
  // Skip if password is not modified
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method - safely handles both hashed and plaintext (for recovery)
userSchema.methods.matchPassword = async function (enteredPassword) {
  try {
    // Check if stored password is hashed (bcrypt format)
    const isHashed = /^\$2[aby]\$\d{2}\$.{53}$/.test(this.password);
    
    if (!isHashed) {
      // Fallback for plaintext (should not happen in production after fix)
      return enteredPassword === this.password;
    }
    
    return await bcrypt.compare(enteredPassword, this.password);
  } catch (error) {
    console.error('Password comparison error:', error);
    return false;
  }
};

const User = mongoose.model('User', userSchema);

export default User;
