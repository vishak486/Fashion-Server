const orders=require('../models/orderModel')
const products=require('../models/productModel')
const users=require('../models/userModel')
const carts=require('../models/cartModel')

exports.placeOrderController = async (req, res) => {
    console.log("Inside placeOrderController");
    console.log("reqBody:",req.body);
    
    
    const userId = req.userId;
    const { items, totalAmount } = req.body; // Items: [{ productId, name, quantity }]
  
    try {
      // Fetch user's address
      const user = await users.findById(userId);
      // Check stock availability and update product quantities
      for (const item of items) {
        const product = await products.findById(item.productId);
        if (!product || product.productQuantity < item.quantity) {
          return res.status(400).json(`Insufficient stock for ${item.productName}`);
        }
        product.productQuantity -= item.quantity; // Reduce stock
        await product.save();
      }
  
      // Create and save the order
      const newOrder = new orders({
        userId,
        shippingAddress: user.address,
        products: items,
        totalAmount,
      });
      await newOrder.save();
      await carts.deleteMany({ userId });
  
      res.status(200).json(newOrder);
    } catch (err) {
      res.status(404).json(err);
    }
  };

exports.getPlaceOrderController= async(req,res)=>{
    console.log("Inside getPlaceOrderController");
    const userId = req.userId; 
    const searchKey = req.query.search;
    console.log(searchKey);

    // Parse the search key as a date if it is valid
    const searchDate = !isNaN(Date.parse(searchKey)) ? new Date(searchKey) : null;

    const query = { userId };

    if (searchDate) {
        query.orderDate = {
            $gte: searchDate,
            $lt: new Date(new Date(searchDate).setDate(searchDate.getDate() + 1)),
        };
    }

    console.log("Query:", query);
    
    try {
        const ordersData = await orders.find(query).populate("products.productId").populate("userId", "username email").sort({ orderDate: -1 });
        
        // if (!ordersData || ordersData.length === 0) {
        //     return res.status(406).json("No orders found!");
        // }

        res.status(200).json(ordersData);
    } catch (err) {
        res.status(404).json(err);
    }
};

exports.getAdminOrderHistoryController = async (req, res) => {
    console.log("Inside getAdminOrderHistoryController");
    const searchKey = req.query.search;
    console.log(searchKey);

    // Parse the search key as a date if it is valid
    const searchDate = !isNaN(Date.parse(searchKey)) ? new Date(searchKey) : null;

    // Build query to search only by orderDate
    const query = searchDate
        ? { 
            orderDate: { 
                $gte: searchDate, 
                $lt: new Date(new Date(searchDate).setDate(searchDate.getDate() + 1)) 
            } 
        }
        : {};
    console.log(query);
    

    try {
        const ordersData = await orders
            .find(query)
            .populate("userId", "username email") // Populating the user details
            .populate("products.productId")
            .sort({ orderDate: -1 });


        res.status(200).json(ordersData);
    } catch (err) {
        res.status(401).json(err);
    }
};

exports.editOrderStatus=async(req,res)=>{
    console.log("Inside editOrderStatus");
    const { id } = req.params; // Extract order ID from the request URL
    console.log(id);
    
    const { status } = req.body; // Extract new status from request body
    console.log(status);
    try
    {
        const updatedStatus = await orders.findByIdAndUpdate(
            id,
            { status: status },
            { new: true } // Return the updated document
        );
        
        res.status(200).json(updatedStatus);
    }
    catch(err)
    {
        res.status(401).json(err);
    }
}
