// requiring web token 
const jwt = require("jsonwebtoken");
const config = require("config");
// requiring database model
const { UserModel } = require("../models/userModel");

//token generator
async function auth(req, res, next) {

    let token = req.header("x-auth-token");
    // if it has not token
    if (!token) return res.status(400).send("token not found");
    // verification of token
    try {
        let user = jwt.verify(token, config.get("jwtPrivateKey"));

        req.user = await UserModel.findById(user._id);
        // else it will catch error 
    } catch (err) {
        return res.status(400).send("invalid token");

    }

    next();

}

// exporting modules
module.exports = auth;