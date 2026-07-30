import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Fraunces,
  Source_Sans_3,
} from "next/font/google";
import { AppProviders } from "@/presentation/providers/AppProviders";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const body = Source_Sans_3({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Angel Starch & Food Inc. | Clean-Label Ingredients for US Brands",
  description:
    "Clean-label texture and stability solutions that help US food brands launch better products—faster.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${cormorant.variable} ${body.variable} h-full`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <meta
          name="format-detection"
          content="telephone=no, date=no, email=no, address=no"
        />
      </head>
      {/* suppressHydrationWarning: browser extensions (e.g. Grammarly) inject body attrs */}
      <body
        className="min-h-full flex flex-col antialiased"
        suppressHydrationWarning
      >
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
