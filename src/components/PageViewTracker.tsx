'use client';

import { Suspense } from 'react';
import { usePageTracking } from '@/hooks/usePageTracking';

/**
 * Internal component that uses the page tracking hook
 */
function PageTracker() {
  usePageTracking();
  return null;
}

/**
 * PageViewTracker component handles automatic page view tracking
 * for both initial page loads and client-side navigation in Next.js app router
 * Wrapped in Suspense to handle useSearchParams() during SSR
 */
export default function PageViewTracker() {
  return (
    <Suspense fallback={null}>
      <PageTracker />
    </Suspense>
  );
}