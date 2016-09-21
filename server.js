// server.js

// set up ========================
var express  = require('express');
var app      = express();                               // create our app w/ express
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var path = require('path');
var cors = require('cors');
var fs = require('fs');
var timeout = require('connect-timeout');


app.use(cors());
app.use(timeout(5000000));
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.get("/services/getToken",function(req,res){
    res.json("Test Token");
});
app.post("/services/rawDataExtract/checkProductSecurity",function(req,res){
    //var searchQuery = req.body.searchQuery;
    res.sendFile(path.normalize(__dirname +"/data/securityCheck101.json"));
});
app.post("/services/rawDataExtract/createTask",function(req,res){
    //var searchQuery = req.body.searchQuery;
    setTimeout(function(){res.sendFile(path.normalize(__dirname +"/data/createTask.json"))},1000);
});
app.post("/services/rawDataExtract/getTaskList",function(req,res){
    setTimeout(function(){res.sendFile(path.normalize(__dirname +"/data/taskList.json"))},1000);
});
app.get("/igloo/getToken",function(req,res){
	setTimeout(function(){res.sendFile(path.normalize(__dirname +"/data/userToken.json"))},1000);
});
app.get("/igloo/getUserInfo",function(req,res){
	//res.status(404).send("error");
	setTimeout(function(){res.sendFile(path.normalize(__dirname +"/data/userInfo.json"))},1000);
});

// listen (start app with node server.js) ======================================
app.listen(8050);
console.log("App listening on port 8050");