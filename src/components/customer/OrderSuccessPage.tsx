import React from 'react';
import { useStore } from '../../context/StoreContext';
import {
  CheckCircle2,
  Printer,
  Truck,
  ArrowRight,
  ShoppingBag,
  Sparkles
} from 'lucide-react';
import bannerLogo from '../../assets/images/banner.png';

export const OrderSuccessPage: React.FC = () => {
  const { lastPlacedOrder, orders, setActiveView, formatPrice } = useStore();
  const order = lastPlacedOrder || orders[0];

  if (!order) {
    return (
      <div className="py-20 text-center">
        <p className="text-xs text-[#092328]/60">No recent order found.</p>
        <button
          onClick={() => setActiveView('shop')}
          className="mt-4 px-6 py-2 bg-[#092328] text-white rounded-lg text-xs"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-10 sm:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Celebration Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#092328]/10 shadow-lg space-y-8">
          <div className="text-center space-y-3">
            <img
              src={bannerLogo}
              alt="Comfort"
              className="h-16 w-auto object-contain mx-auto mb-2"
              referrerPolicy="no-referrer"
            />
            <div className="w-12 h-12 rounded-full bg-[#8BBB92]/20 text-[#12544F] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7 text-[#2A835F]" />
            </div>
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#2A835F] block">
              Acquisition Confirmed
            </span>
            <h1 className="font-serif-luxury text-3xl sm:text-4xl text-[#092328]">
              Thank You for Trusting Comfort
            </h1>
            <p className="text-xs text-[#092328]/70 max-w-md mx-auto">
              Your designer garments have been assigned to our Lahore atelier for hand inspection and bespoke packaging.
            </p>
          </div>

          {/* Order Details Header Card */}
          <div className="p-4 sm:p-6 bg-[#FAF8F5] rounded-2xl border border-[#092328]/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <span className="text-[11px] text-[#092328]/50 uppercase tracking-wider">
                Official Order Reference
              </span>
              <p className="text-lg font-bold font-mono text-[#12544F] tracking-wide mt-0.5">
                {order.id}
              </p>
              <p className="text-xs text-[#092328]/60 mt-0.5">
                Placed on {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="px-4 py-2 bg-white border border-[#092328]/15 rounded-xl text-xs font-semibold text-[#092328] hover:bg-[#FAF8F5] transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Invoice</span>
              </button>

              <button
                onClick={() => {
                  setActiveView('track-order');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-4 py-2 bg-[#092328] text-white rounded-xl text-xs font-semibold hover:bg-[#12544F] transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Truck className="w-3.5 h-3.5 text-[#8BBB92]" />
                <span>Track Order</span>
              </button>
            </div>
          </div>

          {/* Ordered Garments */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#092328]">
              Garments in Shipment ({order.items.length})
            </h3>
            <div className="divide-y divide-[#092328]/10 border border-[#092328]/10 rounded-2xl overflow-hidden bg-white">
              {order.items.map((item, idx) => (
                <div key={idx} className="p-4 flex gap-4 items-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-20 object-cover rounded-xl bg-[#FAF8F5] shrink-0 border border-[#092328]/10"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-semibold text-[#092328]">{item.title}</h4>
                    <p className="text-[11px] text-[#092328]/60 mt-0.5">
                      Size: <strong>{item.size}</strong> · Color: {item.color} · Qty: {item.quantity}
                    </p>
                    <span className="text-[10px] text-[#092328]/40 font-mono mt-0.5 block">
                      SKU: {item.sku}
                    </span>
                  </div>
                  <div className="text-right font-bold text-xs text-[#092328] tabular-nums">
                    {formatPrice(item.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Destination & Payment Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#092328]/5 space-y-2 text-xs">
              <span className="font-semibold text-[#092328] uppercase text-[10px] tracking-wider block">
                Destination Address
              </span>
              <p className="font-medium text-[#092328]">{order.customer.name}</p>
              <p className="text-[#092328]/70">
                {order.shippingAddress.street}, {order.shippingAddress.area}
              </p>
              <p className="text-[#092328]/70">
                {order.shippingAddress.city}, {order.shippingAddress.province}, {order.shippingAddress.country}
              </p>
              <p className="text-[#092328]/70 font-mono">{order.customer.phone}</p>
            </div>

            <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#092328]/5 space-y-2 text-xs">
              <span className="font-semibold text-[#092328] uppercase text-[10px] tracking-wider block">
                Financial Summary
              </span>
              <div className="flex justify-between text-[#092328]/80">
                <span>Subtotal:</span>
                <span className="tabular-nums">{formatPrice(order.pricing.subtotal)}</span>
              </div>
              {order.pricing.discount > 0 && (
                <div className="flex justify-between text-[#2A835F]">
                  <span>Discount ({order.pricing.couponCode}):</span>
                  <span className="tabular-nums">-{formatPrice(order.pricing.discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-[#092328]/80">
                <span>Shipping ({order.shipping.method}):</span>
                <span className="tabular-nums">
                  {order.pricing.shipping === 0 ? 'Complimentary' : formatPrice(order.pricing.shipping)}
                </span>
              </div>
              <div className="flex justify-between font-bold text-sm text-[#12544F] pt-2 border-t border-[#092328]/10">
                <span>Total Amount:</span>
                <span className="tabular-nums">{formatPrice(order.pricing.total)}</span>
              </div>
              <div className="text-[11px] text-[#092328]/60 pt-1">
                Payment: <strong className="uppercase">{order.payment.method}</strong> ({order.payment.status})
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => {
                setActiveView('shop');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex-1 py-3.5 bg-[#092328] text-white text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-[#12544F] transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Continue Shopping</span>
            </button>
            <button
              onClick={() => {
                setActiveView('account');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-6 py-3.5 border border-[#092328]/20 text-[#092328] text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-[#FAF8F5] transition-colors cursor-pointer"
            >
              View In Customer Portal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
