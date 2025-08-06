/**
 * Performance testing for Google Analytics integration
 * Tests script loading performance and async behavior
 */

const { performance } = require('perf_hooks');

// Mock browser environment for Node.js testing
global.window = {
  location: { origin: 'http://localhost:3000' },
  performance: {
    now: () => performance.now(),
    getEntriesByType: () => [],
  },
  document: {
    title: 'Test Page'
  }
};

global.document = {
  title: 'Test Page'
};

// Performance test configuration
const PERFORMANCE_THRESHOLDS = {
  scriptLoadTime: 2000, // 2 seconds max
  initializationTime: 500, // 500ms max
  trackingCallTime: 100, // 100ms max
  memoryUsage: 10 * 1024 * 1024, // 10MB max
};

describe('Google Analytics Performance Tests', () => {
  let performanceMarks = [];
  let mockGtag;
  let mockDataLayer;

  beforeEach(() => {
    // Reset performance marks
    performanceMarks = [];
    
    // Mock performance.mark and performance.measure
    global.performance.mark = (name) => {
      performanceMarks.push({ name, time: performance.now() });
    };
    
    global.performance.measure = (name, startMark, endMark) => {
      const start = performanceMarks.find(m => m.name === startMark);
      const end = performanceMarks.find(m => m.name === endMark);
      if (start && end) {
        return { duration: end.time - start.time };
      }
      return { duration: 0 };
    };

    // Setup mocks
    mockGtag = jest.fn();
    mockDataLayer = [];
    
    global.window.gtag = mockGtag;
    global.window.dataLayer = mockDataLayer;
    
    // Mock environment
    process.env.NODE_ENV = 'development';
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = 'G-TEST123456';
    process.env.NEXT_PUBLIC_ANALYTICS_DEBUG = 'true';
  });

  afterEach(() => {
    delete global.window.gtag;
    delete global.window.dataLayer;
    performanceMarks = [];
  });

  describe('Script Loading Performance', () => {
    test('should load analytics script within acceptable time', async () => {
      const startTime = performance.now();
      
      // Simulate script loading
      const { shouldLoadAnalytics } = require('@/lib/analytics');
      
      expect(shouldLoadAnalytics()).toBe(true);
      
      const loadTime = performance.now() - startTime;
      
      expect(loadTime).toBeLessThan(PERFORMANCE_THRESHOLDS.scriptLoadTime);
      console.log(`✅ Script loading check completed in ${loadTime.toFixed(2)}ms`);
    });

    test('should initialize dataLayer quickly', () => {
      const startTime = performance.now();
      
      // Simulate dataLayer initialization
      if (!global.window.dataLayer) {
        global.window.dataLayer = [];
      }
      
      const initTime = performance.now() - startTime;
      
      expect(initTime).toBeLessThan(PERFORMANCE_THRESHOLDS.initializationTime);
      expect(Array.isArray(global.window.dataLayer)).toBe(true);
      
      console.log(`✅ DataLayer initialized in ${initTime.toFixed(2)}ms`);
    });

    test('should handle multiple rapid initialization calls efficiently', () => {
      const startTime = performance.now();
      const iterations = 100;
      
      for (let i = 0; i < iterations; i++) {
        if (!global.window.dataLayer) {
          global.window.dataLayer = [];
        }
      }
      
      const totalTime = performance.now() - startTime;
      const avgTime = totalTime / iterations;
      
      expect(avgTime).toBeLessThan(1); // Less than 1ms per call
      console.log(`✅ ${iterations} initialization calls completed in ${totalTime.toFixed(2)}ms (avg: ${avgTime.toFixed(2)}ms)`);
    });
  });

  describe('Tracking Performance', () => {
    beforeEach(() => {
      // Ensure gtag is available
      global.window.gtag = mockGtag;
    });

    test('should execute page view tracking quickly', async () => {
      const { trackPageView } = require('@/lib/analytics');
      
      const startTime = performance.now();
      
      trackPageView('/test-page', 'Test Page');
      
      const trackingTime = performance.now() - startTime;
      
      expect(trackingTime).toBeLessThan(PERFORMANCE_THRESHOLDS.trackingCallTime);
      expect(mockGtag).toHaveBeenCalled();
      
      console.log(`✅ Page view tracking completed in ${trackingTime.toFixed(2)}ms`);
    });

    test('should execute custom event tracking quickly', async () => {
      const { trackEvent } = require('@/lib/analytics');
      
      const startTime = performance.now();
      
      trackEvent({
        action: 'test_event',
        category: 'performance',
        label: 'speed_test',
        value: 1
      });
      
      const trackingTime = performance.now() - startTime;
      
      expect(trackingTime).toBeLessThan(PERFORMANCE_THRESHOLDS.trackingCallTime);
      expect(mockGtag).toHaveBeenCalled();
      
      console.log(`✅ Event tracking completed in ${trackingTime.toFixed(2)}ms`);
    });

    test('should handle burst of tracking calls efficiently', () => {
      const { trackPageView, trackEvent } = require('@/lib/analytics');
      
      const startTime = performance.now();
      const callCount = 50;
      
      // Simulate burst of tracking calls
      for (let i = 0; i < callCount; i++) {
        if (i % 2 === 0) {
          trackPageView(`/page-${i}`, `Page ${i}`);
        } else {
          trackEvent({
            action: `event_${i}`,
            category: 'performance',
            value: i
          });
        }
      }
      
      const totalTime = performance.now() - startTime;
      const avgTime = totalTime / callCount;
      
      expect(avgTime).toBeLessThan(10); // Less than 10ms per call
      expect(mockGtag).toHaveBeenCalledTimes(callCount * 2); // Each tracking call makes 2 gtag calls
      
      console.log(`✅ ${callCount} tracking calls completed in ${totalTime.toFixed(2)}ms (avg: ${avgTime.toFixed(2)}ms)`);
    });
  });

  describe('Async Behavior Validation', () => {
    test('should not block when gtag is not available', async () => {
      // Remove gtag to simulate script not loaded
      delete global.window.gtag;
      
      const { trackPageView, trackEvent } = require('@/lib/analytics');
      
      const startTime = performance.now();
      
      // These should not throw or block
      trackPageView('/test', 'Test');
      trackEvent({ action: 'test', category: 'test' });
      
      const executionTime = performance.now() - startTime;
      
      expect(executionTime).toBeLessThan(50); // Should be very fast when disabled
      console.log(`✅ Graceful degradation completed in ${executionTime.toFixed(2)}ms`);
    });

    test('should handle waitForAnalytics timeout efficiently', async () => {
      const { waitForAnalytics } = require('@/lib/analytics');
      
      // Remove gtag to force timeout
      delete global.window.gtag;
      
      const startTime = performance.now();
      const timeout = 100; // Short timeout for testing
      
      const result = await waitForAnalytics(timeout);
      
      const waitTime = performance.now() - startTime;
      
      expect(result).toBe(false);
      expect(waitTime).toBeGreaterThanOrEqual(timeout - 10); // Allow for small timing variations
      expect(waitTime).toBeLessThan(timeout + 50); // Should not exceed timeout significantly
      
      console.log(`✅ Analytics wait timeout handled in ${waitTime.toFixed(2)}ms`);
    });

    test('should resolve waitForAnalytics quickly when available', async () => {
      const { waitForAnalytics } = require('@/lib/analytics');
      
      const startTime = performance.now();
      
      const result = await waitForAnalytics(1000);
      
      const waitTime = performance.now() - startTime;
      
      expect(result).toBe(true);
      expect(waitTime).toBeLessThan(200); // Should resolve quickly when available
      
      console.log(`✅ Analytics availability detected in ${waitTime.toFixed(2)}ms`);
    });
  });

  describe('Memory Usage', () => {
    test('should not create memory leaks with repeated calls', () => {
      const { trackPageView, trackEvent } = require('@/lib/analytics');
      
      // Get initial memory usage (if available)
      const initialMemory = process.memoryUsage ? process.memoryUsage().heapUsed : 0;
      
      // Perform many operations
      for (let i = 0; i < 1000; i++) {
        trackPageView(`/page-${i}`, `Page ${i}`);
        trackEvent({ action: `event_${i}`, category: 'memory_test' });
      }
      
      // Force garbage collection if available
      if (global.gc) {
        global.gc();
      }
      
      const finalMemory = process.memoryUsage ? process.memoryUsage().heapUsed : 0;
      const memoryIncrease = finalMemory - initialMemory;
      
      // Memory increase should be reasonable
      expect(memoryIncrease).toBeLessThan(PERFORMANCE_THRESHOLDS.memoryUsage);
      
      console.log(`✅ Memory usage increase: ${(memoryIncrease / 1024 / 1024).toFixed(2)}MB`);
    });
  });

  describe('Configuration Performance', () => {
    test('should validate configuration quickly', () => {
      const { shouldLoadAnalytics, isAnalyticsEnabled } = require('@/lib/analytics');
      
      const startTime = performance.now();
      const iterations = 1000;
      
      for (let i = 0; i < iterations; i++) {
        shouldLoadAnalytics();
        isAnalyticsEnabled();
      }
      
      const totalTime = performance.now() - startTime;
      const avgTime = totalTime / iterations;
      
      expect(avgTime).toBeLessThan(1); // Less than 1ms per validation
      
      console.log(`✅ ${iterations} configuration validations completed in ${totalTime.toFixed(2)}ms (avg: ${avgTime.toFixed(2)}ms)`);
    });
  });
});

// Export performance test runner for manual execution
module.exports = {
  runPerformanceTests: () => {
    console.log('🚀 Running Google Analytics Performance Tests...\n');
    
    // This would typically be run with Jest, but can be adapted for manual testing
    const tests = [
      'Script Loading Performance',
      'Tracking Performance', 
      'Async Behavior Validation',
      'Memory Usage',
      'Configuration Performance'
    ];
    
    console.log('📊 Performance Test Categories:');
    tests.forEach((test, index) => {
      console.log(`  ${index + 1}. ${test}`);
    });
    
    console.log('\n💡 Run with: npm test -- --testPathPattern=analytics-performance');
  }
};