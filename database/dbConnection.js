const mongoose=require('mongoose')

const connectionString=process.env.DBCONNECTIONSTRING

mongoose.connect(connectionString).then(res=>{
    console.log("MongoDb Atlas Connection Successfull");

}).catch(err=>{
    console.log("MongoDb Connection Failed");
    console.log(err);
       
})