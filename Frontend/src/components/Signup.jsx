import { React, useState } from 'react'
import axios from 'axios'
import { ToastContainer } from 'react-toastify'
import { useNavigate,Link } from 'react-router-dom'
import { handelError, handelSuccess } from './Utils'
const Signup = () => {
  const [signupinfo, setsignupinfo] = useState({
    name: "",
    email: "",
    password: ""
  })
  const navigate = useNavigate()
  const handelChange = (e) => {
    const { name, value } = e.target
    const copySignuinfo = { ...signupinfo }
    copySignuinfo[name] = value
    setsignupinfo(copySignuinfo)
  }
  const onsubmit = async (e) => {
    e.preventDefault()
    console.log(signupinfo);
    if (!signupinfo.name || !signupinfo.email || !signupinfo.password) {
      handelError("All fields are requred")
      return
    }
    try {
      const res = await axios.post("http://localhost:3000/auth/signup", signupinfo,{
        withCredentials:true
      })
      handelSuccess(res.data.message)
      setTimeout(() => {
        navigate("/login")
      }, 2000);
    } catch (error) {
      console.log(error);

      handelError(error.response.data.message)

    }
  }
  return (
    <>
      <div className="mx-auto w-full max-w-md flex justify-center items-center h-screen">
        {/* <div className="flex items-center justify-center min-h-screen md:mx-96"> */}
        <form action="" className='flex flex-col border border-black justify-center items-center w-full rounded-sm'>
          <h1 className='text-2xl m-2'>Signup</h1>
          <label htmlFor="name">Enter Your name</label>
          <input type="text" name="name" id="name" className='border border-black w-[70%]' onChange={handelChange} />
          <label htmlFor="email">Enter Your Email</label>
          <input type="email" name="email" id="email" className='border border-black w-[70%]' onChange={handelChange} />
          <label htmlFor="password">Enter Your Password</label>
          <input type="password" name="password" id="password" className='border border-black w-[70%]' onChange={handelChange} />
          <button className='bg-blue-600 m-2 p-2 text-white font-bold rounded-lg' onClick={onsubmit}>Submit</button>
        <p>Have an account ? <Link to='/login' className='text-blue-600'>Login</Link></p>
        </form>
        <ToastContainer />
      </div>
    </>
  )
}

export default Signup
