import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";


export const metadata: Metadata = {
  title: "ScoreBoard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className='min-h-screen text-gray-800 bg-gray-50'
      >
        <Toaster position="top-center" />
        {children}
      </body>
    </html>
  );
}
