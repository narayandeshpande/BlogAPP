import { React, useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom'
import { handelError, handelSuccess } from './Utils'
const Createblog = () => {
        useEffect(() => {
                handelAuth()
        }, [])
        const navigate = useNavigate()
        const [bloginfo, setbloginfo] = useState({
                title: '',
                desc: ''
        })
        const handelChange = (e) => {
                const { name, value } = e.target
                const copyinfo = { ...bloginfo }
                copyinfo[name] = value
                setbloginfo(copyinfo)
        }

        const handelAuth = async () => {
                try {
                        const res = await axios.get("http://localhost:3000/user/auth",
                                {
                                        withCredentials: true
                                }
                        )
                        //console.log(res.data);


                } catch (error) {
                        navigate('/login')

                }

        }
        const onSubmit = async (e) => {
                e.preventDefault();
                if (!bloginfo.title || !bloginfo.desc) {
                        handelError("Title and Discription is required")
                        return
                }
                try {
                        const res = await axios.post("http://localhost:3000/user/createblog", bloginfo,
                                {
                                        withCredentials: true
                                }
                        )
                        if (res.status === 200) {
                                handelSuccess(res.data.message)
                        }
                        setTimeout(()=>{
                                navigate('/home')
                        },3000)
                } catch (error) {
                        console.log(error);

                }
        }
        return (
                <>
                        <Navbar />
                        <h1 className='text-center text-2xl pt-4'>Create Your Blog here....</h1>
                        <div className="flex flex-col items-center justify-center p-3 gap-2">
                                <label htmlFor="title" className='text-xl'>Enter Blog Title</label>
                                <input type="text" name="title" id="title" className='border-black border w-[70%] p-2 outline-none' placeholder='Your title' onChange={handelChange} />
                                <label htmlFor="desc" className='text-xl'>Enter Blog Discription</label>
                                <textarea name="desc" id="desc" className='border-black border w-[70%] p-2' style={{ height: '227px' }} placeholder='Enter your blog here...' onChange={handelChange}></textarea>
                                <button className='bg-blue-500 px-4 py-2 rounded-md text-white text-lg' onClick={onSubmit}>Submit</button>
                        </div>
                </>
        )
}

export default Createblog
