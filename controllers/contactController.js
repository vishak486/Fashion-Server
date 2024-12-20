const contacts=require('../models/contactModel')

exports.addContactController=async(req,res)=>{
    console.log("Inside addContactController");
    const {username,email,message}=req.body
    try
    {
        const newContact=new contacts({
            username,email,message
        })
        await newContact.save()
        res.status(200).json(newContact)
    }
    catch(err)
    {
        res.status(401).json(err)
    }
    
}

exports.getContactController=async(req,res)=>{
    console.log("Inside getContactController");
    try
    {
        const result=await contacts.find()
        res.status(200).json(result)
    }
    catch(err)
    {
        res.status(401).json(err)
    }
}

exports.editContactStatus=async(req,res)=>{
    console.log("Inside editContactStatus");
    const { id } = req.params; // Extract order ID from the request URL
    console.log(id);
    
    const { status } = req.body; // Extract new status from request body
    console.log(status);
    try
    {
        const updatedStatus = await contacts.findByIdAndUpdate(
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

exports.deleteContactController = async (req, res) => {
    const { id } = req.params; 
    try
    {
      const deletedItem = await contacts.findByIdAndDelete(id);

      res.status(200).json(deletedItem);
    } 
    catch (err) 
    {
      res.status(404).json(err);
    }
  };

exports.getApprovedContactsController = async (req, res) => {
    try {
        const approvedContacts = await contacts.find({ status: "Approved" });
        res.status(200).json(approvedContacts);
    } catch (err) {
        res.status(401).json(err);
    }
};