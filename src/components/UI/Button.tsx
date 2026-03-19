import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline";
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  children,
  className,
  ...props}:ButtonProps) => {
    const BaseStyle = "px-6 py-2 rounded-lg font-medium transition-all duration-300";

    const variants = {
        primary:"bg-primary text-primary-foreground hover:opacity-90 border border-transparent",
        outline:"bg-transparent border-2 border-primary text-primary hover:bg-primary/10",
    };

    return(
        <button
        className={`${BaseStyle} ${variants[variant]} ${className}`}
        {...props}
        >{children}</button>
    );
  };
