const mongoose = require("mongoose");

const User = new mongoose.Schema({
    id: Number,
    username: String,
    followers_url: String,
    location: String,
    following_url: String,
    blog: String,
    friends: [],
    public_repos: Number,
    public_gists: Number,
    followers: Number,
    following: Number,
    created_at: Date,
});

module.exports = mongoose.model("User", User);
