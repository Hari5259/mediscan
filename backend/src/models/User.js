import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      match: [
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        'Please provide a valid email address',
      ],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      unique: true,
      match: [/^\+?[\d\s()-]{10,}$/, 'Please provide a valid phone number'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password must be at least 8 characters'],
      select: false, // Don't return password in queries by default
    },
    userType: {
      type: String,
      enum: ['patient', 'doctor'],
      required: [true, 'User type is required'],
    },
    specialization: {
      type: String,
      // Only required for doctors, checked in pre-save
    },
    phoneVerified: {
      type: Boolean,
      default: false,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    profilePicture: {
      type: String,
      default: null,
    },
    bio: {
      type: String,
      default: '',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;

  try {
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
  } catch (error) {
    throw error;
  }
});

// Validate doctor specialization
userSchema.pre('save', function () {
  if (this.userType === 'doctor' && !this.specialization) {
    throw new Error('Specialization is required for doctors');
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (enteredPassword) {
  if (!this.password) return false;
  return await bcryptjs.compare(enteredPassword, this.password);
};

// Method to get user without sensitive data
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  delete user.__v;
  return user;
};

const User = mongoose.model('User', userSchema);

export default User;
