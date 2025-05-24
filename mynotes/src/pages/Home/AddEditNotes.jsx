import React, { useState } from 'react'
import TagInput from './TagInput'
import { MdClose } from 'react-icons/md';
import axios from 'axios';
import { toast } from 'react-toastify';
import{motion} from "framer-motion";

const AddEditNotes = ({noteData, type, onClose,getAllNotes}) => {

const[title,settitle]=useState(noteData?.title || "");
const[content,setcontent]=useState(noteData?.content || "");
const[tags,setTags]=useState(noteData?.tags || []);

const backend_url = import.meta.env.VITE_BACKEND_URL
const [error,seterror]=useState(null);


const addNewNote= async()=>{
try {
  
const res=await axios.post(backend_url+"/api/note/add",
  {title,content,tags},{withCredentials:true});
  if(res.data.success===false){
    seterror(res.data.message);
    toast.error(res.data.message);
    return;
  }

  getAllNotes();
  onClose();
  toast.success(res.data.message);

} catch (error) {
  console.log(error.message);
  seterror(error.message);
  
}
}

const editNote= async()=>{

  const noteId=noteData._id;
  try {

    const res= await axios.post(backend_url+`/api/note/edit/${noteId}`,
      {title,content,tags},{withCredentials:true}

    )

    if(res.data.success===false){
      seterror(res.data.message);
      toast.error(res.data.message);
      return;
    }
    getAllNotes();
    onClose();
    toast.success(res.data.message);
    
  } catch (error) {
    console.log(error.message);
    seterror(error.message);
    
  }
  
}

const handleAddNote=()=>{
 
  if(!title){
    seterror("Please enter the title!");
     return;
  }
  if(!content){
    seterror("Please Enter  Content!");
     return;
  }
  seterror("");

  if(type==='edit'){
    editNote();
  }
  else{
     addNewNote();
  }
}

  return (
    <div className='relative'>
     
     <button className='w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 ' 
     onClick={onClose}>
      <MdClose className='text-xl text-slate-400'/>
     </button>

      <motion.div 
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ duration: 0.6,delay:0.2 }}
      
      className='flex flex-col gap-2  '>
        <label className='input-label text-black text-xl'>TITLE</label>
        <input type='text' placeholder='Go to Gym at 5' className='text-2xl bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-white bg-slate-100 py-1 px-2'
        value={title} onChange={(e)=>{settitle(e.target.value)}}/>
      </motion.div>
      <motion.div 
      
      initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.6,delay:0.3 }}
      className='flex flex-col gap-2 mt-4'>
        <label className='input-label'>CONTENT</label>
        <textarea type="text" 
       placeholder='Content' 
       rows={10}
       value={content} onChange={(e)=>{setcontent(e.target.value)}}
       className='text-sm bg-slate-200 text-slate-800 outline-none bg-slate-100 dark:bg-slate-700 dark:text-white p-2 rounded' />
     
     
      </motion.div>
      <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ duration: 0.6,delay:0.5 }}
      
      className='mt-3'>
        <label className='input-label'>TAGS</label>
        <TagInput tags={tags} setTags={setTags}/>
      </motion.div>

     {error && 
     <div className='text-red-500 text-xs pt-4'>
      {error}
     </div> }

      <motion.button 
      
      initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.6,delay:0.7 }}
      className='btn font-medium mt-5 p-3  ' onClick={handleAddNote} >{type==="edit"?"Update":"Add"}</motion.button>
    </div>
  )
}

export default AddEditNotes
