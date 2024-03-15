
const mongoose = require('mongoose');

// mongoose.connect("mongodb:///127.0.0.1:27017/post")


const postSchema = new mongoose.Schema({
    postText: {
        type: String,
        default:"New post"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }, 
    image: {
        type: String
    },
    likes: {
        type: Array,
        default: []
    },
    user: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }],
})
module.exports = mongoose.model('post', postSchema)