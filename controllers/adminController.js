const users=require('../models/userModel')
const products=require('../models/productModel')
const orders=require('../models/orderModel')
const contacts=require('../models/contactModel')

exports.getAdminDashboardController=async(req,res)=>{
    console.log("Inside getAdminDashboardController");
    try
    {
        const userCount=await users.countDocuments({role:"user"})
        const productCount=await products.countDocuments()
        const orderCount=await orders.countDocuments({ status: 'Pending' })
        const contactCount=await contacts.countDocuments({ status: 'pending' })
        const outOfStockCount =await products.countDocuments({productQuantity:0})

        res.status(200).json({
            users: userCount,
            products: productCount,
            outOfStockProducts: outOfStockCount,
            pendingOrders: orderCount,
            pendingContacts: contactCount,
        });
    }
    catch(err)
    {
        res.status(401).json(err)
    }
    
}