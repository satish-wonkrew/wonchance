// src/components/ui/spinner.js
import { cn } from "@/lib/utils"; // Utility function for conditional class names

const Spinner = () => (
  <div className={cn("flex items-center justify-center w-6 h-6")}>
    <div className="w-4 h-4 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin" />
  </div>
);

export default Spinner;
