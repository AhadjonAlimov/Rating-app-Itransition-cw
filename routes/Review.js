const express = require("express");
const router = express.Router();
const {
    createReview,
    getReview,
    getAllReviews,
    createCommentReview,
    search,
    deletePost
} = require("../controllers/Review");
const { authCheck } = require("../middlewares/authMiddleware");


router.get("/getallreviews", getAllReviews);
router.get("/getreview/:id", getReview);
router.post("/search/:searchTerm", search);
router.post("/createreview", authCheck, createReview);
router.post("/createcomment", authCheck, createCommentReview);
router.delete("/deletepost/:id", authCheck, deletePost);

module.exports = router;