// Google Analytics utility functions
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';

// Environment configuration
export const IS_PRODUCTION = process.env.NODE_ENV === 'production';
export const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';
export const ANALYTICS_DEBUG = process.env.NEXT_PUBLIC_ANALYTICS_DEBUG === 'true' || IS_DEVELOPMENT;

// TypeScript interfaces for event tracking parameters
export interface PageViewEvent {
  page_title: string;
  page_location: string;
}

export interface CustomEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

// Global type declarations for gtag
export type GtagCommand = 'config' | 'event' | 'js' | 'set';
export type GtagConfigParams = {
  send_page_view?: boolean;
  custom_map?: Record<string, string>;
  page_path?: string;
  page_title?: string;
  event_category?: string;
  event_label?: string;
  value?: number;
  [key: string]: unknown;
};

declare global {
  interface Window {
    gtag: (...args: [GtagCommand, string | Date, GtagConfigParams?]) => void;
    dataLayer: unknown[];
  }
}

/**
 * Track page view for page navigation tracking
 * Works for both initial page loads and client-side navigation
 * @param url - The page URL to track
 * @param title - The page title to track
 */
export const trackPageView = (url: string, title: string): void => {
  if (!isAnalyticsEnabled()) {
    debugLog('Page view tracking skipped - analytics not enabled', { url, title });
    return;
  }

  if (typeof window !== 'undefined' && window.gtag && GA_MEASUREMENT_ID) {
    debugLog('Tracking page view', { url, title, measurementId: GA_MEASUREMENT_ID });
    
    // Send page view event to Google Analytics
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
      page_title: title,
    });
    
    // Also send as a page_view event for better tracking
    window.gtag('event', 'page_view', {
      page_title: title,
      page_location: window.location.origin + url,
    });
    
    debugLog('Page view tracked successfully');
  } else {
    debugLog('Page view tracking failed - gtag not available', {
      hasWindow: typeof window !== 'undefined',
      hasGtag: !!(typeof window !== 'undefined' && window.gtag),
      hasMeasurementId: !!GA_MEASUREMENT_ID
    });
  }
};

/**
 * Track custom events
 * @param event - The custom event object with action, category, label, and value
 */
export const trackEvent = (event: CustomEvent): void => {
  if (!isAnalyticsEnabled()) {
    debugLog('Event tracking skipped - analytics not enabled', event);
    return;
  }

  if (typeof window !== 'undefined' && window.gtag && GA_MEASUREMENT_ID) {
    debugLog('Tracking custom event', event);
    
    window.gtag('event', event.action, {
      event_category: event.category,
      event_label: event.label,
      value: event.value,
    });
    
    debugLog('Custom event tracked successfully');
  } else {
    debugLog('Event tracking failed - gtag not available', {
      event,
      hasWindow: typeof window !== 'undefined',
      hasGtag: !!(typeof window !== 'undefined' && window.gtag),
      hasMeasurementId: !!GA_MEASUREMENT_ID
    });
  }
};

/**
 * Check if analytics should be active
 * @returns boolean indicating if analytics is enabled and available
 */
export const isAnalyticsEnabled = (): boolean => {
  // In development, analytics can be disabled by setting NEXT_PUBLIC_ANALYTICS_DEBUG=false
  if (IS_DEVELOPMENT && process.env.NEXT_PUBLIC_ANALYTICS_DEBUG === 'false') {
    return false;
  }

  return (
    typeof window !== 'undefined' && 
    !!window.gtag && 
    !!GA_MEASUREMENT_ID &&
    GA_MEASUREMENT_ID.startsWith('G-')
  );
};

/**
 * Check if analytics should be loaded based on environment
 * @returns boolean indicating if analytics script should be loaded
 */
export const shouldLoadAnalytics = (): boolean => {
  // Always load in production if measurement ID is available
  if (IS_PRODUCTION) {
    return !!GA_MEASUREMENT_ID && GA_MEASUREMENT_ID.startsWith('G-');
  }

  // In development, load analytics unless explicitly disabled
  if (IS_DEVELOPMENT) {
    return (
      !!GA_MEASUREMENT_ID && 
      GA_MEASUREMENT_ID.startsWith('G-') &&
      process.env.NEXT_PUBLIC_ANALYTICS_DEBUG !== 'false'
    );
  }

  // For other environments (test, etc.), don't load analytics
  return false;
};

/**
 * Log debug information in development mode
 * @param message - Debug message to log
 * @param data - Optional data to log
 */
export const debugLog = (message: string, data?: unknown): void => {
  if (ANALYTICS_DEBUG) {
    console.log(`[Analytics Debug] ${message}`, data || '');
  }
};

/**
 * Wait for Google Analytics to be ready
 * @param timeout - Maximum time to wait in milliseconds
 * @returns Promise that resolves when gtag is available
 */
export const waitForAnalytics = (timeout = 5000): Promise<boolean> => {
  return new Promise((resolve) => {
    if (isAnalyticsEnabled()) {
      resolve(true);
      return;
    }

    const startTime = Date.now();
    const checkInterval = setInterval(() => {
      if (isAnalyticsEnabled()) {
        clearInterval(checkInterval);
        resolve(true);
      } else if (Date.now() - startTime > timeout) {
        clearInterval(checkInterval);
        resolve(false);
      }
    }, 100);
  });
};