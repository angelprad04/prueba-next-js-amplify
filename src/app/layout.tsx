import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Auth from "@/components/auth/Auth";
import NavBar from "@/components/NavBar";
import { isAuthenticated } from "@/utils/amplify-utils";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Prueba",
  description: "Probando",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NavBar isSignedIn={await isAuthenticated()} />
        <Auth>{children}</Auth> 
      </body>
    </html>
  );
}
