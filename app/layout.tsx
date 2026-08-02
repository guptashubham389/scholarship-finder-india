import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "./ConvexClientProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://scholarships-india.vercel.app"),
  title: "Scholarship Finder India — find what you already qualify for",
  description:
    "Answer five questions and find out how much scholarship money you qualify for, and which deadline closes first.",
  openGraph: {
    title: "You could already qualify for thousands in scholarships",
    description:
      "Five questions. Find out what you qualify for and which deadline closes first. Free, no account.",
    url: "https://scholarships-india.vercel.app",
    siteName: "Scholarship Finder India",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "You could already qualify for thousands in scholarships",
    description:
      "Five questions. Find out what you qualify for and which deadline closes first.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ConvexClientProvider>{children}</ConvexClientProvider>
      </body>
    </html>
  );
}
