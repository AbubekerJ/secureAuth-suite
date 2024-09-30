
import { NextResponse } from "next/server"

export const GET=async()=>{
    try {
     const  response = NextResponse.json({
            success:true,
            message:'user logged out'
        })  

        response.cookies.set('access_token',null,{
            httpOnly: true,
            expires: new Date(0),
        })
           return response
    } catch (error) {
        return NextResponse.json(
            {
                success:false,
                Message:'somthing went wrong'
            }
        )
    }
}