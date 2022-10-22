const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    id: Number,
    login: { type: String },
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

const User = mongoose.model("User", userSchema);
module.exports = User;
