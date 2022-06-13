// utilizing dependencies or packages 
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

const Joi = require('@hapi/joi');
// setting users schema
var UserSchema = mongoose.Schema({
    Name: String,
    Email: String,
    Password: String,
    Role: {
        type: String,
        default: "user",

    },
});
// password authentication
UserSchema.methods.generateHashedPassword = async function() {
        let salt = await bcrypt.genSalt(10);

        this.Password = await bcrypt.hash(this.Password, salt);
    }
    // exporting user schema
var User = mongoose.model("User", UserSchema);
// validating sign up of users
function validateUserSignup(data) {

    const schema = Joi.Object({
        Name: Joi.string().min(3).max(10).required(),
        Email: Joi.string().email().min(3).max(10).required(),
        Password: Joi.string().min(8).required(),

    });

    return schema.validate(data, { abortEarly: false });

}
// validating users sign in
function validateUserSignin(data) {

    const schema = Joi.Object({
        Name: Joi.string().min(3).max(10).required(),
        Email: Joi.string().email().min(3).max(10).required(),
        Password: Joi.string().min(8).required(),

    });
    // returnin schema
    return schema.validate(data, { abortEarly: false });

}


// exporting user model
module.exports.UserModel = User;
// exporting modules
module.exports.validateSignin = validateUserSignin;
module.exports.validateSignup = validateUserSignup;