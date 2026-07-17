import type { Metadata } from "next";
import { Source_Serif_4, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";

const source = Source_Serif_4({subsets:['latin'],variable:'--font-serif'});
const jetBrainsMono = JetBrains_Mono({subsets:['latin'],weight:['400','500'],variable:'--font-mono'});

export const metadata: Metadata = {
  title: "Dante Grieco's Portfolio",
  description: "The software development portfolio of Dante Grieco (dgrco)",
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
        </ThemeProvider>
      </body>
    </html>
  );
}
