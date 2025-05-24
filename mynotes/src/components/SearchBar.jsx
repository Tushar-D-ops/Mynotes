import React from 'react'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import {IoMdClose} from "react-icons/io";
const SearchBar = ({value,onchange,handleSearch,onClearSearch}) => {


  
  
  
    return (
    <div className='w-80 flex items-center px-4 bg-slate-100 dark:bg-slate-600 dark:text-white  rounded-[8px]'>
      <input type="text" placeholder='Search Notes'  className='w-full text-xs dark:text-white bg-transparent py-[11px] px-[5px] outline-none '
      value={value}
      onChange={onchange}
      />
      {value &&(
      <IoMdClose onClick={onClearSearch} className='text-slate-400 text-xl cursor-pointer hover:text-black mr-2'/>
      )}
      <FaMagnifyingGlass className='text-slate-400 cursor-pointer hover:text-black' onClick={handleSearch} />
    </div>
  )
}

export default SearchBar
