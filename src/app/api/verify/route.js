import { prisma } from "@/app/utils/connect"
import { NextResponse } from "next/server"

export const POST= async(req)=>{
    const {token} =await req.json()
    console.log("Token:", token); 

    const user = await prisma.user.findUnique({
        where: {
          verifyToken:token,
        },
      });
    if(!user){
        return NextResponse.json({
            success:false,
            message:'invalid token'
        })
    }
    try {
        await prisma.user.update({
           where:{
            id:user.id
           },
           data:{
            isVerified:true
           }   
        }) 
        
        return NextResponse.json({
            success:true,
            message:'email verified successfuly you will be redirected to the signin page '
        })
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:error
        })
    }
    
}