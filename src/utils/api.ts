/**
 * API utility functions and helpers
 * 
 * Centralized functions for API interactions, error handling, and data transformation.
 */

import { ApiResponse } from "@/types";

/**
 * Fetch wrapper with error handling and JSON parsing
 */
export async function apiRequest<T>(
  url: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      ...options,
    });

    const data = (await response.json()) as ApiResponse<T>;

    if (!response.ok) {
      throw new Error(data.message || "API request failed");
    }

    return data;
  } catch (error) {
    return {
      status: "error",
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}

/**
 * GET request helper
 */
export async function apiGet<T>(url: string): Promise<ApiResponse<T>> {
  return apiRequest<T>(url, { method: "GET" });
}

/**
 * POST request helper
 */
export async function apiPost<T>(
  url: string,
  data: unknown
): Promise<ApiResponse<T>> {
  return apiRequest<T>(url, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

/**
 * PUT request helper
 */
export async function apiPut<T>(
  url: string,
  data: unknown
): Promise<ApiResponse<T>> {
  return apiRequest<T>(url, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

/**
 * DELETE request helper
 */
export async function apiDelete<T>(url: string): Promise<ApiResponse<T>> {
  return apiRequest<T>(url, { method: "DELETE" });
}
