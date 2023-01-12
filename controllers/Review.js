const mongoose = require("mongoose");
const Review = require("../models/Review");
const { actionCheck } = require("../plugins/validation");
const { v4: uuidv4 } = require('uuid');
const User = require("../models/User");
const ReviewComment = require("../models/ReviewComment");


exports.createReview = async (req, res) => {
    try {
        if (!req.body.public_id) {
            const review = await new Review({ ...req.body, public_id: uuidv4() }).save();
            res.json(review);
        } else {
            const review = await new Review(req.body).save();
            res.json(review);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.createCommentReview = async (req, res) => {
    try {
        const comment = await new ReviewComment(req.body).save();
        res.json(comment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getAllReviews = async (req, res) => {
    try {
        const allReviews = await Review.find({}).sort({ createdAt: -1 });
        res.json(allReviews);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.getReview = async (req, res) => {
    try {
        const { id } = req.params;
        const review = await Review.findOne({ _id: id })
            .populate("review_creator", "_id first_name last_name username");
        if (!review) {
            return res.json({ ok: false });
        }
        const critics = await Review.find({ public_id: review.public_id, _id: { $ne: review._id } })
            .populate("review_creator", "_id first_name last_name username");

        const comments = await ReviewComment.find({ review_id: review._id })
            .populate("comment_creator", "_id first_name last_name username");

        res.json({ review, critics, comments });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getComments = async (req, res) => {
    try {
        const { id } = req.params;
        const review = await Review.findOne({ _id: id });
        if (!review) {
            return res.json({ ok: false });
        }
        const comments = await ReviewComment.find({ review_id: id })
            .populate("comment_creator", "_id first_name last_name username");
        res.json({ comments });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.search = async (req, res) => {
    try {
        const searchTerm = req.params.searchTerm;
        const results = await Review.find({ $text: { $search: searchTerm } });
        res.json(results);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deletePost = async (req, res) => {
    try {
        const { user } = req;
        const { id } = req.params;
        const reviewInfo = await Review.findOne({_id: id});
        const isValidAction = actionCheck(user.role, user._id, reviewInfo.review_creator);
        if (!isValidAction) return res.status(400).json({ message: "Invalid action" });
        await Review.findByIdAndRemove(id);
        res.json({ status: "ok" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};