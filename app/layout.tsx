import "@radix-ui/themes/styles.css";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";

import { ClerkProvider } from "@clerk/nextjs";
import { Theme } from "@radix-ui/themes";
import Navbar from "./components/Navbar/Navbar";
import { poppins } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "QuickFlip",
  description: "A minimalistic flashcard app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={poppins.className}>
          <ThemeProvider attribute="class">
            <Theme accentColor="blue">
              <Navbar />
              {children}
            </Theme>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
