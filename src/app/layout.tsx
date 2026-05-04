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

const siteDescription =
  "Collecting the internet’s most delightfully useless apps so you don’t have to.";

export const metadata: Metadata = {
  title: {
    default:
      "UnnecessaryApps — The cartoon shop for beautifully useless mini apps.",
    template: "%s — UnnecessaryApps",
  },
  description: siteDescription,
  metadataBase: new URL("https://unnecessaryapps.com"),
  icons: {
    icon: [{ url: "/logo-icon.png", type: "image/png", sizes: "512x512" }],
    apple: "/logo-icon.png",
    shortcut: "/logo-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://unnecessaryapps.com",
    siteName: "UnnecessaryApps",
    title:
      "UnnecessaryApps — The cartoon shop for beautifully useless mini apps.",
    description: siteDescription,
    images: [
      {
        url: "/logo-wide.png",
        width: 400,
        height: 96,
        alt: "Unnecessary Apps logo",
        type: "image/png",
      },
      {
        url: "/logo-icon.png",
        width: 512,
        height: 512,
        alt: "Unnecessary Apps logo",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "UnnecessaryApps",
    description: siteDescription,
    images: ["/logo-icon.png"],
  },
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
