var express = require('express');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');


var app = express();

app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/public/index.html'));
});


//routes
var studentRouter = require('./routes/studentRouter');
var collegeRouter = require('./routes/collegeRouter');
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/public/index.html'));
});
//middleware
app.use(bodyparser.urlencoded({extended : true}));
app.use(bodyparser.json());
app.use(express.static(path.join(__dirname, 'public')));


// custom middleware
app.use('/api/students',studentRouter);
app.use('/api/colleges',collegeRouter);



mongoose.connect("mongodb://localhost/mydb",{ useNewUrlParser: true })
  .then(function(){
    console.log("database connected");
  })
  .catch(function(err){
    console.log("could not connect to database")});


const PORT = 3000;
app.listen(PORT,function(){
    console.log("Server running on port : "+PORT);
});