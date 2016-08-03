/**
 * Created by qianlinliang on 8/2/16.
 */


var express = require('express');
var router = express.Router();

// send the gallery.html file on request
router.get('/', function (req, res, next) {
   res.sendFile('gallery.html', {root: './views'});
});


module.exports = router;