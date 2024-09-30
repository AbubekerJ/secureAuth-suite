"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const page = () => {
  const [form, setform] = useState({});
  const router = useRouter();
  const [loaing, setLoading] = useState(false);
  const handleChange = (e) => {
    setform({
      ...form,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        toast.error(data.message);
        setLoading(false);
        return;
      }

      toast.success("loged in");
      setLoading(false);
      router.push("/");
    } catch (error) {
      toast.error(error);
      setLoading(false);
    }
  };

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
        <form className="flex flex-col  gap-3 " onSubmit={handleSubmit}>
          <input
            required
            type="email"
            placeholder="Email"
            className="shadow appearance-none border border-gray-400   rounded-3xl w-full py-2 px-3 md:px-6 md:py-4 bg-gray-200 text-black leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="email"
            onChange={handleChange}
          />
          <input
            required
            type="password"
            placeholder="password"
            className="shadow appearance-none border border-gray-400   rounded-3xl w-full py-2 px-3 md:px-6 md:py-4 bg-gray-200 text-black leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="password"
            onChange={handleChange}
          />

          <button className="uppercase  bg-gradient-to-tr from-green-600 to bg-green-400 py-2 px-3 md:px-6 md:py-4 text-black font-bold rounded-3xl">
            {loaing ? <span>Loading</span> : <span>SignIn</span>}
          </button>
          <Link href={'/forgotPassword'} className="text-sm text text-green-500 text-start">forgote password</Link>
        </form>
      </div>

      <div className="flex gap-2 items-center capitalize ">
        <h1>Dont have an account ?</h1>
        <Link href={"/signup"} className="text-sm text-green-600 ">
          signup
        </Link>
      </div>
    </div>
  );
};

export default page;
