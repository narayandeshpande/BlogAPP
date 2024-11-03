 const mongoose=require('mongoose')
 const userSchema=mongoose.Schema({
        name:String,
        email:String,
        password:String,
        posts:[{type:mongoose.Schema.Types.ObjectId,ref:"Blog"}]
 })
 module.exports=mongoose.model("User",userSchema)