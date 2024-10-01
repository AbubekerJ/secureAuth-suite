'use client'

import React, { useEffect, useState } from 'react'

const Profile = () => {
  const [user ,setUser] = useState(null)
  const  fetchUserData = async ()=>{
    try {
      const res  = await fetch('http://localhost:3000/api/profile')
      const data = await res.json()
       setUser(data.user)
      
      // console.log(data.user.emial)
    } catch (error) {
       console.log(error)
    }
    
  }
  useEffect(()=>{
     fetchUserData()
  },[])
  console.log(user)
  return (
    <div  className='flex flex-col gap-4'>

    <h1>profile</h1> 
   <h1>{user?.email}</h1>
   

    {user?.role ==='USER' &&<button className='p-2 rounded bg-red-400 text-white'>delete</button>}

    </div>
  )
}

export default Profile
