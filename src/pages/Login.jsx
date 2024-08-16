import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext';


const Login = () => {
  const [rememberLogin,setRememberLogin]=useState(true);
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');

  const {user,logIn}=UserAuth();
  const navigate=useNavigate();

  const handleFormSubmit=async(e)=>{
      e.preventDefault();
      try{
        await logIn(email,password);
        navigate('/');
      }
      catch(err){
        console.log(err);
        
      }
      
  }

  return (
   <>
    <div className='w-full h-screen'>
      <img 
        className='sm:block absolute w-full h-full object-cover'
      src='https://assets.nflxext.com/ffe/siteui/vlv3/20bf1f4d-1c73-48fd-8689-310d6dd80efc/81bdc063-cb8f-4afe-8a02-a3131ca4ef5e/IN-en-20240812-POP_SIGNUP_TWO_WEEKS-perspective_WEB_7998f3b6-63e3-424a-8328-550cf777ddce_medium.jpg'
      alt='netflix'/>
      <div className='bg-black/70 top-0 left-0 fixed w-full h-screen'/>
      <div className='z-20 fixed w-full px-4 py-24'>
        <div className='max-w-[300px] mx-auto h-[400px] bg-black/75 rounded-lg'>
          <div className='max-w-[320px] mx-auto py-16'>
            <h2 className='text-3xl font-nsans-bold text-center'>Login</h2>
            <form className='w-full flex flex-col px-12 py-4'
              onSubmit={handleFormSubmit}
              >
              <input 
                className='p-1 my-2 bg-gray-700 rounded'
                type='email'
                placeholder='email'
                autoComplete='email'
                value={email}
                onChange={(e)=>{setEmail(e.target.value)}}
              />
               <input 
                className='p-1 my-2 bg-gray-700 rounded'
                type='password'
                placeholder='password'
                autoComplete='current-password'
                value={password}
                onChange={(e)=>{setPassword(e.target.value)}}
              />
              <button className='bg-red-600 p-1 my-2 rounded font-nsans-bold'>
                Sign Up</button>
              <div className='flex justify-between items-center text-gray-600 text-sm'>
                <p>
                  <input 
                    type='checkbox'
                   className='mr-1'
                   checked={rememberLogin} 
                   onChange={()=>setRememberLogin(!rememberLogin)}/>Remeber Me
                </p>
                <p>Need Help?</p>
              </div>
              <p className='text-sm my-4'>
                <span className='text-gray-600 mr-2'>New To Neflix</span>
                <Link to="/signup">Sign Up</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
   </>
  )
}

export default Login