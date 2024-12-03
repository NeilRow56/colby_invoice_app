import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// const isProtectedRoute = createRouteMatcher(['/dashboard(.*)', '/invoices(.*)'])

const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/invoices/(.*)/payment'
])
//changed req to request for isPublicRoute, as opposed to using isProtectedRoute
export default clerkMiddleware(async (auth, request) => {
  // const { userId, redirectToSignIn } = await auth()

  // if (!userId && isProtectedRoute(req)) {
  //   // Add custom logic to run before redirecting

  //   return redirectToSignIn()
  // }
  if (!isPublicRoute(request)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)'
  ]
}
