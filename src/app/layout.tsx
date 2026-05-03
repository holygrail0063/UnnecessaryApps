import type { Metadata } from "next";
import { Fredoka, Nunito } from "next/font/google";
import "./globals.css";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default:
      "UnnecessaryApps — The cartoon shop for beautifully useless mini apps.",
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
      className={`${fredoka.variable} ${nunito.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg-main font-sans text-text-main">
        {children}
      </body>
    </html>
  );
}
