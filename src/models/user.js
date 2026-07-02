const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
  firstName:{
    type:String,
    require : true,
    minLength : 4,
    maxLength:20,
  },
   lasttName:{
    type:String,
  },
   emailId:{
    type:String,
    require: true,
    unique : true,
    lowercase:true,
    trim:true,
  },
   password:{
    type:Number,
    min:8,
    max:25,
    require :true,
  },
  age:{
    type : Number,
    min : 18,
    max :100
  },
   gender:{
    type:String,
    validate(value){
      if(!["male","female","others"].includes(value)){
        throw new Error("Gender data are not valid");
        
      }
    }
  },
  photoURL:{
    type:String,
    default :"https://cdn-icons-png.flaticon.com/512/8608/8608769.png",
  },
  about:{
    type: String,
    default : "Hi I am devTider User",
  },
  skills:{
    type :[String],
  }
},{
  timestamps :true,
})
module.exports = mongoose.model("User",userSchema)