 const mongoose = require('mongoose');

 const connectDB = async ()=>{
  await mongoose.connect("mongodb+srv://mdayan7pro_db_user:BJFKeVzRW4d2psJE@devtinder.tlbdvfp.mongodb.net/devtinder")
 }
module.exports = connectDB;


