import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
export { default } from "next-auth/middleware"
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
 const token = await getToken({req : request})
 const url = await request.nextUrl

 if(token && url.pathname == '/sign-in' || url.pathname == '/'){
    return NextResponse.redirect(new URL('/dashboard', request.url))
 } 
    return NextResponse.redirect(new URL('/sign-in', request.url))
 
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/sign-in','/dashboard/:path*']
}