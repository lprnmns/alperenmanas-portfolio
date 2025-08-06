/**
 * Integration tests for Google Analytics implementation
 * Tests complete analytics integration in development environment
 */

import { render, screen, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import PageViewTracker from '@/components/PageViewTracker';
import { 
  trackPageView, 
  trackEvent, 
  isAnalyticsEnabled, 
  shouldLoadAnalytics,
  waitForAnalytics,
  GA_MEASUREMENT_ID 
} from '@/lib/analytics';

// Mock Next.js navigation
jest.mock('next/navigation', () => ({
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
  useRouter: jest.fn(),
}));

// Mock Next.js Script component
jest.mock('next/script', () => {
  return function MockScript({ 
    src, 
    onLoad, 
    onError, 
    strategy 
  }: { 
    src: string; 
    onLoad?: () => void; 
    onError?: (error: Error) => void;
    strategy: string;
  }) {
    // Simulate script loading
    setTimeout(() => {
      if (onLoad) {
        onLoad();
      }
    }, 100);
    
    return <script data-testid="ga-script" data-src={src} data-strategy={strategy} />;
  };
});

describe('Google Analytics Integration Tests', () => {
  let mockGtag: jest.Mock;
  let mockDataLayer: any[];

  beforeEach(() => {
    // Reset environment
    process.env.NODE_ENV = 'development';
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = 'G-TEST123456';
    process.env.NEXT_PUBLIC_ANALYTICS_DEBUG = 'true';

    // Setup mock gtag and dataLayer
    mockGtag = jest.fn();
    mockDataLayer = [];
    
    Object.defineProperty(window, 'gtag', {
      value: mockGtag,
      writable: true,
    });
    
    Object.defineProperty(window, 'dataLayer', {
      value: mockDataLayer,
      writable: true,
    });

    // Clear all mocks
    jest.clearAllMocks();
  });

  afterEach(() => {
    // Clean up
    delete (window as any).gtag;
    delete (window as any).dataLayer;
  });

  describe('Complete Analytics Integration', () => {
    test('should load and initialize Google Analytics with correct measurement ID', async () => {
      const measurementId = 'G-TEST123456';
      
      render(<GoogleAnalytics measurementId={measurementId} />);
      
      // Check that script is rendered with correct src
      const script = screen.getByTestId('ga-script');
      expect(script).toHaveAttribute('data-src', `https://www.googletagmanager.com/gtag/js?id=${measurementId}`);
      expect(script).toHaveAttribute('data-strategy', 'afterInteractive');
      
      // Wait for script to load and initialize
      await waitFor(() => {
        expect(window.gtag).toBeDefined();
      });
      
      // Verify gtag configuration calls
      await waitFor(() => {
        expect(mockGtag).toHaveBeenCalledWith('js', expect.any(Date));
        expect(mockGtag).toHaveBeenCalledWith('config', measurementId, expect.objectContaining({
          send_page_view: false,
          allow_enhanced_conversions: true,
          debug_mode: true,
        }));
      });
    });

    test('should not render analytics component when measurement ID is missing', () => {
      render(<GoogleAnalytics measurementId="" />);
      
      // Should not render script when no measurement ID
      expect(screen.queryByTestId('ga-script')).not.toBeInTheDocument();
    });

    test('should handle script loading errors gracefully', async () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
      
      // Mock Script component to trigger error
      jest.doMock('next/script', () => {
        return function MockScript({ onError }: { onError?: (error: Error) => void }) {
          setTimeout(() => {
            if (onError) {
              onError(new Error('Script loading failed'));
            }
          }, 100);
          return <script data-testid="ga-script" />;
        };
      });

      const { GoogleAnalytics: ErrorGoogleAnalytics } = await import('@/components/GoogleAnalytics');
      render(<ErrorGoogleAnalytics measurementId="G-TEST123456" />);
      
      await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalledWith(
          'Google Analytics script failed to load',
          expect.any(Error)
        );
      });
      
      consoleSpy.mockRestore();
    });
  });

  describe('Page View Tracking', () => {
    beforeEach(() => {
      // Setup gtag mock for page view tests
      window.gtag = mockGtag;
      window.dataLayer = mockDataLayer;
    });

    test('should track page views with correct parameters', () => {
      const url = '/test-page';
      const title = 'Test Page';
      
      trackPageView(url, title);
      
      expect(mockGtag).toHaveBeenCalledWith('config', 'G-TEST123456', {
        page_path: url,
        page_title: title,
      });
      
      expect(mockGtag).toHaveBeenCalledWith('event', 'page_view', {
        page_title: title,
        page_location: `${window.location.origin}${url}`,
      });
    });

    test('should track custom events with correct parameters', () => {
      const event = {
        action: 'click',
        category: 'button',
        label: 'header-cta',
        value: 1,
      };
      
      trackEvent(event);
      
      expect(mockGtag).toHaveBeenCalledWith('event', 'click', {
        event_category: 'button',
        event_label: 'header-cta',
        value: 1,
      });
    });

    test('should not track when analytics is disabled', () => {
      // Disable analytics
      process.env.NEXT_PUBLIC_ANALYTICS_DEBUG = 'false';
      delete window.gtag;
      
      trackPageView('/test', 'Test');
      trackEvent({ action: 'test', category: 'test' });
      
      expect(mockGtag).not.toHaveBeenCalled();
    });
  });

  describe('Environment Configuration', () => {
    test('should load analytics in development when enabled', () => {
      process.env.NODE_ENV = 'development';
      process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = 'G-TEST123456';
      process.env.NEXT_PUBLIC_ANALYTICS_DEBUG = 'true';
      
      expect(shouldLoadAnalytics()).toBe(true);
    });

    test('should not load analytics in development when disabled', () => {
      process.env.NODE_ENV = 'development';
      process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = 'G-TEST123456';
      process.env.NEXT_PUBLIC_ANALYTICS_DEBUG = 'false';
      
      expect(shouldLoadAnalytics()).toBe(false);
    });

    test('should load analytics in production when measurement ID is available', () => {
      process.env.NODE_ENV = 'production';
      process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = 'G-TEST123456';
      
      expect(shouldLoadAnalytics()).toBe(true);
    });

    test('should not load analytics without valid measurement ID', () => {
      process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = '';
      
      expect(shouldLoadAnalytics()).toBe(false);
      
      process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = 'invalid-id';
      expect(shouldLoadAnalytics()).toBe(false);
    });
  });

  describe('Analytics Availability', () => {
    test('should detect when analytics is enabled and available', () => {
      window.gtag = mockGtag;
      process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = 'G-TEST123456';
      
      expect(isAnalyticsEnabled()).toBe(true);
    });

    test('should detect when analytics is not available', () => {
      delete window.gtag;
      
      expect(isAnalyticsEnabled()).toBe(false);
    });

    test('should wait for analytics to become available', async () => {
      // Initially not available
      delete window.gtag;
      
      // Make available after delay
      setTimeout(() => {
        window.gtag = mockGtag;
      }, 200);
      
      const result = await waitForAnalytics(1000);
      expect(result).toBe(true);
    });

    test('should timeout when analytics does not become available', async () => {
      delete window.gtag;
      
      const result = await waitForAnalytics(100);
      expect(result).toBe(false);
    });
  });

  describe('PageViewTracker Component Integration', () => {
    test('should render PageViewTracker without errors', () => {
      // Mock the hook
      jest.doMock('@/hooks/usePageTracking', () => ({
        usePageTracking: jest.fn(),
      }));
      
      expect(() => {
        render(<PageViewTracker />);
      }).not.toThrow();
    });
  });

  describe('Script Loading Performance', () => {
    test('should use afterInteractive strategy for optimal performance', () => {
      render(<GoogleAnalytics measurementId="G-TEST123456" />);
      
      const script = screen.getByTestId('ga-script');
      expect(script).toHaveAttribute('data-strategy', 'afterInteractive');
    });

    test('should initialize dataLayer before script loads', async () => {
      // Clear dataLayer
      delete (window as any).dataLayer;
      
      render(<GoogleAnalytics measurementId="G-TEST123456" />);
      
      // dataLayer should be initialized immediately
      expect(window.dataLayer).toBeDefined();
      expect(Array.isArray(window.dataLayer)).toBe(true);
    });
  });
});