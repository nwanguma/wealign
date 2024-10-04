import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { store } from "./store";
import { getSession } from "next-auth/react";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const isProtected = req.nextUrl.pathname.startsWith("/dashboard");

  console.log(
    "**&&'",
    await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  );

  if (isProtected && !token) {
    const url = new URL("/", req.url);

    // url.searchParams.set("action", "login");

    return NextResponse.redirect(url);
  }

  if (!isProtected && token) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard", "/dashboard/:path*"],
};
