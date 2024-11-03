const Usermodel = require("../models/User.model")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const signup = async (req, res) => {
        const { name, email, password } = req.body
        
        const isuser = await Usermodel.findOne({ email: email })
        if (!isuser) {
                const user = new Usermodel({ name, email, password })
                user.password = await bcrypt.hash(password, 10)
                await user.save();
                res.status(200).json({ message: "User created " })

        }
        else {
                return res.status(409).json({ message: "User already exits" })
        }
}

const login = async (req, res) => {
        const { email, password } = req.body
        const isuser = await Usermodel.findOne({ email: email })
        if (!isuser) {
                res.status(409).json({ message: "Email is incorrect please signup" })
                return
        }
        const isMatch = await bcrypt.compare(password, isuser.password)
        if (!isMatch) {
                return res.status(409).json({ message: "Password is incorrect please try again" })
        }
        let token = jwt.sign({ email: email }, process.env.SECRET_KEY)
        res.cookie("token", token, {
                httpOnly: true,   // Prevents JavaScript access to the cookie
                secure: true,  // Only use secure cookies in production
                sameSite: 'none',  // CSRF protection
                maxAge: 86400000,  // Cookie expiration (1 day))
        })
       

        return res.status(200).json({ message: "Login successful" })


}
const logout=(req,res)=>{
        
        res.cookie("token", "", {
                httpOnly: true,   // Prevents JavaScript access to the cookie
                secure: true,  // Only use secure cookies in production
                sameSite: 'none',  // CSRF protection
                maxAge: 1000,  // Cookie expiration (1 second))
        })
        return res.status(200).json({ message: "Logout successful" })
        
}


module.exports = {
        signup,
        login,
        logout
}