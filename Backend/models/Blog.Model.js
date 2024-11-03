const mongoose=require("mongoose")
const blogSchema=mongoose.Schema({
        title:String,
        desc:String,
       user:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
        date:{
                type:Date,
                default:Date.now()
        },
        like:Number,
        likeusers:[{type:mongoose.Schema.Types.ObjectId,ref:"User"}]
})
module.exports=mongoose.model('Blog',blogSchema)