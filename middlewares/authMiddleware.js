const jwt = require("jsonwebtoken");
const User = require("../models/User");


exports.authCheck = async (req, res, next) => {
    try {
        let t = req.header("Authorization");
        const token = t.replace("AA ", "");
        if (!token) {
            return res.status(400).json({ message: "Invalid Authentification" });
        }
        jwt.verify(token, process.env.SECRET_TOKEN, async (err, payload) => {
            if (err) return res.status(400).json({ message: "Invalid Authentification" });
            const user = await User.findById(payload.id);
            if (!user) return res.status(401).json({ message: "You must be logged in" });
            
            req.user = user;
            next();
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

