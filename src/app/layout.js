import "./globals.css";
import store from "@/store";
import { Jost } from "next/font/google";

import { cn } from "@/lib/utils";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/shared/Navbar";
import { Providers } from "@/redux/provider";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BreadcrumbSection } from "@/components/etc/Breadcrumb";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/shared/Footer";

const josts = Jost({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-jost',
});

export const metadata = {
  title: "Wonchance",
  description: "By Wonkrew",
};


export default function RootLayout({ children }) {
  return (
    <Providers>
      <TooltipProvider>
        <AuthProvider>
          <html lang="en">
            <body
              className={cn(
                "min-h-screen bg-background font-sans antialiased",
                josts.variable
              )}
            >

              <Navbar />
              <Toaster richColors />
              <main className="pt-[100px] flex-1">
                {children}
              </main>

              <Footer/>
            </body>
          </html>
        </AuthProvider>
      </TooltipProvider>
    </Providers>
  );
}
