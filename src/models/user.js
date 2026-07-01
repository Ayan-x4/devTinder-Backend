const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
  firstName:{
    type:String,
  },
   lasttName:{
    type:String,
  },
   emailId:{
    type:String,
  },
   password:{
    type:Number,
  },
   gender:{
    type:String,
  },
})
module.exports = mongoose.model("User",userSchema)