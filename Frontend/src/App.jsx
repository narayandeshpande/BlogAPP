import { useState } from 'react'
import {Routes,Route} from 'react-router-dom'
import Signup from './components/Signup'
import Login from './components/Login'
import Home from './components/Home'
import Createblog from './components/Createblog'
import Profile from './components/Profile'
import About from './components/About'

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/createblog' element={<Createblog/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/about' element={<About/>}/>
    </Routes>

    </>
  )
}

export default App
