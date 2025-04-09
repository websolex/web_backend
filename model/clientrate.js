const mongoose = require('mongoose')

const clientrateSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    business: { type: String, required: false },
    rate: { type: String, required: true },
    image: {
        url: String,
        public_id: String
    }, // Store the image file path
});

const clientrate = mongoose.model('Clientrate', clientrateSchema);

module.exports = clientrate