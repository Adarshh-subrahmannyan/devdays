import { useMemo } from "react";

const inventory = [
  { name: "IV Fluids", sku: "IV-102", quantity: 42, reorderLevel: 20, unit: "bottles" },
  { name: "Surgical Gloves", sku: "SG-240", quantity: 14, reorderLevel: 25, unit: "boxes" },
  { name: "Pain Relief", sku: "PR-500", quantity: 68, reorderLevel: 30, unit: "packs" },
];

export default function ExamplePage() {
  const summary = useMemo(() => {
    const totalUnits = inventory.reduce((sum, item) => sum + item.quantity, 0);
    const lowStock = inventory.filter((item) => item.quantity <= item.reorderLevel).length;
    return { totalUnits, lowStock };
  }, []);

  return (
    <div className="p-6 text-slate-800">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
            Stock overview
          </p>
          <h1 className="mt-1 text-2xl font-semibold">Care Inventory</h1>
        </div>
        <button className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm">
          Reorder list
        </button>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-sm text-slate-500">Total units</p>
          <p className="mt-2 text-3xl font-semibold">{summary.totalUnits}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-sm text-slate-500">Low-stock items</p>
          <p className="mt-2 text-3xl font-semibold text-amber-600">{summary.lowStock}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-sm text-slate-500">Stock coverage</p>
          <p className="mt-2 text-3xl font-semibold text-emerald-600">94%</p>
        </div>
      </div>

      <div className="mt-8 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Item</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">SKU</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Quantity</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Reorder level</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {inventory.map((item) => {
              const lowStock = item.quantity <= item.reorderLevel;
              return (
                <tr key={item.sku}>
                  <td className="px-4 py-3 text-sm font-medium">{item.name}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{item.sku}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{item.quantity} {item.unit}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{item.reorderLevel}</td>
                  <td className="px-4 py-3 text-sm">
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                        lowStock
                          ? "bg-amber-100 text-amber-700"
                          : "bg-emerald-100 text-emerald-700"
                      }`}
                    >
                      {lowStock ? "Low stock" : "Healthy"}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
