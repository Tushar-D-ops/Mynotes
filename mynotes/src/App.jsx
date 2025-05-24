import React from 'react'
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import "./App.css";
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const routes=(
  <Router>
  <Routes>
  <Route path="/" exact element={<Home/>}/>
  <Route path="/login" exact element={<Login/>}/>
  <Route path="/signup" exact element={<Signup/>}/>

  
  </Routes>
  <ToastContainer position="top-center" />
</Router>

)

const App = () => {


  
  return (
    <div>
      {routes}
    </div>
  )
}

export default App

