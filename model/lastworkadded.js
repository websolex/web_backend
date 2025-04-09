const mongoose = require('mongoose')

const lastworkSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    work: { type: String, required: true },
    image: {
        url: String,
        public_id: String
    }
});

const Lastwork = mongoose.model('LastworkSchema', lastworkSchema);

module.exports = Lastwork