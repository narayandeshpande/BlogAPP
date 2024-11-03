import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { handelError, handelSuccess } from './Utils'
const Navbar = () => {
  const navigator=useNavigate()
  const onlogout=async()=>{
    try {
      const res=await axios.get("http://localhost:3000/auth/logout",
        {
          withCredentials: true
        })
        console.log(res);
        if(res.status===200)
        {
          handelSuccess(res.data.message)
          setTimeout(()=>{
            navigator('/login')
          },2000)
        }
        
        
    } catch (error) {
      console.log(error);
      
    }
  
    
  }
  return (
    <div className=' bg-slate-600 w-screen p-4'>
      <nav>
        <ul className='flex justify-around items-end gap-2 text-white'>
          {/* <li className='p-0'><img src="https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg" alt="" className='w-10'/></li> */}
        <li><Link to="/home">Home</Link></li>
        <li> <Link to="/about">About</Link></li>
        <li><Link to="/createblog">Create Your post </Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><button onClick={onlogout} className='text-red-500 font-bold'>LogOut</button></li>
        </ul>
      </nav>
      <ToastContainer />
    </div>
  )
}
export default Navbar
