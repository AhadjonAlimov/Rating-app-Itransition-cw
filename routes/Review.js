const express = require("express");
const router = express.Router();
const {
    createReview,
    getReview,
    getAllReviews,
    createCommentReview,
    search
} = require("../controllers/Review");
const { authCheck } = require("../middlewares/authMiddleware");


router.get("/getallreviews", getAllReviews);
router.get("/getreview/:id", getReview);
router.post("/search/:searchTerm", search);
router.post("/createreview", authCheck, createReview);
router.post("/createcomment", authCheck, createCommentReview);
// router.put("/updatereview", authCheck, updateReview);

module.exports = router;