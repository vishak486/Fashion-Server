const mongoose=require('mongoose')

const productSchema= new mongoose.Schema({
    productName:{
        type:String,
        required:true,
        unique:true
    },
    productDescription:{
        type:String,
        required:true
    },
    productPrice:{
        type:Number,
        required:true
    },
    productQuantity:{
        type:Number,
        required:true
    },
    productImg:{
        type:String,
        required:true
    },
    categoryName:{
        type:String,
        required:true
    },
    productCategory:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'categories',
        required:true
    },
})

module.exports=mongoose.model("products",productSchema)