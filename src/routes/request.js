const express = require("express")

const requestRouter = express.Router();

const {userAuth} = require("../middlewares/Auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user")

requestRouter.post("/request/send/:status/:toUserId",userAuth,async(req,res)=>{

  try{
    const fromUserId = req.user._id
    const toUserId = req.params.toUserId;
    const status = req.params.status;
    const isAllowedStatus = ["ignored","intrested"]
    if(!isAllowedStatus.includes(status)){
      return res.status(400).json({message:"Invalid Status Type: "+status})
    }
    const toUser = await User.findById(toUserId)
    if(!toUser){
      return res.status(404).json({message:'User not Found!!'})
    }
    const existingConnectionrequest = await ConnectionRequest.findOne({
      $or:[
        {fromUserId,toUserId},
        {toUserId:fromUserId,fromUserId:toUserId}]

    })
    if(existingConnectionrequest){
      return res.status(404).send({message:"Connection Request Already Exists!!"})
    }
   
     const connectionRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status,
     })

     const data = await connectionRequest.save();
     res.json({
      message:req.user.firstName+" is "+status+" in "+toUser.firstName,
      data,
     })

  }catch(err){
    res.status(400).send("Error : " +err.message)
  }
  
})



module.exports = requestRouter