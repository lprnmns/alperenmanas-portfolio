'use client';

import Script from 'next/script';
import { useEffect } from 'react';

// Import types and utilities from analytics
import type { GtagCommand, GtagConfigParams } from '../lib/analytics';
import { shouldLoadAnalytics, debugLog, IS_DEVELOPMENT, IS_PRODUCTION } from '../lib/analytics';

interface GoogleAnalyticsProps {
  measurementId: string;
}

export default function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  // Initialize dataLayer before script loads to prevent data loss
  useEffect(() => {
    if (typeof window !== 'undefined' && !window.dataLayer) {
      window.dataLayer = [];
      debugLog('Initialized dataLayer');
    }
    
    // Log environment information in development
    if (IS_DEVELOPMENT) {
      debugLog('Google Analytics component mounted', {
        measurementId,
        environment: process.env.NODE_ENV,
        shouldLoad: shouldLoadAnalytics(),
        isProduction: IS_PRODUCTION,
        isDevelopment: IS_DEVELOPMENT
      });
    }
  }, [measurementId]);

  // Handle script loading errors
  const handleScriptError = (error: Error) => {
    const errorMessage = 'Google Analytics script failed to load';
    console.warn(errorMessage, error);
    debugLog(errorMessage, { error: error.message, measurementId });
    // Graceful degradation - application continues to function
  };

  const handleScriptLoad = () => {
    // Initialize gtag function and Google Analytics
    if (typeof window !== 'undefined') {
      debugLog('Google Analytics script loaded successfully', { measurementId });
      
      window.gtag = function gtag(...args: [GtagCommand, string | Date, GtagConfigParams?]) {
        window.dataLayer.push(args);
        if (IS_DEVELOPMENT) {
          debugLog('gtag call', args);
        }
      };
      
      // Configure Google Analytics
      window.gtag('js', new Date());
      
      const config: GtagConfigParams = {
        // Disable automatic page view tracking - we handle it manually
        send_page_view: false,
        // Enable enhanced measurement for better tracking
        allow_enhanced_conversions: true,
      };
      
      // Add debug mode in development
      if (IS_DEVELOPMENT) {
        config.debug_mode = true;
      }
      
      window.gtag('config', measurementId, config);
      
      debugLog('Google Analytics configured', { measurementId, config });
    }
  };

  // Don't render anything if no measurement ID is provided or analytics shouldn't load
  if (!measurementId) {
    debugLog('GoogleAnalytics component not rendered - no measurement ID provided');
    return null;
  }

  if (!shouldLoadAnalytics()) {
    debugLog('GoogleAnalytics component not rendered - analytics loading disabled for current environment', {
      environment: process.env.NODE_ENV,
      measurementId,
      debugFlag: process.env.NEXT_PUBLIC_ANALYTICS_DEBUG
    });
    return null;
  }

  return (
    <>
      {/* Load Google Analytics gtag.js script */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
        onLoad={handleScriptLoad}
        onError={handleScriptError}
      />
    </>
  );
}