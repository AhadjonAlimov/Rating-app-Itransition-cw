const { check, validationResult } = require("express-validator");


exports.signupValidator = [
    check("first_name").trim().not().isEmpty().withMessage("First name is missing!"),
    check("last_name").trim().not().isEmpty().withMessage("Last name is missing!"),
    check("email").normalizeEmail().isEmail().withMessage("Email is invalid!"),
    check("password").trim().not().isEmpty().withMessage("Password is missing!"),
];

exports.loginValidator = [
    check("email").normalizeEmail().isEmail().withMessage("Email is invalid!"),
    check("password").trim().not().isEmpty().withMessage("Password is missing!"),
];

exports.reviewValidator = [
    check("review_creator").not().isEmpty().withMessage("Creator id is missing!"),
    check("review_title").not().isEmpty().withMessage("Review title is missing!"),
    check("content_name").not().isEmpty().withMessage("Work title is missing!"),
    check("group").not().isEmpty().withMessage("Group is missing!"),
    check("tags").isArray({ min: 1 }).withMessage("Tag must be at least one tag"),
    check("review_text").not().isEmpty().withMessage("Review text is missing!"),
    check("grade").not().isEmpty().withMessage("Grade is missing!"),
];

exports.validate = (req, res, next) => {
    const error = validationResult(req).array();
    if (error.length) {
        return res.json({ error: error[0].msg });
    }
    next();
};