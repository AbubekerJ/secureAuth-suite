import { NextResponse } from 'next/server'
 

export function middleware(request) {
    const path = request.nextUrl.pathname
 
    let publicPath = path==='/signin'||path==='/signup'|| 'forgotPassword'
   const token = request.cookies.get('access_token')?.value || ''
   if(!token && !publicPath){
    return NextResponse.redirect(new URL('/signin', request.url))
   }
  //  if(token && publicPath){
  //   return NextResponse.redirect(new URL('/', request.url))
  //  }
  
}
 

export const config = {
  matcher: ['/profile/:path*',
    '/signin',
    '/signup',
    '/',
    '/forgotPassword',
    
    '/checkEmail'
  ],
}