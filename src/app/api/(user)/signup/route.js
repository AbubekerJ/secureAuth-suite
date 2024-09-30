import { prisma } from "@/app/utils/connect"
import {  NextResponse } from "next/server"
import bcryptjs from "bcryptjs";
import { sendMail } from "../../helper/mailer";



export const POST=async (req)=>{
    const user   = await req.json()
    
    //ckeck is the user is already registerd 
     const userExist = await prisma.user.findUnique({
        where:{
           email:user.email 
        }
     })
     const userNameExist = await prisma.user.findUnique({
        where:{
           username:user.username 
        }
     })
     if(userExist){
        return  NextResponse.json({
            success:false,
            message:'user already registerd'
        })
     }
     if(userNameExist){
        return  NextResponse.json({
            success:false,
            message:'username taken'
        })
     }
   try {
   //hash the password 
   const hashedPassword = bcryptjs.hashSync(user.password)
     
   //register user to the database 


   
 
  const newUser =  await prisma.user.create({
      data:{
         username : user.username,
         email:user.email,
         password:hashedPassword,
        
      }
   })
      //send verification email
      // await sendMail(newUser.id , email , VERIFY )
  await sendMail(newUser.id , user.email , 'VERIFY' )
   return NextResponse.json({message:'user created sucessfully'})

    
   } catch (error) {
      console.log(error)
    return  NextResponse.json({
      success:false,
      message:error,
      status:400})
   }
}
