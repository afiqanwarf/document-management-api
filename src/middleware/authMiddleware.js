require("dotenv").config();

const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {

    const bearer = req.headers["authorization"];

    if (!bearer)
        return res.status(403).json({
            message: "Token tidak ada"
        });

    const token = bearer.split(" ")[1];

    try {

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;

        next();

    } catch (error) {

        res.status(401).json({
            message: "Token invalid"
        });

    }

};

module.exports = verifyToken;