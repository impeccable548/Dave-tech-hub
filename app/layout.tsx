import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dave Tech Hub — Premium Gadgets & Tech Solutions",
  description: "Nigeria's finest destination for authentic gadgets, accessories, and premium tech solutions. CEO: Obinna David.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}