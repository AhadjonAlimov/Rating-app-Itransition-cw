const express = require("express");
const router = express.Router();
const { uploadFiles } = require("../controllers/upload");
const { authCheck } = require("../middlewares/authMiddleware");
const imageUpload = require("../middlewares/imageUpload");


router.post("/uploadImages", authCheck, imageUpload, uploadFiles);

module.exports = router;