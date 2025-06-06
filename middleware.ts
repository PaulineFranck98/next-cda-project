import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isAdminRoute = createRouteMatcher(['/admin(.*)']);
const isDashboardRoute = createRouteMatcher(['/dashboard(.*)']);

//  vérifie si on est en mode test Cypress
const isCypressTesting = process.env.CYPRESS_TESTING === 'true';

export default clerkMiddleware(async (auth, req) => {
  //  si on est en test Cypress --> bypass totalement les vérifications
  if (isCypressTesting) {
    return NextResponse.next(); // pour laisser passer la requête sans auth
  }

  const { userId, sessionClaims } = await auth();

  // Admin routes
  if (isAdminRoute(req) && sessionClaims?.metadata?.role !== 'admin') {
    const url = new URL('/', req.url);
    return NextResponse.redirect(url);
  }

  // Dashboard routes
  if (isDashboardRoute(req) && !userId) {
    const url = new URL('/sign-in', req.url);
    return NextResponse.redirect(url);
  }
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};


