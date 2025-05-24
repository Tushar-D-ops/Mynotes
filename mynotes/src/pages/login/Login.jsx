import React, { useState } from 'react'
import Navbar from "../../components/Navbar";
import {Link, useNavigate} from "react-router-dom"
import "../../App.css";
import { validateEmail } from '../../utils/helper'; 
import PasswordInput from '../../components/PasswordInput';
import { useDispatch } from 'react-redux';
import { signInFailure, signInStart, signInSuccess,  } from '../../redux/user/userSlice';
import axios from 'axios'
import { toast } from 'react-toastify';
import {motion} from "framer-motion";
const Login = () => {
  const backend_url = import.meta.env.VITE_BACKEND_URL

    const [email,setemail]=useState("");
    const [password,setpassword]=useState("");
    const [error,seterror]=useState("");
    
    const dispatch=useDispatch();
    const navigate= useNavigate();
    
    
    const handlelogin= async(e)=>{
         e.preventDefault();

         if(!validateEmail(email)){
            seterror("Please Enter a valid email");
            return;
         }

         if(!password){
            seterror("Please enter the password");
            return;
         }
         seterror("");
         //login api call

         try {
          dispatch(signInStart())


          const res = await axios.post(backend_url+"/api/auth/signin",
            {email,password},
            {withCredentials:true}
          )
          if(res.data.success===false){
            toast.error(res.data.message)
            console.log(res.data);
            dispatch(signInFailure(res.data.message))
            
          }
          toast.success(res.data.message)
          dispatch(signInSuccess(res.data))
          navigate("/")

         } catch (error) {
          toast.error(error.response?.data?.message || "Something went wrong"
          )
          dispatch(signInFailure(error.message))
         }

          


    };

  return (
    <>
    
    <motion.div 
   
    
    className='flex item-center justify-center mt-28'>
        <motion.div  
        initial={{opacity:0, y:100}}
        animate={{opacity:1, y:0}}
        transition={{duration:0.4,delay:0.1}}
        
         className='w-96 border rounded bg-white p-4 shadow-2xl border-gray-300 transition-transform hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)]'>
            <form onSubmit={handlelogin}
            
            >
                <h4 className='text-2xl mb-7'>Login</h4>
               <input 
               value={email} 
               onChange={(e)=>{setemail(e.target.value)}} 
               type="text" 
               placeholder='Email' 
               className='inputbox'/>
               <PasswordInput 
               value={password} 
               onChange={(e)=>{setpassword(e.target.value)}}/>

               {error && 
               <p className='text-red-500 text-xs '>
                {error}
                </p> 
                }

                
               <button type='submit' className='btn'>Login</button>
               <p className='text-sm text-center mt-4'>Not registered yet?{""}
                <Link to="/signup" className="font-medium text-primary underline" > Create an Account</Link>
               </p>
            </form>
        </motion.div>
    </motion.div>
    </>
  )
}

export default Login
