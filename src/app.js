const express = require("express");
const connectDB = require("./config/database")
const app = express();
const User = require("./models/user")
const {ValidationSignUp} = require("./utils/validation")
const bcrypt = require("bcrypt")
const cookieParser = require('cookie-parser')
const jwt = require("jsonwebtoken")
const {userAuth} = require("./middlewares/Auth")


app.use(express.json());
app.use(cookieParser());



app.post("/signup",async(req,res)=>{
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


app.post("/login",async(req,res)=>{
  try{
    const {emailId,password} = req.body;
    const user = await User.findOne({emailId:emailId})
    if(!user){
      throw new Error("Invalid credentials")
    }
    const ispasswordValid = await bcrypt.compare(password,user.password)
    if(ispasswordValid){

      const token = await jwt.sign({_id :user._id},"devTinder@098",{
        expiresIn:"1d",

      })

      res.cookie("token",token,{
    expires: new Date(Date.now() + 24 * 3600000)})
      res.send("User Login Successfully!!")
    }else{
      throw new Error("Invalid credentials")
    }

  }catch(err){
     res.status(400).send("ERROR: "+ err.message);
  }
})

app.get("/profile",userAuth,async(req,res)=>{
  try{

    const user = req.user;
  res.send(user)
}catch(err)
{
   res.status(400).send("ERROR: "+ err.message);
}
})

app.post("/sendConnectionRequest",userAuth,async(req,res)=>{
  const user = req.user
  console.log("sending a connectio request...")
  res.send(user.firstName+ " sent the connection request")
})




connectDB()
.then(()=>{
  console.log("connection Establish Successfully")
  app.listen(3000,()=>{
  console.log("server is running..")
}) 
})
.catch(err=>{
  console.error("connection not Establish")
});




