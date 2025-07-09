/**
 * API utility functions for handling backend URLs
 */

/**
 * Get the base API URL from environment variables or use relative paths as fallback
 */
export function getApiBaseUrl(): string {
  // For client-side, we'll use a more explicit approach
  if (typeof window !== 'undefined') {
    // Client-side: check for environment variable or use relative path
    const apiUrl = (globalThis as any).process?.env?.NEXT_PUBLIC_API_URL || '';
    return apiUrl;
  }
  
  // Server-side: use internal URL or fallback
  const apiUrl = (globalThis as any).process?.env?.API_URL || 
                 (globalThis as any).process?.env?.NEXT_PUBLIC_API_URL || 
                 'http://localhost:8000';
  return apiUrl;
}

/**
 * Build a full API URL for a given endpoint
 */
export function buildApiUrl(endpoint: string): string {
  const baseUrl = getApiBaseUrl();
  
  // If baseUrl is empty (relative path), just return the endpoint
  if (!baseUrl) {
    return endpoint;
  }
  
  // Ensure endpoint starts with /
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  
  // Remove trailing slash from baseUrl and combine
  return `${baseUrl.replace(/\/$/, '')}${cleanEndpoint}`;
}

/**
 * Wrapper for fetch that automatically uses the correct API URL
 */
export function apiFetch(endpoint: string, options?: RequestInit): Promise<Response> {
  const url = buildApiUrl(endpoint);
  return fetch(url, options);
}