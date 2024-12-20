const jwt= require('jsonwebtoken')

const jwtMiddleware=(req,res,next)=>{
    console.log("Inside jwtMiddleware");
    console.log("Authorization header:", req.headers['authorization']);
    const token = req.headers['authorization'].split(" ")[1]
    console.log(token);
    if(token)
    {
        try{
            const jwtResponse=jwt.verify(token,process.env.JWTPASSWORD)
            console.log(jwtResponse);
            req.userId=jwtResponse.userId
            next()
        }
        catch(err)
        {
            res.status(401).json("Authorization Failed...Please Login")
        }
    }
    else
    {
        res.status(404).json("Authorization Failed....Token is Missing")
    }
      
}


module.exports=jwtMiddleware