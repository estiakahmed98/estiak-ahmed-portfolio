import type { Metadata } from "next";
import "./globals.css";
import dynamic from "next/dynamic";
import Providers from "@/components/providers";

export const metadata: Metadata = {
  title: "Estiak Ahmed",
  description: "Software Engineer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
