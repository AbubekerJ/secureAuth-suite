import { prisma } from "@/app/utils/connect";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const posts = await prisma.post.findMany();
    console.log(posts); 
    
    return NextResponse.json({
      success: true,
      data: posts,  
    }, { status: 200 });
    
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
    }, { status: 400 });
  }
};
