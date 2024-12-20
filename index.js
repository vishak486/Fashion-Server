require('dotenv').config()
const express=require('express')
const cors=require('cors')
const router=require('./routes/router')
require('./database/dbConnection')

const fashionUser=express()

fashionUser.use(cors())
fashionUser.use(express.json())
fashionUser.use(router)
fashionUser.use('/uploads',express.static('./uploads'))

const PORT=3000 || process.env.PORT

fashionUser.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
})

fashionUser.get('/',(req,res)=>{
    res.status(200).send('<h1 style="color:red;">Server is Running</h1>')
})

