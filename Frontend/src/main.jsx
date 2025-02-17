import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'react-toastify/ReactToastify.css'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'

createRoot(document.getElementById('root')).render(

    <BrowserRouter>
    <App />
    </BrowserRouter>
)
