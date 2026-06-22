const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

/**
 * User Model
 * Stores user registration data with hashed passwords
 */
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false, // Don't return password by default
    },
    age: {
      type: Number,
      required: [true, 'Age is required'],
      min: [1, 'Age must be positive'],
      max: [150, 'Age must be realistic'],
    },
    gender: {
      type: String,
      required: [true, 'Gender is required'],
      enum: ['male', 'female', 'other'],
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Pre-save hook: Hash password before saving
 */
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

/**
 * Instance method: Compare entered password with hashed password
 */
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
