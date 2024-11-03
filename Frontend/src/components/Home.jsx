import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { handelError, handelSuccess } from './Utils'
import axios from 'axios'
import Navbar from './Navbar'
import Card from './Card'
const Home = () => {
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const [moundpage,setmoundpage]=useState(0)
  const fetchdata = async () => {

    try {
      const blog = await axios.get("http://localhost:3000/user/home", {
        withCredentials: true
      })
      //console.log(blog.data);


      setData(blog.data)

    } catch (error) {

      if (error.status === 401) {
        handelError("You are not athorize person")
        navigate('/login')
      }

    }

  }
  useEffect(() => {
    fetchdata()

  },[])

  useEffect(()=>{
    if (moundpage > 0) {
      fetchdata(); 
    }
  }, [moundpage])

  return (
    <>
      { 
        <div>
          <Navbar />
          <div className="flex justify-center items-center flex-col min-w-full">
            <div className="md:w-[50%] w-[90%]">
              {data.length>0?
                data.map((elemet, index) => (
                  <Card title={elemet.title} desc={elemet.desc} key={index} like={true} id={elemet._id} bloglike={elemet.like} setmoundpage={setmoundpage} moundpage={moundpage}/>
                )): <p className="text-center">No Blogs are avalable..🧐</p>
              }
            </div>

          </div>
          <ToastContainer />
        </div>
      }
    </>
  )
}
export default Home