import type { Metadata } from "next";
import { Source_Serif_4, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const source = Source_Serif_4({ subsets: ['latin'], variable: '--font-serif', display: 'swap' });
const jetBrainsMono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono', display: 'swap' });

// Link previews resolve their image against this, so it must be the real
// origin. Overridable for preview deploys.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://dgrco.dev";

const description =
  "Software engineer. I build backends in Go and C, and write about how the things I make actually work.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Dante Grieco",
    template: "%s / Dante Grieco",
  },
  description,
  openGraph: {
    type: "website",
    siteName: "Dante Grieco",
    title: "Dante Grieco",
    description,
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "Dante Grieco",
    description,
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
      className={cn("h-full", "antialiased", source.variable, jetBrainsMono.variable)}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col overflow-x-hidden">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
