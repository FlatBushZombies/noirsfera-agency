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
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://noirsfera.com"),

  title: {
    default: "Noirsfera",
    template: "%s | Noirsfera",
  },

  description:
    "Noirsfera modernises businesses through futuristic software, scalable systems, and high-performance digital solutions.",

  applicationName: "Noirsfera",

  keywords: [
    "Noirsfera",
    "software development",
    "futuristic software",
    "modern web apps",
    "AI solutions",
    "business automation",
    "SaaS development",
  ],

  authors: [{ name: "Noirsfera" }],
  creator: "Noirsfera",
  publisher: "Noirsfera",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://noirsfera.com",
    siteName: "Noirsfera",
    title: "Noirsfera — Futuristic Software Solutions",
    description:
      "Modernising businesses through futuristic, scalable, and intelligent software systems.",
    images: [
      {
        url: "/logo.png", 
        width: 1200,
        height: 630,
        alt: "Noirsfera",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Noirsfera — Futuristic Software Solutions",
    description:
      "Modernising businesses through futuristic, scalable, and intelligent software systems.",
    images: ["/logo.png"],
    creator: "@from_noirsfera",
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png", // optional
  },

  alternates: {
    canonical: "https://noirsfera.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-guminert`}
      >
        <LanguageProvider>
          {children}
          <Toaster />
        </LanguageProvider>
      </body>
    </html>
  );
}
