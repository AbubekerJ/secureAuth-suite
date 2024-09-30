import jwt from 'jsonwebtoken'

export const getDataFromToken = (request)=>{

   const token = request.cookies.get('access_token')?.value || ''
   if(!token){
    throw new Error ('somthing went wrong')
   }

   const decode = jwt.verify(token , process.env.JWT_SECRET)
   return decode

}