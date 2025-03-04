import { Toaster } from "react-hot-toast";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "MeetSync",
  description:
    "Find the best place to meetup based on commute times and location preferences!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
