const mongoose=require('mongoose')

const contactSchema= new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:'pending'
    }
})

module.exports=mongoose.model("contacts",contactSchema)