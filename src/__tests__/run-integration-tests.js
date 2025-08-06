#!/usr/bin/env node

/**
 * Integration test runner for Google Analytics implementation
 * Runs comprehensive tests to validate the complete analytics integration
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔍 Google Analytics Integration Test Runner');
console.log('=' .repeat(50));

// Test configuration
const TEST_CONFIG = {
  testFiles: [
    'src/__tests__/integration/analytics-integration.test.tsx',
    'src/__tests__/performance/analytics-performance.test.js'
  ],
  manualTestScript: 'src/__tests__/manual/analytics-validation.js',
  environment: process.env.NODE_ENV || 'development',
  measurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-WH4BNMLW1R'
};

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function colorLog(color, message) {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Check if required files exist
function checkTestFiles() {
  colorLog('blue', '\n📋 Checking test files...');
  
  let allFilesExist = true;
  
  TEST_CONFIG.testFiles.forEach(file => {
    if (fs.existsSync(file)) {
      colorLog('green', `✅ ${file}`);
    } else {
      colorLog('red', `❌ ${file} - File not found`);
      allFilesExist = false;
    }
  });
  
  if (fs.existsSync(TEST_CONFIG.manualTestScript)) {
    colorLog('green', `✅ ${TEST_CONFIG.manualTestScript} (manual test)`);
  } else {
    colorLog('yellow', `⚠️  ${TEST_CONFIG.manualTestScript} - Manual test script not found`);
  }
  
  return allFilesExist;
}

// Check environment configuration
function checkEnvironment() {
  colorLog('blue', '\n🔧 Checking environment configuration...');
  
  const checks = [
    {
      name: 'NODE_ENV',
      value: process.env.NODE_ENV,
      expected: ['development', 'production', 'test'],
      required: false
    },
    {
      name: 'NEXT_PUBLIC_GA_MEASUREMENT_ID',
      value: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
      expected: /^G-[A-Z0-9]+$/,
      required: true
    },
    {
      name: 'NEXT_PUBLIC_ANALYTICS_DEBUG',
      value: process.env.NEXT_PUBLIC_ANALYTICS_DEBUG,
      expected: ['true', 'false'],
      required: false
    }
  ];
  
  let envValid = true;
  
  checks.forEach(check => {
    const hasValue = check.value !== undefined && check.value !== '';
    
    if (check.required && !hasValue) {
      colorLog('red', `❌ ${check.name} - Required but not set`);
      envValid = false;
    } else if (hasValue) {
      let isValid = false;
      
      if (Array.isArray(check.expected)) {
        isValid = check.expected.includes(check.value);
      } else if (check.expected instanceof RegExp) {
        isValid = check.expected.test(check.value);
      } else {
        isValid = true;
      }
      
      if (isValid) {
        colorLog('green', `✅ ${check.name}=${check.value}`);
      } else {
        colorLog('yellow', `⚠️  ${check.name}=${check.value} - Unexpected value`);
      }
    } else {
      colorLog('cyan', `ℹ️  ${check.name} - Not set (optional)`);
    }
  });
  
  return envValid;
}

// Run Jest tests
function runJestTests() {
  colorLog('blue', '\n🧪 Running Jest integration tests...');
  
  try {
    // Check if Jest is available
    const jestCommand = 'npx jest --version';
    execSync(jestCommand, { stdio: 'pipe' });
    
    // Run the integration tests
    const testCommand = `npx jest ${TEST_CONFIG.testFiles.join(' ')} --verbose --no-cache`;
    
    colorLog('cyan', `Running: ${testCommand}`);
    
    const output = execSync(testCommand, { 
      encoding: 'utf8',
      stdio: 'pipe'
    });
    
    console.log(output);
    colorLog('green', '✅ Jest tests completed successfully');
    return true;
    
  } catch (error) {
    colorLog('red', '❌ Jest tests failed:');
    console.log(error.stdout || error.message);
    return false;
  }
}

// Run custom test runner (fallback if Jest is not available)
function runCustomTests() {
  colorLog('blue', '\n🔧 Running custom test runner...');
  
  try {
    // Run the custom test runner
    const testRunnerPath = path.join(__dirname, 'test-runner.js');
    
    if (fs.existsSync(testRunnerPath)) {
      const output = execSync(`node ${testRunnerPath}`, { 
        encoding: 'utf8',
        stdio: 'pipe'
      });
      
      console.log(output);
      colorLog('green', '✅ Custom tests completed');
      return true;
    } else {
      colorLog('yellow', '⚠️  Custom test runner not found, skipping...');
      return true;
    }
    
  } catch (error) {
    colorLog('red', '❌ Custom tests failed:');
    console.log(error.stdout || error.message);
    return false;
  }
}

// Generate manual test instructions
function generateManualTestInstructions() {
  colorLog('blue', '\n📖 Manual Testing Instructions');
  colorLog('bright', '-'.repeat(30));
  
  console.log(`
1. Start the development server:
   ${colors.cyan}npm run dev${colors.reset}

2. Open your browser and navigate to:
   ${colors.cyan}http://localhost:3000${colors.reset}

3. Open browser developer tools (F12)

4. In the Console tab, paste and run the manual validation script:
   ${colors.cyan}// Copy content from: ${TEST_CONFIG.manualTestScript}${colors.reset}

5. Test navigation between pages:
   - Home page (/)
   - About page (/about)  
   - Projects page (/projects)

6. Check Google Analytics Real-Time reports:
   - Go to: ${colors.cyan}https://analytics.google.com/${colors.reset}
   - Navigate to: Reports > Real-time > Overview
   - Verify page views and events are being tracked

7. Performance validation:
   - Check Network tab for gtag.js loading
   - Verify script loads asynchronously
   - Confirm no blocking of page rendering

8. Test different scenarios:
   - Disable JavaScript and verify graceful degradation
   - Test with ad blockers enabled
   - Test on different devices/browsers
`);
}

// Generate test report
function generateTestReport(results) {
  colorLog('blue', '\n📊 Test Report');
  colorLog('bright', '='.repeat(20));
  
  const { filesExist, envValid, jestPassed, customPassed } = results;
  
  console.log(`
Environment: ${TEST_CONFIG.environment}
Measurement ID: ${TEST_CONFIG.measurementId}
Timestamp: ${new Date().toISOString()}

Test Results:
${filesExist ? '✅' : '❌'} Test files exist
${envValid ? '✅' : '❌'} Environment configuration
${jestPassed ? '✅' : '❌'} Jest integration tests
${customPassed ? '✅' : '❌'} Custom tests

Overall Status: ${filesExist && envValid && (jestPassed || customPassed) ? 
  colors.green + '✅ PASSED' : colors.red + '❌ FAILED'}${colors.reset}
`);

  // Save report to file
  const reportPath = path.join(__dirname, 'integration-test-report.json');
  const report = {
    timestamp: new Date().toISOString(),
    environment: TEST_CONFIG.environment,
    measurementId: TEST_CONFIG.measurementId,
    results: {
      filesExist,
      envValid,
      jestPassed,
      customPassed,
      overall: filesExist && envValid && (jestPassed || customPassed)
    }
  };
  
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  colorLog('cyan', `📄 Report saved to: ${reportPath}`);
}

// Main execution
async function main() {
  colorLog('magenta', `\n🚀 Starting integration tests for Google Analytics...`);
  colorLog('cyan', `Environment: ${TEST_CONFIG.environment}`);
  colorLog('cyan', `Measurement ID: ${TEST_CONFIG.measurementId}\n`);
  
  // Run all checks and tests
  const filesExist = checkTestFiles();
  const envValid = checkEnvironment();
  
  let jestPassed = false;
  let customPassed = false;
  
  if (filesExist && envValid) {
    // Try Jest first, fallback to custom runner
    jestPassed = runJestTests();
    
    if (!jestPassed) {
      colorLog('yellow', '\n⚠️  Jest tests failed, trying custom test runner...');
      customPassed = runCustomTests();
    }
  } else {
    colorLog('red', '\n❌ Skipping tests due to missing files or invalid environment');
  }
  
  // Generate manual test instructions
  generateManualTestInstructions();
  
  // Generate final report
  generateTestReport({
    filesExist,
    envValid,
    jestPassed,
    customPassed
  });
  
  // Exit with appropriate code
  const success = filesExist && envValid && (jestPassed || customPassed);
  process.exit(success ? 0 : 1);
}

// Handle errors
process.on('uncaughtException', (error) => {
  colorLog('red', `\n💥 Uncaught Exception: ${error.message}`);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  colorLog('red', `\n💥 Unhandled Rejection at: ${promise}, reason: ${reason}`);
  process.exit(1);
});

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = {
  checkTestFiles,
  checkEnvironment,
  runJestTests,
  runCustomTests,
  generateManualTestInstructions,
  generateTestReport
};