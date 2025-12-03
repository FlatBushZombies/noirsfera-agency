import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { LanguageProvider } from "@/lib/LanguageContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter', 
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "noirsfera",
  description: "Modernising businesses through futuristic software",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-guminert `}
      >
        <LanguageProvider>
          {children}
          <Toaster />
        </LanguageProvider>
      </body>
    </html>
  );
}
