import { AUTH_UTILS } from '@/utils/auth/getAuthenticatedUser'; // import { NextResponse } from 'next/server';// import type { NextRequest } from 'next/server';import { PROTECTED_ROUTES } from './constants';
import { NextRequest, NextResponse } from 'next/server';

// export default function middleware(req: NextRequest) {
//   const isAuthenticated = AUTH_UTILS.getAuthenticatedUser();

//   if (!isAuthenticated && PROTECTED_ROUTES.includes(req.nextUrl.pathname)) {
//     const absoluteURL = new URL('/auth/login', req.nextUrl.origin);
//     return NextResponse.redirect(absoluteURL.toString());
//   }

//   return NextResponse.next();
// }

export default function middleware(req: NextRequest) {
  return NextResponse.next();
}
