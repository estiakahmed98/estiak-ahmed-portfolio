import { getToken } from "next-auth/jwt";

const PUBLIC_PATHS = new Set([
  "/",
  "/login",
  "/register",
  "/api/auth/signout",
  "/api/auth/session",
  "/api/auth/register",
  "/favicon.ico",
  "/static",
]);

const AUTH_PATHS = new Set([
  "/login",
  "/register",
]);

const STATIC_FILE_REGEX = /\.(png|jpg|jpeg|gif|svg|css|js|woff2?|ttf|eot)$/i;

function isPublic(pathname) {
  return Array.from(PUBLIC_PATHS).some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );
}

function safeCallback(request) {
  const url = new URL(request.url);
  const cb = url.searchParams.get("callbackUrl");
  if (!cb) return null;
  if (!cb.startsWith("/") || cb.startsWith("//")) return null;
  return cb;
}

export async function middleware(request) {
  const { pathname, search } = new URL(request.url);

  // Static + public shortcuts
  if (isPublic(pathname)) return;
  if (pathname.startsWith("/api/") && !pathname.startsWith("/api/auth/")) {
    return;
  }
  if (STATIC_FILE_REGEX.test(pathname)) return;

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isAdminRoute = pathname === "/admin" || pathname.startsWith("/admin/");
  const isUserRoute = pathname === "/dashboard" || pathname.startsWith("/dashboard/");

  // Unauthenticated access to protected routes - redirect to login
  if ((isAdminRoute || isUserRoute) && !token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", `${pathname}${search}`);
    return Response.redirect(loginUrl);
  }

  // Role guard: only ADMIN may access /admin routes
  if (isAdminRoute && token?.role !== "ADMIN") {
    return Response.redirect(new URL("/", request.url));
  }

  // Role guard: only non-ADMIN may access /dashboard routes
  if (isUserRoute && token?.role === "ADMIN") {
    return Response.redirect(new URL("/admin", request.url));
  }

  // Auth pages should not be shown to logged-in users — redirect by role
  if (token && AUTH_PATHS.has(pathname)) {
    const callbackUrl = safeCallback(request);
    const destination =
      callbackUrl || (token.role === "ADMIN" ? "/admin" : "/dashboard");
    return Response.redirect(new URL(destination, request.url));
  }
}
