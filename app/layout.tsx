import type { Metadata } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const display = Inter_Tight({
  variable: "--font-display-face",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const body = Inter({
  variable: "--font-body-face",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Synce - Every PDF, on every device",
  description:
    "Synce keeps your PDFs in step across Android and Windows. Save once, read anywhere, stay offline ready.",
  icons: {
    icon: [{ url: "/app-icon.png", type: "image/png", sizes: "512x512" }],
    apple: "/app-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
      <Analytics />
    </html>
  );
}
