import { type NextRequest, NextResponse } from "next/server";
import {
  isAuthenticated,
  isAuthenticatedAdmin,
} from "./utils/amplify-server-utils";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const isLoggedIn = await isAuthenticated(request, response);
  const isLoggedInAdmin = await isAuthenticatedAdmin(request, response);

  const isOnDashboard = request.nextUrl.pathname.startsWith("/dashboard");
  const isOnAdminArea =
    request.nextUrl.pathname.startsWith("/dashboard/admins");

  if (isOnDashboard) {
    if (!isLoggedIn)
      return NextResponse.redirect(new URL("/auth/login", request.nextUrl));
    if (isOnAdminArea && !isLoggedInAdmin)
      return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
    return response;
  } else if (isLoggedIn) {
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  }
}

export const config = {
  /*
   * Match all request paths except for the ones starting with
   */
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
