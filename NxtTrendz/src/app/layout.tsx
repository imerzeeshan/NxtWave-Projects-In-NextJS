import type { Metadata } from "next";
import { Geist,  } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { AppProvider } from "./context/AppContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Trendz",
  description:
    "Fashion is part of the daily air and it does not quite help that it changes all the time.",
  keywords: [
    "imerzeeshan",
    "iamerzeeshan",
    "Zeeshan",
    "shan",
    "nxttrendz",
    "nxt",
    "trendz",
    "shan",
    "shanshopify",
  ],
  icons: {
    icon: "/favicon.png",
  },
  metadataBase: new URL("https://shanshopify.vercel.app/"),
  openGraph: {
    type: "website",
    title: "Nxt Trendx",
    description:
      "Fashion is part of the daily air and it does not quite help that it changes all the time.",
    images: [
      {
        url: "/loginImage.png", // relative path
        width: 1200,
        height: 630,
        alt: "Descriptive alt text",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Page Title",
    description: "A concise description for Twitter cards.",
    images: ["https://imerzeeshan.com/twitter-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} antialiased`}
      >
        <AppProvider>
          <Navbar />
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
