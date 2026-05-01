import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "UnnecessaryApps — Beautifully useless apps in one pastel place.",
    template: "%s — UnnecessaryApps",
  },
  description:
    "Collecting the internet’s most delightfully useless apps so you don’t have to.",
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
      className={`${plusJakarta.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ua-bg font-sans text-ua-text">
        {children}
      </body>
    </html>
  );
}
