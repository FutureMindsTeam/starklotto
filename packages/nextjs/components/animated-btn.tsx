"use client";

import { ReactNode } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "~~/utils/cn";

interface AnimatedButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children: ReactNode;
}

export function AnimatedButton({
  children,
  className,
  variant = "primary",
  size = "md",
  fullWidth = false,
  leftIcon,
  rightIcon,
  ...props
}: AnimatedButtonProps) {
  // Size classes
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg",
  };

  // Variant classes
  const variantClasses = {
    primary: "bg-purple-600 hover:bg-purple-700 text-white",
    secondary: "bg-green-500 hover:bg-green-600 text-white",
    outline: "bg-transparent border border-white/20 hover:bg-white/5 text-white",
  };

  // Animation variants
  const buttonVariants = {
    hover: { 
      scale: 1.03,
      transition: { duration: 0.2 }
    },
    tap: { 
      scale: 0.97,
      transition: { duration: 0.1 }
    }
  };

  return (
    <motion.button
      className={cn(
        "rounded-lg font-medium transition-colors",
        sizeClasses[size],
        variantClasses[variant],
        fullWidth ? "w-full" : "",
        "flex items-center justify-center gap-2",
        className
      )}
      whileHover="hover"
      whileTap="tap"
      variants={buttonVariants}
      {...props}
    >
      {leftIcon && <span className="inline-flex">{leftIcon}</span>}
      <span>{children}</span>
      {rightIcon && <span className="inline-flex">{rightIcon}</span>}
    </motion.button>
  );
}