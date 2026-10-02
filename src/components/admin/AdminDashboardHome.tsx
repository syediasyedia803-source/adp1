import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  TrendingUp,
  ShoppingBag,
  Users,
  DollarSign,
  AlertTriangle,
  ArrowUpRight,
  Package,
  Calendar,
  Clock,
  ExternalLink
} from 'lucide-react';
import { OrderStatus } from '../../types';

export const AdminDashboardHome: React.FC<{ onNavigateTab: (tab: any) => void }> = ({
  onNavigateTab
}) => {
  const { orders, products, formatPrice, updateOrderStatus } = useStore();
  const [timeRange, setTimeRange] = useState<'today' | '7days' | '30days' | 'year'>('30days');

  // Compute metrics
  const totalSales = orders.reduce((sum, o) => sum + (o.status !== 'Cancelled' ? o.pricing.total : 0), 0);
  const totalOrdersCount = orders.length;
  const avgOrderValue = totalOrdersCount > 0 ? Math.round(totalSales / totalOrdersCount) : 0;
  const lowStockProducts = products.filter((p) => p.stock <= p.lowStockThreshold);
  const totalProductsSold = orders.reduce(
    (sum, o) => sum + o.items.reduce((s, item) => s + item.quantity, 0),
    0
  );

  // Category revenue breakdown
  const categoryRevenue = products.reduce((acc, p) => {
    const soldCount = orders.reduce(
      (sum, o) => sum + o.items.filter((i) => i.productId === p.id).reduce((s, it) => s + it.quantity, 0),
      0
    );
    acc[p.category] = (acc[p.category] || 0) + soldCount * p.price;
    return acc;
  }, {} as Record<string, number>);

  const sortedCategories = Object.entries(categoryRevenue).sort((a, b) => b[1] - a[1]);

  return (
    <div className="space-y-8">
      {/* Top Header & Range Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif-luxury text-3xl font-semibold text-[#092328]">
            Executive Atelier Overview
          </h1>
          <p className="text-xs text-[#092328]/60 mt-0.5">
            Real-time commercial metrics, inventory alerts, and fulfillment pipelines.
          </p>
        </div>

        {/* Date Filters */}
        <div className="flex items-center gap-1 p-1 bg-white rounded-xl border border-[#092328]/10 text-xs">
          {(['today', '7days', '30days', 'year'] as const).map((r) => (
            <button
              key={r}
              onClick={() => setTimeRange(r)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                timeRange === r ? 'bg-[#092328] text-white font-semibold' : 'text-[#092328]/70 hover:bg-[#FAF8F5]'
              }`}
            >
              {r === 'today' ? 'Today' : r === '7days' ? 'Last 7 Days' : r === '30days' ? 'Last 30 Days' : 'This Year'}
            </button>
          ))}
        </div>
      </div>

      {/* Primary KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Revenue */}
        <div className="p-6 bg-white rounded-2xl border border-[#092328]/10 shadow-xs space-y-2">
          <div className="flex justify-between items-center text-[#2A835F]">
            <span className="text-xs uppercase font-semibold tracking-wider text-[#092328]/60">
              Total Revenue
            </span>
            <div className="p-2 rounded-xl bg-[#2A835F]/10">
              <DollarSign className="w-4 h-4 text-[#2A835F]" />
            </div>
          </div>
          <div className="text-2xl font-bold font-mono text-[#092328] tabular-nums">
            {formatPrice(totalSales)}
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-[#2A835F] font-semibold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+18.4% vs previous period</span>
          </div>
        </div>

        {/* Total Orders */}
        <div className="p-6 bg-white rounded-2xl border border-[#092328]/10 shadow-xs space-y-2">
          <div className="flex justify-between items-center text-[#12544F]">
            <span className="text-xs uppercase font-semibold tracking-wider text-[#092328]/60">
              Orders Placed
            </span>
            <div className="p-2 rounded-xl bg-[#12544F]/10">
              <ShoppingBag className="w-4 h-4 text-[#12544F]" />
            </div>
          </div>
          <div className="text-2xl font-bold font-mono text-[#092328] tabular-nums">
            {totalOrdersCount}
          </div>
          <div className="text-[11px] text-[#092328]/60">
            {orders.filter((o) => o.status === 'Delivered').length} fulfilled & delivered
          </div>
        </div>

        {/* Average Order Value (AOV) */}
        <div className="p-6 bg-white rounded-2xl border border-[#092328]/10 shadow-xs space-y-2">
          <div className="flex justify-between items-center text-[#092328]">
            <span className="text-xs uppercase font-semibold tracking-wider text-[#092328]/60">
              Average Order Value
            </span>
            <div className="p-2 rounded-xl bg-[#092328]/5">
              <TrendingUp className="w-4 h-4 text-[#092328]" />
            </div>
          </div>
          <div className="text-2xl font-bold font-mono text-[#092328] tabular-nums">
            {formatPrice(avgOrderValue)}
          </div>
          <div className="text-[11px] text-[#2A835F] font-semibold">
            Luxury basket conversion rate: 3.8%
          </div>
        </div>

        {/* Inventory Stock Alert */}
        <div className="p-6 bg-white rounded-2xl border border-[#092328]/10 shadow-xs space-y-2">
          <div className="flex justify-between items-center text-amber-600">
            <span className="text-xs uppercase font-semibold tracking-wider text-[#092328]/60">
              Low Stock Warnings
            </span>
            <div className="p-2 rounded-xl bg-amber-50">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
            </div>
          </div>
          <div className="text-2xl font-bold font-mono text-[#092328] tabular-nums">
            {lowStockProducts.length} Silhouettes
          </div>
          <button
            onClick={() => onNavigateTab('inventory')}
            className="text-[11px] text-[#12544F] font-semibold hover:underline cursor-pointer block"
          >
            Review Restock Orders →
          </button>
        </div>
      </div>

      {/* Visual Analytics & Breakdown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sales Performance Visualizer (7 Cols) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-[#092328]/10 shadow-xs space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#092328]">
                Sales & Revenue Trajectory
              </h3>
              <p className="text-xs text-[#092328]/60 mt-0.5">30-day cumulative retail volume</p>
            </div>
            <span className="text-xs font-bold text-[#12544F] font-mono">
              Avg {formatPrice(Math.round(totalSales / 30))} / day
            </span>
          </div>

          {/* Elegant Simulated Bar Chart with Tabular Metrics */}
          <div className="h-48 flex items-end justify-between gap-2 pt-8 pb-2 border-b border-[#092328]/10">
            {[42, 68, 55, 90, 78, 110, 85, 95, 120, 105, 135, 150].map((val, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                <div
                  className="w-full bg-[#12544F] group-hover:bg-[#2A835F] rounded-t-md transition-all duration-300 relative"
                  style={{ height: `${(val / 160) * 100}%` }}
                >
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-7 left-1/2 -translate-x-1/2 bg-[#092328] text-white text-[10px] font-mono py-0.5 px-1.5 rounded pointer-events-none whitespace-nowrap z-20">
                    {formatPrice(val * 400)}
                  </span>
                </div>
                <span className="text-[10px] text-[#092328]/50 font-mono">
                  W{idx + 1}
                </span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-4 text-center text-xs">
            <div className="p-3 bg-[#FAF8F5] rounded-xl">
              <span className="text-[#092328]/60 block text-[11px]">Units Sold</span>
              <strong className="text-[#092328] font-mono text-sm">{totalProductsSold} pieces</strong>
            </div>
            <div className="p-3 bg-[#FAF8F5] rounded-xl">
              <span className="text-[#092328]/60 block text-[11px]">Gross Profit Est.</span>
              <strong className="text-[#2A835F] font-mono text-sm">62.8%</strong>
            </div>
            <div className="p-3 bg-[#FAF8F5] rounded-xl">
              <span className="text-[#092328]/60 block text-[11px]">Return Rate</span>
              <strong className="text-[#092328] font-mono text-sm">1.8% (Ultra Low)</strong>
            </div>
          </div>
        </div>

        {/* Revenue by Silhouette Category (5 Cols) */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-[#092328]/10 shadow-xs space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#092328]">
              Revenue by Silhouette
            </h3>
            <button
              onClick={() => onNavigateTab('products')}
              className="text-xs text-[#12544F] font-semibold hover:underline"
            >
              Catalog →
            </button>
          </div>

          <div className="space-y-4">
            {sortedCategories.slice(0, 5).map(([catName, rev], idx) => {
              const maxRev = sortedCategories[0][1] || 1;
              const percent = Math.round((rev / maxRev) * 100);
              return (
                <div key={catName} className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-[#092328]">{catName}</span>
                    <span className="font-mono font-bold text-[#12544F] tabular-nums">
                      {formatPrice(rev)}
                    </span>
                  </div>
                  <div className="w-full bg-[#FAF8F5] h-2 rounded-full overflow-hidden border border-[#092328]/5">
                    <div
                      className="bg-[#2A835F] h-full rounded-full transition-all duration-500"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Orders Processing Table */}
      <div className="bg-white rounded-3xl border border-[#092328]/10 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-[#092328]/10 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#092328]">
              Live Order Stream
            </h3>
            <p className="text-xs text-[#092328]/60 mt-0.5">
              Click status to advance order through fulfillment pipeline.
            </p>
          </div>

          <button
            onClick={() => onNavigateTab('orders')}
            className="text-xs font-semibold text-[#12544F] hover:underline cursor-pointer"
          >
            Manage All {orders.length} Orders →
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#FAF8F5] text-[#092328] uppercase text-[10px] tracking-wider border-b border-[#092328]/10">
              <tr>
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Destination</th>
                <th className="py-3 px-4">Items</th>
                <th className="py-3 px-4">Total</th>
                <th className="py-3 px-4">Payment</th>
                <th className="py-3 px-4">Status & Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#092328]/10">
              {orders.slice(0, 5).map((order) => (
                <tr key={order.id} className="hover:bg-[#FAF8F5]/80 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-[#12544F]">
                    {order.id}
                  </td>
                  <td className="py-3.5 px-4">
                    <p className="font-semibold text-[#092328]">{order.customer.name}</p>
                    <p className="text-[11px] text-[#092328]/60">{order.customer.phone}</p>
                  </td>
                  <td className="py-3.5 px-4 text-[#092328]/80">
                    {order.shippingAddress.city}, {order.shippingAddress.province}
                  </td>
                  <td className="py-3.5 px-4 tabular-nums">
                    {order.items.length} garments ({order.items.reduce((s, i) => s + i.quantity, 0)} pcs)
                  </td>
                  <td className="py-3.5 px-4 font-bold text-[#092328] tabular-nums">
                    {formatPrice(order.pricing.total)}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="uppercase text-[10px] font-semibold text-[#092328]">
                      {order.payment.method}
                    </span>
                    <span
                      className={`block text-[10px] font-bold ${
                        order.payment.status === 'paid' ? 'text-[#2A835F]' : 'text-amber-600'
                      }`}
                    >
                      {order.payment.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                      className="text-xs p-1.5 bg-white border border-[#092328]/20 rounded-lg font-semibold focus:outline-none focus:border-[#12544F] cursor-pointer"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Processing">Processing</option>
                      <option value="Packed">Packed</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Out for Delivery">Out for Delivery</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
