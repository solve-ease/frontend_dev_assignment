import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WorkHub - Find Skilled Workers | Construction, Home Services & More",
  description:
    "Discover and hire skilled workers for all your needs. From construction to home services, find the right professional for your project. Browse carpenters, welders, electricians, plumbers and more.",
  keywords:
    "workers, services, hire, professionals, construction, home services, carpenter, welder, electrician, plumber, maintenance, cleaning",
  authors: [{ name: "WorkHub Team" }],
  creator: "WorkHub",
  publisher: "WorkHub",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://workhub-assignment.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "WorkHub - Find Skilled Workers",
    description:
      "Discover and hire skilled workers for all your needs. From construction to home services, find the right professional for your project.",
    url: "https://workhub-assignment.vercel.app",
    siteName: "WorkHub",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "WorkHub - Find Skilled Workers",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WorkHub - Find Skilled Workers",
    description:
      "Discover and hire skilled workers for all your needs. From construction to home services, find the right professional for your project.",
    images: ["/og-image.jpg"],
    creator: "@workhub",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "WorkHub",
    "url": "https://workhub-assignment.vercel.app",
    "description": "Discover and hire skilled workers for all your needs. From construction to home services, find the right professional for your project.",
    "logo": "https://workhub-assignment.vercel.app/logo.png",
    "sameAs": [
      "https://twitter.com/workhub",
      "https://facebook.com/workhub"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-555-123-4567",
      "contactType": "customer service"
    },
    "serviceType": [
      "Construction Workers",
      "Home Services",
      "Carpenters",
      "Welders",
      "Electricians",
      "Plumbers"
    ]
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js');
                });
              }
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 min-h-screen flex flex-col`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded z-50"
        >
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content" className="pt-16 flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
