/**
 * Created by qianlinliang on 8/1/16.
 */
var mongoose = require('mongoose');

var imageSchema = mongoose.Schema({
    filename : String,
    originalname : String,
    path : String,
    description : String,
    accessTimes : Number,
    mimetype : String
});

mongoose.Promise = global.Promise;
var Image = mongoose.model('Image', imageSchema);

exports.openConnection = function () {
    mongoose.connect('localhost:27017');
};

exports.createImages = function(files, next){
    console.log("Uploading files to mongoDB...");
    for( i = 0; i < files.length; i++) {
        var image = new Image({
            filename: files[i].filename,
            originalname: files[i].originalname,
            path: '/uploads/' + files[i].filename,
            description: "",
            accessTimes: 0,
            mimetype: files[i].mimetype
        });

        image.save(function (err, image) {
            if (err) return console.error(err);
        })
    }

    console.log("Upload succeed!");
    next();
};

exports.retriveImages = function(next){

    console.log("Reading files from mongoDB...")

    Image.find(function (err, images) {
        if (err) return console.error(err);
        next(err, images);
    });
};

exports.retriveImageId = function (id, next) {

    console.log("Reading file " + id +"from mongoDB...")

    Image.find({filename : id}, function (err, image) {
        if (err) return console.error(err);
        console.log(image);
        next(err, image[0]);
    });
};

exports.updateImage = function(id, data, next) {

    Image.update({filename : id}, data, function (err, image) {
        if (err) return console.error(err);
        console.log(image);
    });
};