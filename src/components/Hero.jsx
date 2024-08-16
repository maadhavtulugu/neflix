import axios from 'axios';
import React, { useEffect, useState } from 'react'
import endpoints,{createImageUrl} from '../Services/movieServices';

const Hero = () => {

  const [movie,setMovie]=useState({});
  useEffect(()=>{
      axios.get(endpoints.popular).then((response)=>{
        const movies=response.data.results;
        const randomMovie=movies[Math.floor(Math.random()*movies.length)];
        setMovie(randomMovie);
        
      })
  },[])

  const truncate=(str,length)=>{
    if(!str) return "";
    return str.length>length?str.slice(0,length)+"...":str;
  }
  if(!movie) return(
    <>
      <p>Fetching data...</p>
    </>
  );

  const {title,backdrop_path,release_date,overview}=movie;
  return (
    <div className='w-full h-[250px] lg:h-[350px] mb-1'>
      <div className='w-full h-full'>
        <div className='absolute w-full h-[250px] lg:h-[350px] bg-gradient-to-r from-black'/>
          <img
            className='w-full h-full object-cover object-top'
            src={createImageUrl(backdrop_path,'original')}
            alt={title}
          />
       
         <div className='absolute w-full top-[12%] lg:top-[25%] p-2 md:p-4'>
            <h1 className='text-2xl md:text-4xl font-nsans-bold'>{title}</h1>
            <div className='mt-4 mb-2'>
              <button className='capitalize text-sm border bg-gray-300 text-black py-1 px-2 '>play</button>
              <button className='capitalize  text-sm border border-gray-300 py-1 px-2 ml-2'>watch later</button>
            </div>
            <p className='text-gray-400 text-xs '>{release_date}</p>
            <p className='w-full  text-sm lg:max-w-[50%] xl:max-w-[35%] text-gray-200'>{truncate(overview,100)}</p>
          </div>
         </div>
      
    </div>
  )
}

export default Hero