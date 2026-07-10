const express = require("express");
const { userAuth } = require("../middlewares/Auth");
const ConnectionRequest = require("../models/connectionRequest");

const userRouter = express.Router();

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequest = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "intrested",
    }).populate("fromUserId", ["firstName", "lastName"]);

    res.json({
      message: "Data Fetched Successfully.",
      data: connectionRequest,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

userRouter.get("/user/connections",userAuth,async(req,res)=>{
  try{
  const loggedInUser = req.user
  const connectionRequest = await ConnectionRequest.find({
    $or:[
      {toUserId:loggedInUser._id, status:"accepted"},
      {fromUserId:loggedInUser._id, status:"accepted"},
    ],
  })
  .populate("fromUserId",["firstName"])
  .populate("toUserId",["firstName"])
  const data = connectionRequest.map(row => {
    if(row.fromUserId._id.toString()===loggedInUser._id.toString()){
      return row.toUserId;
    }
    return row.fromUserId;
  }) 
  res.json({datat});
  }
  catch(err){
res.status(400).json({
      message: err.message,
    });
  }

})

module.exports = userRouter;