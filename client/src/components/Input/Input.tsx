import type {
  InputHTMLAttributes,
} from "react";

interface Props
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function Input({
  label,
  id,
  ...props
}: Props) {
  const inputId =
    id ??
    label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="mb-5">
      <label
        htmlFor={inputId}
        className="mb-2 block text-sm font-medium text-gray-700"
      >
        {label}
      </label>

      <input
        id={inputId}
        name={inputId}
        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 transition-all focus:border-green-500"
        {...props}
      />
    </div>
  );
}