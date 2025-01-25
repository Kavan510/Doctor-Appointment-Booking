import React, { useState } from 'react'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import {toast} from 'react-toastify'
import { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

const Login = () => {
const [ state,setState] = useState('Sign Up')
const [email,setEmail] = useState('')
const [password,setPassword] = useState('')
const [name,setName] = useState('')
const navigate = useNavigate()

const {backendUrl,token,setToken} = useContext(AppContext)

const onSubmitHandler=async (event)=>{
  event.preventDefault(); // whenever we submit form it'll not Reload the page 
  try{

    if(state=='Sign Up'){

      const {data} = await axios.post(backendUrl+'/api/user/register',{name,email,password})
      
      if(data.success){
        localStorage.setItem('token',data.token)
        setToken(data.token)
      }
else{
  toast.error(data.msg)
}
    }


else{
  const {data} = await axios.post(backendUrl+'/api/user/login',{email,password})
      
  if(data.success){
    localStorage.setItem('token',data.token)
    setToken(data.token)
  }
else{
toast.error(data.msg)
}
}

    }

  catch(e){
    console.log(e)
    toast.error(e)
  }


}

useEffect(()=>{
  if(token){
    navigate('/')
  }

},[token])


  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center' >
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>
        <p className='text-2xl font-semibold '>{state==='Sign Up' ? "Create Account" : "Login"} </p>
        <p>Please {state=='Sign Up' ? "sign up " :"log in "}to book an appointment</p>
        {
          state=='Sign Up'
          &&
          <div className='w-full '>
          <p>Full Name</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="text"  onChange={(e)=>setName(e.target.value)} value={name} required />
        </div>
        }
       
        <div className='w-full '>
          <p>Email</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="email"  onChange={(e)=>setEmail(e.target.value)} value={email} required />
        </div>
        <div className='w-full '> 
          <p>Password</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="password"  onChange={(e)=>setPassword(e.target.value)} value={password} required />
        </div>
        <button type='submit' className='bg-primary text-white w-full py-2 rounded-md text-base'>{state==='Sign Up' ? "Create Account" :"Log In"} </button>
        {
          state==='Sign Up'
          ?
          <p className=''>Already have an account? <span onClick={()=>{setState('Login')}} className='text-primary underline cursor-pointer'>Login here</span></p>
          :
          <p>
            Create new account? <span onClick={()=>{setState('Sign Up')}} className='text-primary underline cursor-pointer'>Click here</span>
          </p>
        }
      </div>
      
    </form>
  )
}

export default Login
