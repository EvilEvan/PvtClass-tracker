/**
 * API configuration utilities
 */

/**
 * Get the API base URL from environment variables with proper fallback
 * and trailing slash handling
 */
export function getApiUrl(): string {
  // Access environment variable with proper typing for Next.js
  const baseUrl = (globalThis as any).process?.env?.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';
  
  // Remove trailing slash to prevent double slashes in API endpoints
  return baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
}

/**
 * Helper function to construct full API endpoint URLs
 */
export function getApiEndpoint(endpoint: string): string {
  const baseUrl = getApiUrl();
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${baseUrl}${cleanEndpoint}`;
}