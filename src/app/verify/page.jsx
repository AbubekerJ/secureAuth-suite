'use client'
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const Page = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const router = useRouter();
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(true);

  const verifyToken = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      const data = await res.json();

      if (data.success === true) {
        setVerified(true);
      } else {
        setVerified(false);
      }
      setLoading(false); 
    } catch (error) {
      console.log(error);
      setLoading(false); 
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  // Handle redirection in useEffect after verification
  useEffect(() => {
    if (!loading && verified) {
      router.push('/signin');
    }
  }, [loading, verified, router]);

  return (
    <div className='text-4xl text-green-500 flex items-center justify-center h-screen'>
      {loading ? <h1>Loading... you will be redirected </h1> : !verified ? <h1>Verification failed</h1> : null}
    </div>
  );
};

export default Page;
