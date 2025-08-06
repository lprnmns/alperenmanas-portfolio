/**
 * Configuration utilities for the application
 */

export interface AnalyticsConfig {
  measurementId: string;
  enabled: boolean;
  debug?: boolean;
}

/**
 * Validates if a Google Analytics measurement ID has the correct format
 * @param measurementId - The measurement ID to validate
 * @returns boolean indicating if the ID is valid
 */
export function isValidMeasurementId(measurementId: string): boolean {
  // GA4 measurement IDs follow the pattern G-XXXXXXXXXX
  const ga4Pattern = /^G-[A-Z0-9]{10}$/;
  return ga4Pattern.test(measurementId);
}

/**
 * Gets the Google Analytics configuration with validation and fallback handling
 * @returns AnalyticsConfig object with measurement ID and enabled status
 */
export function getAnalyticsConfig(): AnalyticsConfig {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  
  // Check if measurement ID is provided
  if (!measurementId) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('Google Analytics: NEXT_PUBLIC_GA_MEASUREMENT_ID environment variable is not set');
    }
    return {
      measurementId: '',
      enabled: false,
      debug: process.env.NODE_ENV === 'development'
    };
  }

  // Validate measurement ID format
  if (!isValidMeasurementId(measurementId)) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`Google Analytics: Invalid measurement ID format: ${measurementId}. Expected format: G-XXXXXXXXXX`);
    }
    return {
      measurementId: '',
      enabled: false,
      debug: process.env.NODE_ENV === 'development'
    };
  }

  // Return valid configuration
  return {
    measurementId,
    enabled: true,
    debug: process.env.NODE_ENV === 'development'
  };
}

/**
 * Checks if Google Analytics should be enabled
 * @returns boolean indicating if analytics should be active
 */
export function isAnalyticsEnabled(): boolean {
  const config = getAnalyticsConfig();
  return config.enabled;
}