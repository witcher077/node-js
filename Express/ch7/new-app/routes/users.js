
const mongoose=require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/mongodbOprations");

const userSchema= mongoose.Schema({
  username:String,
  name:String,
  intrest:{
    type:Array,
    default:[]
  },
  time:{
    type:Date,
    default:Date.now()
  },
  age:Number
});

module.exports=mongoose.model("user",userSchema);



