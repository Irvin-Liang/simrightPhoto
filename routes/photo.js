/**
 * Created by qianlinliang on 8/2/16.
 */
var express = require('express');
var db = require('../database');
var router = express.Router();

// Send all images meta data in json format
router.get('/', function (req, res, next) {
    db.retriveImages(function (err, images) {
        if (err) throw err;
        res.json({data : images});
    })
});

// Send a specific image meta data in json format and update access time
router.get('/:photoId', function (req, res, next) {
    db.retriveImageId(req.params.photoId, function (err, image) {
        if (err) throw err;
        image.accessTimes += 1;
        db.updateImage(image.filename, {accessTimes : image.accessTimes});
        res.json({myImage : image});
    })
});

// Update a specific image description
router.post('/:photoId', function (req, res, next) {
    db.updateImage(req.params.photoId, {description: req.body.description});
    res.sendStatus(200);
});

module.exports = router;