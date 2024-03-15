const multer =require("multer");
const {v4: uuidv4}=require("uuid")
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images/profileimg')
    },
    filename: function (req, file, cb) {
      const uniquename = uuidv4();
      cb(null, uniquename+path.extname(file.originalname))
    }
  })
  
  const profileimage = multer({ storage: storage })
  module.exports=profileimage;