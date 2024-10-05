import "@radix-ui/themes/styles.css";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";

import { ClerkProvider } from "@clerk/nextjs";
import { Theme } from "@radix-ui/themes";
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
        <body>
          <ThemeProvider attribute="class">
            <Theme accentColor="blue">{children}</Theme>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
