import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Sparkles, Check, ArrowRight } from 'lucide-react';
import clothImg from '../../assets/images/cloth.webp';
import bannerLogo from '../../assets/images/banner.png';

export const CraftsmanshipBanner: React.FC = () => {
  const { setActiveView, setSelectedProductId } = useStore();

  const features = [
    { title: 'Pure Hand-Spun Raw Silks', desc: 'Sourced from authentic heritage looms with natural lustrous drape.' },
    { title: 'Master Zardozi & Dabka Artistry', desc: 'Over 80 hours of meticulous hand-embroidery per bridal couture piece.' },
    { title: 'Breathable Inner Linings', desc: 'No stiff synthetics; lined with buttery soft mulmul and silk tissue.' },
    { title: 'Made for Modern Movement', desc: 'Tailored pockets, comfortable sleeve drops, and graceful silhouettes.' }
  ];

  const handleInspectGarment = () => {
    setSelectedProductId('prod-cloth-signature');
    setActiveView('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-20 sm:py-28 bg-[#092328] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Visual Column featuring cloth.webp real garment texture */}
          <div className="relative">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-[#2A835F]/40 shadow-2xl group">
              <img
                src={clothImg}
                alt="Comfort Atelier Craftsmanship - Real Stitching & Fabric Texture"
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#092328]/95 via-transparent to-black/20" />

              {/* Floating emblem stamp */}
              <div className="absolute top-5 right-5 flex items-center gap-2 bg-[#092328]/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#8BBB92]/40 shadow-lg">
                <img src={bannerLogo} alt="Comfort Seal" className="w-5 h-5 object-contain rounded-full" />
                <span className="text-[11px] font-semibold text-[#8BBB92] uppercase tracking-wider">
                  Artisan Verified
                </span>
              </div>

              {/* Bottom Quote & Action Card */}
              <div className="absolute bottom-6 left-6 right-6 p-6 bg-[#092328]/85 backdrop-blur-md rounded-2xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs uppercase tracking-[0.2em] text-[#8BBB92] font-semibold">
                    Atelier Philosophy
                  </span>
                  <p className="font-serif-luxury text-xl sm:text-2xl font-light text-white mt-0.5">
                    "True luxury must never compromise on comfort."
                  </p>
                </div>
                <button
                  onClick={handleInspectGarment}
                  className="shrink-0 px-4 py-2 bg-[#FAF8F5] text-[#092328] hover:bg-[#8BBB92] text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                >
                  View Garment
                </button>
              </div>
            </div>
          </div>

          {/* Text & Content Column */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-[#8BBB92]" />
                <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#8BBB92]">
                  The Comfort Standard
                </span>
              </div>
              <h2 className="font-serif-luxury text-3xl sm:text-5xl font-light leading-tight text-white">
                Elegance in Every Stitch, Confidence in Every Step
              </h2>
              <p className="text-sm sm:text-base text-[#FAF8F5]/80 mt-4 leading-relaxed font-light">
                Every Comfort garment begins in our Lahore ateliers, where fourth-generation artisan families weave together century-old Mughal threadcraft with contemporary, flattering cuts tailored for the dynamic modern woman.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((item, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center gap-2 text-[#8BBB92]">
                    <Check className="w-4 h-4 shrink-0" />
                    <h4 className="text-xs font-semibold text-white tracking-wide">{item.title}</h4>
                  </div>
                  <p className="text-xs text-[#FAF8F5]/70 pl-6 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  setActiveView('about');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#8BBB92] text-[#092328] hover:bg-white text-xs font-semibold uppercase tracking-widest rounded-xl transition-all cursor-pointer shadow-lg"
              >
                <span>Read Our Atelier Story</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
