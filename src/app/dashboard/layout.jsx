"use client";
import { Inter as FontSans } from "next/font/google";

import { cn } from "@/lib/utils";

import AdminNav from "./components/CompanyUi/AdminNav";
import Sidebar from "./components/CompanyUi/Sidebar";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function DashboardLayout({ children }) {
  return (
    <div
      className={cn(
        "min-h-screen bg-background font-sans antialiased bg-gray-100 dark:bg-gray-900",
        fontSans.variable
      )}
    >
      <div className="flex flex-col min-h-screen">
        <div className="flex flex-1">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <main className="flex-1 pt-16  sm:pl-64">{children}</main>
          </div>
        </div>
      </div>
    </div>
  );
}
