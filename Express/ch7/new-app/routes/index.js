var express = require('express');
var router = express.Router();
var userModel = require("./users");

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/create', async function (req, res, next) {

  const newUser = await userModel.create({
    username: "Spiderman",
    name: "Tom",
    intrest: ["Science", "climb", "MJ"],
    age: 25
  })
  res.send(newUser);
});

router.get('/showData', async function (req, res, next) {
  let alldata = await userModel.find()
  res.send(alldata);
});
router.get('/find', async function (req, res, next) {

  let found = await userModel.find()
  res.send(found);
});
router.get('/findone', async function (req, res, next) {
  let regex = new RegExp("iron", "i") // To Search case insensitive 
  let found = await userModel.find({ username: regex })
  res.send(found);
});

router.get('/findbyval', async function (req, res, next) {

  let found = await userModel.find({ intrest: { $all: ["love"] } })
  res.send(found);
});
router.get('/findbydate', async function (req, res, next) {
  var date1 = new Date("2024-02-02");
  var date2 = new Date("2024-03-08");
  let found = await userModel.find({ time: { $gte: date1, $lte: date2 } })
  res.send(found);
});
router.get('/findbyfield', async function (req, res, next) {

  let found = await userModel.find({ age: { $exists: true } })
  res.send(found);
});
router.get('/findbylen', async function (req, res, next) {

  let found = await userModel.find({ 
    $expr:{
      $and:[
        {$gte:[{$strLenCP:"$username"}, 3]},
        {$lte:[{$strLenCP:"$username"}, 5]}
      ]
    }
   })
  res.send(found);
});

module.exports = router;
