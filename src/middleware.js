import { NextRequest, NextResponse } from "next/server";

export const middleware = async (req = NextRequest) => {
  try {
    const { pathname } = req.nextUrl;
    const token = req.cookies.get("access-token");
    const baseUrl = process.env.NEXT_PUBLIC_WEBSITE_URL;

    // TODO: refactor
    const unprotectedPaths = [
      `${baseUrl}/login`,
      `${baseUrl}/assets`,
      `${baseUrl}/favicon.ico`,
      `${baseUrl}/_next/webpack-hmr`,
    ];

    // if token exists and current page is login
    // redirect to home
    if (token && pathname?.includes("/login")) {
      return NextResponse.redirect(new URL("/roster", req.url));
    }

    // if token exists OR
    // pathname is for any assets/JS chunks/etc (starts with /_next)
    // let the request through
    if (
      token ||
      pathname?.includes("/_next") ||
      pathname?.includes("/assets")
    ) {
      return NextResponse.next();
    }

    // if token does not exist
    // redirect to login
    if (!token && !pathname?.includes("/login")) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  } catch (error) {
    console.log(error);
  }
};
