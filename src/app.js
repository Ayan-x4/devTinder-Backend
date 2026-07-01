const express = require("express");
const connectDB = require("./config/database")
const app = express();
const User = require("./models/user")


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
  const user = new User(req.body)

  try{
    await user.save()
    res.send("user Added sucessfully");
  }catch(err){
    res.status(400).send("Error saving the User: "+ err.message);
  }
 

})

app.patch("/user",async(req,res)=>{
  const userId = req.body.userId;
  const data = req.body;
  try{
    const user = await User.findByIdAndUpdate({_id : userId},data)
    res.send("user update sucessfully")
  }catch(err){
    res.status(404).send("user not found")
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




