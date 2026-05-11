import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: './backend/.env' });

const testConnection = async () => {
  try {
    console.log('Connecting to:', process.env.MONGODB_URI);
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('SUCCESS: Connected to MongoDB');
    process.exit(0);
  } catch (error) {
    console.error('FAILURE: Could not connect to MongoDB');
    console.error(error);
    process.exit(1);
  }
};

testConnection();
