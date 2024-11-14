import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Currency Exchange 💸",
  description: "is an app that provides real-time exchange rates",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
