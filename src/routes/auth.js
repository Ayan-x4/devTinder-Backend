const express = require("express")

const authRouter = express.Router();

const {ValidationSignUp} = require("../utils/validation")

const User = require("../models/user")

const bcrypt = require("bcrypt");
const user = require("../models/user");


authRouter.post("/signup",async(req,res)=>{
  try{
    ValidationSignUp(req)
    const {firstName,lasttName,emailId,password} = req.body;
    const passwordHash = await bcrypt.hash(password,10)

    const user = new User({
      firstName,
      lasttName,
      emailId,
      password:passwordHash
    })
    await user.save()
    res.send("user Added sucessfully");
  }catch(err){
    res.status(400).send("ERROR: "+ err.message);
  }
 

})

authRouter.post("/login",async(req,res)=>{
  try{
    const {emailId,password} = req.body;
    const user = await User.findOne({emailId:emailId})
    if(!user){
      throw new Error("Invalid credentials")
    }
    const ispasswordValid = await user.validatePassword(password)
    if(ispasswordValid){

      const token = await user.getJWT();

      res.cookie("token",token,{
    expires: new Date(Date.now() + 24 * 3600000)})
      res.send(user)
    }else{
      throw new Error("Invalid credentials")
    }

  }catch(err){
     res.status(400).send("ERROR: "+ err.message);
  }
})

authRouter.post("/logout",async(req,res)=>{
  res.cookie("token",null,{
    expires: new Date(Date.now())})
    res.send("user logout successful!!")
 
})




module.exports = authRouter