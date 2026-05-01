import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Unnecessary Apps — Beautifully built. Completely pointless.",
    template: "%s — Unnecessary Apps",
  },
  description:
    "A collection of tiny web apps that solve problems you definitely do not have.",
  metadataBase: new URL("https://unnecessaryapps.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#FAFAF8] text-zinc-900">
        {children}
      </body>
    </html>
  );
}
