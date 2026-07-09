
const validator = require("validator")
const user = require("../models/user");
const bcrypt = require("bcrypt")

const ValidationSignUp = (req)=>{
  const {firstName,lastName,emailId,password} = req.body
  if(!firstName || !lastName){
    throw new Error("Please Enter Your Name ")
  }
  else if(!validator.isEmail(emailId)){
    throw new Error("Please Enter Valid Email Adress")
  }
  else if(!validator.isStrongPassword(password)){
    throw new Error("Password should be contains this type 'A''a''1''@' ")
  }
}
const validateProfileEditData = (req)=>{
  const allowedEditFields = [
    "firstName","lastName","emailId","about","skills","photoURL","age","gender"]
  const isEditAllowed = Object.keys(req.body).every(fields =>
     allowedEditFields.includes(fields))
     return isEditAllowed
    }
const validateExistingpassword = async (req)=>{
  const {password} = req.body
  const passwordHash = req.user.password;
    const ispasswordValid = await bcrypt.compare(password,passwordHash)
    return ispasswordValid;
}
module.exports ={
  ValidationSignUp,
  validateProfileEditData,
  validateExistingpassword,
}
