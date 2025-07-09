/**
 * API Configuration
 * Manages backend URL configuration for different environments
 */

// Get backend URL from environment variable, with fallback to localhost
// For production, this should be set to the actual backend URL
export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

/**
 * Helper function to create API endpoint URLs
 */
export const getApiUrl = (endpoint: string): string => {
  return `${BACKEND_URL}${endpoint}`;
};

/**
 * Common API endpoints
 */
export const API_ENDPOINTS = {
  CHECK_ADMIN: '/auth/check-admin',
  USERS: '/auth/users',
  CREATE_USER: '/auth/create-user',
  MASTER_UNLOCK: '/auth/master-unlock',
  DELETE_USER: (userId: string) => `/auth/users/${userId}`,
  UPDATE_USER: (userId: string) => `/auth/users/${userId}`,
} as const;