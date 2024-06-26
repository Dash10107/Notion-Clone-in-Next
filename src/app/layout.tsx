export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import db from "@/lib/supabase/db";
import { ThemeProvider } from "@/lib/providers/next-them-provider";
import {DM_Sans} from 'next/font/google';
import { twMerge } from "tailwind-merge";
import AppStateProvider from "@/lib/providers/state-provider";
import { SupabaseUserProvider } from "@/lib/providers/supabase-user-provider";
import { Toaster } from "@/components/ui/toaster";
import { SocketProvider } from "@/lib/providers/socket-provider";
const inter = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cypress",
  description: "Cypress:A Online Shared Editor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    // console.log(db)
  return (
    <html lang="en">
      <body className={twMerge('bg-background', inter.className)}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <AppStateProvider>
            <SupabaseUserProvider>
            <SocketProvider>
            {children}
            </SocketProvider>
            <Toaster/>
              </SupabaseUserProvider>
              </AppStateProvider>
        </ThemeProvider></body>
    </html>
  );
}
