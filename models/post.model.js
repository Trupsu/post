const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    name: String,
    image: String,
    description: String,
    dateLastEdited: {
        type: Date,
        default: new Date()
    }
})

module.exports = mongoose.model('feeds', postSchema);