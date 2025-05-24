import React from 'react'
import { getInitials } from '../utils/helper'
import { useState } from 'react'
import {AnimatePresence,motion} from "framer-motion";

const ProfileInfo = ({userInfo,onLogout,isDark,setIsDark}) => {
    const[open,setopen]=useState(false);

    

    return (
        <>
        <div className='flex items-center gap-3 max-md:hidden'>
            <button
        onClick={() => setIsDark(!isDark)}
        className="p-2 rounded-full bg-gray-100 dark:bg-gray-300 hover:bg-gray-200 transition-all duration-300"
      >
        {isDark ? (
          <img
            src="https://img.icons8.com/?size=160&id=6BUmPDkQO1MK&format=png"
            width="30px"
            alt="Light Icon"
          />
        ) : (
          <img
            src="https://img.icons8.com/?size=100&id=45475&format=png"
            width="30px"
            alt="Dark Icon"
          />
        )}
      </button>
            <div className='w-12 h-12  flex items-center justify-center rounded-full text-slate-500 dark:text-white font-medium bg-slate-300 dark:bg-slate-700'>
             {getInitials(userInfo?.username)}
             </div>
            
                <p className='text-sm font-medium dark:text-white'>{userInfo?.username}</p>

                <button className=' text-white bg-red-400 rounded-md px-2 py-1 hover:bg-red-600' onClick={onLogout}>Logout</button>
            
        </div>
        <div className='flex items-center gap-3 md:hidden'>
        <div className='w-10 h-10  flex items-center justify-center rounded-full text-slate-500 dark:text-white font-medium bg-slate-300 dark:bg-slate-700'>
            <button onClick={()=>{setopen(!open)}}> {getInitials(userInfo?.username)}</button>
             </div>
        </div>
        <AnimatePresence>
        {open&& 
        
        <motion.div
        
        initial={{y:40, opacity: 0, }}
        animate={{y:0, opacity: 1,}}
        transition={{ duration: 0.6, delay: 0.2, }}
        exit={{y:40, opacity: 0, }}
        
        className='p-4 absolute bg-slate-300 dark:bg-slate-700 dark:text-white top-20 right-2 flex flex-col gap-2 rounded-2xl'>

        <p className='text-sm font-medium dark:text-white'>{userInfo?.username}</p>

         <button className=' text-white bg-red-400 rounded-md px-2 py-1 hover:bg-red-600' onClick={onLogout}>Logout</button>

        </motion.div>
        }
        </AnimatePresence>
        </>   
    )
}

export default ProfileInfo
