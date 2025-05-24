import React, { useState } from 'react'
import { MdAdd,MdClose } from 'react-icons/md'
import Modal from 'react-modal';

const TagInput = ({tags,setTags}) => {
const[inputvalue,setinputvalue]=useState('');

const handleInputChange=(e)=>{
    setinputvalue(e.target.value);
}

const addNewTag=()=>{
    if(inputvalue.trim() !==''){
        setTags([...tags,inputvalue.trim()]);
        setinputvalue('');
    }
}

const handlekeydown=(e)=>{
    if(e.key==="Enter"){
        addNewTag();
    }
}
const handleremovetag=(tagToRemove)=>{
    setTags(tags.filter((tag,index)=> tag!==tagToRemove));
}


  return (
    <div>
        {tags?.length>0 &&
        <div className='flex items-center gap-2 flex-wrap mt-2'>
        {tags.map((tag,index)=>(
            <span key={index} className='bg-blue-500 text-white text-sm rounded-md py-1 px-2 flex gap-1' >
                # {tag}
                <button onClick={()=>{handleremovetag(tag)}}><MdClose/></button>
            </span>
        ))}

        </div> }
      <div className="flex items-center gap-4 mt-3">
        <input type="text" className='text-sm bg-transparent dark:bg-slate-700 border-2 rounded px-3 py-2 ' placeholder='Add Tags' onChange={handleInputChange} value={inputvalue} onKeyDown={handlekeydown}/>
       <button className='w-8 h-8 flex items-center justify-center rounded border border-blue-600 hover:bg-blue-600 dark:border-blue-300 dark:hover:bg-blue-300 transition-all ease-in-out duration-200'
        onClick={addNewTag}>
        <MdAdd className='text-2xl text-blue-600 hover:text-white dark:text-white'/>
       </button>
     
      </div>
    </div>
  )
}

export default TagInput
