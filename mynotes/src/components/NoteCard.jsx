import React from 'react'
import {MdOutlinePushPin} from "react-icons/md";
import {MdCreate, MdDelete} from 'react-icons/md';
import moment from 'moment';
import { motion } from 'framer-motion'

const NoteCard = ({title,date,content,tags,isPinned, onEdit,onDelete,onPinNote}) => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className=''>
        <h6 className='text-sm font-medium'>{title}</h6>
        <span className='text-xs text-slate-500 dark:text-slate-300'>{moment(date).format("Do MM YYYY")}</span>
        </div>
      
      <MdOutlinePushPin className={`icon-btn ${isPinned? 'text-primary':'text-slate-300'}`} onClick={onPinNote} />
    </div>
    <p className='text-xs text-slate-600 dark:text-slate-300 mt-2'>{content?.slice(0,60)}</p>
    <div className='flex items-center justify-between mt-2'>
        <div className='text-xs text-slate-500 dark:text-slate-300'>
          {tags.map((tag,i)=>(
            <span key={i} className='px-2 py-1 bg-blue-500 text-white ml-1 rounded-md'>#{tag}</span>
          ))}
        
        
        </div>
    
    <div className='flex items-center gap-2'>
        <MdCreate className='icon-btn hover:text-green-400' onClick={onEdit}/>
        <MdDelete className='icon-btn hover:text-red-500' onClick={onDelete}/>
   
    </div>
    </div>
    </div>
  )
}

export default NoteCard
