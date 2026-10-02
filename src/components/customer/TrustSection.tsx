import React from 'react';
import { Truck, ShieldCheck, RotateCcw, Sparkles, Clock } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const TrustSection: React.FC = () => {
  const { formatPrice, settings } = useStore();

  const benefits = [
    {
      icon: <Truck className="w-5 h-5 text-[#2A835F]" />,
      title: 'Free Express Shipping',
      desc: `Nationwide on orders over ${formatPrice(settings.freeShippingThreshold)}`
    },
    {
      icon: <Sparkles className="w-5 h-5 text-[#2A835F]" />,
      title: 'Heirloom Craftsmanship',
      desc: '100% Pure Raw Silk, Velvet & Hand Zardozi'
    },
    {
      icon: <RotateCcw className="w-5 h-5 text-[#2A835F]" />,
      title: '14-Day Easy Exchange',
      desc: 'Doorstep pickup & hassle-free return policy'
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#2A835F]" />,
      title: 'Cash on Delivery',
      desc: 'Inspect package on arrival before payment'
    },
    {
      icon: <Clock className="w-5 h-5 text-[#2A835F]" />,
      title: 'Styling Concierge',
      desc: 'Bespoke tailoring advice via WhatsApp'
    }
  ];

  return (
    <section className="bg-white border-y border-[#092328]/10 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 sm:gap-4 divide-y md:divide-y-0 md:divide-x divide-[#092328]/10">
          {benefits.map((b, idx) => (
            <div
              key={idx}
              className={`flex items-center gap-3 pt-3 md:pt-0 ${
                idx !== 0 ? 'md:pl-4 lg:pl-6' : ''
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-[#12544F]/5 flex items-center justify-center shrink-0">
                {b.icon}
              </div>
              <div>
                <h4 className="text-xs font-semibold text-[#092328] tracking-tight">{b.title}</h4>
                <p className="text-[11px] text-[#092328]/60 mt-0.5 leading-snug">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
