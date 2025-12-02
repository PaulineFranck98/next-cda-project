import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { isCypressTest, redirectTo } from './lib/middleware/utils'

type SessionClaims = {
	metadata?: {
		role?: string;
	};
};

// Création des matchers
const isAdminRoute = createRouteMatcher(['/admin(.*)']);
const isDashboardRoute = createRouteMatcher(['/dashboard(.*)']);

// Définition des règles
const routeRules = [
	{
		matcher: isAdminRoute, allowIf: (claims: SessionClaims) => {
			const role = claims?.metadata?.role ?? 'user';
			return role === 'admin';
		}, redirectTo: '/',
	},
	{ matcher: isDashboardRoute, allowIf: (_claims: SessionClaims, userId: string | null) => !!userId, redirectTo: '/sign-in' },
];

export default clerkMiddleware(async (auth, req) => {
	if (isCypressTest()) return NextResponse.next();

	const { userId, sessionClaims } = await auth();

	for (const rule of routeRules) {
		if (rule.matcher(req) && !rule.allowIf(sessionClaims ?? {}, userId)) {
			return redirectTo(rule.redirectTo, req);
		}
	}

	return NextResponse.next();
});

export const config = {
	matcher: [
		'/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
		'/(api|trpc)(.*)',
	],
};

