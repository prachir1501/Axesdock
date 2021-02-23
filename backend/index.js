require('dotenv').config()
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose  = require("mongoose");
const encrypt = require("mongoose-encryption");

const app = express();

app.use(express.static("public"));

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


// mongoose.connect("mongodb+srv://admin:"+process.env.PASSWORD+"@cluster0.kxxnr.mongodb.net/alldevices?retryWrites=true&w=majority", {useUnifiedTopology: true,useNewUrlParser: true});


var conn= mongoose.createConnection("mongodb+srv://admin:"+process.env.PASSWORD+"@cluster0.kxxnr.mongodb.net/allUsers?retryWrites=true&w=majority", {useUnifiedTopology: true,useNewUrlParser: true});
var conn2= mongoose.createConnection("mongodb+srv://admin:"+process.env.PASSWORD+"@cluster0.kxxnr.mongodb.net/allGroups?retryWrites=true&w=majority", {useUnifiedTopology: true,useNewUrlParser: true});

const userSchema = new mongoose.Schema ({
  "id": String,
  "firstname": String,
  "lastname":String,
  "institute_id":String,
  "groups":[
    
  ],
  
  

  

});