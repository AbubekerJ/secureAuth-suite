import bcryptjs from "bcryptjs";

import nodemailer from 'nodemailer'

export const sendMail =async (userId , email  , emailType)=>{

    const token = bcryptjs.hashSync(userId.toString(), 10)
    console.log('the emaail type is '+ emailType)
    if(emailType ==='VERIFY'){
     const user= await prisma.user.findUnique({
      where:{
        email:email
      }
     })

     await prisma.user.update({
        where:{
          id:user.id
        },
        data:{
          verifyToken:token,
          verifyTokenExpiry:new Date(Date.now() + 3600 * 1000)
        }
     })
    }
    else if(emailType==='RESET'){
      const user= await prisma.user.findUnique({
        where:{
          email:email
        }
       })
  
       await prisma.user.update({
          where:{
            id:user.id
          },
          data:{
            resetPasswordToken:token,
            resetPasswordExpiry:new Date(Date.now() + 3600 * 1000)
          }
       })
    }
  
    
    // Looking to send emails in production? Check out our Email API/SMTP product!
const transport = nodemailer.createTransport({
    host:process.env.HOST,
    port:'465',
    auth: {
      user:process.env.USER,
      pass:process.env.PASS
    }
  });


  const info = await transport.sendMail({
    from: 'abubekerjemal03@gmail.com', // sender address
    to: email, // list of receivers
    subject:emailType==='VERIFY'?'email verification email':'password reset', 
    html: emailType==='VERIFY'?`<h1>Click here to verify your email <a href="http://localhost:3000/verify?token=${token}">Verify</a></h1>`:`<h1>Click here to verify your email <a href="http://localhost:3000/resetPassword?token=${token}">ResetPassword </a></h1>` ,
  });

}