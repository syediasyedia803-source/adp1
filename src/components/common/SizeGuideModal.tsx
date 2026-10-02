import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { X, Sparkles, CheckCircle2 } from 'lucide-react';

export const SizeGuideModal: React.FC = () => {
  const { sizeGuideProduct, setSizeGuideProduct } = useStore();

  const [unit, setUnit] = useState<'inches' | 'cm'>('inches');
  const [userBust, setUserBust] = useState<string>('');
  const [userWaist, setUserWaist] = useState<string>('');
  const [userHip, setUserHip] = useState<string>('');
  const [recommendedSize, setRecommendedSize] = useState<string | null>(null);

  if (!sizeGuideProduct) return null;

  // Standard Pakistani Couture sizing chart
  const measurementsInches = [
    { size: 'XS', bust: '34', waist: '28', hip: '38', shoulder: '14.0', sleeve: '21.5', length: '42' },
    { size: 'S', bust: '36', waist: '30', hip: '40', shoulder: '14.5', sleeve: '22.0', length: '44' },
    { size: 'M', bust: '39', waist: '33', hip: '43', shoulder: '15.0', sleeve: '22.5', length: '45' },
    { size: 'L', bust: '42', waist: '36', hip: '46', shoulder: '15.5', sleeve: '23.0', length: '46' },
    { size: 'XL', bust: '45', waist: '39', hip: '49', shoulder: '16.0', sleeve: '23.5', length: '46' }
  ];

  const calculateRecommendation = () => {
    const b = parseFloat(userBust);
    if (isNaN(b)) return;

    if (b <= 34.5) setRecommendedSize('XS');
    else if (b <= 37) setRecommendedSize('S');
    else if (b <= 40) setRecommendedSize('M');
    else if (b <= 43) setRecommendedSize('L');
    else setRecommendedSize('XL');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-[#092328]/70 backdrop-blur-xs transition-opacity"
        onClick={() => setSizeGuideProduct(null)}
      />

      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-[#092328]/10 overflow-hidden">
          {/* Header */}
          <div className="p-6 bg-[#092328] text-white flex items-center justify-between">
            <div>
              <h3 className="font-serif-luxury text-xl font-semibold tracking-wide">
                Atelier Sizing Guide & Fit Assistant
              </h3>
              <p className="text-xs text-[#8BBB92] mt-0.5">
                {sizeGuideProduct.title} ({sizeGuideProduct.category})
              </p>
            </div>
            <button
              onClick={() => setSizeGuideProduct(null)}
              className="p-1.5 text-white/60 hover:text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Interactive "Find My Size" Calculator */}
            <div className="p-4 bg-[#8BBB92]/10 border border-[#2A835F]/30 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#12544F]">
                  <Sparkles className="w-4 h-4 text-[#2A835F]" />
                  <span>Find My Size Assistant</span>
                </div>
                <div className="flex items-center text-xs bg-white border border-[#092328]/10 rounded-lg p-0.5">
                  <button
                    onClick={() => setUnit('inches')}
                    className={`px-2.5 py-0.5 rounded text-[11px] font-medium transition-colors ${
                      unit === 'inches' ? 'bg-[#12544F] text-white' : 'text-[#092328]/70'
                    }`}
                  >
                    Inches
                  </button>
                  <button
                    onClick={() => setUnit('cm')}
                    className={`px-2.5 py-0.5 rounded text-[11px] font-medium transition-colors ${
                      unit === 'cm' ? 'bg-[#12544F] text-white' : 'text-[#092328]/70'
                    }`}
                  >
                    Centimeters
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-[#092328]/70 mb-1">
                    Bust ({unit})
                  </label>
                  <input
                    type="number"
                    value={userBust}
                    onChange={(e) => {
                      setUserBust(e.target.value);
                      setRecommendedSize(null);
                    }}
                    placeholder="e.g. 36"
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#092328]/20 rounded-md focus:outline-none focus:border-[#12544F]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-[#092328]/70 mb-1">
                    Waist ({unit})
                  </label>
                  <input
                    type="number"
                    value={userWaist}
                    onChange={(e) => setUserWaist(e.target.value)}
                    placeholder="e.g. 30"
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#092328]/20 rounded-md focus:outline-none focus:border-[#12544F]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-[#092328]/70 mb-1">
                    Hip ({unit})
                  </label>
                  <input
                    type="number"
                    value={userHip}
                    onChange={(e) => setUserHip(e.target.value)}
                    placeholder="e.g. 40"
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#092328]/20 rounded-md focus:outline-none focus:border-[#12544F]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={calculateRecommendation}
                  className="px-4 py-1.5 bg-[#12544F] text-white text-xs font-semibold rounded-md hover:bg-[#092328] transition-colors cursor-pointer"
                >
                  Calculate Best Fit
                </button>

                {recommendedSize && (
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#2A835F] bg-white px-3 py-1 rounded border border-[#2A835F]/30">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Your Recommended Fit: <strong>{recommendedSize}</strong></span>
                  </div>
                )}
              </div>
            </div>

            {/* Standard Measurement Matrix */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#092328]/80 mb-3">
                Garment Measurement Specification ({unit})
              </h4>
              <div className="overflow-x-auto border border-[#092328]/10 rounded-xl">
                <table className="w-full text-xs text-left">
                  <thead className="bg-[#FAF8F5] text-[#092328] uppercase text-[10px] tracking-wider border-b border-[#092328]/10">
                    <tr>
                      <th className="py-2.5 px-3">Size</th>
                      <th className="py-2.5 px-3">Bust</th>
                      <th className="py-2.5 px-3">Waist</th>
                      <th className="py-2.5 px-3">Hip</th>
                      <th className="py-2.5 px-3">Shoulder</th>
                      <th className="py-2.5 px-3">Sleeve</th>
                      <th className="py-2.5 px-3">Shirt Length</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#092328]/10 font-mono tabular-nums text-[#092328]">
                    {measurementsInches.map((row) => {
                      const isRec = recommendedSize === row.size;
                      const factor = unit === 'cm' ? 2.54 : 1;
                      const formatVal = (v: string) => Math.round(parseFloat(v) * factor);
                      return (
                        <tr
                          key={row.size}
                          className={`hover:bg-[#FAF8F5] transition-colors ${
                            isRec ? 'bg-[#8BBB92]/20 font-bold text-[#12544F]' : ''
                          }`}
                        >
                          <td className="py-2.5 px-3 font-sans font-semibold text-[#12544F]">
                            {row.size} {isRec && '★'}
                          </td>
                          <td className="py-2.5 px-3">{formatVal(row.bust)}</td>
                          <td className="py-2.5 px-3">{formatVal(row.waist)}</td>
                          <td className="py-2.5 px-3">{formatVal(row.hip)}</td>
                          <td className="py-2.5 px-3">{formatVal(row.shoulder)}</td>
                          <td className="py-2.5 px-3">{formatVal(row.sleeve)}</td>
                          <td className="py-2.5 px-3">{formatVal(row.length)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Custom Sizing Note */}
            <div className="text-[11px] text-[#092328]/70 border-t border-[#092328]/10 pt-3 flex items-center justify-between">
              <span>Need bespoke armhole, sleeve length, or trouser alteration?</span>
              <span className="font-semibold text-[#12544F]">
                Add notes during checkout or contact Atelier WhatsApp
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
