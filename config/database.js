const mongoose = require('mongoose');
const MongoDB = process.env.MONGO_URI
const connectDB = async () => {

    try {
        await mongoose.connect(MongoDB, { useNewUrlParser: true, useUnifiedTopology: true, serverSelectionTimeoutMS: 20000, });
        console.log('MongoDB connected successfully!');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1);
    }
};

module.exports = connectDB;

