const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    name: { type: String, required: true },
    content: [{
        title: { type: String, required: true },
        subtitle: { type: String },
        description: { type: String, required: true }
    }],
    image: {
        url: String,
        public_id: String
    },
    submittedAt: { type: Date, default: () => new Date() },
});

const blog = mongoose.model('Blogpage', blogSchema);
module.exports = blog;
