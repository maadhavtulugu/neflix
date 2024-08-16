import axios from 'axios';
import React, { useEffect, useState } from 'react'
import MovieItem from './MovieItem';
import {MdChevronLeft,MdChevronRight} from 'react-icons/md'

const MovieRow = ({title,url}) => {

  const rowId=Math.floor(Math.random()*1000);
  const [movies,setMovies]=useState([]);
  useEffect(()=>{
      axios.get(url).then((respose)=>setMovies(respose.data.results));
  },[url])
  
  const slide=(offset)=>{
    const slider=document.getElementById("slider"+rowId);
    slider.scrollLeft=slider.scrollLeft + offset;
  }
  
  return (
   <>
      <h2 className='font-nsans-bold md:text-xl p-4 capitalize'>{title}</h2>
      <div className='relative items-center flex group '>
        <MdChevronLeft
          onClick={()=>{slide(-500)}}
          className='bg-white rounded-full absolute left-2 z-10 hidden
          opacity-80 text-gray-700 group-hover:block cursor-pointer '
        />
        <div id={'slider'+rowId} className=' w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide'>
          {
            movies.map((movie)=>(
              <MovieItem key={movie.id} movie={movie}/>
            ))
          }
        </div>
        <MdChevronRight 
          onClick={()=>{slide(500)}}
          className='bg-white rounded-full absolute right-2 z-10 hidden
          opacity-80 text-gray-700 group-hover:block cursor-pointer '/>
      </div>
   </>
  )
}

export default MovieRow