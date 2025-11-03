"use client";

import { motion } from "framer-motion";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "success" | "danger" | "ghost";
  size?: "sm" | "md" | "lg" | "xl";
  animated?: boolean;
  children: ReactNode;
}

const variantStyles = {
  primary: "bg-purple-600 hover:bg-purple-700 text-white shadow-lg hover:shadow-purple-500/50",
  secondary: "bg-gray-700 hover:bg-gray-600 text-white",
  success: "bg-green-600 hover:bg-green-700 text-white",
  danger: "bg-red-600 hover:bg-red-700 text-white",
  ghost: "text-gray-400 hover:text-white bg-transparent",
};

const sizeStyles = {
  sm: "px-4 py-2 text-sm rounded-lg",
  md: "px-6 py-3 rounded-lg",
  lg: "px-8 py-4 rounded-xl text-lg",
  xl: "px-12 py-6 rounded-xl text-2xl",
};

export default function Button({
  variant = "primary",
  size = "md",
  animated = false,
  children,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = "font-semibold shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed";
  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if (animated) {
    return (
      <motion.button
        whileHover={{ scale: disabled ? 1 : 1.05 }}
        whileTap={{ scale: disabled ? 1 : 0.95 }}
        className={combinedClassName}
        disabled={disabled}
        type={props.type}
        onClick={props.onClick}
        onSubmit={props.onSubmit}
      >
        {children}
      </motion.button>
    );
  }

  return (
    <button className={combinedClassName} disabled={disabled} {...props}>
      {children}
    </button>
  );
}
