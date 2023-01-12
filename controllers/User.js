const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const { validateEmail, validateUsername, } = require("../plugins/validation");
const { generateToken } = require("../plugins/tokens");
const User = require("../models/User");
const Review = require("../models/Review")


exports.signup = async (req, res) => {
    try {
        const { first_name, last_name, email, password, } = req.body;
        if (!validateEmail(email)) {
            return res.status(400).json({ message: "Invalid email address", });
        }
        const checkEmail = await User.findOne({ email });
        if (checkEmail) {
            return res.status(400).json({ message: "Email already exists", });
        }

        const cryptedPassword = await bcrypt.hash(password, 10);
        let tempUsername = first_name + last_name;
        let newUsername = await validateUsername(tempUsername);

        const user = await new User({
            first_name,
            last_name,
            email,
            username: newUsername,
            password: cryptedPassword,
        }).save();
        const token = generateToken({ id: user._id.toString() }, "7d");

        res.send({
            id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            username: user.username,
            role: user.role,
            token: token,
            message: "Register Success ! please activate your email to start",
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found", });

        const check = await bcrypt.compare(password, user.password);
        if (!check) return res.status(400).json({ message: "The password doesn't match", });
        const token = generateToken({ id: user._id.toString() }, "7d");
        res.send({
            id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            username: user.username,
            role: user.role,
            token,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found", });

        const check = await bcrypt.compare(password, user.password);
        if (!check) return res.status(400).json({ message: "The password doesn't match", });
        const token = generateToken({ id: user._id.toString() }, "7d");
        res.send({
            id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            username: user.username,
            role: user.role,
            token,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const { user } = req;
        const users = await User.find({ _id: { $ne: user._id } })
        if (!users) return res.json({ ok: false });
        res.send(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const users = await User.findByIdAndRemove(req.params.id);
        if (!users) return res.json({ ok: false });
        res.send({ status: "ok", message: "User successfully deleted." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getProfile = async (req, res) => {
    try {
        const { username } = req.params;
        const profile = await User.findOne({ username }).select("-password");
        if (!profile) {
            return res.json({ ok: false });
        }
        const reviews = await Review.find({ review_creator: profile._id })
            .populate("review_creator", "_id first_name last_name username")
            .sort({ createdAt: -1 });
        res.json({...profile.toObject(), reviews});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
