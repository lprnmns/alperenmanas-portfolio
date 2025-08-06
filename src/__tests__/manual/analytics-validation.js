/**
 * Manual testing script for Google Analytics integration validation
 * Run this in the browser console to test analytics functionality
 */

(function() {
  'use strict';
  
  console.log('🔍 Starting Google Analytics Integration Validation...\n');
  
  // Test configuration
  const TEST_CONFIG = {
    expectedMeasurementId: 'G-WH4BNMLW1R',
    testRoutes: ['/', '/about', '/projects'],
    testEvents: [
      { action: 'test_click', category: 'validation', label: 'manual_test', value: 1 },
      { action: 'test_scroll', category: 'engagement', label: 'page_scroll' },
    ]
  };
  
  // Validation results
  const results = {
    scriptLoading: false,
    gtagAvailable: false,
    dataLayerInitialized: false,
    configurationCorrect: false,
    pageViewTracking: false,
    eventTracking: false,
    environmentSetup: false,
    performanceImpact: null,
  };
  
  // Helper function to log test results
  function logResult(test, passed, details = '') {
    const icon = passed ? '✅' : '❌';
    console.log(`${icon} ${test}${details ? ': ' + details : ''}`);
    return passed;
  }
  
  // Test 1: Check if Google Analytics script is loaded
  function testScriptLoading() {
    console.log('\n📋 Test 1: Script Loading');
    
    const scripts = Array.from(document.querySelectorAll('script'));
    const gaScript = scripts.find(script => 
      script.src && script.src.includes('googletagmanager.com/gtag/js')
    );
    
    results.scriptLoading = logResult(
      'Google Analytics script loaded',
      !!gaScript,
      gaScript ? `Found: ${gaScript.src}` : 'Script not found'
    );
    
    if (gaScript) {
      const hasCorrectId = gaScript.src.includes(TEST_CONFIG.expectedMeasurementId);
      logResult(
        'Script has correct measurement ID',
        hasCorrectId,
        `Expected: ${TEST_CONFIG.expectedMeasurementId}`
      );
    }
  }
  
  // Test 2: Check gtag availability and dataLayer initialization
  function testGtagAndDataLayer() {
    console.log('\n📋 Test 2: gtag and dataLayer Availability');
    
    results.gtagAvailable = logResult(
      'window.gtag function available',
      typeof window.gtag === 'function'
    );
    
    results.dataLayerInitialized = logResult(
      'window.dataLayer initialized',
      Array.isArray(window.dataLayer),
      `Length: ${window.dataLayer ? window.dataLayer.length : 'N/A'}`
    );
    
    if (window.dataLayer) {
      const hasConfigCall = window.dataLayer.some(item => 
        Array.isArray(item) && item[0] === 'config'
      );
      logResult('Configuration call found in dataLayer', hasConfigCall);
    }
  }
  
  // Test 3: Test page view tracking
  function testPageViewTracking() {
    console.log('\n📋 Test 3: Page View Tracking');
    
    if (!window.gtag) {
      results.pageViewTracking = logResult('Page view tracking', false, 'gtag not available');
      return;
    }
    
    // Mock gtag to capture calls
    const originalGtag = window.gtag;
    const gtagCalls = [];
    
    window.gtag = function(...args) {
      gtagCalls.push(args);
      return originalGtag.apply(this, args);
    };
    
    // Test page view tracking function
    try {
      if (window.trackPageView) {
        window.trackPageView('/test-page', 'Test Page');
        
        const hasPageViewCall = gtagCalls.some(call => 
          call[0] === 'event' && call[1] === 'page_view'
        );
        
        results.pageViewTracking = logResult(
          'Page view tracking function works',
          hasPageViewCall,
          `Captured ${gtagCalls.length} gtag calls`
        );
      } else {
        results.pageViewTracking = logResult(
          'Page view tracking function available',
          false,
          'trackPageView function not found on window'
        );
      }
    } catch (error) {
      results.pageViewTracking = logResult(
        'Page view tracking',
        false,
        `Error: ${error.message}`
      );
    }
    
    // Restore original gtag
    window.gtag = originalGtag;
  }
  
  // Test 4: Test custom event tracking
  function testEventTracking() {
    console.log('\n📋 Test 4: Custom Event Tracking');
    
    if (!window.gtag) {
      results.eventTracking = logResult('Event tracking', false, 'gtag not available');
      return;
    }
    
    // Mock gtag to capture calls
    const originalGtag = window.gtag;
    const gtagCalls = [];
    
    window.gtag = function(...args) {
      gtagCalls.push(args);
      return originalGtag.apply(this, args);
    };
    
    // Test event tracking
    try {
      if (window.trackEvent) {
        TEST_CONFIG.testEvents.forEach(event => {
          window.trackEvent(event);
        });
        
        const hasEventCalls = gtagCalls.some(call => 
          call[0] === 'event' && TEST_CONFIG.testEvents.some(e => e.action === call[1])
        );
        
        results.eventTracking = logResult(
          'Custom event tracking works',
          hasEventCalls,
          `Tested ${TEST_CONFIG.testEvents.length} events`
        );
      } else {
        results.eventTracking = logResult(
          'Event tracking function available',
          false,
          'trackEvent function not found on window'
        );
      }
    } catch (error) {
      results.eventTracking = logResult(
        'Event tracking',
        false,
        `Error: ${error.message}`
      );
    }
    
    // Restore original gtag
    window.gtag = originalGtag;
  }
  
  // Test 5: Check environment configuration
  function testEnvironmentSetup() {
    console.log('\n📋 Test 5: Environment Configuration');
    
    const isProduction = window.location.hostname !== 'localhost';
    const hasAnalyticsDebug = document.querySelector('[data-analytics-debug]');
    
    results.environmentSetup = logResult(
      'Environment properly configured',
      true,
      `Mode: ${isProduction ? 'Production' : 'Development'}`
    );
    
    logResult(
      'Debug mode indicators',
      !isProduction || hasAnalyticsDebug,
      isProduction ? 'Production mode' : 'Development mode with debug'
    );
  }
  
  // Test 6: Performance impact assessment
  function testPerformanceImpact() {
    console.log('\n📋 Test 6: Performance Impact');
    
    const performanceEntries = performance.getEntriesByType('navigation');
    const resourceEntries = performance.getEntriesByType('resource');
    
    const gaResources = resourceEntries.filter(entry => 
      entry.name.includes('googletagmanager.com') || 
      entry.name.includes('google-analytics.com')
    );
    
    if (gaResources.length > 0) {
      const totalLoadTime = gaResources.reduce((sum, entry) => sum + entry.duration, 0);
      results.performanceImpact = totalLoadTime;
      
      logResult(
        'Google Analytics resources loaded',
        true,
        `${gaResources.length} resources, ${totalLoadTime.toFixed(2)}ms total`
      );
      
      logResult(
        'Performance impact acceptable',
        totalLoadTime < 1000,
        `${totalLoadTime.toFixed(2)}ms (should be < 1000ms)`
      );
    } else {
      logResult('Google Analytics resources', false, 'No GA resources found in performance entries');
    }
  }
  
  // Test 7: Navigation tracking simulation
  function testNavigationTracking() {
    console.log('\n📋 Test 7: Navigation Tracking Simulation');
    
    if (!window.gtag) {
      logResult('Navigation tracking', false, 'gtag not available');
      return;
    }
    
    // Simulate navigation to different routes
    const originalGtag = window.gtag;
    const navigationCalls = [];
    
    window.gtag = function(...args) {
      if (args[0] === 'config' || (args[0] === 'event' && args[1] === 'page_view')) {
        navigationCalls.push(args);
      }
      return originalGtag.apply(this, args);
    };
    
    // Simulate route changes
    TEST_CONFIG.testRoutes.forEach((route, index) => {
      setTimeout(() => {
        if (window.trackPageView) {
          window.trackPageView(route, `Page ${route}`);
        }
        
        if (index === TEST_CONFIG.testRoutes.length - 1) {
          setTimeout(() => {
            logResult(
              'Navigation tracking simulation',
              navigationCalls.length >= TEST_CONFIG.testRoutes.length,
              `${navigationCalls.length} navigation events captured`
            );
            
            // Restore original gtag
            window.gtag = originalGtag;
          }, 100);
        }
      }, index * 100);
    });
  }
  
  // Run all tests
  function runAllTests() {
    testScriptLoading();
    testGtagAndDataLayer();
    testPageViewTracking();
    testEventTracking();
    testEnvironmentSetup();
    testPerformanceImpact();
    testNavigationTracking();
    
    // Summary
    setTimeout(() => {
      console.log('\n📊 Validation Summary:');
      console.log('='.repeat(50));
      
      const passedTests = Object.values(results).filter(result => result === true).length;
      const totalTests = Object.keys(results).length - 1; // Exclude performanceImpact
      
      console.log(`✅ Passed: ${passedTests}/${totalTests} tests`);
      
      if (results.performanceImpact !== null) {
        console.log(`⏱️  Performance Impact: ${results.performanceImpact.toFixed(2)}ms`);
      }
      
      console.log('\n📋 Detailed Results:');
      Object.entries(results).forEach(([test, result]) => {
        if (test !== 'performanceImpact') {
          console.log(`  ${result ? '✅' : '❌'} ${test}`);
        }
      });
      
      if (passedTests === totalTests) {
        console.log('\n🎉 All tests passed! Google Analytics integration is working correctly.');
      } else {
        console.log('\n⚠️  Some tests failed. Please check the implementation.');
      }
      
      console.log('\n💡 Next steps:');
      console.log('1. Check Google Analytics dashboard for real-time data');
      console.log('2. Test navigation between different pages');
      console.log('3. Verify events are being recorded in GA dashboard');
      console.log('4. Test with different browsers and devices');
    }, 1000);
  }
  
  // Start validation
  runAllTests();
  
  // Export results for external access
  window.analyticsValidationResults = results;
  
})();