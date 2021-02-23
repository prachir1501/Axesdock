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


mongoose.connect("mongodb+srv://admin:"+process.env.PASSWORD+"@cluster0.kxxnr.mongodb.net/AxesDock?retryWrites=true&w=majority", {useUnifiedTopology: true,useNewUrlParser: true});

const userSchema = new mongoose.Schema ({
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

// const user=conn.model('user',userSchema);
// const group=conn2.model('group',groupSchema);

const user = new mongoose.model('user',userSchema);
const group= new mongoose.model('group',groupSchema);



app.post("/user/create",function abc(req,res){


  const newuser=new user(
      {
          firstname:req.body.firstname,
          lastname:req.body.lastname,
          institute_id:req.body.institute_id,
          
      }
  )

  newuser.save(function(err){
      if(err)
      {
          console.log(err);
          var response={
            status:"failed",
            error:err,
          }
          res.send(response);
      }

      else
      {
          console.log(newuser);
          var response={
            status:"success",
          }
          res.send(response);
      }
  })

})

app.post("/user/delete",function abc(req,res){


  user.deleteOne({institute_id:req.body.institute_id},function(err,result){

    if(err)
      {
          console.log(err);
          var response={
            status:"failed",
            error:err,
          }
          res.send(response);
      }

      else
      {
          console.log(result);
          var response={
            status:"success",
          }
          res.send(response);
      }
  })



})


app.get("/user/getOne",function abc(req,res){


  user.findOne({institute_id:req.body.institute_id},function(err,result){

    if(err)
      {
          console.log(err);
          var response={
            status:"failed",
            error:err,
          }
          res.send(response);
      }

      else
      {
          console.log(result);
          var response={
            status:"success",
            user:result,
          }
          res.send(response);
      }
  })



  })


app.get("/user/getAll",async function(req,res){

    const cursor = user.find().cursor();

    const users=[];
    
    for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {

        users.push(doc)

      }

      var response={
        status:"success",
        users:users,
      }
      res.send(response);
})


app.post("/group/create",function abc(req,res){


  const newgroup=new group(
      {
          id:req.body.id,
          name:req.body.name,
          users:req.body.users          
      }
  )

  newgroup.save(function(err){
      if(err)
      {
          console.log(err);
          var response={
            status:"failed",
            error:err,
          }
          res.send(response);
      }

      else
      {
          console.log(newgroup);
          var response={
            status:"success",
          }
          res.send(response);
      }
  })

})

app.post("/group/delete",function abc(req,res){


  group.deleteOne({id:req.body.id},function(err,result){

    if(err)
      {
          console.log(err);
          var response={
            status:"failed",
            error:err,
          }
          res.send(response);
      }

      else
      {
          console.log(result);
          var response={
            status:"success",
          }
          res.send(response);
      }
  })



})

app.get("/group/getOne",function abc(req,res){


  group.findOne({id:req.body.id}).populate("users").exec((err,group)=>{

    if(err)
      {
          console.log(err);
          var response={
            status:"failed",
            error:err,
          }
          res.send(response);
      }

      else
      {
          console.log(group);
          var response={
            status:"success",
            group:group,
          }
          res.send(response);
      }


  })



})

app.get("/group/getAll",async function(req,res){

  const cursor = group.find().populate('users').cursor();

  const groups=[];
  
  for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {

      groups.push(doc)

    }

    var response={
      status:"success",
      groups:groups,
    }
    res.send(response);
})

app.post("/group/addUser",function abc(req,res){


  group.findOneAndUpdate({id:req.body.id},{ $push: { 'users': req.body.userId  } },function(err,result){

    if(err)
      {
          console.log(err);
          var response={
            status:"failed",
            error:err,
          }
          res.send(response);
      }

      else
      {
          console.log(result);
          var response={
            status:"success",
          }
          res.send(response);
      }
  })



})

app.post("/group/deleteUser",function abc(req,res){


  group.findOneAndUpdate({id:req.body.id},{ $pull: { 'users': req.body.userId  } },function(err,result){

    if(err)
      {
          console.log(err);
          var response={
            status:"failed",
            error:err,
          }
          res.send(response);
      }

      else
      {
          console.log(result);
          var response={
            status:"success",
          }
          res.send(response);
      }
  })



})








  


app.listen(5000, function(){
  console.log("Server started on port 5000");
});

