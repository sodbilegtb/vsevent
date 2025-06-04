import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <nav style={{ padding: '1rem', backgroundColor: '#f0f0f0', marginBottom: '1rem' }}>
          <a href="/events" style={{ marginRight: '1rem' }}>Events</a>
          <a href="/events/create">Create Event</a>
        </nav>
        <main style={{ padding: '1rem' }}>
          {children}
        </main>
      </body>
    </html>
  );
}