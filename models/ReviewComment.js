const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;


const userCommentSchema = new mongoose.Schema({
    comment_creator: {
        type: ObjectId,
        ref: 'User',
        required: true,
    },
    review_id: {
        type: ObjectId,
        ref: 'Review',
        required: true,
    },
    comment_title: {
        type: String,
        required: true,
    },
    comment_text: {
        type: String,
        required: true,
    },
    grade: {
        type: Number,
        required: true,
    },
    comment_likes: [{
        type: ObjectId,
        ref: 'User',
    }],
}, {
    timestamps: true,
});

module.exports = mongoose.model("ReviewComment", userCommentSchema);