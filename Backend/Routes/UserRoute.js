const router=require('express').Router()
const isAutho=require('../Middleware/Auth')
const {home, createBlog,auth, profile,deleteBlog, likeblog}=require('../controllers/UserControllers')
router.get("/home",isAutho,home)
router.get("/auth",isAutho,auth)
router.post("/createblog",isAutho,createBlog)
router.get("/profile",isAutho,profile)
router.post("/deleteBlog",isAutho,deleteBlog)
router.post("/likeBlog",isAutho,likeblog)

module.exports=router
