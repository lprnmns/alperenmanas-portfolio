// Mock environment variables
const mockEnv = (env: Record<string, string>) => {
  const originalEnv = process.env;
  process.env = { ...originalEnv, ...env };
  return () => {
    process.env = originalEnv;
  };
};

// Mock console.log for debug testing
const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation(() => {});

describe('Vercel Analytics Utilities', () => {
  beforeEach(() => {
    mockConsoleLog.mockClear();
    jest.resetModules();
  });

  afterAll(() => {
    mockConsoleLog.mockRestore();
  });

  describe('shouldLoadVercelAnalytics', () => {
    it('should return true in production environment', async () => {
      const restoreEnv = mockEnv({ NODE_ENV: 'production' });
      
      const { shouldLoadVercelAnalytics } = await import('../analytics');
      
      expect(shouldLoadVercelAnalytics()).toBe(true);
      restoreEnv();
    });

    it('should return true in development when analytics debug is not explicitly disabled', async () => {
      const restoreEnv = mockEnv({ 
        NODE_ENV: 'development',
        NEXT_PUBLIC_ANALYTICS_DEBUG: 'true'
      });
      
      const { shouldLoadVercelAnalytics } = await import('../analytics');
      
      expect(shouldLoadVercelAnalytics()).toBe(true);
      restoreEnv();
    });

    it('should return false in development when analytics debug is explicitly disabled', async () => {
      const restoreEnv = mockEnv({ 
        NODE_ENV: 'development',
        NEXT_PUBLIC_ANALYTICS_DEBUG: 'false'
      });
      
      const { shouldLoadVercelAnalytics } = await import('../analytics');
      
      expect(shouldLoadVercelAnalytics()).toBe(false);
      restoreEnv();
    });

    it('should return false in test environment', async () => {
      const restoreEnv = mockEnv({ NODE_ENV: 'test' });
      
      const { shouldLoadVercelAnalytics } = await import('../analytics');
      
      expect(shouldLoadVercelAnalytics()).toBe(false);
      restoreEnv();
    });
  });

  describe('isVercelAnalyticsEnabled', () => {
    it('should return false in development when analytics debug is explicitly disabled', async () => {
      const restoreEnv = mockEnv({ 
        NODE_ENV: 'development',
        NEXT_PUBLIC_ANALYTICS_DEBUG: 'false'
      });
      
      const { isVercelAnalyticsEnabled } = await import('../analytics');
      
      expect(isVercelAnalyticsEnabled()).toBe(false);
      restoreEnv();
    });

    it('should return true in production environment', async () => {
      const restoreEnv = mockEnv({ NODE_ENV: 'production' });
      
      const { isVercelAnalyticsEnabled } = await import('../analytics');
      
      expect(isVercelAnalyticsEnabled()).toBe(true);
      restoreEnv();
    });

    it('should return true in development when analytics debug is enabled', async () => {
      const restoreEnv = mockEnv({ 
        NODE_ENV: 'development',
        NEXT_PUBLIC_ANALYTICS_DEBUG: 'true'
      });
      
      const { isVercelAnalyticsEnabled } = await import('../analytics');
      
      expect(isVercelAnalyticsEnabled()).toBe(true);
      restoreEnv();
    });
  });

  describe('getVercelAnalyticsConfig', () => {
    it('should return correct config in production', async () => {
      const restoreEnv = mockEnv({ 
        NODE_ENV: 'production',
        NEXT_PUBLIC_ANALYTICS_DEBUG: 'false'
      });
      
      const { getVercelAnalyticsConfig } = await import('../analytics');
      
      const config = getVercelAnalyticsConfig();
      expect(config).toEqual({
        enabled: true,
        debug: false,
      });
      restoreEnv();
    });

    it('should return correct config in development with debug enabled', async () => {
      const restoreEnv = mockEnv({ 
        NODE_ENV: 'development',
        NEXT_PUBLIC_ANALYTICS_DEBUG: 'true'
      });
      
      const { getVercelAnalyticsConfig } = await import('../analytics');
      
      const config = getVercelAnalyticsConfig();
      expect(config).toEqual({
        enabled: true,
        debug: true,
      });
      restoreEnv();
    });

    it('should return disabled config when analytics debug is false', async () => {
      const restoreEnv = mockEnv({ 
        NODE_ENV: 'production',
        NEXT_PUBLIC_ANALYTICS_DEBUG: 'false'
      });
      
      const { getVercelAnalyticsConfig } = await import('../analytics');
      
      const config = getVercelAnalyticsConfig();
      expect(config).toEqual({
        enabled: true,
        debug: false,
      });
      restoreEnv();
    });
  });

  describe('getAnalyticsConfig', () => {
    it('should return combined config for both analytics providers', async () => {
      const restoreEnv = mockEnv({ 
        NODE_ENV: 'production',
        NEXT_PUBLIC_GA_MEASUREMENT_ID: 'G-TEST123',
        NEXT_PUBLIC_ANALYTICS_DEBUG: 'false'
      });
      
      const { getAnalyticsConfig } = await import('../analytics');
      
      const config = getAnalyticsConfig();
      expect(config).toHaveProperty('googleAnalytics');
      expect(config).toHaveProperty('vercelAnalytics');
      expect(config.googleAnalytics).toHaveProperty('enabled');
      expect(config.googleAnalytics).toHaveProperty('measurementId');
      expect(config.vercelAnalytics).toHaveProperty('enabled');
      expect(config.vercelAnalytics).toHaveProperty('debug');
      restoreEnv();
    });
  });

  describe('debugLogVercel', () => {
    it('should log debug messages when ANALYTICS_DEBUG is true', async () => {
      const restoreEnv = mockEnv({ 
        NODE_ENV: 'development',
        NEXT_PUBLIC_ANALYTICS_DEBUG: 'true'
      });
      
      const { debugLogVercel } = await import('../analytics');
      
      debugLogVercel('Test message', { test: 'data' });
      
      expect(mockConsoleLog).toHaveBeenCalledWith(
        '[Vercel Analytics Debug] Test message',
        { test: 'data' }
      );
      restoreEnv();
    });

    it('should not log debug messages when ANALYTICS_DEBUG is false', async () => {
      const restoreEnv = mockEnv({ 
        NODE_ENV: 'production',
        NEXT_PUBLIC_ANALYTICS_DEBUG: 'false'
      });
      
      const { debugLogVercel } = await import('../analytics');
      
      debugLogVercel('Test message', { test: 'data' });
      
      expect(mockConsoleLog).not.toHaveBeenCalled();
      restoreEnv();
    });

    it('should handle messages without data parameter', async () => {
      const restoreEnv = mockEnv({ 
        NODE_ENV: 'development',
        NEXT_PUBLIC_ANALYTICS_DEBUG: 'true'
      });
      
      const { debugLogVercel } = await import('../analytics');
      
      debugLogVercel('Test message without data');
      
      expect(mockConsoleLog).toHaveBeenCalledWith(
        '[Vercel Analytics Debug] Test message without data',
        ''
      );
      restoreEnv();
    });
  });
});