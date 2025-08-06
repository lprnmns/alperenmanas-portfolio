import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import PageViewTracker from "@/components/PageViewTracker";
import { Analytics } from "@vercel/analytics/next";
import { 
  GA_MEASUREMENT_ID, 
  shouldLoadAnalytics, 
  shouldLoadVercelAnalytics,
  getVercelAnalyticsConfig,
  debugLogVercel
} from "@/lib/analytics";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Alperen Manas | Portfolio",
  description: "Alperen Manas'ın kişisel portfolyo ve proje sitesi.",
};

// Wrapper component for Vercel Analytics with environment-based configuration
function VercelAnalyticsWrapper() {
  const config = getVercelAnalyticsConfig();
  
  // Debug logging for analytics configuration
  debugLogVercel('Vercel Analytics configuration', {
    enabled: config.enabled,
    debug: config.debug,
    environment: process.env.NODE_ENV,
    analyticsDebug: process.env.NEXT_PUBLIC_ANALYTICS_DEBUG
  });

  if (!config.enabled) {
    debugLogVercel('Vercel Analytics disabled - component not rendered');
    return null;
  }

  debugLogVercel('Vercel Analytics enabled - rendering Analytics component');
  
  return <Analytics debug={config.debug} />;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-gray-900">
      <head>
        {/* Conditionally render Google Analytics based on environment and measurement ID */}
        {shouldLoadAnalytics() && (
          <GoogleAnalytics measurementId={GA_MEASUREMENT_ID} />
        )}
      </head>
      <body className={`${inter.className} antialiased text-gray-300`}>
        {/* Page view tracking for Next.js app router */}
        {shouldLoadAnalytics() && <PageViewTracker />}
        {/* Vercel Analytics component for tracking */}
        {shouldLoadVercelAnalytics() && <VercelAnalyticsWrapper />}
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
