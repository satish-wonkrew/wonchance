"use client";

import { useEffect, useState } from "react";
import "./globals.css";
import { Jost } from "next/font/google";
import { cn } from "@/lib/utils";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/shared/Navbar";
import { Providers } from "@/redux/provider";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Footer from "@/components/shared/Footer";

const josts = Jost({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jost",
});

export default function RootLayout({ children }) {
  const [isAuthOrDashboard, setIsAuthOrDashboard] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const path = window.location.pathname;
      setIsAuthOrDashboard(path.startsWith("/auth") || path.startsWith("/dashboard"));
    }
  }, []);

  return (
    <Providers>
      <TooltipProvider>
        <AuthProvider>
          <html lang="en">
            <head>
              <title>Wonchance</title>
              <meta name="description" content="By Wonkrew" />
            </head>
            <body
              className={cn(
                "min-h-screen bg-background font-sans antialiased",
                josts.variable
              )}
            >
              <Navbar />
              <Toaster richColors />
              <main className="flex-1">{children}</main>
              {!isAuthOrDashboard && <Footer />}
            </body>
          </html>
        </AuthProvider>
      </TooltipProvider>
    </Providers>
  );
}
