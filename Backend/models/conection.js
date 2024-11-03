const mongoose=require('mongoose')
require('dotenv').config()
const mongourl=process.env.MONGODBURL
mongoose.connect(mongourl)
.then(()=>{
        console.log("Connected to the DB");
        
})
.catch((err)=>{
        console.log(err);
        
})