import mongoose from 'mongoose';

// Since the user is testing/mocking, we can use a mock URI or expect one in .env
// We will default to a local test db if MONGODB_URI is missing to prevent crashes during demo
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/polyveda';

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    }).catch(err => {
      console.warn("MongoDB Connection failed (expected if local DB is not running).");
      return null; // Don't crash the app if db fails
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
