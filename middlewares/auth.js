const jwt = require('jsonwebtoken');
const config = require('config');
exports.auth = (req, res, next) => {
    const token = req.header("x-auth-token");
    if (!token) {
        return res.status(401).json({ msg: "No Token, authorization denied" })
    }
    try {
        const decode = jwt.verify(token, config.get("jwtSecret"));
        req.user = decode.user;
        next();
    }
    catch (err) {
        return res.status(401).json({
            msg: "Invalid Token"
        })
    }
}