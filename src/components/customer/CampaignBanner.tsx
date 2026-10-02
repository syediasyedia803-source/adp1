import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Sparkles, ArrowRight, Tag, Check, ShoppingBag, Eye, ShieldCheck, Truck } from 'lucide-react';
import confetti from 'canvas-confetti';
import bannerImg from '../../assets/images/banner.png';
import clothImg from '../../assets/images/cloth.webp';

export const CampaignBanner: React.FC = () => {
  const { setActiveView, setSelectedCategory, setSelectedProductId, showToast } = useStore();
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard?.writeText('COMFORT10');
    setCopied(true);
    showToast('Promo code COMFORT10 copied! Enjoy 10% off at checkout.', 'success');
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.7 }
    });
    setTimeout(() => setCopied(false), 3500);
  };

  const handleShopCampaign = () => {
    setSelectedCategory('Luxury Pret');
    setActiveView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewFeaturedProduct = () => {
    setSelectedProductId('prod-cloth-signature');
    setActiveView('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-white via-[#FAF8F5] to-white border-b border-[#092328]/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Campaign Frame Card */}
        <div className="relative rounded-3xl bg-[#092328] text-white overflow-hidden shadow-2xl border border-[#2A835F]/30">
          {/* Subtle Ambient Light Gradients */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#12544F]/40 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-[#2A835F]/20 blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center p-6 sm:p-10 lg:p-14">
            {/* Visual Column featuring banner.png */}
            <div className="lg:col-span-6 xl:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-[#8BBB92]/30 bg-black/40 group aspect-[4/4.2]">
                <img
                  src={bannerImg}
                  alt="Comfort Designer Lady Garments Campaign Banner"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#092328]/80 via-transparent to-black/20" />

                {/* Floating Campaign Badge */}
                <div className="absolute top-4 left-4 bg-[#092328]/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#8BBB92]/40 shadow-lg flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#8BBB92]" />
                  <span className="text-[11px] font-semibold text-[#FAF8F5] uppercase tracking-wider">
                    Official Campaign 2026
                  </span>
                </div>

                {/* Bottom interactive garment teaser overlay */}
                <div className="absolute bottom-4 left-4 right-4 p-3.5 bg-[#092328]/90 backdrop-blur-md rounded-xl border border-white/10 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={clothImg}
                      alt="Featured Cloth"
                      className="w-12 h-14 object-cover rounded-lg border border-[#8BBB92]/40 shrink-0"
                    />
                    <div>
                      <span className="text-[10px] text-[#8BBB92] uppercase font-bold tracking-wider block">
                        Featured Piece
                      </span>
                      <p className="text-xs font-serif-luxury text-white line-clamp-1 font-medium">
                        Meher-o-Maha Embroidered Ensemble
                      </p>
                      <span className="text-xs text-white/90 font-semibold">PKR 26,500</span>
                    </div>
                  </div>

                  <button
                    onClick={handleViewFeaturedProduct}
                    className="p-2 bg-[#8BBB92] text-[#092328] hover:bg-white rounded-lg transition-colors cursor-pointer shrink-0"
                    title="View Product"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Editorial & Promotional Content */}
            <div className="lg:col-span-6 xl:col-span-7 space-y-6">
              {/* Header Kickers */}
              <div className="flex items-center gap-2">
                <span className="w-6 h-[1px] bg-[#8BBB92]"></span>
                <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#8BBB92]">
                  Limited Edition Release
                </span>
              </div>

              {/* Title */}
              <div>
                <h2 className="font-serif-luxury text-3xl sm:text-5xl lg:text-5xl font-light text-white leading-[1.12]">
                  Elegance in Every Stitch, <br />
                  <span className="italic text-[#8BBB92]">Confidence in Every Moment</span>
                </h2>
                <p className="text-sm sm:text-base text-[#FAF8F5]/80 mt-3 font-light leading-relaxed max-w-xl">
                  Discover our exclusive designer collection of pure raw silk kalidars, diaphanous organza dupattas, and handcrafted festive suits. Designed with comfortable breathable linings so you can celebrate without constraint.
                </p>
              </div>

              {/* Exclusive Voucher Box */}
              <div className="bg-[#12544F]/40 border border-[#2A835F]/40 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 backdrop-blur-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-[#8BBB92]" />
                    <span className="text-xs uppercase font-bold tracking-wider text-[#8BBB92]">
                      Welcome Privilege Offer
                    </span>
                  </div>
                  <p className="text-xs text-white/90">
                    Use code <span className="font-bold text-white tracking-widest bg-white/10 px-2 py-0.5 rounded">COMFORT10</span> for 10% OFF orders above PKR 15,000.
                  </p>
                </div>

                <button
                  onClick={handleCopyCode}
                  className={`shrink-0 px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    copied
                      ? 'bg-[#2A835F] text-white shadow-lg'
                      : 'bg-[#FAF8F5] text-[#092328] hover:bg-[#8BBB92]'
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>

              {/* Value Highlights */}
              <div className="grid grid-cols-2 gap-4 pt-1">
                <div className="flex items-center gap-2 text-xs text-white/90">
                  <Truck className="w-4 h-4 text-[#8BBB92] shrink-0" />
                  <span>Free Express Delivery Across Pakistan</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-white/90">
                  <ShieldCheck className="w-4 h-4 text-[#8BBB92] shrink-0" />
                  <span>100% Authentic Hand-Crafted Fabrics</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={handleShopCampaign}
                  className="px-8 py-3.5 bg-[#8BBB92] hover:bg-white text-[#092328] text-xs font-semibold uppercase tracking-widest rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-xl"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Shop The Campaign</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={handleViewFeaturedProduct}
                  className="px-6 py-3.5 border border-white/30 text-white hover:bg-white/10 hover:border-white text-xs font-semibold uppercase tracking-widest rounded-xl transition-all cursor-pointer"
                >
                  Inspect Signature Ensemble
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
