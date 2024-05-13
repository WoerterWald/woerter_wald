import mongoose, { Mongoose } from "mongoose";
declare global {
  var mongoose: {
    promise: Promise<Mongoose> | null;
    conn: Mongoose | null;
  };
}

const MONGODB_URI = process.env.MONGODB_URI!.replace('<USER_NAME>', process.env.USER_NAME!).replace('<PASSWORD>', process.env.PASSWORD!);

if (!MONGODB_URI) {
  throw new Error(
    "No MONGODB_URI environment variable found!",
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
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