import { prisma } from "@/app/utils/connect"
import { getDataFromToken } from "@/app/api/helper/getDataFromToken"
import { NextResponse } from "next/server"

export const GET = async (request)=>{
    const userData  = await getDataFromToken(request)
    // console.log(userData)
    const response = await prisma.user.findUnique({
        where:{
           id:userData.id
        }
    })

    return NextResponse.json({
        success:true,
        user:response
    })
}