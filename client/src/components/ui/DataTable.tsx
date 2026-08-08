import type { ReactNode } from "react";

interface Column<T> {
  header: string;
  render: (row: T) => ReactNode;
}

interface Props<T> {
  columns: Column<T>[];
  data: T[];
  emptyMessage?: string;
}

export default function DataTable<T>({
  columns,
  data,
  emptyMessage = "No records found.",
}: Props<T>) {
  if (data.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-gray-300 bg-white py-16 text-center text-gray-500">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
      <table className="min-w-full">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.header}
                className="px-6 py-4 text-left text-sm font-semibold text-gray-700"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, index) => (
            <tr
              key={index}
              className="border-t transition hover:bg-green-50"
            >
              {columns.map((column) => (
                <td
                  key={column.header}
                  className="px-6 py-4"
                >
                  {column.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}