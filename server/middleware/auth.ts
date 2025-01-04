import { defineEventHandler, createError } from 'h3';
import jwt from 'jsonwebtoken';

const secret = 'your_jwt_secret';

export default defineEventHandler(async (event) => {
  const protectedRoutes = ['/admin', '/api/photos']; // Add more routes if needed
  const currentRoute = event.req.url;

  if (protectedRoutes.some((route) => currentRoute?.startsWith(route))) {
    const authHeader = event.req.headers.authorization;

    if (!authHeader) {
      throw createError({ statusCode: 401, message: 'Authorization header missing' });
    }

    const token = authHeader.split(' ')[1];
    try {
      jwt.verify(token, secret); // Validate the token
    } catch {
      throw createError({ statusCode: 401, message: 'Invalid or expired token' });
    }
  }
});
