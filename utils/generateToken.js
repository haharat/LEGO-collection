const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (id) => {
    return jwt.sign({id}, process.env.jwtSecret, {expiresIn: "1d"});
};

module.exports = generateToken