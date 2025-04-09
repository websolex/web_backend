const mongoose = require('mongoose');
const MongoDB = process.env.MONGO_URI
const connectDB = async () => {

    try {
        await mongoose.connect(MongoDB);
        console.log('MongoDB connected successfully!');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1);
    }
};

module.exports = connectDB;

