import { React, useState, useEffect } from 'react';
import Navbar from './Navbar';
import Card from './Card';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
const Profile = () => {
  const [blogs, setBlogs] = useState([]);
const navigater=useNavigate();
  const fetchData = async () => {
    try {
      const res = await axios.get('http://localhost:3000/user/profile', {
        withCredentials: true,
      });
      setBlogs(res.data);

    } catch (error) {
      if(error.status===401)
      {
        navigater('/login')
      }
      console.log('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="flex justify-center items-center flex-col w-screen">
      <Navbar />
      <div className="md:w-[50%] w-[90%]">
      {blogs.length > 0 ? (
        blogs.map((blog, index) => (
          
          <Card key={index} title={blog.title} desc={blog.desc} like={false} id={blog._id}/>
        ))
      ) : (
        <p className='text-center'>No Blogs...</p>  // Display a loading message until blogs are fetched
      )}
      </div>
    </div>
  );
};

export default Profile;
