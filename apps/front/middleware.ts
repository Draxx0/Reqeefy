import { NextRequest, NextResponse } from 'next/server';

const publicRoutes = ['/auth/register', '/auth/login', '/auth/forgot-password'];
const privateRoutes = ['/tickets', '/user-settings', '/notifications'];

const distributorRoutes = ['/distributions'];

const superadminRoutes = [
  '/settings',
  '/settings/accounts',
  '/settings/projects',
];

export default function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const isPublicRoute = publicRoutes.includes(path);

  const isPrivateRoute =
    privateRoutes.some((route) => path.startsWith(route)) || path === '/';

  const isDistributorRoute = distributorRoutes.some((route) =>
    path.startsWith(route)
  );

  const isSuperadminRoute = superadminRoutes.some((route) =>
    path.startsWith(route)
  );

  if (isPublicRoute) {
    return NextResponse.next();
  }

  const userCookie = req.cookies.get('USER_DATA')?.value;

  if (!userCookie) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  try {
    const parsedUser = JSON.parse(userCookie);

    const isValidUser = parsedUser && parsedUser.id && parsedUser.email;

    const isUserSuperadmin = parsedUser.role === 'superadmin';

    const isDistributor = parsedUser.role === 'distributor' || isUserSuperadmin;

    if (isValidUser) {
      if (isPrivateRoute) {
        return NextResponse.next();
      }

      if (isDistributorRoute && isDistributor) {
        return NextResponse.next();
      }

      if (isSuperadminRoute && isUserSuperadmin) {
        return NextResponse.next();
      }
    }
  } catch (error) {
    console.error("Erreur lors de l'analyse du cookie USER_DATA:", error);
  }

  return NextResponse.redirect(new URL('/', req.url));
}

export const config = {
  matcher: ['/:path((?!api|_next/static|_next/image|favicon\\.ico|assets/).*)'],
};
