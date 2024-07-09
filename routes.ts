/**
 * An Array of routes that are accessible to the public
 * These routes not required authentication
 * @type {string[]}
 */
export const publicRoutes = [
  '/',
  '/faq',
  '/policy',
  '/privacy',
  '/terms',
  '/auth/new-verification',
  '/verify-employee'
]

/**
 * An Array of routes that are used for authentication
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 */
export const authRoutes = [
  '/auth/login',
  '/auth/error',
  '/auth/reset',
  '/auth/new-password'
]

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API
 * @type {string}
 */
export const apiAuthPrefix = '/api/auth'

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = '/dashboard'
