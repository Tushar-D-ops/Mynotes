import React, { useEffect, useState } from 'react'
import "../../App.css";
import Navbar from '../../components/Navbar';
import NoteCard from '../../components/NoteCard';
import {MdAdd} from 'react-icons/md'
import AddEditNotes from './AddEditNotes';
import Modal from 'react-modal';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import{motion} from "framer-motion";
Modal.setAppElement("#root");









const Home = () => {

const{currentUser,loading,errorDispatch} = useSelector(
  (state)=>state.user
)
const backend_url = import.meta.env.VITE_BACKEND_URL
const [userInfo,setUserInfo]=useState(null);
const [allNotes,setAllNotes]=useState([]);
const [issearch,setIsSearch]=useState(false);

const [openAddEditModal,setOpenAddEditModal]=useState({
  isShown:false,
  type:'add',
  data:null,
});

const navigate=useNavigate();


 const [isDark, setIsDark] = useState(
    localStorage.getItem('theme') === 'dark' ||
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  

useEffect(() => {
  if (currentUser === null || !currentUser) {
    navigate("/login")
  } else {
    setUserInfo(currentUser?.rest)
    getAllNotes()
  }


  const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
}, [isDark])

//get all notes

const getAllNotes=async()=>{
  try {
    const res=await axios.get(backend_url+"/api/note/all",
      {withCredentials:true,});
      if(res.data.success===false){
        console.log(res.data);
        return

        
      }
setAllNotes(res.data.notes)

  } catch (error) {
    console.log(error);
    
    
  }
}

const handleEdit=(noteDetails)=>{
  setOpenAddEditModal({isShown:true,type:"edit",data:noteDetails})
}


const deleteNote=async(data)=>{
  const noteId=data._id;
  try {
    
  const res=await axios.delete(backend_url+`/api/note/delete/${noteId}`,
    {withCredentials:true});

    if(res.data.success===false){
      toast.error(res.data.mesage)
      return
    }

    toast.success(res.data.message)
    getAllNotes()

  } catch (error) {
    toast.error(error.message)
  }
}



const onSearchNote=async(query)=>{
try {
  const res= await axios.get(backend_url+"/api/note/search",
  {params:{query},withCredentials:true});
  if(res.data.success===false){
    toast.error(res.data.message)
    return
  }
  setAllNotes(res.data.notes)
  
} catch (error) {
  toast.error(error.message)
}
}

const handleClearSearch=()=>{
  setIsSearch(false);
  getAllNotes()

}






  return (
    <div className='dark:bg-gray-800 h-[100vh]'>
     {isDark && (
  <div className="fixed inset-0 -z-1 pointer-events-none">
    {/* Blobs */}
    <div className="absolute top-[-80px] left-[-100px] w-[800px] h-[800px] bg-cyan-400 opacity-20 rounded-full blur-[200px]" />
    <div className="absolute top-[100px] right-[-100px] w-[400px] h-[400px] bg-sky-500 opacity-20 rounded-full blur-[140px]" />
    <div className="absolute top-[40%] left-[30%] w-[600px] h-[600px] bg-blue-500 opacity-20 rounded-full blur-[180px]" />
    <div className="absolute bottom-[-150px] left-[-80px] w-[400px] h-[400px] bg-cyan-300 opacity-20 rounded-full blur-[140px]" />
    <div className="absolute bottom-[-180px] right-[0px] w-[500px] h-[500px] bg-teal-400 opacity-20 rounded-full blur-[160px]" />
  </div>
)}

    <Navbar
        userInfo={userInfo}
        onSearchNote={onSearchNote}
        handleClearSearch={handleClearSearch}
        isDark={isDark}
        setIsDark={setIsDark}
      />

    <div className='container mx-auto '>
      {allNotes.length===0 ? (

        <div className='flex items-center justify-center h-[70vh] dark:bg-gray-800'>
          <h1 className='text-2xl text-gray-500'>No Notes Found</h1>
        </div>
      ):<div className='flex justify-start flex-wrap gap-6 py-10 pl-5 dark:bg-gray-800'>
      {allNotes.map((note,i) => (

<motion.div
initial={{x:50, opacity: 0, }}
    animate={{x:0, opacity: 1,}}
    transition={{ duration: 0.6, delay: i*0.2, }}

className='border w-[30%] max-md:w-[40%] max-sm:w-[75%] h-[135px] mb-4 rounded py-4 px-8 bg-white dark:text-white dark:bg-slate-700 shadow-2xl border-gray-300 transition-transform hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)]'>
        <NoteCard
          key={note._id}
          title={note.title}
          content={note.content}
          date={note.date}
          tags={note.tags}
          isPinned={note.isPinned}
          onEdit={() => {handleEdit(note)}}
          onDelete={() => {deleteNote(note)}}
          onPinNote={() => {}}
        />
        </motion.div>
      ))}
  </div>}
    </div>
    <button className='w-16 h-16 items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-5 bottom-5 max-sm:w-10 max-sm:h-10 max-sm:right-2 max-sm:bottom-2' 
    onClick={()=>{setOpenAddEditModal({isShown:true ,type:"add", data:null})}}>
      <MdAdd className="w-full text-[32px] text-white" />
    </button>


     <Modal isOpen={openAddEditModal.isShown}
     onRequestClose={()=>{}}
     style={{
      overlay:{
        background:"rgba(0,0,0,0.2)",
      }
     }}
     contentLabel=''
     className="w-[50%] max-md:w-[75%] max-h-3/4 bg-white dark:bg-gray-800 dark:text-white rounded-md mx-auto mt-14 p-5 border-gray-500">

<motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.6,delay:0.1 }}
      >
    <AddEditNotes 
    noteData={openAddEditModal.data}
    type={openAddEditModal.type}
    getAllNotes={getAllNotes}

    onClose={()=>{
      setOpenAddEditModal({ isShown: false, type:'add', data:null});
    }}/>
    </motion.div>
    </Modal>
    </div>
  )
}

export default Home

