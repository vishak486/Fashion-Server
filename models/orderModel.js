const mongoose=require('mongoose')

const orderSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true
    },
    products: [
        {
          productId: { type: mongoose.Schema.Types.ObjectId, ref: "products", required: true },
          name: { type: String, required: true },
          quantity: { type: Number, required: true },
          color: { type: String, required: true },
          size: { type: String, required: true },
        },
      ],
    shippingAddress: { type: String, required: true },
    totalAmount: { type: Number, required: true },
    orderDate: { type: Date, default: Date.now },
    status: { type: String, default: "Pending" }

})

module.exports=mongoose.model("orders",orderSchema)