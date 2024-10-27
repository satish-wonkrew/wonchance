"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";
import { Moon, Sun } from "lucide-react";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const isDarkMode = theme === "dark";

  const handleToggle = () => {
    setTheme(isDarkMode ? "light" : "dark");
  };

  return (
    <div className="flex items-center space-x-2">
      <Sun className="h-5 w-5 text-yellow-500" />
      <Switch
        checked={isDarkMode}
        onCheckedChange={handleToggle}
        className="transition-colors duration-300"
      />
      <Moon className="h-5 w-5 text-gray-700 dark:text-gray-200" />
    </div>
  );
}
