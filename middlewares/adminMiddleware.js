const jwt = require("jsonwebtoken");


exports.adminCheck = async (req, res, next) => {
    try {
        const {user} = req;
        if (user.role !== "admin" && user.role !== "owner") {
            return res.status(403).json({ message: "Access denied" });
        }
        next();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};