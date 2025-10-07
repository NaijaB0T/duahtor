import { defineMiddleware } from 'astro/middleware';

export const onRequest = defineMiddleware(async (context, next) => {
  const { url, request } = context;
  
  // Check if this is an admin route
  if (url.pathname.startsWith('/admin')) {
    // Check for Cloudflare Access authentication
    const cfAccessJwt = request.headers.get('cf-access-jwt-assertion');
    const cfAccessUser = request.headers.get('cf-access-authenticated-user-email');
    
    // If Cloudflare Access is configured and user is authenticated
    if (cfAccessJwt && cfAccessUser) {
      // User is authenticated via Cloudflare Access
      return next();
    }
    
    // Check for development/fallback authentication
    const authHeader = request.headers.get('authorization');
    const isDevelopment = import.meta.env.DEV;
    
    // In development, allow access with basic auth or bypass entirely
    if (isDevelopment) {
      console.log('Development mode - allowing admin access');
      return next();
    }
    
    // Check for basic auth as fallback
    if (authHeader && authHeader.startsWith('Basic ')) {
      const credentials = atob(authHeader.slice(6));
      const [username, password] = credentials.split(':');
      
      // You can set these as environment variables in Cloudflare Workers
      const validUsername = context.locals.runtime?.env?.ADMIN_USERNAME || 'admin';
      const validPassword = context.locals.runtime?.env?.ADMIN_PASSWORD || 'your-secure-password';
      
      if (username === validUsername && password === validPassword) {
        return next();
      }
    }
    
    // Return 401 Unauthorized with WWW-Authenticate header
    return new Response(
      JSON.stringify({
        error: 'Unauthorized access to admin area',
        message: 'This area is restricted to authenticated administrators only.',
        hint: 'Please contact the site administrator for access.'
      }),
      {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
          'WWW-Authenticate': 'Basic realm="Admin Area"'
        }
      }
    );
  }
  
  // For non-admin routes, proceed normally
  return next();
});