import React, { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { handelError, handelSuccess } from './Utils'
const Card = (props) => {
  const navigate = useNavigate();
  const [id, setId] = useState({
    id: props.id
  })


  const deleteBlog = async () => {

    try {
      const res = await axios.post("http://localhost:3000/user/deleteBlog", id, {
        withCredentials: true
      })
      if (res.status === 200) {

        handelSuccess(res.data.message)
        setTimeout(() => {
          navigate('/home');
        }, 3000)
      }
    } catch (error) {
      handelError("Something error occurs")
    }
  }
  const likeBlog = async () => {
    try {
      const res = await axios.post("http://localhost:3000/user/likeBlog", id, {
        withCredentials: true
      })
      //console.log(res);

      props.setmoundpage(props.moundpage + 1)



    } catch (error) {
      console.log(error);

      handelError(error.response.data.message)
    }
  }

  return (
    <>

      <div className='text-center border border-black m-2 p-3 max-w-full'>
        <h1 className="text-xl">{props.title}</h1>
        <p>{props.desc}</p>
        {props.like ?
          <button className={`text-white cursor-pointer p-2 bg-slate-500 rounded-lg mt-2 w-[90%] `} onClick={likeBlog}>Like {props.bloglike} </button>
          : <button className='text-white cursor-pointer p-2 bg-slate-500 rounded-lg mt-2 w-[90%]' onClick={deleteBlog}>Delete</button>}

        <ToastContainer />
      </div>

    </>
  )
}
export default Card
