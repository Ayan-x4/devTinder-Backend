const express = require("express")

const User = require("../models/user")

const profileRouter = express.Router();

const {userAuth} = require("../middlewares/Auth")
const { validateProfileEditData,validateExistingpassword} = require("../utils/validation")
const bcrypt = require("bcrypt");
const user = require("../models/user");


profileRouter.get("/profile/view",userAuth,async(req,res)=>{
  try{

    const user = req.user;
  res.send(user)
}catch(err)
{
   res.status(400).send("ERROR: "+ err.message);
}
})
profileRouter.patch("/profile/edit",userAuth,async(req,res)=>{
  try{
    if(!validateProfileEditData(req)){
      throw new Error("Invalid Edit Request!!!")
    }
    const loggedinUser = req.user;
    Object.keys(req.body).forEach(key => loggedinUser[key] = req.body[key])
     await loggedinUser.save()
    res.send(`${loggedinUser.firstName},Update profile successfully!!`)
   
  }catch(err){
     res.status(400).send("ERROR: "+ err.message);
  }
})
profileRouter.patch("/profile/forgotpassword",userAuth,async(req,res)=>{

     try {
    const isPasswordValid = await validateExistingpassword(req);

    if (!isPasswordValid) {
      throw new Error("Existing password is incorrect");
    }

    const { newPassword } = req.body;

    req.user.password = await bcrypt.hash(newPassword, 10);

    await req.user.save();

    res.status(200).json({
      message: "Password updated successfully"
    });

  } catch (err) {
    res.status(400).json({
      error: err.message
    })}
});


module.exports = profileRouter