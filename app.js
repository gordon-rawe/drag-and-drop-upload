var express = require('express');
var app = express();
var multer = require('multer');
var upload = multer({dest: 'uploads/', keepExtensions: true});
var path = require('path');
var fs = require("fs");

app.use(express.static("public"));
app.use(express.static("bower_components"));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname + '/views'));

app.get("/multi", function (req, res) {
    res.render("multi");
});

app.get("/ajax", function (req, res) {
    res.render("ajax");
});

app.get("/dropzone", function (req, res) {
    res.render("dropzone");
});

app.post('/upload/dropzone', upload.single("file"), function (req, res) {
    var file = req.file;
    var tail = "." + file.mimetype.split("/")[1];
    fs.rename(file.path, file.path + tail, function (err) {
        if (err) res.send({status: false});
        else res.send({status: true, files: req.files});
    });
});

app.post('/upload/ajax', upload.single("photos"), function (req, res) {
    var file = req.file;
    var tail = "." + file.mimetype.split("/")[1];
    fs.rename(file.path, file.path + tail, function (err) {
        if (err) res.send({status: false});
        else res.send({status: true, files: req.files});
    });
});

app.post('/upload/multi', upload.array("photos", 12), function (req, res) {
    var files = req.files;
    files.forEach(function (file) {
        var tail = "." + file.mimetype.split("/")[1];
        fs.rename(file.path, file.path + tail);
    });
    res.send({status: true, files: req.files});
});

var server = app.listen(process.env.PORT || 3333, function () {
    console.log('App started listening on port %d', server.address().port);
});