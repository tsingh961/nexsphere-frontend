"use client";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="rounded-full transition-colors duration-300 ease-in-out hover:bg-accent"
    >
      <div className="relative w-5 h-5">
        <Moon className={`absolute h-5 w-5 transition-all duration-300 ease-in-out ${theme === "dark" ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"}`} />
        <Sun className={`absolute h-5 w-5 transition-all duration-300 ease-in-out ${theme === "light" ? "opacity-100 rotate-0" : "opacity-0 rotate-90"}`} />
      </div>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export default ThemeToggle;
