import mongoose from 'mongoose';

/**
 * Connect to MongoDB database
 */
export const getMongoUri = () => {
  if (process.env.NODE_ENV === 'test') {
    return (
      process.env.MONGODB_URI_TEST ||
      process.env.MONGO_URI_TEST ||
      process.env.MONGO_URI ||
      process.env.MONGODB_URI
    );
  }

  return process.env.MONGO_URI || process.env.MONGODB_URI;
};

const connectDB = async (mongoUri = getMongoUri()) => {
  if (!mongoUri) {
    throw new Error('MongoDB connection string is not defined');
  }

  if (mongoose.connection.readyState !== 0) {
    return mongoose.connection;
  }

  const conn = await mongoose.connect(mongoUri);
  console.log(`MongoDB Connected: ${conn.connection.host}`);
  return conn;
};

export const disconnectDB = async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
};

export default connectDB;
