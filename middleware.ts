export { auth as middleware } from "@/auth"

export const config = {
  // Protect /generating and /preview routes
  // Also common Next.js internal routes
  matcher: ["/generating/:path*", "/preview/:path*"],
}
