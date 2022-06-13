const { validate } = require("../models/productModel");
//validation of products 
function validateProduct(req, res, next) {
    let { error } = validate(req.body);
    // else error msg will generate 
    if (error)
        return res.status(400).send(error.details[0].message);

    next();

}

// exporting module
module.exports = validateProduct;