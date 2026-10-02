import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  ShoppingBag,
  Search,
  Filter,
  Eye,
  Printer,
  Truck,
  CheckCircle2,
  AlertCircle,
  X,
  ExternalLink,
  ChevronDown,
  RotateCcw
} from 'lucide-react';
import { Order, OrderStatus } from '../../types';

export const AdminOrders: React.FC = () => {
  const { orders, updateOrderStatus, cancelOrder, formatPrice, showToast } = useStore();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Status update modal / drawer
  const [newStatus, setNewStatus] = useState<OrderStatus>('Processing');
  const [trackingNumber, setTrackingNumber] = useState('');
  const [courierProvider, setCourierProvider] = useState('TCS Express Pakistan');
  const [adminNotes, setAdminNotes] = useState('');

  const statuses: OrderStatus[] = [
    'Pending',
    'Confirmed',
    'Processing',
    'Packed',
    'Shipped',
    'Out for Delivery',
    'Delivered',
    'Cancelled',
    'Returned'
  ];

  const filteredOrders = orders.filter((o) => {
    if (search && !o.id.toLowerCase().includes(search.toLowerCase()) && !o.customer.name.toLowerCase().includes(search.toLowerCase()) && !o.customer.phone.includes(search)) {
      return false;
    }
    if (statusFilter !== 'all' && o.status !== statusFilter) {
      return false;
    }
    return true;
  });

  const handleOpenDetail = (order: Order) => {
    setSelectedOrder(order);
    setNewStatus(order.status);
    setTrackingNumber(order.shipping.trackingNumber || '');
    setCourierProvider(order.shipping.provider || 'TCS Express Pakistan');
    setAdminNotes('');
  };

  const handleApplyStatusUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrder) return;
    updateOrderStatus(
      selectedOrder.id,
      newStatus,
      trackingNumber,
      courierProvider,
      adminNotes
    );
    // Refresh selected order
    const updated = orders.find((o) => o.id === selectedOrder.id);
    if (updated) setSelectedOrder(updated);
  };

  const handlePrintInvoice = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="font-serif-luxury text-3xl font-semibold text-[#092328]">
            Order Management & Dispatch
          </h1>
          <p className="text-xs text-[#092328]/60 mt-0.5">
            Real-time fulfillment tracking, status lifecycle management, and courier integrations.
          </p>
        </div>

        <button
          onClick={handlePrintInvoice}
          className="px-4 py-2 bg-white border border-[#092328]/15 rounded-xl text-xs font-semibold text-[#092328] hover:bg-[#FAF8F5] flex items-center gap-1.5 cursor-pointer shadow-xs w-max"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Print Manifest</span>
        </button>
      </div>

      {/* Orders Filter & Table */}
      <div className="bg-white rounded-3xl border border-[#092328]/10 shadow-xs overflow-hidden">
        {/* Filter bar */}
        <div className="p-4 sm:p-6 border-b border-[#092328]/10 flex flex-col md:flex-row justify-between md:items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-[#092328]/40 absolute left-3 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by order # (COM-...), customer, or phone..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#FAF8F5] border border-[#092328]/15 rounded-xl focus:outline-none"
            />
          </div>

          {/* Status Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto text-xs pb-1 sm:pb-0">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap cursor-pointer ${
                statusFilter === 'all'
                  ? 'bg-[#092328] text-white font-semibold'
                  : 'text-[#092328]/70 hover:bg-[#FAF8F5]'
              }`}
            >
              All ({orders.length})
            </button>
            {statuses.map((st) => {
              const count = orders.filter((o) => o.status === st).length;
              return (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap cursor-pointer ${
                    statusFilter === st
                      ? 'bg-[#12544F] text-white font-semibold'
                      : 'text-[#092328]/70 hover:bg-[#FAF8F5]'
                  }`}
                >
                  {st} {count > 0 && `(${count})`}
                </button>
              );
            })}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#FAF8F5] text-[#092328] uppercase text-[10px] tracking-wider border-b border-[#092328]/10">
              <tr>
                <th className="py-3 px-4">Order Reference</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Destination</th>
                <th className="py-3 px-4">Items</th>
                <th className="py-3 px-4">Total</th>
                <th className="py-3 px-4">Payment</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#092328]/10">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-[#FAF8F5]/80 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-[#12544F]">
                    {order.id}
                  </td>
                  <td className="py-3.5 px-4">
                    <p className="font-semibold text-[#092328]">{order.customer.name}</p>
                    <p className="text-[11px] text-[#092328]/60">{order.customer.email}</p>
                  </td>
                  <td className="py-3.5 px-4 text-[#092328]/80">
                    {order.shippingAddress.city}, {order.shippingAddress.province}
                  </td>
                  <td className="py-3.5 px-4 tabular-nums">
                    {order.items.length} garments
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
                    <span
                      className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                        order.status === 'Delivered'
                          ? 'bg-[#2A835F]/20 text-[#2A835F]'
                          : order.status === 'Shipped'
                          ? 'bg-[#12544F]/20 text-[#12544F]'
                          : order.status === 'Cancelled'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-[#FAF8F5] border border-[#092328]/15 text-[#092328]'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => handleOpenDetail(order)}
                      className="px-3 py-1.5 bg-[#092328] text-white rounded-lg text-xs font-semibold hover:bg-[#12544F] transition-colors cursor-pointer"
                    >
                      Manage
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail & Status Drawer Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div
            className="fixed inset-0 bg-[#092328]/70 backdrop-blur-xs"
            onClick={() => setSelectedOrder(null)}
          />

          <div className="relative min-h-screen flex items-center justify-center p-4">
            <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-[#092328]/10 overflow-hidden">
              {/* Header */}
              <div className="p-6 bg-[#092328] text-white flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-lg font-bold text-[#8BBB92]">
                      {selectedOrder.id}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-[#12544F] text-white">
                      {selectedOrder.status}
                    </span>
                  </div>
                  <p className="text-xs text-white/70 mt-1">
                    Customer: {selectedOrder.customer.name} ({selectedOrder.customer.phone})
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrintInvoice}
                    className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg cursor-pointer"
                    title="Print Invoice"
                  >
                    <Printer className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="p-1 text-white/60 hover:text-white rounded-full cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto text-xs">
                {/* Status Pipeline Updater Form */}
                <form
                  onSubmit={handleApplyStatusUpdate}
                  className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#092328]/10 space-y-4"
                >
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#092328]">
                    Advance Order Pipeline
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#092328] mb-1">
                        New Order Status
                      </label>
                      <select
                        value={newStatus}
                        onChange={(e) => setNewStatus(e.target.value as OrderStatus)}
                        className="w-full p-2 bg-white border border-[#092328]/20 rounded-xl font-semibold cursor-pointer"
                      >
                        {statuses.map((st) => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-[#092328] mb-1">
                        Courier Partner
                      </label>
                      <input
                        type="text"
                        value={courierProvider}
                        onChange={(e) => setCourierProvider(e.target.value)}
                        placeholder="TCS / Leopard / DHL"
                        className="w-full p-2 bg-white border border-[#092328]/20 rounded-xl"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-[#092328] mb-1">
                        Tracking Number
                      </label>
                      <input
                        type="text"
                        value={trackingNumber}
                        onChange={(e) => setTrackingNumber(e.target.value)}
                        placeholder="e.g. TCS-9281740921"
                        className="w-full p-2 font-mono bg-white border border-[#092328]/20 rounded-xl"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#092328] mb-1">
                      Internal Dispatch Notes (recorded in customer timeline)
                    </label>
                    <input
                      type="text"
                      value={adminNotes}
                      onChange={(e) => setAdminNotes(e.target.value)}
                      placeholder="e.g. Quality sealed at Lahore hub. In route to Islamabad hub."
                      className="w-full p-2 bg-white border border-[#092328]/20 rounded-xl"
                    />
                  </div>

                  <div className="flex justify-end gap-2">
                    <button
                      type="submit"
                      className="px-5 py-2 bg-[#12544F] text-white font-semibold rounded-xl hover:bg-[#092328] transition-colors cursor-pointer"
                    >
                      Update Pipeline Status
                    </button>
                  </div>
                </form>

                {/* Items in this order */}
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#092328] mb-3">
                    Garments Ordered ({selectedOrder.items.length})
                  </h4>
                  <div className="divide-y divide-[#092328]/10 border border-[#092328]/10 rounded-2xl overflow-hidden">
                    {selectedOrder.items.map((item, idx) => (
                      <div key={idx} className="p-3.5 flex items-center justify-between gap-3 bg-white">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.image}
                            alt=""
                            className="w-12 h-16 object-cover rounded-md bg-[#FAF8F5] border border-[#092328]/10 shrink-0"
                          />
                          <div>
                            <h5 className="font-semibold text-xs text-[#092328]">{item.title}</h5>
                            <p className="text-[11px] text-[#092328]/60">
                              Size: <strong>{item.size}</strong> · Color: {item.color} · Qty: {item.quantity}
                            </p>
                            <span className="text-[10px] font-mono text-[#092328]/40">
                              SKU: {item.sku}
                            </span>
                          </div>
                        </div>
                        <span className="font-bold text-xs text-[#12544F] tabular-nums">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Delivery & Financial Summary */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-[#FAF8F5] rounded-2xl space-y-1">
                    <span className="text-[11px] uppercase font-bold text-[#092328]">
                      Shipping Destination
                    </span>
                    <p className="font-medium text-[#092328]">{selectedOrder.customer.name}</p>
                    <p className="text-[#092328]/70">
                      {selectedOrder.shippingAddress.street}, {selectedOrder.shippingAddress.area}
                    </p>
                    <p className="text-[#092328]/70">
                      {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.province}
                    </p>
                    <p className="font-mono text-[#092328]/70">{selectedOrder.customer.phone}</p>
                  </div>

                  <div className="p-4 bg-[#FAF8F5] rounded-2xl space-y-1">
                    <span className="text-[11px] uppercase font-bold text-[#092328]">
                      Billing Summary
                    </span>
                    <div className="flex justify-between text-[#092328]/70">
                      <span>Subtotal:</span>
                      <span className="tabular-nums">{formatPrice(selectedOrder.pricing.subtotal)}</span>
                    </div>
                    {selectedOrder.pricing.discount > 0 && (
                      <div className="flex justify-between text-[#2A835F]">
                        <span>Discount:</span>
                        <span className="tabular-nums">-{formatPrice(selectedOrder.pricing.discount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-[#092328]/70">
                      <span>Shipping:</span>
                      <span className="tabular-nums">{formatPrice(selectedOrder.pricing.shipping)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-sm text-[#12544F] pt-2 border-t border-[#092328]/10">
                      <span>Total:</span>
                      <span className="tabular-nums">{formatPrice(selectedOrder.pricing.total)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
