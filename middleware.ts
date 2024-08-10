import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProctedRoutes = createRouteMatcher(["/","/Profile/(.*)","/message/(.*)"])
export default clerkMiddleware((auth,req)=>{
  if(isProctedRoutes(req)){
    auth().protect()
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};