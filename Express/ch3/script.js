const express = require('express')
const app = express()

app.set("view engine", "ejs");
app.use(express.static('./Public'))

app.get('/error',function(req,res){
  throw Error("Ye kya ho gya bhai")
})

app.get('/', function (req, res) {
  res.render('index')
})
app.get('/contact', function (req, res) {
  res.render('contact')
})
app.get('/profile/:username', function (req, res) {
    // req.params
  res.render("profile",{name:req.params.username,username:"Witcher@123"})
})

app.use(function errorHandler (err,req,res,next){
    if(res.headersSent){
      return next(err)
    }
    res.status(500)
    res.render('error',{error:err})
    
})
app.use(function(req,res,next){
    console.log('Hello from middleware.')
    next();
})

app.listen(3000)