import StatCard from "../../components/StatCard/StatCard";

export default function Dashboard() {
  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">
        Dashboard
      </h1>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Products"
          value={124}
        />

        <StatCard
          title="Pantry Items"
          value={86}
        />

        <StatCard
          title="Shopping List"
          value={12}
          color="text-blue-600"
        />

        <StatCard
          title="Expiring Soon"
          value={7}
          color="text-red-600"
        />
      </div>

      <div className="mt-8 rounded-xl bg-white p-6 shadow">
        <h2 className="mb-4 text-xl font-semibold">
          Recent Activity
        </h2>

        <ul className="space-y-3">
          <li>🥛 Milk added</li>
          <li>🍚 Rice quantity updated</li>
          <li>🥚 Eggs expire tomorrow</li>
        </ul>
      </div>
    </div>
  );
}