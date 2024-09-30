'use client'

import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
const LogoutButton = () => {
    const [loading , setLoading]=useState(false)
    const router = useRouter()
    const handleClick = async()=>{
          try {
            setLoading(true)
            const res = await fetch('http://localhost:3000/api/signout')
            const data = await res.json()
            console.log(data)
            if(!data.success){
                toast.error(data.message)
            }
            setLoading(false)
            toast.success(data.message)
            router.push('signin')
            
          } catch (error) {
            toast.error(error.message)
            setLoading(false)
          }
    }
  return (
    <div>
       <button onClick={handleClick} className="capitalize absolute top-2 right-3 p-4 bg-green-400 ">{loading?'loding...':'logout'}</button>
    </div>
  )
}

export default LogoutButton
