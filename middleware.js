const jwt = require("jsonwebtoken");
const JWT_SECRET = "flowBoard";

function authMiddleware(req,res,next){
    const token = req.headers.token;

    const decodedValue = jwt.verify(token,JWT_SECRET);
    const userId = decodedValue.userId;

    if(userId){
        req.userId = userId;
        next();
    }else{
        res.status(403).json({
            message: "Invalid token"
        })
        return
    }
}

module.exports = {
    authMiddleware: authMiddleware
}