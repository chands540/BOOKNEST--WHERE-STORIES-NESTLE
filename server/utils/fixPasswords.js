import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import User from '../models/User.js';
import connectDB from '../config/db.js';

dotenv.config();

/**
 * CRITICAL: Utility to detect and fix plaintext passwords in database
 * Use when login fails with correct credentials (indicates plaintext passwords)
 */

const isPasswordHashed = (password) => {
  return /^\$2[aby]\$\d{2}\$.{53}$/.test(password);
};

const fixPasswords = async () => {
  try {
    await connectDB();

    console.log('🔍 Scanning database for plaintext passwords...\n');

    // Get all users with password field
    const users = await User.find().select('+password');

    let plainTextCount = 0;
    let hashedCount = 0;

    for (const user of users) {
      if (!isPasswordHashed(user.password)) {
        console.log(`⚠️  Found plaintext password for: ${user.email}`);
        
        try {
          // Hash the plaintext password
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
          await user.save();
          
          console.log(`✅ Fixed: ${user.email}`);
          plainTextCount++;
        } catch (error) {
          console.error(`❌ Failed to fix ${user.email}: ${error.message}`);
        }
      } else {
        hashedCount++;
      }
    }

    console.log('\n' + '='.repeat(50));
    console.log(`✓ Scan Complete`);
    console.log(`  - Already hashed: ${hashedCount}`);
    console.log(`  - Fixed: ${plainTextCount}`);
    console.log(`  - Total users: ${users.length}`);
    console.log('='.repeat(50));

    if (plainTextCount > 0) {
      console.log('\n✅ All plaintext passwords have been secured!');
      console.log('Try logging in again with your credentials.');
    } else {
      console.log('\n✓ Database is clean. All passwords are hashed.');
    }

    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

fixPasswords();
