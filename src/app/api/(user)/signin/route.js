import { prisma } from "@/app/utils/connect";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
export const POST = async (req) => {
  const user = await req.json();

  //check if user exists
  const userExist = await prisma.user.findUnique({
    where: {
      email: user.email,
    },
  });
  //send user not found if user not exist
  if (!userExist) {
    return NextResponse.json({
      success: false,
      message: "user not found",
    });
  }

  const Validpassword = bcryptjs.compareSync(user.password , userExist.password)
  if(!Validpassword){
    return NextResponse.json({
      success:false,
      message: "password not correct",
    });
  }


  //not sign in if not email verified
  if (userExist.isVerified===false) {
    return NextResponse.json({
      success: false,
      message: "email not verifyed",
    });
  }

  try {
    const tokenData = {
      id: userExist.id,
    };
    const token = jwt.sign(tokenData, process.env.JWT_SECRET);
    const { password, ...rest } = userExist;

    const response = NextResponse.json({
        success: true,
        user: rest,
    });

    response.cookies.set("access_token", token, {
      httpOnly: true,

      maxAge: 60 * 60 * 24, // 1 day
    });

    return response;
  } catch (error) {
    return NextResponse({
        success: false,
        message: error.message,
    });
  }
};
