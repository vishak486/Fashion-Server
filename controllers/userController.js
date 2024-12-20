const users=require('../models/userModel')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

exports.registerController=async(req,res)=>{
    console.log("Inside registerController");
    const {username,email,password,role}=req.body;
    try
    {
        const existingUser= await users.findOne({email})
        if(existingUser)
        {
            res.status(406).json("Already Existing User...Use Another Email")
        }
        else
        {
            const hashedPassword=await bcrypt.hash(password,10);
            const newUser= new users({
                username,email,password:hashedPassword,phone:"",address:"",profilePic:"",role
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    }
    catch(err)
    {
        res.status(401).json(err)
    }
    
}

exports.loginController=async(req,res)=>{
    console.log("Inside loginController");
    const {email,password}=req.body;
    try
    {
        const existingUser=await users.findOne({email})
        if(existingUser)
        {
            const token=jwt.sign({userId:existingUser._id},process.env.JWTPASSWORD)
            console.log(token);
            const isMatch= await bcrypt.compare(password,existingUser.password)
            if(isMatch)
            {
                res.status(200).json({
                    user:existingUser,token
                })
            }
            else
            {
                res.status(404).json("Invalid Password")
            }
            
        }
        else
        {
            res.status(404).json("Invalid Email or Password")
        }

    }
    catch(err)
    {
        console.log(err);
        
    }
}

// admin user list
exports.getUsersListController=async(req,res)=>{
    console.log("Inside GetUsersListController");

    try
    {
        const UserList= await users.find({role:'user'})
        if(UserList.length===0)
        {
            res.status(404).json("No users Found!!")
        }
        else
        {
            res.status(200).json(UserList)   
        }

    }
    catch(err)
    {
        console.log(err);
        
    }
    
}

exports.userDeleteController=async(req,res)=>{
    console.log("Inside userDeleteController");
    console.log("ID from params:", req.params.id);
    
    const {id}=req.params
    try
    {
        const deleteUser= await users.findByIdAndDelete({_id:id})
        res.status(200).json(deleteUser)
    }
    catch(err)
    {
        res.status(404).json(err)
    }
}

exports.getUserProfileController=async(req,res)=>{
    console.log("Inside getUserProfileController");
    try
    {
      const userId = req.userId; 
      const user = await users.findById(userId);
      if (!user)
      {
        return res.status(406).json("User not found");
      }
      res.status(200).json(user);
    } 
    catch (err)
    {
      res.status(404).json(err);
    }
  };

exports.editUserProfileController=async(req,res)=>{
    console.log("Inside editUserProfileController");
    console.log("Received data in editUserProfileController:", req.body);

    
    const userId=req.userId
    const {username,phone,address,profilePic}=req.body
    const reUploadProfilePic=req.file?req.file.filename:profilePic
    try
    {
        console.log('Before update:', await users.findById(userId));
        const updateUser = await users.findByIdAndUpdate(
            { _id: userId },
            { $set: { username,phone, address, profilePic: reUploadProfilePic } },  // Use $set for explicit field updates
            { new: true }
          );
          
          
        // await updateUser.save()
        console.log('After update:', updateUser);
        res.status(200).json(updateUser)   
    }
    catch(err)
    {
        res.status(401).json(err)
    }
    
}

exports.validateProfileController = async (req, res) => {
    const userId = req.userId;
    try {
      const user = await users.findById(userId);
      if (!user.address || !user.phone) {
        return res.status(406).json("Please update your profile with address and contact number.");
      }
      res.status(200).json(user);
    } catch (err) {
      res.status(404).json(err);
    }
  };
  