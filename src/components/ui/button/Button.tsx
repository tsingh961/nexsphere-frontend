"use client;"
import { ReactNode, use } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary";
  onClick?: () => void;
  fullWidth?: boolean;
  rounded?: boolean;
  disabled?: boolean;
  className?: string;
}

const Button = ({
  children,
  variant = "primary",
  onClick,
  fullWidth = false,
  rounded = false,
  disabled = false,
  className = "",
}: ButtonProps) => {
  const baseStyles =
    "px-4 py-2 font-bold transition-all duration-200 focus:outline-none";

  const variants = {
    primary: "bg-[#1D9BF0] text-white hover:bg-[#1A8CD8]",
    secondary: "bg-white text-black hover:bg-gray-200 border border-gray-300",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} 
        ${fullWidth ? "w-full" : ""} 
        ${rounded ? "rounded-full" : "rounded-lg"} 
        ${disabled ? "opacity-50 cursor-not-allowed" : ""} 
        ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
