const express = require("express");
const router = express.Router();
const { uploadFiles } = require("../controllers/Upload");
const { authCheck } = require("../middlewares/authMiddleware");
const imageUpload = require("../middlewares/imageUpload");


router.post("/uploadImages", authCheck, imageUpload, uploadFiles);

module.exports = router;