// utlizing dependencies and packages
var express = require('express');
var router = express.Router();

var bcrypt = require('bcryptjs');
const config = require('config');

var jwt = require('jsonwebtoken');
const _ = require('lodash');
// utilizing user model from specific folder
var { UserModel } = require("../../models/userModel");
// post method
// if user with the email entered already exists
router.post("/register", async(req, res) => {
    let user = await UserModel.findOne({ Email: req.body.Email });
    if (user) return res.status(400).send("User with given email already exist");

    user = new UserModel();
    user.Name = req.body.Name;
    user.Email = req.body.Email;
    user.Password = req.body.Password;
    await user.generateHashedPassword();

    await user.save();

    return res.send(_.pick(user, ["name", "email"]));

});
// post method
// login 
// if user is not registered then user doesn't exist
router.post("/login", async(req, res) => {
    let user = await UserModel.findOne({ Email: req.body.Email });
    if (!user) return res.status(400).send("User not exist");
    // invalid password
    let isValid = await bcrypt.compare(req.body.Password, user.Password);
    if (!isValid) return res.status(400).send("wrongPassword");
    // if there is correct password then token will be generated 
    let token = jwt.sign({ _id: user._id, Name: user.Name, Role: user.Role },
        config.get("jwtPrivateKey"));

    return res.send(token);

});
// get method
router.get("/", async(req, res) => {
    let data = await UserModel.find();

    return res.send(data)
})

// exporting module 
module.exports = router;