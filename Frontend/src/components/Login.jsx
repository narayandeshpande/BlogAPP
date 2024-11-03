
import { React, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { handelError, handelSuccess } from './Utils'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
const Login = () => {
  const [logininfo, setlogininfo] = useState({
    email: "",
    password: ""
  })
  const navigate = useNavigate()
  const handelChange = (e) => {
    const { name, value } = e.target
    const logincopy = { ...logininfo }
    logincopy[name] = value
    setlogininfo(logincopy)
  }
  const onsubmit = async (e) => {
    e.preventDefault()
    if (!logininfo.email || !logininfo.password) {
      handelError("Email and password are required")
      return
    }
    try {
      const res = await axios.post("http://localhost:3000/auth/login", logininfo, {
        withCredentials: true
      })
      console.log(res.data);
      handelSuccess(res.data.message)
      setTimeout(() => {
        navigate('/home')
      }, 2000)
      //console.log(res);
    } catch (error) {


      handelError(error.response.data.message)
    }

  }
  return (
    <div>
      <>
        <div className="mx-auto w-full max-w-md flex justify-center items-center h-screen">
          {/* <div className="flex items-center justify-center min-h-screen md:mx-96"> */}
          <form action="" className='flex flex-col border border-black justify-center items-center w-full rounded-sm'>
            <h1 className='text-2xl m-2'>Login</h1>
            <label htmlFor="email">Enter Your Email</label>
            <input type="email" name="email" id="email" className='border border-black w-[70%]' onChange={handelChange} />
            <label htmlFor="password">Enter Your Password</label>
            <input type="password" name="password" id="password" className='border border-black w-[70%]' onChange={handelChange} />
            <button className='bg-blue-600 m-2 p-2 text-white font-bold rounded-lg' onClick={onsubmit}>Submit</button>
            <p>Create  an account <Link to='/' className='text-blue-600'>Signup</Link></p>
          </form>
          <ToastContainer />
        </div>
      </>
    </div>
  )
}

export default Login
