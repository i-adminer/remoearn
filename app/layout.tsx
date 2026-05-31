import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { ThemeProvider } from "@/components/site/theme-provider";

export const metadata: Metadata = {
  title: {
    default: "RemoEarn",
    template: "%s | RemoEarn",
  },
  description:
    "RemoEarn helps people worldwide discover remote jobs, digital guides, and secure proxy solutions.",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full antialiased">
      <body className="min-h-screen bg-background text-foreground">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
