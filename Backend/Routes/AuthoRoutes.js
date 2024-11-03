
const {signup, login, logout} =require('../controllers/AuthoControllers')
const router=require('express').Router()

router.post('/signup',signup)
router.post('/login',login)
router.get('/logout',logout)

module.exports=router