/*
Name: Tan Jing Yi
Class: 1B03
Admin No: 1922574
*/


var app = require('./controller/app.js');
var port = 6936;

var server=app.listen(port,function() {

    console.log("App hosted at localhost:" + port);

    
});