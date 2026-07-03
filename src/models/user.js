const mongoose = require("mongoose")
const validator = require("validator")

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
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error("Email is not Valid: "+value)
      }
    }
  },
   password:{
    type:String,
    minLength:[8,"Password must be at least 8 characters long"],
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