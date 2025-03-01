import type { Metadata } from "next";
import "./globals.css";
import dynamic from "next/dynamic";

const SplashCursor = dynamic(() => import("@/components/ui/SplashCursor"), {
  ssr: false,
});

export const metadata: Metadata = {
  title: "Estiak Ahmed",
  description: "Jr. Software Engineer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
      <SplashCursor />
    </html>
  );
}
