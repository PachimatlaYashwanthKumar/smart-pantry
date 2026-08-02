import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function Input({
  label,
  className = "",
  ...props
}: InputProps) {
  return (
    <div className="mb-4">
      <label className="mb-2 block text-sm font-medium text-gray-700">
        {label}
      </label>

      <input
        className={`w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200 ${className}`}
        {...props}
      />
    </div>
  );
}