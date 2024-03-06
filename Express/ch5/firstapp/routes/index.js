var express = require('express');
var router = express.Router();
const userModel=require('./users');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/create', async function(req, res, next) {
 const createdusers= await userModel.create({
    username:"Witcher007",
    age:25,
    name:"Ashok"
  })
  res.send(createdusers)
});

router.get('/allusers', async function(req, res, next) {
  let all= await userModel.find();
  res.send(all);
});
router.get('/one', async function(req, res, next) {
  let all= await userModel.findOne({username:"Witcher007"});
  res.send(all);
});
router.get('/delete', async function(req, res, next) {
  let deleted= await userModel.findOneAndDelete({username:"Witcher007"});
  res.send(deleted);
});

module.exports = router;
