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
    default: "Noirsfera | Futuristic Software & Digital Solutions",
    template: "%s | Noirsfera",
  },

  description:
    "Noirsfera helps businesses scale with futuristic software, AI-powered systems, and high-performance digital solutions built for growth.",

  applicationName: "Noirsfera",

  keywords: [
    "Noirsfera",
    "futuristic software",
    "software development company",
    "AI-powered systems",
    "digital transformation",
    "business automation",
    "scalable web applications",
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

  alternates: {
    canonical: "https://noirsfera.com",
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://noirsfera.com",
    siteName: "Noirsfera",
    title: "Futuristic Software & Digital Solutions for Business Growth",
    description:
      "Build scalable, AI-powered software systems designed to modernise businesses and drive long-term growth.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Noirsfera – Futuristic Software Solutions",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Futuristic Software & Digital Solutions for Business Growth",
    description:
      "Scalable, AI-powered software systems built to modernise and grow businesses.",
    images: ["/logo.png"],
    creator: "@from_noirsfera",
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png", // optional
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
