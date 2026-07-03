const express = require("express");
const connectDB = require("./config/database")
const app = express();
const User = require("./models/user")
const {ValidationSignUp} = require("./utils/validation")
const bcrypt = require("bcrypt") 


app.use(express.json());

app.get('/user',async(req,res)=>{
  const userEmail = req.body.emailId;
  try{
    const user = await User.findOne({emailId:userEmail})
    if(user.length ===0){
      res.status(404).send("User not found!!!")
    }else{
       res.send(user)
    }
   
  }
  catch(err){
    res.status(400).send("Somtihing went wrong");
  }
  
})

app.get("/feed",async(req,res)=>{
  try{
    const user = await User.find({})
    res.send(user);
  }catch(err){
     res.status(400).send("Somtihing went wrong");
  }
})

app.delete("/user",async (req,res)=>{
  const UserId = req.body.UserId;
  try{
     const userId = await User.findByIdAndDelete(UserId);
     res.send("User deleted Sucessfully")
  }catch(err){
    res.status(400).send("Somtihing went wrong");
  }
  
})


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
      res.send("User Login Successfully!!")
    }else{
      throw new Error("Invalid credentials")
    }

  }catch(err){
     res.status(400).send("ERROR: "+ err.message);
  }
})

app.patch("/user/:userId",async(req,res)=>{
  const userId = req.params?.userId;
  const data = req.body;

  try{
    const AllowUpdate = ["photoURL","about","skills","password"]
    const isUpdateAllowed = Object.keys(data).every(k=>
      AllowUpdate.includes(k))
    if(!isUpdateAllowed){
      throw new Error("Update Not Allowed!!!")
    }
    if(data?.skills.length>10){
      throw new Error("Skill must be less than 10 aur equal to 10")
    }
    const user = await User.findByIdAndUpdate({_id : userId},data,{
      returnDocument:"after",
      runValidators:true,
    });
    res.send("user update sucessfully")
  }catch(err){
    res.status(404).send("UPDATE FAILED!"+err.message)
  }
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




