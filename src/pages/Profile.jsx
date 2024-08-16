import React, { useEffect, useState } from 'react'
import { UserAuth } from '../context/AuthContext';
import { onSnapshot,doc,updateDoc,arrayRemove } from 'firebase/firestore';
import { db } from '../Services/firebase';
import {MdChevronRight,MdChevronLeft} from "react-icons/md";
import { createImageUrl } from '../Services/movieServices';
import {AiOutlineClose} from 'react-icons/ai'

const Profile = () => {
  const [movies,setMovies]=useState([]);
  const {user}=UserAuth();
  useEffect(()=>{
    if(user){
      onSnapshot(doc(db,"users",`${user.email}`),(doc)=>{
          if(doc.data()) setMovies(doc.data().favShows);
      });
    }
  },[user?.email]);


  const slide=(offset)=>{
    const slider=document.getElementById("slider");
    slider.scrollLeft=slider.scrollLeft + offset;
  }
  const handleCross=async(movie)=>{
    const userDoc=doc(db,"users",user.email);
    await updateDoc(userDoc,{
      favShows:arrayRemove(movie),
    });
  }

  if(!user){
   return (
    <div><p>Fetching shows...</p></div>
   )
  }
  return (
    <>
      <div>
        <div>
          <img 
          className='block w-full h-[300px] object-cover'
          alt='//'
          src='https://assets.nflxext.com/ffe/siteui/vlv3/20bf1f4d-1c73-48fd-8689-310d6dd80efc/81bdc063-cb8f-4afe-8a02-a3131ca4ef5e/IN-en-20240812-POP_SIGNUP_TWO_WEEKS-perspective_WEB_7998f3b6-63e3-424a-8328-550cf777ddce_medium.jpg'
          />  
          <div className='bg-black/60 fixed top-0 left-0 w-full h-[300px]'>
            <div className='absolute top-[20%] p-4 md:p-8'>
              <h1 className='text-3xl md:text-5xl font-nsans-bold my-2'>
                My Shows
              </h1>
              <p className='font-nsans-light text-gray-400 text-lg'>
                {user.email}
              </p>
            </div>
          </div>
        </div>


        <h2 className='font-nsans-bold md:text-xl p-4 capitalize'>Fav Shows</h2>
      <div className='relative items-center flex group '>
        <MdChevronLeft
          onClick={()=>{slide(-500)}}
          className='bg-white rounded-full absolute left-2 z-10 hidden
          opacity-80 text-gray-700 group-hover:block cursor-pointer '
        />
        <div id={'slider'} className=' w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide'>
          {
            movies.map((movie)=>(
              
              <div key={movie.id} className=' relative w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block rounded-lg overflow-hidden cursor-pointer m-2 '>
                <img className='w-full h-32 block object-cover object-top' alt={movie.title} src={createImageUrl(movie.backdrop_path??movie.poster_path,"w500")} />
                <div className='absolute top-0 left-0 w-full h-32 bg-black/80 opacity-0 hover:opacity-100'>
                  <p className='text-xs whitespace-normal md:text-sm flex justify-center items-center h-full font-nsans-bold'>
                    {movie.title}
                  </p>   
                  <p>
                    <AiOutlineClose
                      onClick={()=>{handleCross(movie)}}
                      size={30}
                      className='absolute top-2 right-2'
                    />  
                  </p>        
                </div>
              </div>

            ))
          }
        </div>
        <MdChevronRight 
          onClick={()=>{slide(500)}}
          className='bg-white rounded-full absolute right-2 z-10 hidden
          opacity-80 text-gray-700 group-hover:block cursor-pointer '/>
      </div>





      </div>
    </>
  )
}

export default Profile