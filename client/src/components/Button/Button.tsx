import type {
  ButtonHTMLAttributes,
} from "react";

interface Props
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export default function Button({
  children,
  className = "",
  ...props
}: Props) {
  return (
    <button
      className={`rounded-xl bg-green-600 px-5 py-3 font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-green-700 hover:shadow-lg active:translate-y-0 disabled:cursor-not-allowed disabled:bg-gray-400 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}