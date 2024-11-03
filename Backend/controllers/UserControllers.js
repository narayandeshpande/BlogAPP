const jwt = require('jsonwebtoken')
const blogs = require("../models/Blog.Model")
const user = require('../models/User.model')
require('dotenv').config()
const home = async (req, res) => {
    let data = jwt.verify(req.cookies.token, process.env.SECRET_KEY);
   
    const blog = await blogs.find();
    
    res.status(200).json(blog)
}

const createBlog = async (req, res) => {
    let data = jwt.verify(req.cookies.token, process.env.SECRET_KEY)
  

    const { title, desc } = req.body
   
    const User = await user.findOne({ email: data.email })
    const id = User._id
   
    const blog = new blogs({ title, desc, user: id, like: 0 })
    await blog.save()
    User.posts.push(blog._id)
    await User.save()
    return res.status(200).json({ 'message': "Blog  created" })


}

const auth = (req, res) => {
    return res.status(200).json({ "message": "You are authoriz person" })
}

const profile = async (req, res) => {
    const all_blogs = [];
    try {
        let data = jwt.verify(req.cookies.token, process.env.SECRET_KEY);
        const User = await user.findOne({ email: data.email });

        const blogPromises = User.posts.map(async (id) => {
            const blog = await blogs.findOne({ _id: id });
            return blog;
        });
        const resolvedBlogs = await Promise.all(blogPromises);
        all_blogs.push(...resolvedBlogs);

        res.status(200).json(all_blogs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching blogs' });
    }
};

const deleteBlog = async (req, res) => {
    const { id } = req.body
    

    const blog = await blogs.findOne({ _id: id })
    
    const fuser = await user.findOne({ _id: blog.user })

    if (fuser) {
        const updateUser = await user.findByIdAndUpdate(fuser._id, {
            $pull: { posts: id }
        }, { new: true })
    }

    const result = await blogs.findOneAndDelete({ _id: id })
    if (result) {
        return res.status(200).json({ message: "Blog is deleted" })
    }

    res.status(500).json({ message: "Server error" })

}
const likeblog = async (req, res) => {
    const { id } = req.body
    const blog = await blogs.findOne({ _id: id })
    //console.log(blog);
    const data = jwt.verify(req.cookies.token, process.env.SECRET_KEY);
    const fuser = await user.findOne({ email: data.email })
    const result = await blogs.findOne({ _id: id, likeusers: fuser._id })

    

    if (result) {
        return res.status(500).json({ message: "You can not like" })
    }
    else {
        const updatelike = await blogs.findByIdAndUpdate(blog._id, { $addToSet: { likeusers: fuser._id } }, { new: true })

    }
 const blogup = await blogs.findByIdAndUpdate({ _id: id }, { like: blog.like + 1 }, { new: true })
    if (blog) {
       // console.log(blogup.like);

        res.status(200).json({ like: blogup.like, message: "Like" })
    }
    else {
        return res.status(500).json({ message: "Server error" })

    }

}


module.exports = {
    home,
    createBlog,
    auth,
    profile,
    deleteBlog,
    likeblog
}