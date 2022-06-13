// utlizing dependencies and packages
var express = require('express');
var router = express.Router();

var multer = require('multer')
    // for merch data 
var { MerchModelData } = require("../../models/productModel");
// validation package
var validateProduct = require("../../middlewares/validateProducts");
// authorization
var auth = require("../../middlewares/auth");
// admin 
var admin = require("../../middlewares/admin");

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads')

    },

    filename: function(req, file, cb) {
        cb(null, file.originalname)

    }
});
// for uploading
var upload = multer({ storage: storage });
// get request
router.get("/", async(req, res) => {

    let data = await MerchModelData.find();

    return res.send(data)
})

//get single merch validation
router.get("/:id", async(req, res) => {
    // finding by id
    try {

        let data = await MerchModelData.findById(req.params.id);
        // if there is no data
        if (!data)
            return res.status(400).send("Product not found");
        return res.send(data)
            //catching error
    } catch (error) {
        return res.status(400).send("Invalid ID");

    }

})

//update method
// finding by id
router.put("/:id", async(req, res) => {
    try {
        let data = await MerchModelData.findById(req.params.id);
        data.Name = req.body.Name;
        data.Anime = req.body.Anime;
        data.Type = req.body.Type;

        await data.save();
        // if there is no data then product is not found
        if (!data)
            return res.status(400).send("Product not found");
        return res.send(data)
            // catching error
    } catch (error) {
        return res.status(400).send("Invalid ID");

    }
})

//delete method
// finding by id and delete product
router.delete("/:id", async(req, res) => {
        try {
            let data = await MerchModelData.findByIdAndDelete(req.params.id);
            // if there is no data found 
            if (!data)
                return res.status(400).send("Product not found");
            return res.send(data)
                // catching error
        } catch (error) {

            return res.status(400).send("Invalid ID");

        }

    })
    //insertion method
    // uploading product image
router.put("/", upload.single('product-image'), async(req, res) => {
    let data = new MerchModelData();
    data.Name = req.body.Name;
    data.Anime = req.body.Anime;
    data.Type = req.body.Type;
    data.Price = req.body.Price;
    data.Description = req.body.Description;
    data.Image = req.body.Image;

    await data.save();
    // image uploaded successfuly
    return res.send(data)


})

// exporting module
module.exports = router;