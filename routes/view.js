/**
 * Created by qianlinliang on 8/2/16.
 */
var express = require('express');
var router = express.Router();

// Send the view.html file, enter the view page
router.get('/', function (req, res, next) {
    res.sendFile('view.html', {root: './views'});
});

module.exports = router;