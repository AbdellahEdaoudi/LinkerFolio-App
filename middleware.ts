import { getToken } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware';
import { NextRequest, NextResponse } from 'next/server';

// Middleware function
export default withAuth(async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isAuth = await getToken({ req: request });

  const protectedRoutes = ['/Home', '/BusinessLinks', '/Profile', '/Contact',''];
  const isAuthRoute = pathname.startsWith('/auth');
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

  // If not authenticated and accessing protected route
  if (!isAuth && isProtectedRoute) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // If authenticated and accessing non-auth route
  // if (!isAuthRoute && isAuth) {
  //   return NextResponse.redirect(new URL('/Profile', request.url));
  // }
}, {
  // Optional callback function
  callbacks: {
    async authorized() {
      return true;
    },
  },
});

// Configuration for matcher
export const config = {
  matcher: ['/Home','/BusinessLinks', '/Profile/:path*', '/Contact', '/auth/:path*'],
};

  

// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// const isProctedRoutes = createRouteMatcher(["/","/Profile/(.*)","/message/(.*)"])
// export default clerkMiddleware((auth,req)=>{
//   if(isProctedRoutes(req)){
//     auth().protect()
//   }
// });

// export const config = {
//   matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
// };