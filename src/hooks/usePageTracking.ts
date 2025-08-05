'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { trackPageView, waitForAnalytics } from '@/lib/analytics';

/**
 * Custom hook for handling page view tracking
 * Handles both initial page loads and client-side navigation
 */
export function usePageTracking() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const hasTrackedInitial = useRef(false);

  useEffect(() => {
    // Function to track the current page
    const trackCurrentPage = async () => {
      // Construct the full URL with search parameters
      const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '');
      
      // Get the page title from document.title or construct from pathname
      const title = document.title || `Page ${pathname}`;

      // For initial page load, wait for analytics to be ready
      if (!hasTrackedInitial.current) {
        const analyticsReady = await waitForAnalytics();
        if (analyticsReady) {
          trackPageView(url, title);
          hasTrackedInitial.current = true;
        }
      } else {
        // For subsequent navigation, track immediately if analytics is available
        trackPageView(url, title);
      }
    };

    trackCurrentPage();
  }, [pathname, searchParams]);
}