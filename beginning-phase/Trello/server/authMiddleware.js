const jwt = require("jsonwebtoken");
const JWT_SECRET = "chalNaChutiye";
const authMiddleware = (req, res, next) => {
    const token = req.headers.token;

    const decoded = jwt.verify(token, JWT_SECRET);
    const UserId = decoded.UserId;

    if (UserId) {
        req.UserId = UserId;
        next();
    }else{
        res.status(403).json({
            message: "something went wrong"
        })
    }

}



module.exports = { authMiddleware };