/**
 * Created by qianlinliang on 8/1/16.
 */

var express = require('express');
var db = require('../database');
var router = express.Router();

// For handling 'multipart/form-data'
var multer = require('multer');
var upload = multer({dest : "public/uploads/"});

// Send uploadPage.html file, enter the upload page
router.get('/', function (req, res) {
    res.sendFile('uploadPage.html', {root : './views'});
});

// Accept data form input with name 'files[]', data receive as an array
router.post('/', upload.array('files[]'),function(req, res, next){

    if (req.files){
        db.createImages(req.files, function (err) {
            if (err) console.error(err);
            res.send("");
        });
    } else {
        res.sendStatus(500);
    }



});

module.exports = router;