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
    
    {
      type:mongoose.Schema.Types.ObjectId,
      ref: 'group'

  }

  ],
  
});


const groupSchema = new mongoose.Schema ({
  "id": String,
  "name": String,
  "users":[

    {
      type:mongoose.Schema.Types.ObjectId,
      ref: 'user'

  }


  ],
  
});

const user=conn.model('user',userSchema);
const group=conn2.model('group',groupSchema);


app.post("/user/create",function abc(req,res){


  
})

app.listen(5000, function(){
  console.log("Server started on port 5000");
});

