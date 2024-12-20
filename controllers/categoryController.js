const categories=require('../models/categoryModel')

exports.addCategoryController=async(req,res)=>{
    console.log("Inside addCategoryController");
    const {categoryName}=req.body
    const categoryImg=req.file.filename
    try
    {
        const existingCategory= await categories.findOne({categoryName})
        if(existingCategory)
        {
            res.status(406).json("Category Already Exist...Please Upload Another")
        }
        else
        {
            const newCategory= new categories({
                categoryName,categoryImg
            })

            await newCategory.save()
            res.status(200).json(newCategory)
        }

    }
    catch(err)
    {
        res.status(401).json(err)
    }


    
}

exports.getAllCategoryController=async(req,res)=>{
    
    console.log("Inside getAllCategoryController");
    const searchKey=req.query.search
    console.log(searchKey);
    const query={
        categoryName:{
            $regex:searchKey,$options:'i'
        }
    }
    try{
        const allCategory= await categories.find(query)
        res.status(200).json(allCategory)
    }
    catch(err)
    {
        res.status(401).json(err)
    }  
}

exports.editCategoryController=async(req,res)=>{
    console.log("Inside editCategoryController");
    const id=req.params.id
    const {categoryName,categoryImg}=req.body
    const reUploadCategoryImg=req.file?req.file.filename:categoryImg
    try
    {
        const updateCategory= await categories.findByIdAndUpdate({_id:id},{
            categoryName,categoryImg:reUploadCategoryImg
        },{new:true})
        await updateCategory.save()
        res.status(200).json(updateCategory)
    }
    catch(err)
    {
        res.status(401).json(err)
    }
    
}

exports.removeCategoryController=async(req,res)=>{
    console.log("Inside removeCategoryController");
    const {id}=req.params
    try
    {
        const deleteCategory = await categories.findByIdAndDelete({_id:id})
        res.status(200).json(deleteCategory)
    }
    catch(err)
    {
        res.status(401).json(err)
    }
}



// Fetch categories without JWT authentication (for products page)
exports.getCategoriesForProductsPage = async (req, res) => {
    console.log("Inside getCategoriesForProductsPage");
    
    try {
        const Allcategories = await categories.find(); // Fetch all categories from the database
        res.status(200).json(Allcategories);
    } catch (err) {
        res.status(401).json(err);
    }
};