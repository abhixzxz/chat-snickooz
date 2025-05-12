import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./styles/theme.css";
import { ThemeProvider } from "./providers/theme-provider";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Snickooz - Secure End-to-End Encrypted Chat",
  description:
    "Snickooz is a secure chat application featuring end-to-end encryption to protect your conversations. Connect with friends and family privately and safely.",
  keywords: ["chat app", "end-to-end encryption", "secure messaging", "Snickooz", "private chat"],
  openGraph: {
    title: "Snickooz - Secure End-to-End Encrypted Chat",
    description:
      "Join Snickooz for private, secure, and end-to-end encrypted messaging with friends and family.",
    url: "https://www.snickooz.com", 
    siteName: "Snickooz",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Snickooz - Secure End-to-End Encrypted Chat",
    description:
      "Experience private messaging with Snickooz's end-to-end encrypted chat app.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <Providers>{children}</Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}