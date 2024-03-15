var express = require('express');
var router = express.Router();
var userModel=require("./users")
const passport = require('passport');

const localStrategy=require("passport-local");
passport.use(new localStrategy(userModel.authenticate()));



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// register route

router.post('/register',function(res,req){
  var userdata=new userModel({
    // username:req.body.username,
    // secret:req.body.secret
  })
userModel.register(userdata,req.body.password)
 .then(function(registereduser){
  passport.authenticate("local")(res,req,function(){
    res.redirect('/profile');
  })
 })
});



router.get('/profile', isLoggedIn, function(req, res, next) {
  res.send('Welcome to profile');
});


/* Code for Login */
router.post('/login', passport.authenticate("local",{
  successRedirect:"/profile",
  failureRedirect:"/"
  }) ,function(req, res, next) {
    
  });

  /* Code for Logout */
  router.get('/logout' ,function(req, res, next) {
    res.logout(function(err){
      if(err) return(err);
      res.redirect('/')
    })
  });


 



/* Is Loggedin Middleware */
function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/');

  }




module.exports = router;
