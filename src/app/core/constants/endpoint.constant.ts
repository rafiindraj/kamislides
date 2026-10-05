/**
 * Centralized API endpoint configuration for presentation exports & backend services.
 * Compatible with the Kamitech backend PDF renderer architecture.
 */
const BASE_URL = 'http://localhost:3000';

export const API_ENDPOINTS = {
  pdf: {
    export: `${BASE_URL}/pdf/export`,
  },
} as const;
