"use server"

import { prisma } from "../utils/connect"
import bcryptjs from "bcryptjs";

export const resetPasswordAction = async (formData , resetToken)=>{
   

     if (!formData.password) {
        throw new Error("new password  required.");
    }
   
    const user = await prisma.user.findUnique({
        where:{
            resetPasswordToken:resetToken
        }
      }
      
    )
    if (!user) {
        return{success:false ,message:'invalid token'};
    }
    const hashedPassword = bcryptjs.hashSync(formData.password)
    
    try {
      await prisma.user.update({
            where:{
                id:user.id
            },
            data:{
                password:hashedPassword
            }
        }) 
        return {success:true}
    } catch (error) {
      console.log(error)
      return{success:false, message:error.message}  
    }
   
   
   
}