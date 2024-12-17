import type { Metadata } from "next";
import "./globalIcon.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "EMM-Fort Group",
  description: "EMM-Fort Group Nigeria",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={` antialiased`}>{children}</body>
    </html>
  );
}
