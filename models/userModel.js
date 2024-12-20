const mongoose=require('mongoose')

const userSchema= new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:String    
    },
    address:{
        type:String
    },
    profilePic:{
        type:String
    },
    role:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model("users",userSchema)