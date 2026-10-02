import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  Truck,
  Search,
  CheckCircle2,
  Clock,
  Package,
  Calendar,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { OrderStatus } from '../../types';

export const OrderTrackingPage: React.FC = () => {
  const { lookupOrder, formatPrice, orders } = useStore();

  const [orderNumber, setOrderNumber] = useState('COM-2026-000412');
  const [identifier, setIdentifier] = useState('syediasyedia803@gmail.com');
  const [searchedOrder, setSearchedOrder] = useState<any>(() => lookupOrder('COM-2026-000412', 'syediasyedia803@gmail.com'));
  const [hasSearched, setHasSearched] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    if (!orderNumber || !identifier) {
      setErrorMsg('Please enter both Order Reference and your registered Email or Phone.');
      return;
    }

    const found = lookupOrder(orderNumber, identifier);
    setSearchedOrder(found || null);
    setHasSearched(true);
    if (!found) {
      setErrorMsg('No order matching that reference and contact was found. Please verify details.');
    }
  };

  const steps: { key: OrderStatus; label: string }[] = [
    { key: 'Pending', label: 'Order Placed' },
    { key: 'Confirmed', label: 'Confirmed' },
    { key: 'Processing', label: 'In Atelier' },
    { key: 'Packed', label: 'Packed & Sealed' },
    { key: 'Shipped', label: 'Shipped' },
    { key: 'Out for Delivery', label: 'Out for Delivery' },
    { key: 'Delivered', label: 'Delivered' }
  ];

  const getStepIndex = (status: OrderStatus) => {
    const idx = steps.findIndex((s) => s.key === status);
    if (idx !== -1) return idx;
    if (status === 'Cancelled' || status === 'Returned' || status === 'Refunded') return -1;
    return 0;
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Page Header */}
        <div className="text-center space-y-2">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#2A835F]">
            Shipment Intelligence
          </span>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl text-[#092328]">
            Track Your Comfort Order
          </h1>
          <p className="text-xs text-[#092328]/60 max-w-md mx-auto">
            Enter your Comfort order reference and registered email or phone to view live carrier logs and dispatch timeline.
          </p>
        </div>

        {/* Lookup Card */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#092328]/10 shadow-sm">
          <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-12 gap-4">
            <div className="sm:col-span-5">
              <label className="block text-xs font-semibold text-[#092328] uppercase mb-1">
                Order Number
              </label>
              <input
                type="text"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                placeholder="e.g. COM-2026-000412"
                className="w-full px-3.5 py-2.5 text-xs font-mono uppercase bg-[#FAF8F5] border border-[#092328]/20 rounded-xl focus:outline-none focus:border-[#12544F]"
              />
            </div>

            <div className="sm:col-span-5">
              <label className="block text-xs font-semibold text-[#092328] uppercase mb-1">
                Email or Mobile Phone
              </label>
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="e.g. syediasyedia803@gmail.com"
                className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F5] border border-[#092328]/20 rounded-xl focus:outline-none focus:border-[#12544F]"
              />
            </div>

            <div className="sm:col-span-2 flex items-end">
              <button
                type="submit"
                className="w-full py-2.5 bg-[#092328] text-white text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-[#12544F] transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Track</span>
              </button>
            </div>
          </form>

          {/* Quick Demo Switcher helper */}
          <div className="mt-4 pt-3 border-t border-[#092328]/10 flex items-center justify-between text-xs text-[#092328]/60">
            <span>Recent Test Orders:</span>
            <div className="flex gap-2">
              {orders.slice(0, 3).map((o) => (
                <button
                  key={o.id}
                  type="button"
                  onClick={() => {
                    setOrderNumber(o.id);
                    setIdentifier(o.customer.email);
                    setSearchedOrder(o);
                    setHasSearched(true);
                    setErrorMsg(null);
                  }}
                  className="px-2 py-0.5 bg-[#FAF8F5] hover:bg-[#12544F]/10 rounded border border-[#092328]/15 text-[11px] font-mono cursor-pointer"
                >
                  {o.id} ({o.status})
                </button>
              ))}
            </div>
          </div>

          {errorMsg && (
            <div className="mt-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}
        </div>

        {/* Tracking Details View */}
        {hasSearched && searchedOrder && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Status Highlight Banner */}
            <div className="bg-[#092328] text-white p-6 sm:p-8 rounded-3xl shadow-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs uppercase tracking-widest text-[#8BBB92] font-semibold">
                    Current Delivery Status
                  </span>
                </div>
                <h2 className="text-2xl font-serif-luxury font-bold text-white flex items-center gap-2">
                  <span>{searchedOrder.status}</span>
                </h2>
                <p className="text-xs text-[#FAF8F5]/70 mt-1 font-mono">
                  Order Reference: {searchedOrder.id}
                </p>
              </div>

              <div className="text-left sm:text-right space-y-1">
                <div className="text-xs text-[#8BBB92] flex items-center sm:justify-end gap-1.5 font-medium">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Est. Delivery: {searchedOrder.shipping.estimatedDelivery}</span>
                </div>
                <div className="text-xs text-white/90">
                  Carrier: <strong>{searchedOrder.shipping.provider}</strong>
                </div>
                {searchedOrder.shipping.trackingNumber && (
                  <div className="text-[11px] font-mono text-[#FAF8F5]/70">
                    Tracking #: {searchedOrder.shipping.trackingNumber}
                  </div>
                )}
              </div>
            </div>

            {/* 7-Step Visual Timeline */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#092328]/10 shadow-sm">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#092328] mb-6">
                Fulfillment & Transit Milestones
              </h3>

              {/* Step indicator */}
              <div className="relative mb-8">
                <div className="hidden sm:block absolute top-1/2 left-0 right-0 h-0.5 bg-[#092328]/10 -translate-y-1/2 z-0" />
                <div
                  className="hidden sm:block absolute top-1/2 left-0 h-0.5 bg-[#2A835F] -translate-y-1/2 transition-all duration-500 z-0"
                  style={{
                    width: `${Math.max(
                      0,
                      Math.min(100, (getStepIndex(searchedOrder.status) / (steps.length - 1)) * 100)
                    )}%`
                  }}
                />

                <div className="grid grid-cols-2 sm:grid-cols-7 gap-3 sm:gap-2 relative z-10">
                  {steps.map((st, idx) => {
                    const currentIndex = getStepIndex(searchedOrder.status);
                    const isDone = currentIndex >= idx;
                    const isCurrent = currentIndex === idx;

                    return (
                      <div key={st.key} className="flex flex-col items-center text-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-xs ${
                            isDone
                              ? 'bg-[#2A835F] text-white'
                              : isCurrent
                              ? 'bg-[#12544F] text-white ring-4 ring-[#8BBB92]/40'
                              : 'bg-[#FAF8F5] text-[#092328]/40 border border-[#092328]/20'
                          }`}
                        >
                          {isDone ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                        </div>
                        <span
                          className={`text-[11px] mt-2 font-medium ${
                            isCurrent
                              ? 'text-[#12544F] font-bold'
                              : isDone
                              ? 'text-[#092328]'
                              : 'text-[#092328]/40'
                          }`}
                        >
                          {st.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Detailed Carrier Timeline Events */}
              <div className="space-y-4 pt-4 border-t border-[#092328]/10">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#092328]/70">
                  Carrier Event Log
                </h4>
                <div className="space-y-3">
                  {searchedOrder.timeline.map((ev: any, i: number) => (
                    <div key={i} className="flex items-start gap-3 text-xs">
                      <div className="w-2 h-2 rounded-full bg-[#2A835F] mt-1.5 shrink-0" />
                      <div className="flex-1">
                        <div className="flex justify-between items-baseline">
                          <span className="font-semibold text-[#092328]">{ev.title}</span>
                          <span className="text-[11px] text-[#092328]/50">
                            {new Date(ev.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-[#092328]/70 mt-0.5">{ev.description}</p>
                        {ev.updatedBy && (
                          <span className="text-[10px] text-[#092328]/40 italic block mt-0.5">
                            Logged by: {ev.updatedBy}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Package Contents */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#092328]/10 shadow-sm space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#092328]">
                Shipment Contents ({searchedOrder.items.length})
              </h3>
              <div className="divide-y divide-[#092328]/10">
                {searchedOrder.items.map((item: any, i: number) => (
                  <div key={i} className="py-3 flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-14 h-18 object-cover rounded-lg bg-[#FAF8F5] border border-[#092328]/10 shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1">
                      <h4 className="text-xs font-semibold text-[#092328]">{item.title}</h4>
                      <p className="text-[11px] text-[#092328]/60 mt-0.5">
                        Size: {item.size} · Color: {item.color} · Qty: {item.quantity}
                      </p>
                      <span className="text-[10px] font-mono text-[#092328]/40 mt-0.5 block">
                        SKU: {item.sku}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-[#12544F] tabular-nums">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
