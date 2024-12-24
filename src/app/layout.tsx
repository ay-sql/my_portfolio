import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AuthProvider } from "@/components/providers/auth-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { LoadingProvider } from "@/contexts/LoadingContext";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import ConditionalLayout from "@/components/layout/conditional-layout";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Ayoub portfolio",
  description: "Professional portfolio showcasing my work and expertise",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
        <div suppressHydrationWarning>
          <AuthProvider>
            <ThemeProvider>
              <LoadingProvider>
                <ConditionalLayout>
                  {children}
                </ConditionalLayout>
                <ThemeToggle />
              </LoadingProvider>
            </ThemeProvider>
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}
