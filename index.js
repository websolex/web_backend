const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const apiRouter = require('./routes/index')
const mongoose = require('mongoose');
dotenv.config({ path: ".env" });
const app = express();
const { connectDB } = require('./config/database')





connectDB()


const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:3001'
];

const corsOptions = {
    origin: function (origin, callback) {
        if (allowedOrigins.includes(origin) || !origin) {  
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,  
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], 
    allowedHeaders: ['Content-Type', 'Authorization'] 
};

// app.use(cors(corsOptions));
app.use(cors());
app.use(bodyParser.json());




// Routes
app.use('/api/v1', apiRouter);

app.get('/', (req, res) => {
    res.send('<h1>Working Fine</h1>');
});
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server connected on port ${PORT}`);
});

