const express = require("express");
const app = express();
let axios = require("axios");
const User = require("../model/userModel");

// return array of list of followers
getFollowers = async (followers_url) => {
    followers = [];
    let user = await axios.get(followers_url);
    // console.log("followers:- ");
    for (let i = 0; i < user.data.length; i++) {
        // console.log(user.data[i].login);
        followers.push(user.data[i].login);
    }
    return followers;
};

getMutualFollowers = async (followers_url, following_url) => {
    followers = await getFollowers(followers_url);
    following = await getFollowers(following_url);
    // console.log("1");
    mutualFollowers = [];
    followers.forEach((element) => {
        if (following.includes(element)) {
            mutualFollowers.push(element);
        }
    });
    return mutualFollowers;
};

// Make a request for a user with a given ID

exports.getUser = async (req, res) => {
    try {
        const userLogin = req.params.login;
        const user = await User.findOne({ login: userLogin });
        if (!user) {
            console.log("User not Found, Fetching from Github");
            let url = "https://api.github.com/users/";
            url += userLogin;
            // console.log(url);
            let user = await axios.get(url);
            // console.log(user);
            user = user.data;
            let following_url = url + "/following";
            // console.log(following_url);
            const mutualFollowers = await getMutualFollowers(
                user.followers_url,
                following_url
            );

            console.log(mutualFollowers);

            const newUSer = await User.create({
                id: user.id,
                login: user.login,
                followers_url: user.followers_url,
                location: user.location,
                following_url: user.following_url,
                blog: user.blog,
                friends: mutualFollowers,
                public_repos: user.public_repos,
                public_gists: user.public_gists,
                followers: user.followers,
                following: user.following,
                created_at: user.created_at,
            });

            res.status(200).json({
                status: "success",
                data: {
                    newUSer,
                },
            });
        } else {
            res.status(200).json({
                status: "success",
                data: {
                    user,
                },
            });
        }
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err.message,
        });
    }
};
