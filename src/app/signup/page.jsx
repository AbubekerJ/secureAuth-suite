'use client'

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';



const schema = z.object({
  username:z.string().min(3 , {message:'Username must be atleast 3 character '}).max(15 , {message:'Username should not be this long'}),
  email: z.string().email({ message: 'Invalid email!' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
});

const Signup = () => {

  const {
    register,
   handleSubmit,
   formState: { errors },
 } = useForm({
   resolver: zodResolver(schema),
 });

  const router = useRouter()
  const [loading , setLoading]=useState(false)




  const onSubmitHandler = async (formData)=>{
     setLoading(true)
    
     try {
      const res  = await fetch('http://localhost:3000/api/signup',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(formData)
      })
      const data  =await res.json()
      console.log(data)
      if(data.success===false){
        toast.error(data.message)
        setLoading(false)
        return
      }
      
     toast.success('check your email to verify')
      setLoading(false)
       router.push('checkEmail')
      
     } catch (error) {
       toast.error(error)
       setLoading(false)
     }
  }

  
  return (
    <div className="flex flex-col gap-10 justify-center items-center h-screen ">
      <div className="flex flex-col gap-2 items-center justify-center w-full">
        <Image src={"/logo.png"} width={140} height={140} className="" alt="" />

        <h1 className="font-semibold capitalize text-xl text-center">
          Welcome to Tele!
        </h1>
        <span className="text-center text-gray-500 capitalize">
          {" "}
          Keep you data safe
        </span>
        <form className="flex flex-col  gap-3 " onSubmit={handleSubmit(onSubmitHandler)}>
          <input
            {...register('username')}
            type="text"
            placeholder="username"
            className="shadow appearance-none border border-gray-400   rounded-3xl w-full py-2 px-3 md:px-6 md:py-4 bg-gray-200 text-black leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="username"
           
          />

          {errors?.username && <p className='text-red-500 text-xs'>{errors?.username.message}</p>}
          <input
            {...register('email')}
            type="email"
            placeholder="Email"
            className="shadow appearance-none border border-gray-400   rounded-3xl w-full py-2 px-3 md:px-6 md:py-4 bg-gray-200 text-black leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="email"
            
          />
          {errors?.email && <p className='text-red-500 text-xs'>{errors?.email.message}</p>}
          <input
            {...register('password')}
            type="password"
            placeholder="password"
            className="shadow appearance-none border border-gray-400   rounded-3xl w-full py-2 px-3 md:px-6 md:py-4 bg-gray-200 text-black leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="password"
          
          />
          {errors?.password && <p className='text-red-500 text-xs'>{errors?.password.message}</p>}
          <button className="uppercase  bg-gradient-to-tr from-green-600 to bg-green-400 py-2 px-3 md:px-6 md:py-4 text-black font-bold rounded-3xl">
           {loading?<span>Loading</span>:<span>SignUp</span>} 
          </button>
        </form>
      </div>

      <div className="flex gap-2 items-center capitalize ">
        <h1> have an account ?</h1>
        <Link href={"/signin"} className="text-sm text-green-600 ">
          signin
        </Link>
      </div>
    </div>
  );
};

export default Signup;
