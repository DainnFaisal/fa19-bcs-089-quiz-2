// utlizing dependencies and packages
var express = require('express');
var router = express.Router();

// getting home page
// get method 
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});
// exporting module 
module.exports = router;