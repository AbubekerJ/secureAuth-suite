'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { verifyEmailToResetPass } from '../actions/verifyEmailToResetPass';
import { toast } from 'react-toastify';

const Page = () => {
  const [email, setEmail] = useState('');

  const [loading , setLoading] = useState(false)
  const router = useRouter();

  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();
    const formData = new FormData();
    formData.append('email', email);

    try {
      const response = await verifyEmailToResetPass(formData);
      if (response.success) {
        router.push('/checkEmail');
      } else {
        setLoading(false)
        toast.error(response.message); 
      }
    } catch (err) {
      console.error(err);
      toast.error('An unexpected error occurred');
    }
  };

  return (
    <div>
      <form
        className='flex flex-col justify-center items-center h-screen gap-5'
        onSubmit={handleSubmit}
      >
        <h1 className='text-lg capitalize text-center font-bold text-green-400'>
          Enter your email address to reset your password!
        </h1>
       
        <div className='flex'>
          <input
            type='text'
            placeholder='Email'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='shadow appearance-none border border-gray-400 w-full py-2 px-3 md:px-6 md:py-4 bg-gray-200 text-black leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          <button  className='p-3 bg-gradient-to-tr from-green-600 to-green-400'>
           {loading?'loading...':'send'} 
          </button>
        </div>
      </form>
    </div>
  );
};

export default Page;
