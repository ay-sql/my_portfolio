import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI ?? '';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable in your .env file');
}

// Define a global interface for the mongoose connection
declare global {
  // eslint-disable-next-line no-var
  var mongooseConnection: {
    conn: mongoose.Connection | null;
    promise: Promise<mongoose.Connection> | null;
  };
}

// Initialize global variable if it doesn't exist
global.mongooseConnection = global.mongooseConnection || {
  conn: null,
  promise: null,
};

export async function connectToDatabase(): Promise<mongoose.Connection> {
  if (global.mongooseConnection.conn) {
    console.log('Using existing MongoDB connection');
    return global.mongooseConnection.conn;
  }

  if (!global.mongooseConnection.promise) {
    console.log('Creating new MongoDB connection');
    global.mongooseConnection.promise = mongoose
      .connect(MONGODB_URI, {
        bufferCommands: false,
        // useUnifiedTopology: true,
      })
      .then((mongooseInstance) => mongooseInstance.connection);
  }

  try {
    global.mongooseConnection.conn = await global.mongooseConnection.promise;
    console.log('MongoDB connected successfully');
    return global.mongooseConnection.conn;
  } catch (error) {
    global.mongooseConnection.promise = null;
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}
