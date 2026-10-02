import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Sliders, RotateCcw, Check, Globe } from 'lucide-react';
import { StoreSettings } from '../../types';

export const AdminSettings: React.FC = () => {
  const { settings, updateSettings, changeCurrency, resetToDefaultData, formatPrice } = useStore();

  const [storeName, setStoreName] = useState(settings.storeName);
  const [tagline, setTagline] = useState(settings.tagline);
  const [freeShippingThreshold, setFreeShippingThreshold] = useState(settings.freeShippingThreshold);
  const [defaultShippingFee, setDefaultShippingFee] = useState(settings.defaultShippingFee);
  const [contactEmail, setContactEmail] = useState(settings.contactEmail);
  const [contactPhone, setContactPhone] = useState(settings.contactPhone);
  const [whatsappNumber, setWhatsappNumber] = useState(settings.whatsappNumber);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      storeName,
      tagline,
      freeShippingThreshold: Number(freeShippingThreshold),
      defaultShippingFee: Number(defaultShippingFee),
      contactEmail,
      contactPhone,
      whatsappNumber
    });
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="font-serif-luxury text-3xl font-semibold text-[#092328]">
          Atelier Global Configuration
        </h1>
        <p className="text-xs text-[#092328]/60 mt-0.5">
          Multi-currency rates, free shipping thresholds, contact lines, and store parameters.
        </p>
      </div>

      <form onSubmit={handleSave} className="bg-white p-6 sm:p-8 rounded-3xl border border-[#092328]/10 shadow-xs space-y-6 text-xs">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-[#092328] border-b border-[#092328]/10 pb-3">
          Brand Identity & Currency
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#092328] mb-1">
              Store Brand Name
            </label>
            <input
              type="text"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              className="w-full p-2.5 bg-[#FAF8F5] border border-[#092328]/20 rounded-xl"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#092328] mb-1">
              Brand Tagline
            </label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className="w-full p-2.5 bg-[#FAF8F5] border border-[#092328]/20 rounded-xl"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#092328] mb-1">
              Active Store Currency
            </label>
            <div className="flex gap-2">
              {(['PKR', 'USD', 'GBP', 'AED', 'EUR'] as const).map((curr) => (
                <button
                  key={curr}
                  type="button"
                  onClick={() => changeCurrency(curr)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    settings.currency === curr
                      ? 'bg-[#12544F] text-white shadow-xs'
                      : 'bg-[#FAF8F5] border border-[#092328]/15 text-[#092328]'
                  }`}
                >
                  {curr}
                </button>
              ))}
            </div>
          </div>
        </div>

        <h3 className="text-sm font-semibold uppercase tracking-wider text-[#092328] border-b border-[#092328]/10 pb-3 pt-4">
          Shipping & Logistics Parameters
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#092328] mb-1">
              Free Shipping Threshold (PKR)
            </label>
            <input
              type="number"
              value={freeShippingThreshold}
              onChange={(e) => setFreeShippingThreshold(Number(e.target.value))}
              className="w-full p-2.5 font-mono bg-[#FAF8F5] border border-[#092328]/20 rounded-xl"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#092328] mb-1">
              Standard Courier Shipping Fee (PKR)
            </label>
            <input
              type="number"
              value={defaultShippingFee}
              onChange={(e) => setDefaultShippingFee(Number(e.target.value))}
              className="w-full p-2.5 font-mono bg-[#FAF8F5] border border-[#092328]/20 rounded-xl"
            />
          </div>
        </div>

        <h3 className="text-sm font-semibold uppercase tracking-wider text-[#092328] border-b border-[#092328]/10 pb-3 pt-4">
          Customer Concierge Lines
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#092328] mb-1">
              Concierge Email
            </label>
            <input
              type="email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              className="w-full p-2.5 bg-[#FAF8F5] border border-[#092328]/20 rounded-xl"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#092328] mb-1">
              Phone Line
            </label>
            <input
              type="text"
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              className="w-full p-2.5 bg-[#FAF8F5] border border-[#092328]/20 rounded-xl"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#092328] mb-1">
              WhatsApp Concierge
            </label>
            <input
              type="text"
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value)}
              className="w-full p-2.5 bg-[#FAF8F5] border border-[#092328]/20 rounded-xl"
            />
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="px-8 py-3 bg-[#092328] text-white font-semibold rounded-xl hover:bg-[#12544F] transition-colors cursor-pointer shadow-md"
          >
            Save Global Settings
          </button>
        </div>
      </form>

      {/* Danger Zone: Factory Reset */}
      <div className="p-6 bg-rose-50 border border-rose-200 rounded-3xl space-y-3">
        <h4 className="text-xs font-bold text-rose-800 uppercase tracking-wider">
          Demo Data Maintenance
        </h4>
        <p className="text-xs text-rose-700 leading-relaxed">
          Restore Comfort’s default catalog, demo Pakistani couture products, sample orders, reviews, and audit logs.
        </p>
        <button
          onClick={() => {
            if (confirm('Restore factory demo catalog and sample orders?')) {
              resetToDefaultData();
            }
          }}
          className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset to Factory Demo Data</span>
        </button>
      </div>
    </div>
  );
};
