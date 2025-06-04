// import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
// import { NextResponse } from 'next/server'

// const isAdminRoute = createRouteMatcher(['/admin(.*)']);
// const isDashboardRoute = createRouteMatcher(['/dashboard(.*)']);

// export default clerkMiddleware(async (auth, req) => {
//   const { userId, sessionClaims } = await auth();

//   // Admin routes
//   if (isAdminRoute(req) && sessionClaims?.metadata?.role !== 'admin') {
//     const url = new URL('/', req.url);
//     return NextResponse.redirect(url);
//   }

//   // Dashboard routes
//   if (isDashboardRoute(req) && !userId) {
//     const url = new URL('/sign-in', req.url);
//     return NextResponse.redirect(url);
//   }
// });

// export const config = {
//   matcher: [
//     '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
//     '/(api|trpc)(.*)',
//   ],
// };



import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'


const isProtectedRoute = createRouteMatcher(['/dashboard']);
const isAdminRoute = createRouteMatcher(['/admin']);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) await auth.protect();

  if(isAdminRoute(req) && (await auth()).sessionClaims?.org_role !== 'org:admin') {
    const url = new URL('/', req.url)
    return NextResponse.redirect(url)
  }
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};