import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import PageViewTracker from "@/components/PageViewTracker";
import { GA_MEASUREMENT_ID, shouldLoadAnalytics } from "@/lib/analytics";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Alperen Manas | Portfolio",
  description: "Alperen Manas'ın kişisel portfolyo ve proje sitesi.",
};

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
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
