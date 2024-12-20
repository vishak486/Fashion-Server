const carts=require('../models/cartModel')

exports.addCartController=async(req,res)=>{
    console.log("Inside addCartController");
    const userId=req.userId
    const{productId,color,size}=req.body
    console.log(`userId:${userId},productId:${productId},color:${color},size:${size}`);
    try
    {
        const existingCartItem=await carts.findOne({userId,productId})
        if(existingCartItem)
        {
            res.status(406).json("Product Already In Cart")
        }
        else
        {
            const newCartItem=new carts({
                userId,productId,color,size
            })
            await newCartItem.save()
            res.status(200).json(newCartItem)
        }
    }
    catch(err)
    {
        res.status(404).json(err)
    }
}

exports.getCartController = async (req, res) => {
    const userId = req.userId; 
    try 
    {
      // Get all cart items for the user
      const cartItems = await carts.find({ userId }).populate('productId');
      if (!cartItems || cartItems.length === 0) {
        return res.status(406).json("Cart is empty!!!");
      }
      const totalAmount = cartItems.reduce(
        (sum, item) => sum + item.productId.productPrice * item.quantity,
        0
      );
      res.status(200).json({ cartItems, totalAmount });
    } 
    catch (err) {
      
      res.status(404).json(err);
    }
  };

exports.deleteCartController = async (req, res) => {
    const { id } = req.params; 
    try
    {
      const deletedItem = await carts.findByIdAndDelete(id);

      res.status(200).json(deletedItem);
    } 
    catch (err) 
    {
      res.status(404).json(err);
    }
  };

// Emptycart
exports.emptyCartController = async (req, res) => {
  const userId = req.userId; 
  try {
    // Delete all cart items for the user
    const deletedItems = await carts.deleteMany({ userId });
    if (deletedItems.deletedCount === 0) {
      return res.status(406).json("Cart is already empty!");
    }
    res.status(200).json(deletedItems);
  } 
  catch (err)
   {
    res.status(404).json(err);
  }
};

exports.updateCartQuantity =async(req,res)=>{
  console.log("Inside updateCartQuantity");
  try
  {
    const { id } = req.params;
    const { quantity } = req.body;
    if(quantity<1)
    {
      res.status(406).json("Quantity must be at least 1");
    }
    const updateQuantity=await carts.findByIdAndUpdate(id,
      { quantity },{new:true}
    )
    await updateQuantity.save()
    res.status(200).json(updateQuantity);
  }
  catch(err)
  {
    res.status(404).json(err);
  }

}