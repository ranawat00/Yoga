const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/yoga_healers';
    const conn = await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 5000 });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Atlas DB Connection Warning: ${error.message}`);
    try {
      console.log('Attempting local MongoDB connection...');
      const localConn = await mongoose.connect('mongodb://127.0.0.1:27017/yoga_healers', { serverSelectionTimeoutMS: 3000 });
      console.log(`Local MongoDB Connected: ${localConn.connection.host}`);
    } catch (localErr) {
      console.error(`Local MongoDB Connection Warning: ${localErr.message}`);
      console.log('Backend starting without active DB connection. DB endpoints will return fallback status.');
    }
  }
};

module.exports = connectDB;
