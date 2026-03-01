import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Providers } from "@shared/components/shared/providers";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "Social Media",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${roboto.className} bg-accent`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
