const products=require('../models/productModel')
const categories=require('../models/categoryModel')

exports.addProductController=async(req,res)=>{
    console.log("Inside addProductController");
    const{productName,productDescription,categoryName}=req.body
    const productPrice = Number(req.body.productPrice);
    const productQuantity = Number(req.body.productQuantity);
    const productImg=req.file.filename
    try
    {
        const existingCategory= await categories.findOne({categoryName:categoryName})
        if(!existingCategory)
        {
            res.status(406).json("Category Not found")
        }
        const existingProduct=await products.findOne({productName:productName})
        if(existingProduct)
        {
            res.status(406).json("Product Already Exist !!!Please upload another")
        }
        else
        {
            const newProduct=new products({
                productName,productDescription,productPrice,productQuantity,productImg,categoryName,productCategory:existingCategory._id
            })
            await newProduct.save()
            res.status(200).json(newProduct)
        }
    }
    catch(err)
    {
        res.status(401).json(err)
    }  
}

exports.getAllProductController=async(req,res)=>{
    
    console.log("Inside getAllProductController");
    const searchKey=req.query.search
    console.log(searchKey);
    const query={
        productName:{
            $regex:searchKey,$options:'i'
        }
    }
    
    try{
        const allProduct= await products.find(query)
        res.status(200).json(allProduct)
    }
    catch(err)
    {
        res.status(401).json(err)
    }  
}

exports.editProductController = async (req, res) => {
    console.log("Inside editProductController");
    const { id } = req.params;  
    const { productName, productDescription, categoryName } = req.body;

    const productImg = req.file ? req.file.filename : req.body.productImg;

    try {
        const existingCategory = await categories.findOne({ categoryName: categoryName });
        if (!existingCategory) {
            return res.status(406).json("Category not found");
        }

        const updatedProduct = await products.findByIdAndUpdate({ _id: id },{
                productName, productDescription, productImg, categoryName, productCategory: existingCategory._id
            },{ new: true }
        );
        await updatedProduct.save()
        res.status(200).json(updatedProduct);

    } catch (err) {
        res.status(401).json(err)
    }
};

exports.editStockController=async(req,res)=>{
    console.log("Inside editStockController");
    // console.log("Raw Request Body:", req.body);

    const { id } = req.params;  
    // console.log(id);
    
    const productPrice = Number(req.body.productPrice);
    // console.log(`productPrice: ${productPrice}`);
    
    const productQuantity = Number(req.body.productQuantity);
    // console.log(`productQuantity:${productQuantity}`);
    
    try
    {
        const updateStock=await products.findByIdAndUpdate({ _id: id },{
            productPrice,productQuantity},{new:true})
        await updateStock.save()
        res.status(200).json(updateStock)
    }
    catch(err)
    {
        res.status(401).json(err)        
    }
}

exports.deleteProductController=async(req,res)=>{
    console.log("Inside deleteProductController");
    const { id } = req.params;
    try
    {
        const deleteProduct = await products.findByIdAndDelete({_id:id})
        res.status(200).json(deleteProduct)
    }
    catch(err)
    {
        res.status(401).json(err)
    }
}



// Home Page
exports.homePageProductController=async(req,res)=>{
    console.log("Inside homePageProjectController");
    try{
        const allHomeProducts= await products.find().limit(4)
        res.status(200).json(allHomeProducts)
    }
    catch(err)
    {
        res.status(401).json(err)
    }  
 }

// get Product -authorised user
exports.getProductController = async (req, res) => {
    console.log("inside getProductController");
    // get dynamic vslues from url
    const { id } = req.params;
    try{
        const productDetails = await products.findById({_id:id})
        res.status(200).json(productDetails)
    }catch(err){
        res.status(401).json(err)
    }
}

// GetallProduct and Search
exports.getAllProductController=async(req,res)=>{
    
    console.log("Inside getAllProductController");
    const searchKey=req.query.search
    const category = req.query.category 

    console.log(searchKey,category);
    const query={ }
    if(searchKey)
    {
        query.productName={  $regex:searchKey,$options:'i'}

    }
    if(category)
    {
        query.categoryName=category

    }
    try{
        const allProduct= await products.find(query)
        res.status(200).json(allProduct)
    }
    catch(err)
    {
        res.status(401).json(err)
    }  
}
