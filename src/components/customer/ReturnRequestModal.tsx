import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { X, RotateCcw, AlertCircle, CheckCircle2 } from 'lucide-react';

export const ReturnRequestModal: React.FC = () => {
  const { returningOrder, setReturningOrder, createReturnRequest, customer } = useStore();

  const [selectedItems, setSelectedItems] = useState<{ [variantId: string]: boolean }>({});
  const [itemReasons, setItemReasons] = useState<{ [variantId: string]: string }>({});
  const [overallReason, setOverallReason] = useState('Size exchange needed');

  if (!returningOrder) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const itemsToReturn = returningOrder.items
      .filter((item) => selectedItems[item.variantId])
      .map((item) => ({
        productId: item.productId,
        variantId: item.variantId,
        title: item.title,
        quantity: item.quantity,
        price: item.price,
        reason: itemReasons[item.variantId] || overallReason
      }));

    if (itemsToReturn.length === 0) {
      alert('Please check at least one garment to return or exchange');
      return;
    }

    createReturnRequest({
      orderId: returningOrder.id,
      orderNumber: returningOrder.id,
      customerId: customer?.id || 'guest',
      customerName: returningOrder.customer.name,
      customerEmail: returningOrder.customer.email,
      items: itemsToReturn,
      overallReason
    });

    setReturningOrder(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-[#092328]/70 backdrop-blur-xs transition-opacity"
        onClick={() => setReturningOrder(null)}
      />

      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-[#092328]/10 overflow-hidden">
          <div className="p-6 bg-[#092328] text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <RotateCcw className="w-5 h-5 text-[#8BBB92]" />
              <h3 className="font-serif-luxury text-xl font-normal text-white">
                Request Return or Exchange
              </h3>
            </div>
            <button
              onClick={() => setReturningOrder(null)}
              className="p-1 text-white/60 hover:text-white rounded-full cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div>
              <p className="text-xs text-[#092328]/60">
                Order Reference: <strong>{returningOrder.id}</strong>
              </p>
              <p className="text-[11px] text-[#092328]/60 mt-0.5">
                Select the delivered garment(s) you wish to exchange or return for inspection.
              </p>
            </div>

            {/* Garment Selector */}
            <div className="space-y-3">
              <label className="block text-xs font-semibold text-[#092328] uppercase">
                Select Items to Return
              </label>
              <div className="divide-y divide-[#092328]/10 border border-[#092328]/10 rounded-2xl overflow-hidden">
                {returningOrder.items.map((item) => (
                  <div key={item.variantId} className="p-3.5 flex items-start gap-3 bg-[#FAF8F5]">
                    <input
                      type="checkbox"
                      checked={!!selectedItems[item.variantId]}
                      onChange={(e) =>
                        setSelectedItems({ ...selectedItems, [item.variantId]: e.target.checked })
                      }
                      className="w-4 h-4 mt-1 accent-[#12544F] rounded cursor-pointer"
                    />
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-12 h-16 object-cover rounded-md bg-white border border-[#092328]/10 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-semibold text-[#092328]">{item.title}</h4>
                      <p className="text-[11px] text-[#092328]/60">
                        Size: {item.size} · Color: {item.color}
                      </p>

                      {selectedItems[item.variantId] && (
                        <div className="mt-2">
                          <select
                            value={itemReasons[item.variantId] || 'Size too large'}
                            onChange={(e) =>
                              setItemReasons({ ...itemReasons, [item.variantId]: e.target.value })
                            }
                            className="w-full text-xs p-1.5 bg-white border border-[#092328]/20 rounded-lg"
                          >
                            <option value="Size too large">Size too large - Need smaller</option>
                            <option value="Size too small">Size too small - Need larger</option>
                            <option value="Fabric preference">Fabric feel different from expectation</option>
                            <option value="Fitting adjustment">Bespoke fitting adjustment needed</option>
                            <option value="Color nuance">Color shade variation</option>
                          </select>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Overall Reason & Instructions */}
            <div>
              <label className="block text-xs font-semibold text-[#092328] uppercase mb-1">
                Additional Comments / Exchange Request
              </label>
              <textarea
                rows={3}
                value={overallReason}
                onChange={(e) => setOverallReason(e.target.value)}
                placeholder="Specify preferred replacement size or notes for our atelier..."
                className="w-full p-3 text-xs bg-[#FAF8F5] border border-[#092328]/20 rounded-xl focus:outline-none focus:border-[#12544F]"
              />
            </div>

            <div className="text-[11px] text-[#092328]/60 bg-[#8BBB92]/10 p-3 rounded-xl border border-[#2A835F]/20 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#2A835F] shrink-0 mt-0.5" />
              <span>
                Our concierge team will dispatch a TCS return airway bill and coordinate doorstep collection within 24 hours.
              </span>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setReturningOrder(null)}
                className="px-4 py-2.5 text-xs text-[#092328] border border-[#092328]/20 rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#092328] text-white text-xs font-semibold rounded-xl hover:bg-[#12544F] cursor-pointer shadow-md"
              >
                Submit Return Request
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
