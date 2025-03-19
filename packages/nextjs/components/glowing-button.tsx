import { ReactNode } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "../utils/cn";

interface GlowingButtonProps extends HTMLMotionProps<"button"> {
  glowColor?: string;
  size?: "sm" | "md" | "lg";
  children?: ReactNode;
}

export function GlowingButton({
  children,
  className,
  glowColor = "rgba(123,97,255,0.4)",
  size = "md",
  ...props
}: GlowingButtonProps) {
  const sizeClasses = {
    sm: "px-4 py-1.5 text-sm",
    md: "px-6 py-2",
    lg: "px-8 py-3 text-lg",
  };

  return (
    <motion.button
      className={cn(
        "relative rounded-full bg-gradient-to-r from-primary to-primary/80 text-white font-medium",
        "hover:shadow-lg transition-all duration-300",
        sizeClasses[size],
        className,
      )}
      style={{ "--glow-color": glowColor } as React.CSSProperties}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
    
      <div
        className="absolute inset-0 rounded-full blur-lg transition-opacity duration-300 opacity-0 hover:opacity-100"
        style={{ backgroundColor: "var(--glow-color)" }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
    
  );
}
