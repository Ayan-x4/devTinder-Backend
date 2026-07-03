
const validator = require("validator")

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
module.exports ={
  ValidationSignUp,
}