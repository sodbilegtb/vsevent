import type { Metadata } from "next";
// Note: The correct font import is 'next/font/google' for the font functions,
// but since you are using a custom font setup (Geist), your original imports are likely correct for your setup.
// I will keep your font setup as is.
import { Geist } from "next/font/google";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Event Management App',
  description: 'Manage your events seamlessly',
};

// Corrected RootLayout: It only needs to accept `children`.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // It's good practice to include the font variables in the className of the html or body tag
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <nav style={{ padding: '1rem', backgroundColor: '#f0f0f0', marginBottom: '1rem' }}>
          <a href="/events" style={{ marginRight: '1rem' }}>Events</a>
          <a href="/events/new">Create Event</a>
        </nav>
        <main style={{ padding: '1rem' }}>
          {children}
        </main>
      </body>
    </html>
  );
}
