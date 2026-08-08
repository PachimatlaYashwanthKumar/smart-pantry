import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export default function Card({
  children,
  className = "",
}: Props) {
  return (
    <div
      className={`rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${className}`}
    >
      {children}
    </div>
  );
}