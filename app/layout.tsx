import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { LanguageProvider } from "@/lib/LanguageContext";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
        className={`${inter.variable} ${plusJakarta.variable} ${geistMono.variable} antialiased font-sans`}
      >
        {/* Two-point studio ambient light — subconscious depth, never obvious */}
        <div
          aria-hidden="true"
          style={{
            position: "fixed",
            inset: 0,
            pointerEvents: "none",
            zIndex: 0,
            backgroundImage: [
              "radial-gradient(ellipse 90% 55% at 12% 8%, rgba(0,217,255,0.016) 0%, transparent 60%)",
              "radial-gradient(ellipse 70% 45% at 88% 92%, rgba(0,217,255,0.012) 0%, transparent 55%)",
              "radial-gradient(ellipse 50% 30% at 50% 50%, rgba(255,255,255,0.004) 0%, transparent 60%)",
            ].join(","),
          }}
        />

        <LanguageProvider>
          {children}
          <Toaster />
        </LanguageProvider>

        {/* Film grain — premium material texture, visible only subconsciously */}
        <div
          aria-hidden="true"
          style={{
            position: "fixed",
            inset: 0,
            pointerEvents: "none",
            zIndex: 9999,
            opacity: 0.040,
            mixBlendMode: "overlay" as const,
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
      </body>
    </html>
  );
}
