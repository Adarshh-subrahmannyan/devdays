import { useMemo } from "react";
import {
  Package,
  AlertTriangle,
  TrendingUp,
  Plus,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  BarChart3,
} from "lucide-react";

const inventory = [
  {
    name: "IV Fluids",
    sku: "IV-102",
    quantity: 42,
    reorderLevel: 20,
    unit: "bottles",
    category: "Fluids",
  },
  {
    name: "Surgical Gloves",
    sku: "SG-240",
    quantity: 14,
    reorderLevel: 25,
    unit: "boxes",
    category: "PPE",
  },
  {
    name: "Pain Relief",
    sku: "PR-500",
    quantity: 68,
    reorderLevel: 30,
    unit: "packs",
    category: "Medications",
  },
  {
    name: "Bandages",
    sku: "BD-301",
    quantity: 156,
    reorderLevel: 50,
    unit: "boxes",
    category: "Supplies",
  },
  {
    name: "Syringes",
    sku: "SY-150",
    quantity: 22,
    reorderLevel: 40,
    unit: "packs",
    category: "Equipment",
  },
];

export default function ExamplePage() {
  const summary = useMemo(() => {
    const totalUnits = inventory.reduce((sum, item) => sum + item.quantity, 0);
    const lowStock = inventory.filter(
      (item) => item.quantity <= item.reorderLevel
    ).length;
    const coverage = Math.round(
      ((inventory.length - lowStock) / inventory.length) * 100
    );
    return { totalUnits, lowStock, coverage };
  }, []);

  return (
    <div className="care-inventory-container min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Header */}
      <div className="border-b border-slate-200 bg-white shadow-xs">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-700 shadow-md">
                <Package className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600">
                  Medical Inventory
                </p>
                <h1 className="text-3xl font-bold text-slate-900">
                  Stock Management
                </h1>
              </div>
            </div>
            <button className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-lg hover:bg-emerald-700 transition-colors">
              <Plus className="h-4 w-4" />
              New Order
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* KPI Cards */}
        <div className="mb-12 grid gap-6 md:grid-cols-3">
          {/* Total Units */}
          <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-lg hover:border-emerald-200 transition-all">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Units</p>
                <p className="mt-3 text-4xl font-bold text-slate-900">
                  {summary.totalUnits}
                </p>
                <p className="mt-2 text-xs text-slate-500">
                  Across {inventory.length} items
                </p>
              </div>
              <div className="rounded-xl bg-emerald-100 p-3 group-hover:bg-emerald-200 transition-colors">
                <BarChart3 className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
          </div>

          {/* Low Stock Alert */}
          <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-lg hover:border-amber-200 transition-all">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Low Stock</p>
                <p className="mt-3 text-4xl font-bold text-amber-600">
                  {summary.lowStock}
                </p>
                <p className="mt-2 text-xs text-slate-500">
                  {summary.lowStock === 0
                    ? "All items healthy"
                    : "Items need reordering"}
                </p>
              </div>
              <div className="rounded-xl bg-amber-100 p-3 group-hover:bg-amber-200 transition-colors">
                <AlertTriangle className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </div>

          {/* Coverage */}
          <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Coverage</p>
                <p className="mt-3 text-4xl font-bold text-blue-600">
                  {summary.coverage}%
                </p>
                <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all"
                    style={{ width: `${summary.coverage}%` }}
                  />
                </div>
              </div>
              <div className="rounded-xl bg-blue-100 p-3 group-hover:bg-blue-200 transition-colors">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Inventory Table */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          {/* Table Header */}
          <div className="bg-gradient-to-r from-slate-50 to-slate-100 px-8 py-4 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900">
              Inventory Items
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Real-time stock levels across all medical supplies
            </p>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 bg-white">
                  <th className="px-8 py-4 text-left text-sm font-semibold text-slate-900">
                    Item Name
                  </th>
                  <th className="px-8 py-4 text-left text-sm font-semibold text-slate-900">
                    SKU
                  </th>
                  <th className="px-8 py-4 text-left text-sm font-semibold text-slate-900">
                    Category
                  </th>
                  <th className="px-8 py-4 text-center text-sm font-semibold text-slate-900">
                    Quantity
                  </th>
                  <th className="px-8 py-4 text-center text-sm font-semibold text-slate-900">
                    Reorder Level
                  </th>
                  <th className="px-8 py-4 text-center text-sm font-semibold text-slate-900">
                    Status
                  </th>
                  <th className="px-8 py-4 text-center text-sm font-semibold text-slate-900">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {inventory.map((item) => {
                  const lowStock = item.quantity <= item.reorderLevel;
                  const stockPercentage = (item.quantity / item.reorderLevel) * 100;
                  return (
                    <tr
                      key={item.sku}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-8 py-5 text-sm font-semibold text-slate-900">
                        {item.name}
                      </td>
                      <td className="px-8 py-5 text-sm">
                        <span className="inline-block rounded-md bg-slate-100 px-3 py-1 font-mono text-xs font-medium text-slate-700">
                          {item.sku}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-sm text-slate-600">
                        {item.category}
                      </td>
                      <td className="px-8 py-5 text-center">
                        <div className="space-y-1">
                          <p className="text-sm font-semibold text-slate-900">
                            {item.quantity}
                          </p>
                          <p className="text-xs text-slate-500">{item.unit}</p>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-center text-sm text-slate-600">
                        {item.reorderLevel}
                      </td>
                      <td className="px-8 py-5 text-center">
                        <div className="flex flex-col items-center gap-2">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                              lowStock
                                ? "bg-amber-100 text-amber-700"
                                : "bg-emerald-100 text-emerald-700"
                            }`}
                          >
                            {lowStock ? (
                              <>
                                <AlertCircle className="h-3.5 w-3.5" />
                                Low Stock
                              </>
                            ) : (
                              <>
                                <CheckCircle2 className="h-3.5 w-3.5" />
                                Healthy
                              </>
                            )}
                          </span>
                          <div className="w-32 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                            <div
                              className={`h-full transition-all ${
                                lowStock
                                  ? "bg-gradient-to-r from-amber-400 to-amber-500"
                                  : "bg-gradient-to-r from-emerald-400 to-emerald-600"
                              }`}
                              style={{ width: `${Math.min(stockPercentage, 100)}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-center">
                        <button className="inline-flex items-center justify-center rounded-lg p-2 hover:bg-slate-100 transition-colors group">
                          <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-slate-600" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Stats */}
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="font-semibold text-slate-900">Quick Actions</h3>
            <div className="mt-4 space-y-2">
              <button className="w-full flex items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-3 hover:bg-slate-50 transition-colors">
                <span className="text-sm font-medium text-slate-700">
                  Generate Reorder Report
                </span>
                <ChevronRight className="h-4 w-4 text-slate-400" />
              </button>
              <button className="w-full flex items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-3 hover:bg-slate-50 transition-colors">
                <span className="text-sm font-medium text-slate-700">
                  Adjust Stock Levels
                </span>
                <ChevronRight className="h-4 w-4 text-slate-400" />
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="font-semibold text-slate-900">Statistics</h3>
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Total Items</span>
                <span className="font-semibold text-slate-900">
                  {inventory.length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Healthy Items</span>
                <span className="font-semibold text-emerald-600">
                  {inventory.length - summary.lowStock}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Average Stock Level</span>
                <span className="font-semibold text-slate-900">
                  {Math.round(summary.totalUnits / inventory.length)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
