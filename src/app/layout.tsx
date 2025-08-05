import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Alperen Manas | Portfolio",
  description: "Alperen Manas'ın kişisel portfolyo ve proje sitesi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.Node;
}>) {
  return (
    <html lang="en" className="bg-gray-900">
      <body className={`${inter.className} antialiased text-gray-300`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
