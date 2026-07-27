import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Navigation from '@/app/_components/navigation/navigation';
import { ThemeProvider } from "./_hooks/theme-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Raymond Chu",
  description: "A portfolio website by Full-Stack developer Raymond Chu.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <Navigation />
          <main className="w-full flex flex-col mt-(--navbar-height) gap-2 lg:max-w-5xl lg:mx-auto">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
};
