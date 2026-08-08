import { FiSearch } from "react-icons/fi";

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
}: Props) {
  return (
    <div className="relative">
      <FiSearch
        className="absolute left-4 top-4 text-gray-400"
        size={20}
      />

      <input
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        placeholder={placeholder}
        className="w-full rounded-xl border border-gray-300 py-3 pl-12 pr-4"
      />
    </div>
  );
}