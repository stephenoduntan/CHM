import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CHM Media & Management Suite | RCCG Court of His Majesty",
  description: "Administrative suite for managing Sermons, Events, Blogs, and Photo Gallery for RCCG Court of His Majesty.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#f8f9fa] text-[#1a1a1a]">
        {children}
      </body>
    </html>
  );
}

