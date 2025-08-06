/** @type {import('next').NextConfig} */
const nextConfig = {
  // Exclude test files from build
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
  
  // Exclude test directories from build
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'].map(ext => `!(__tests__|**/*.test|**/*.spec).${ext}`),
  
  eslint: {
    // Ignore test files during build
    ignoreDuringBuilds: false,
    dirs: ['src/app', 'src/components', 'src/lib', 'src/hooks']
  },
  
  typescript: {
    // Ignore test files during build
    ignoreBuildErrors: false,
  }
};

module.exports = nextConfig;