import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function Button({
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`w-full rounded-lg bg-green-600 px-4 py-3 font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-400 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}