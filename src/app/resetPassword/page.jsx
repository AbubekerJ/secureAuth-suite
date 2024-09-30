'use client'

import React, { useEffect, useState } from 'react'
import {resetPasswordAction} from '../actions/resetPasswordAction'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'react-toastify'

const page = () => {
    const [form , setForm ]=useState({})
    const router = useRouter()
    const searchParams = useSearchParams();
    const [ResetToken  , setResetToken] = useState('')
    const [loading , setLoading] = useState(false)
    
    const handleChange = (e)=>{
       setForm({
        ...form , 
        [e.target.name]:e.target.value
       })
    }

    const getToken =async()=>{
      
    const token = searchParams.get('token');
    setResetToken(token)
   
    }
    

 useEffect(()=>{
    getToken()
 },[])
   console.log(ResetToken)
  const handleSubmit = async (e)=>{
    setLoading(true)
     e.preventDefault()

     try {
      
        const response = await resetPasswordAction(form , ResetToken)
        console.log(response)
        if(response.success){
          toast.success('passowrd reset succssfully')
          router.push('signin')     
        }
        else{
          setLoading(false)
          toast.error(response.message)
        
        }

     } catch (error) {
      setLoading(false)
      console.log(error)
     }
  }
  return (
    <div className='flex justify-center items-center h-screen'>
       <form  className='flex flex-col gap-3 'onSubmit={handleSubmit}>
        <h1 className='text-lg text-green-400 font-bold capitalize'> enter your new password</h1>
       
        <input className="shadow appearance-none border border-gray-400   rounded-3xl w-full py-2 px-3 md:px-6 md:py-4 bg-gray-200 text-black leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
 type="text" placeholder='New password' name='password' onChange={handleChange}/>
        <button className='capitalize bg-green-500 p-6 rounded-lg' >{loading?'loading...':'reset'}</button>
       </form>
    </div>
  )
}

export default page
