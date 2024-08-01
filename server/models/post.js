const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title:{
        type: String,
    },
    email:{
        type: String,
    },
    phone:{
        type: String,
    },
    website:{
        type: String,
    },
    comment:{
        type: String,
    },
})

const Post = mongoose.model("post", postSchema);

module.exports = Post;