const jwt = require('jsonwebtoken');
const cookieParser = require("cookie-parser");
require('dotenv').config()
const isAutho = (req, res, next) => {
    const token = req.cookies.token
    //console.log(token);
    if (!token) {
        return res.status(401).json({ message: "No token found, authorization denied" });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next(); 
    } catch (error) {
        
        return res.status(403).json({ message: "Unauthorized: JWT token is wrong or expired" });
    }
};

module.exports = isAutho;
