import type { Metadata, Viewport } from "next";
import { DM_Sans, Host_Grotesk } from "next/font/google";
import { ContinuousCornerNoScript } from "@/components/ContinuousCorner";
import { Onboarding } from "@/components/Onboarding";
import "./globals.css";

const hostGrotesk = Host_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-host-grotesk",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
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
    <html lang="en" className={`${hostGrotesk.variable} ${dmSans.variable}`}>
      <body>
        <ContinuousCornerNoScript />
        <Onboarding />
        {children}
      </body>
    </html>
  );
}
