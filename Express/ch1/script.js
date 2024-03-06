const express = require('express')
const app = express()
const port = 3000;

app.set("view engine", "ejs");

// app.use((req,res,next)=>{
//     console.log("middleWare1")
//     next();
// })
// app.use((req,res,next)=>{
//     console.log("middleWar2")
//     next();
// })

app.get('/', (req, res) => {
  res.render('index');
})
app.get('/contact', (req, res) => {
  res.render('contact',{Name:"Ashok"});
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})