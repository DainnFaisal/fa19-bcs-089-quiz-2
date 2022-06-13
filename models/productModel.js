// utilizing mongoose and other packages 
var mongoose = require('mongoose');
const Joi = require('@hapi/joi');
// designing products schema
var productSchema = mongoose.Schema({
    Name: String,
    Anime: String,
    Type: String,
    Price: Number,
    Description: String,
    Image: String,

});
// validation of products
function validateProduct(data) {
    const schema = Joi.Object({
        // setting products details in schema
        name: Joi.string().min(3).max(10).required(),
        Anime: Joi.string().min(3).max(10).required(),
        Type: Joi.string().min(10).required(),
        Anime: Joi.number().min(0).required(),
        Description: Joi.string().min(10).max(120).required(),

    });

    return schema.validate(data, { abortEarly: false });

}

// exporting mongoose conn
var Product = mongoose.model("data", productSchema);
// exporting module
module.exports.MerchModelData = Product;
module.exports.validate = validateProduct;