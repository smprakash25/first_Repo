var express = require('express');
const app = express();
var router = express.Router();


const College = require('../models/college');

/* GET users listing. */
router.get('/',function(req, res){
  College.find({},function (err,college) {
    if(err) throw err;
    res.json(college);
  });
});


router.post('/',function(req,res){
    console.log(req.body);
  const college = new College({
    name : req.body.name
  });
  college.save().then(function(){
      res.json(college);
  });
   
});

module.exports = router;