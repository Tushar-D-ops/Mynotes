import React, { useState } from 'react'
import Navbar from "../../components/Navbar";
import {Link, useNavigate} from "react-router-dom"
import "../../App.css";
import { validateEmail } from '../../utils/helper'; 
import PasswordInput from '../../components/PasswordInput';
import axios from 'axios';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';



    
const Signup = () => {
    const[name, setname]=useState("");
    const backend_url = import.meta.env.VITE_BACKEND_URL

    const [email,setemail]=useState("");
    const [password,setpassword]=useState("");
    const [error,seterror]=useState("");

    const navigate=useNavigate();

    
    const handleSignUp= async(e)=>{
         e.preventDefault();
         if(!name){
            seterror("Pease Enter Your Name");
            return;
         }

         if(!validateEmail(email)){
            seterror("Please Enter a valid email");
            return;
         }

         if(!password){
            seterror("Please enter the password");
            return;
         }
         seterror("");
         
         //signup api call

         try {

            const res= await axios.post(backend_url+"/api/auth/signup",
               {username:name, email,password},
               {withCredentials:true})

               
             if(res.data.success===false){
               seterror(res.data.message)
               toast.error(res.data.message)
               return
             }
             toast.success(res.data.message)
             seterror("")
             navigate("/login")

         } catch (error) {
            toast.error(error.message)
            console.log(error.message)
            seterror(error.message)
         }
    };



  return (
    <>
    <div className='flex item-center justify-center mt-28'>
    <motion.div
    initial={{opacity:0, y:100}}
    animate={{opacity:1, y:0}}
    transition={{duration:0.4,delay:0.1}}

    className='w-96 border rounded bg-white p-4 shadow-2xl border-gray-300 transition-transform hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)]'>

            <form onSubmit={handleSignUp}>
                <h4 className='text-2xl mb-7'>Sign Up</h4>
                <input 
                value={name} 
                onChange={(e)=>{setname(e.target.value)}} 
                type="text" 
                placeholder='Name' 
                className='inputbox'/>

               <input 
               value={email} 
               onChange={(e)=>{setemail(e.target.value)}}
                type="text" 
                placeholder='Email' 
                className='inputbox'/>
               <PasswordInput value={password} onChange={(e)=>{setpassword(e.target.value)}}/>

               {error && 
               <p className='text-red-500 text-xs '>
                {error}
                </p> 
                }

                
               <button type='submit' className='btn'>Create Account</button>
               <p className='text-sm text-center mt-4'>Already have an Account ? {""}
                <Link to="/login" className="font-medium text-primary underline" >Login Here</Link>
               </p>
            </form>
        </motion.div>
    </div>
    </>
  

  )
}

export default Signup
