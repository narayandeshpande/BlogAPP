import React from 'react'
import Navbar from './Navbar'

const About = () => {
  return (
    <div>
     <Navbar/>
     <div className="flex justify-center items-center flex-col ml-2">
     <h1 className='text-center text-xl'>Ths is a simple Blog website</h1>
     <ul className='m-2 list-disc'>
     <li className='ml-2'>In this site we can create our own post and publish it.</li>
     <li className='ml-2'>Before createing the post you need to create your account with Name,Email and Password</li>
     <li className='ml-2'>Only athorize person can access this site</li>
     <li className='ml-2'>Your created post visible for all login persons they can like your post</li>
     <li className='ml-2'>Note:You cannot reset your password.</li>
     <li className='ml-2'>You can create only one account with one email.</li>
     </ul>
     </div>
    </div>
  )
}

export default About
