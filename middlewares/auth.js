const jwt = require('jsonwebtoken');
exports.auth = (req, res, next) => {
    const token = req.header("x-auth-token");
    if (!token) {
        return res.status(401).json({ msg: "No Token, authorization denied" })
    }
    try {
        const decode = jwt.verify(token, process.env.JWTSECRET);
        req.user = decode.user;
        next();
    }
    catch (err) {
        return res.status(401).json({
            msg: "Invalid Token"
        })
    }
}