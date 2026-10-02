import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Tag, Plus, Trash2, CheckCircle2, XCircle, X } from 'lucide-react';
import { Coupon } from '../../types';

export const AdminDiscounts: React.FC = () => {
  const { coupons, addCoupon, updateCoupon, deleteCoupon, formatPrice, showToast } = useStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [code, setCode] = useState('');
  const [type, setType] = useState<Coupon['type']>('percentage');
  const [value, setValue] = useState(10);
  const [minOrderValue, setMinOrderValue] = useState(15000);
  const [usageLimit, setUsageLimit] = useState(500);
  const [expiresAt, setExpiresAt] = useState('2026-12-31');
  const [description, setDescription] = useState('');

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code) {
      showToast('Please specify a coupon code', 'error');
      return;
    }

    addCoupon({
      code: code.trim().toUpperCase(),
      type,
      value: Number(value),
      minOrderValue: Number(minOrderValue),
      usageLimit: Number(usageLimit),
      isActive: true,
      expiresAt: `${expiresAt}T23:59:59Z`,
      description: description || `${type === 'percentage' ? `${value}% off` : `Rs. ${value} off`} orders over ${formatPrice(minOrderValue)}.`
    });

    setIsModalOpen(false);
    setCode('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="font-serif-luxury text-3xl font-semibold text-[#092328]">
            Discounts & Promotional Codes
          </h1>
          <p className="text-xs text-[#092328]/60 mt-0.5">
            Configure seasonal codes, min order thresholds, usage caps, and free shipping incentives.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-[#092328] text-white rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-[#12544F] flex items-center gap-2 cursor-pointer shadow-sm w-max"
        >
          <Plus className="w-4 h-4" />
          <span>Create Coupon</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {coupons.map((coupon) => (
          <div
            key={coupon.id}
            className={`p-6 rounded-3xl border bg-white shadow-xs space-y-4 relative ${
              coupon.isActive ? 'border-[#092328]/10' : 'border-[#092328]/5 opacity-60'
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <span className="font-mono text-base font-bold text-[#12544F] tracking-wide">
                  {coupon.code}
                </span>
                <span className="block text-[11px] text-[#092328]/50 capitalize mt-0.5">
                  Type: {coupon.type.replace('_', ' ')}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => updateCoupon(coupon.id, { isActive: !coupon.isActive })}
                  className="p-1 cursor-pointer"
                  title={coupon.isActive ? 'Deactivate' : 'Activate'}
                >
                  {coupon.isActive ? (
                    <CheckCircle2 className="w-5 h-5 text-[#2A835F]" />
                  ) : (
                    <XCircle className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                <button
                  onClick={() => deleteCoupon(coupon.id)}
                  className="p-1 text-gray-400 hover:text-rose-600 transition-colors cursor-pointer"
                  title="Delete Coupon"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <p className="text-xs text-[#092328]/70 leading-relaxed min-h-[36px]">
              {coupon.description}
            </p>

            <div className="pt-2 border-t border-[#092328]/10 grid grid-cols-2 gap-2 text-[11px] text-[#092328]/70">
              <div>
                <span>Benefit:</span>
                <strong className="block text-[#092328]">
                  {coupon.type === 'percentage'
                    ? `${coupon.value}% Off`
                    : coupon.type === 'fixed'
                    ? `Flat ${formatPrice(coupon.value)}`
                    : 'Free Delivery'}
                </strong>
              </div>

              <div>
                <span>Min Order:</span>
                <strong className="block text-[#092328] tabular-nums">
                  {formatPrice(coupon.minOrderValue)}
                </strong>
              </div>

              <div>
                <span>Redemptions:</span>
                <strong className="block text-[#092328] tabular-nums">
                  {coupon.usedCount} / {coupon.usageLimit}
                </strong>
              </div>

              <div>
                <span>Expires:</span>
                <strong className="block text-[#092328]">
                  {new Date(coupon.expiresAt).toLocaleDateString()}
                </strong>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Coupon Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#092328]/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-5 shadow-2xl border border-[#092328]/10">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-serif-luxury text-xl text-[#092328]">Create Discount Code</h3>
                <p className="text-xs text-[#092328]/60 mt-0.5">Configure checkout promo discount rules.</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-1">
                <X className="w-5 h-5 text-[#092328]/60" />
              </button>
            </div>

            <form onSubmit={handleCreateCoupon} className="space-y-4 text-xs">
              <div>
                <label className="block text-xs font-semibold text-[#092328] mb-1">
                  Coupon Code *
                </label>
                <input
                  type="text"
                  required
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  placeholder="e.g. EID2026"
                  className="w-full p-2.5 font-mono uppercase bg-[#FAF8F5] border border-[#092328]/20 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#092328] mb-1">Type</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as any)}
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#092328]/20 rounded-xl"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed Amount (PKR)</option>
                    <option value="free_shipping">Free Shipping</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#092328] mb-1">Value</label>
                  <input
                    type="number"
                    value={value}
                    onChange={(e) => setValue(Number(e.target.value))}
                    className="w-full p-2.5 font-mono bg-[#FAF8F5] border border-[#092328]/20 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#092328] mb-1">
                    Min Order (PKR)
                  </label>
                  <input
                    type="number"
                    value={minOrderValue}
                    onChange={(e) => setMinOrderValue(Number(e.target.value))}
                    className="w-full p-2.5 font-mono bg-[#FAF8F5] border border-[#092328]/20 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#092328] mb-1">
                    Usage Cap
                  </label>
                  <input
                    type="number"
                    value={usageLimit}
                    onChange={(e) => setUsageLimit(Number(e.target.value))}
                    className="w-full p-2.5 font-mono bg-[#FAF8F5] border border-[#092328]/20 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#092328] mb-1">
                  Expiration Date
                </label>
                <input
                  type="date"
                  value={expiresAt}
                  onChange={(e) => setExpiresAt(e.target.value)}
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#092328]/20 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#092328] mb-1">
                  Description
                </label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g. 10% seasonal discount on Festive orders."
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#092328]/20 rounded-xl"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#12544F] text-white rounded-xl font-semibold shadow"
                >
                  Save Coupon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
