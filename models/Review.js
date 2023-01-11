const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;


const reviewSchema = new mongoose.Schema({
    review_creator: {
        type: ObjectId,
        ref: 'User',
        required: true,
    },
    review_title: {
        type: String,
        required: true,
        text: true,
    },
    review_text: {
        type: String,
        required: true,
        text: true,
    },
    content_name: {
        type: String,
        required: true,
        text: true,
    },
    group: {
        type: String,
        required: true,
        text: true,
    },
    tags: {
        type: [String],
        required: true,
        text: true,
    },
    grade: {
        type: Number,
        required: true,
    },
    public_id: {
        type: String,
        required: true,
    },
    images: [{
        url: {type: String, default: "https://res.cloudinary.com/dvn9cqdgy/image/upload/v1673302894/no_image.png"}
    }],
    users_likes: [{
        type: ObjectId,
        ref: 'User',
    }],
}, {
    timestamps: true,
});

module.exports = mongoose.model("Review", reviewSchema);