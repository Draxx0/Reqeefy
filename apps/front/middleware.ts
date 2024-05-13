// import { NextRequest, NextResponse } from 'next/server';
import { NextRequest, NextResponse } from 'next/server';

const publicRoutes = ['/auth/register', '/auth/login'];
const privateRoutes = [
  '/tickets',
  '/distributions',
  '/user-settings',
  '/notifications',
];

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
  const isSuperadminRoute = superadminRoutes.some((route) =>
    path.startsWith(route)
  );

  if (isPublicRoute) {
    return NextResponse.next();
  }

  console.log(req.cookies);

  const userCookie = req.cookies.get('USER_DATA')?.value;

  if (!userCookie) {
    console.log('No user cookie found, redirecting to login page');
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  try {
    const parsedUser = JSON.parse(userCookie);

    const isValidUser = parsedUser && parsedUser.id && parsedUser.email;

    const isUserSuperadmin = parsedUser.role === 'superadmin';

    if (isValidUser) {
      console.log('User cookie found:', parsedUser);
      if (isPrivateRoute) {
        console.log('Private accesbile route:', path);
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

// export default function middleware(req: NextRequest) {
//   return NextResponse.next();
// }
