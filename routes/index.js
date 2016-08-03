var express = require('express');
var db = require('../database');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  db.retriveImages(function(err, images){
    if (err) console.error(err);

    res.render('index', {myImage: images});
  });
});


module.exports = router;