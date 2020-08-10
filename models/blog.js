const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    blogTitle: {
        type: String,
        required: true
    },
    blogThumbnailUrl: {
        type: String,
        required: true
    },
    blogContent: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Blog', blogSchema);