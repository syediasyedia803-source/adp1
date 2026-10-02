import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  Layers,
  AlertTriangle,
  Plus,
  Minus,
  RefreshCw,
  Search,
  CheckCircle2,
  FileSpreadsheet,
  X
} from 'lucide-react';

export const AdminInventory: React.FC = () => {
  const { products, inventoryLogs, adjustInventoryStock, showToast } = useStore();

  const [search, setSearch] = useState('');
  const [filterLowOnly, setFilterLowOnly] = useState(false);

  // Adjustment Modal
  const [adjustModalItem, setAdjustModalItem] = useState<{
    productId: string;
    productTitle: string;
    variantId: string;
    variantSku: string;
    currentStock: number;
  } | null>(null);

  const [changeAmount, setChangeAmount] = useState<number>(5);
  const [changeReason, setChangeReason] = useState<string>('Restock');

  const allVariants = products.flatMap((p) =>
    p.variants.map((v) => ({
      productId: p.id,
      productTitle: p.title,
      productImage: p.images[0],
      category: p.category,
      variantId: v.id,
      size: v.size,
      color: v.color,
      sku: v.sku,
      stock: v.stock,
      lowStockThreshold: v.lowStockThreshold
    }))
  );

  const filteredVariants = allVariants.filter((v) => {
    if (search && !v.productTitle.toLowerCase().includes(search.toLowerCase()) && !v.sku.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    if (filterLowOnly && v.stock > v.lowStockThreshold) {
      return false;
    }
    return true;
  });

  const lowStockCount = allVariants.filter((v) => v.stock <= v.lowStockThreshold).length;
  const outOfStockCount = allVariants.filter((v) => v.stock <= 0).length;
  const totalUnits = allVariants.reduce((sum, v) => sum + v.stock, 0);

  const handleAdjustSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adjustModalItem) return;
    adjustInventoryStock(
      adjustModalItem.productId,
      adjustModalItem.variantId,
      Number(changeAmount),
      changeReason as any
    );
    showToast(`Inventory updated for SKU ${adjustModalItem.variantSku}`);
    setAdjustModalItem(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-serif-luxury text-3xl font-semibold text-[#092328]">
          Atelier Inventory Intelligence
        </h1>
        <p className="text-xs text-[#092328]/60 mt-0.5">
          Live stock tracking across sizes and ateliers with transaction audit history.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="p-6 bg-white rounded-2xl border border-[#092328]/10 shadow-xs space-y-1">
          <span className="text-xs uppercase font-semibold text-[#092328]/60">Total Units in Atelier</span>
          <p className="text-2xl font-bold font-mono text-[#092328]">{totalUnits}</p>
          <p className="text-[11px] text-[#2A835F] font-semibold">Across {allVariants.length} distinct variant SKUs</p>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-[#092328]/10 shadow-xs space-y-1">
          <span className="text-xs uppercase font-semibold text-amber-600">Low Stock Alerts</span>
          <p className="text-2xl font-bold font-mono text-amber-600">{lowStockCount}</p>
          <p className="text-[11px] text-[#092328]/60">At or below reorder threshold</p>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-[#092328]/10 shadow-xs space-y-1">
          <span className="text-xs uppercase font-semibold text-rose-600">Out of Stock</span>
          <p className="text-2xl font-bold font-mono text-rose-600">{outOfStockCount}</p>
          <p className="text-[11px] text-[#092328]/60">Zero available for online checkout</p>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-3xl border border-[#092328]/10 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-[#092328]/10 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-[#092328]/40 absolute left-3 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by SKU, product, or size..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#FAF8F5] border border-[#092328]/15 rounded-xl focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-xs font-medium text-[#092328] cursor-pointer">
              <input
                type="checkbox"
                checked={filterLowOnly}
                onChange={(e) => setFilterLowOnly(e.target.checked)}
                className="w-4 h-4 accent-[#12544F] rounded"
              />
              <span>Filter Low Stock Only ({lowStockCount})</span>
            </label>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#FAF8F5] text-[#092328] uppercase text-[10px] tracking-wider border-b border-[#092328]/10">
              <tr>
                <th className="py-3 px-4">Garment & Variant</th>
                <th className="py-3 px-4">SKU</th>
                <th className="py-3 px-4">Size & Color</th>
                <th className="py-3 px-4">Available Stock</th>
                <th className="py-3 px-4">Threshold</th>
                <th className="py-3 px-4">Inventory Status</th>
                <th className="py-3 px-4 text-right">Stock Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#092328]/10">
              {filteredVariants.map((item) => {
                const isLow = item.stock <= item.lowStockThreshold && item.stock > 0;
                const isOut = item.stock <= 0;

                return (
                  <tr key={item.sku} className="hover:bg-[#FAF8F5]/80 transition-colors">
                    <td className="py-3 px-4 flex items-center gap-3">
                      <img
                        src={item.productImage}
                        alt=""
                        className="w-10 h-14 object-cover rounded-md bg-[#FAF8F5] border border-[#092328]/10 shrink-0"
                      />
                      <div>
                        <h4 className="font-semibold text-xs text-[#092328] line-clamp-1">{item.productTitle}</h4>
                        <span className="text-[10px] text-[#092328]/50 uppercase">{item.category}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-[#092328]">{item.sku}</td>
                    <td className="py-3 px-4">
                      <span className="font-semibold text-[#12544F]">{item.size}</span> · {item.color}
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-sm tabular-nums text-[#092328]">
                      {item.stock}
                    </td>
                    <td className="py-3 px-4 font-mono text-[#092328]/60 tabular-nums">
                      {item.lowStockThreshold}
                    </td>
                    <td className="py-3 px-4">
                      {isOut ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-rose-100 text-rose-800">
                          Out of Stock
                        </span>
                      ) : isLow ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-100 text-amber-800 flex items-center gap-1 w-max">
                          <AlertTriangle className="w-3 h-3" /> Low Stock
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-[#2A835F]/15 text-[#2A835F]">
                          Healthy
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() =>
                          setAdjustModalItem({
                            productId: item.productId,
                            productTitle: item.productTitle,
                            variantId: item.variantId,
                            variantSku: item.sku,
                            currentStock: item.stock
                          })
                        }
                        className="px-3 py-1.5 bg-[#092328] text-white rounded-lg text-xs font-semibold hover:bg-[#12544F] transition-colors cursor-pointer"
                      >
                        Adjust Stock
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inventory Transaction Audit History */}
      <div className="bg-white rounded-3xl border border-[#092328]/10 shadow-xs p-6 sm:p-8 space-y-4">
        <div className="flex justify-between items-center pb-2 border-b border-[#092328]/10">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[#092328]">
            Inventory Transaction Ledger
          </h3>
          <span className="text-xs text-[#092328]/60">{inventoryLogs.length} Logged Entries</span>
        </div>

        <div className="divide-y divide-[#092328]/10 max-h-60 overflow-y-auto">
          {inventoryLogs.map((log) => (
            <div key={log.id} className="py-2.5 flex items-center justify-between text-xs">
              <div>
                <p className="font-semibold text-[#092328]">{log.productTitle}</p>
                <p className="text-[11px] text-[#092328]/60 font-mono">
                  {log.variantSku} · Reason: <strong>{log.reason}</strong> · By: {log.adminUser}
                </p>
              </div>

              <div className="text-right">
                <span
                  className={`font-mono font-bold text-xs ${
                    log.quantityChange > 0 ? 'text-[#2A835F]' : 'text-rose-600'
                  }`}
                >
                  {log.quantityChange > 0 ? `+${log.quantityChange}` : log.quantityChange} units
                </span>
                <span className="block text-[10px] text-[#092328]/40">
                  {new Date(log.date).toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stock Adjustment Modal */}
      {adjustModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#092328]/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-5 shadow-2xl border border-[#092328]/10">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-serif-luxury text-xl text-[#092328]">Stock Adjustment</h3>
                <p className="text-xs text-[#092328]/60 font-mono mt-0.5">{adjustModalItem.variantSku}</p>
              </div>
              <button onClick={() => setAdjustModalItem(null)} className="p-1">
                <X className="w-5 h-5 text-[#092328]/60" />
              </button>
            </div>

            <form onSubmit={handleAdjustSubmit} className="space-y-4 text-xs">
              <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#092328]/10">
                <span className="text-[11px] text-[#092328]/60">Current Available Stock:</span>
                <p className="text-base font-bold font-mono text-[#12544F]">
                  {adjustModalItem.currentStock} units
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#092328] mb-1">
                  Quantity Adjustment (positive to add, negative to deduct)
                </label>
                <input
                  type="number"
                  required
                  value={changeAmount}
                  onChange={(e) => setChangeAmount(Number(e.target.value))}
                  placeholder="e.g. 10 or -3"
                  className="w-full p-2.5 font-mono text-xs bg-[#FAF8F5] border border-[#092328]/20 rounded-xl font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#092328] mb-1">
                  Adjustment Reason Code
                </label>
                <select
                  value={changeReason}
                  onChange={(e) => setChangeReason(e.target.value)}
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#092328]/20 rounded-xl"
                >
                  <option value="Restock">Atelier Restock Batch</option>
                  <option value="Damaged">Damaged in Transit / Fabric Flaw</option>
                  <option value="Manual Correction">Manual Physical Stock Count Correction</option>
                  <option value="Return">Customer Return Restock</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setAdjustModalItem(null)}
                  className="px-4 py-2 border rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#12544F] text-white rounded-xl font-semibold shadow"
                >
                  Confirm Adjustment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
