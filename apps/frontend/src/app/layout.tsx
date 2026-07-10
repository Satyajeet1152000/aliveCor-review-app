import type { Metadata } from "next";
import React from "react";

import Providers from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Review Dash",
  description: "Internal dashboard for AliveCor product reviews.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactElement {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
