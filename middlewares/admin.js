// validation of authorization of user 
function admin(req, res, next) {
    // if user is not admin, then he will not get authorization controls
    if (req.user.role != "admin")

        return res.status(403).send("You are not authorized");

    next();
}
// exporting module
module.exports = admin;