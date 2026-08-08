import { Link } from "react-router-dom";

import Card from "../Card/Card";

export default function QuickActions() {
  const actions = [
    {
      title: "Add Product",
      to: "/products",
    },
    {
      title: "Purchase",
      to: "/purchases",
    },
    {
      title: "Pantry",
      to: "/pantry",
    },
    {
      title: "Shopping",
      to: "/shopping",
    },
  ];

  return (
    <Card>
      <h2 className="mb-5 text-xl font-semibold">
        Quick Actions
      </h2>

      <div className="grid gap-4 md:grid-cols-2">
        {actions.map((action) => (
          <Link
            key={action.title}
            to={action.to}
            className="rounded-xl bg-green-600 px-5 py-4 text-center font-semibold text-white transition hover:bg-green-700"
          >
            {action.title}
          </Link>
        ))}
      </div>
    </Card>
  );
}