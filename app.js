//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose=require('mongoose');
const path=require('path');


const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
mongoose.connect("mongodb://localhost:27017/friendsDB", {useNewUrlParser: true, useUnifiedTopology: true });
const friendsSchema = {
  loginid:Number,
  password: String,
  myfriends:[]
};

const friends = mongoose.model("friends", friendsSchema);


app.get("/", function(req, res){
  res.render("index.ejs");
});

app.post('/',function(req,res){
  var loginid=req.body.login;
  var password=req.body.password;
  console.log('the login id and password is'+loginid,password);
  friends.findOne({loginid:loginid},function(err,items){

    if(items){
        console.log('login successfull')
        res.render('home')
    }
    else{
      console.log('username or password is incorrect')
      res.render('404')
      }
  })


})
app.get('/home',function(req,res){
  friends.find({},function(err,items){
    console.log(items)
    res.render('home',{myfriends:items,add_disappear:"add_disappear();",add_disappear_1:"add_disappear_1();",add_disappear_2:"add_disappear_2();"});

  })
})
app.get('/friendslist',function(req,res){
  res.render('friendslist')
})


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
