var express = require('express');
var router = express.Router();
var userModel = require("./users")
var postModel = require("./post")
const passport = require('passport');
const upload = require('./multer')
const profileimage = require('./profilemulter')

const localStrategy = require("passport-local");
const { findOne } = require('./users');
passport.use(new localStrategy(userModel.authenticate()));



/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index',{nav:false});
});
router.get('/login', function (req, res, next) {
  res.render('login',{err: req.flash("error"),nav:false});
});

router.post('/profileupload',isLoggedIn,profileimage.single("file"), async function (req, res, next) {
  const user =await userModel.findOne({username:req.session.passport.user});
  user.dp=req.file.filename;
  await user.save();
  res.redirect("/profile");

});

// register route

router.post('/register', function (req,res) {
  const userData = new userModel({ 
    username:req.body.username,
    email:req.body.email,
    fullname:req.body.fullname, 
  })
  
  console.log(req.body)
  userModel.register(userData, req.body.password)
    .then(function () {
      passport.authenticate("local")(req,res, function () {
        res.redirect("/profile");
      })
    })
});

// app.use(express.json())

router.get('/profile', isLoggedIn, async function (req, res, next) {
  const user= await userModel.findOne({
    username:req.session.passport.user
  }).populate("posts")
  console.log(user)
  res.render('profile',{user,nav:true});
});

router.get('/feed', isLoggedIn, function (req, res, next) {
  res.render('feed',{nav:true});
});
router.post('/upload',isLoggedIn, upload.single("file"), isLoggedIn, async function (req, res, next) {
  if(!req.file){
    return res.status(404).redirect("/profile")
  }
  
  const user =await userModel.findOne({
    username:
    req.session.passport.user
  })
  let postText;
  if(req.body.postText) 
    postText=req.body.postText;
  else 
    postText=user.postText;
  const post= await postModel.create({
    image:req.file.filename,
    postText:postText,
    user:user._id
  })

  user.posts.push(post._id);
  await user.save();
  

 
  res.redirect("/profile");

});


/* Code for Login */
router.post('/login', passport.authenticate("local", {
  successRedirect: "/profile",
  failureRedirect: "/login",
  failureFlash:true
}), function (req, res, next) {
// res.send('<h1 style="text-align:center;">Welcome to profile</h1>')
});

/* Code for Logout */
router.get('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) return (err);
    res.redirect('/login')
  })
});






/* Is Loggedin Middleware */
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');

}




module.exports = router;









