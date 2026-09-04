import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ContinuousCornerNoScript } from "@/components/ContinuousCorner";
import { Onboarding } from "@/components/Onboarding";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "OCAT Robotics",
    template: "%s | OCAT Robotics",
  },
  description:
    "OCAT Robotics builds animatronic robotic systems for immersive animal-care, research, and entertainment environments.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fafafa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <ContinuousCornerNoScript />
        <Onboarding />
        {children}
      </body>
    </html>
  );
}
