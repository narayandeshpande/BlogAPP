const express = require('express')
const cors=require('cors')
require("./models/conection")
const AuthoRoutes=require('./Routes/AuthoRoutes')
const UserRouter=require("./Routes/UserRoute")
const cookieParser = require('cookie-parser')
const app = express()
app.use(cookieParser())
const port = 3000
app.use(express.json())
app.use(cors({
        origin: 'http://localhost:5173', // Your frontend's origin
        credentials: true, // Allow credentials (cookies) to be included
        origin:true
    }));
app.get("/",(req,res)=>{
        res.send("Jay shree ram")
})

app.use('/auth',AuthoRoutes)
app.use('/user',UserRouter)


app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
})