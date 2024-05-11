import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MapContextProvider } from "@/context/mapContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EPYC Map",
  description: "EPYC assignment - global interconnected map",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MapContextProvider>{children}</MapContextProvider>
      </body>
    </html>
  );
}
