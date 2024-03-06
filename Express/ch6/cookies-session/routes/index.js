var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  req.session.ban=true;
  res.cookie("movie","Avengers");
  res.render('index', { title: 'Express' });
});
router.get('/readcookies', function(req, res, next) {
 console.log(req.cookies);
 res.send(req.cookies);
});
router.get('/clearcookies', function(req, res, next) {
 res.clearCookie("movie");
 res.send("cookies Deleted");
});

router.get('/checkban', function(req, res, next) {
  
  if(req.session.ban===true){
    res.send(" sorry 😢 you are banned ")
  }
  else  res.send("you are not banned 🥰")
  
});
router.get('/removeban', function(req, res, next) {
  
  req.session.destroy(
    function(err){
     if (err) throw err;
     res.send("ban removed");
    }
  )
  
});

module.exports = router;
