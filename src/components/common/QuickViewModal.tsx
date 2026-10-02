import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { X, Heart, Star, ShoppingBag, ArrowRight } from 'lucide-react';
import { ProductVariant } from '../../types';

export const QuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
    formatPrice,
    setSelectedProductId,
    setActiveView
  } = useStore();

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);

  if (!quickViewProduct) return null;

  const currentVariant = selectedVariant || quickViewProduct.variants[0];
  const isWish = isInWishlist(quickViewProduct.id);

  const handleAddToCart = () => {
    if (!currentVariant) return;
    addToCart(quickViewProduct, currentVariant, 1);
    setQuickViewProduct(null);
  };

  const handleViewFullDetails = () => {
    setSelectedProductId(quickViewProduct.id);
    setActiveView('product');
    setQuickViewProduct(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-[#092328]/70 backdrop-blur-xs transition-opacity"
        onClick={() => setQuickViewProduct(null)}
      />

      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-[#092328]/10 overflow-hidden">
          <button
            onClick={() => setQuickViewProduct(null)}
            className="absolute right-4 top-4 z-10 p-2 bg-white/80 hover:bg-white text-[#092328] rounded-full shadow-md transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Gallery Column */}
            <div className="p-6 bg-[#FAF8F5] flex flex-col justify-between">
              <div className="aspect-[3/4] w-full rounded-xl overflow-hidden bg-white shadow-inner border border-[#092328]/5">
                <img
                  src={quickViewProduct.images[selectedImageIdx] || quickViewProduct.images[0]}
                  alt={quickViewProduct.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {quickViewProduct.images.length > 1 && (
                <div className="flex gap-2 mt-4 overflow-x-auto">
                  {quickViewProduct.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIdx(idx)}
                      className={`w-14 h-18 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                        selectedImageIdx === idx ? 'border-[#12544F]' : 'border-transparent opacity-70'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details Column */}
            <div className="p-6 sm:p-8 flex flex-col justify-between">
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs uppercase tracking-wider font-semibold text-[#2A835F]">
                      {quickViewProduct.category}
                    </span>
                    {quickViewProduct.badge && (
                      <span className="text-[10px] uppercase font-bold text-[#092328] bg-[#8BBB92]/30 px-2 py-0.5 rounded">
                        {quickViewProduct.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="font-serif-luxury text-2xl font-semibold text-[#092328] mt-1">
                    {quickViewProduct.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="text-xs text-[#092328]/60">
                      {quickViewProduct.rating} ({quickViewProduct.reviewCount} verified reviews)
                    </span>
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-3">
                  <span className="text-xl font-bold text-[#12544F] tabular-nums">
                    {formatPrice(currentVariant.price)}
                  </span>
                  {currentVariant.compareAtPrice && (
                    <span className="text-sm text-[#092328]/40 line-through tabular-nums">
                      {formatPrice(currentVariant.compareAtPrice)}
                    </span>
                  )}
                </div>

                <p className="text-xs text-[#092328]/70 leading-relaxed line-clamp-3">
                  {quickViewProduct.description}
                </p>

                {/* Variant: Size Selector */}
                <div>
                  <div className="flex justify-between items-center mb-1.5 text-xs">
                    <span className="font-medium text-[#092328]">
                      Selected Size: <strong>{currentVariant.size}</strong>
                    </span>
                    <span className="text-[#2A835F] text-[11px] font-semibold">
                      {currentVariant.stock > 0 ? `${currentVariant.stock} in stock` : 'Out of stock'}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {quickViewProduct.variants.map((v) => (
                      <button
                        key={v.id}
                        onClick={() => setSelectedVariant(v)}
                        className={`min-w-10 py-1.5 px-3 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                          currentVariant.id === v.id
                            ? 'bg-[#12544F] text-white shadow-sm'
                            : 'bg-[#FAF8F5] text-[#092328] border border-[#092328]/20 hover:border-[#12544F]'
                        }`}
                      >
                        {v.size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Fabric Info */}
                <div className="text-xs text-[#092328]/80 bg-[#FAF8F5] p-3 rounded-xl border border-[#092328]/5 space-y-1">
                  <p><strong>Fabric:</strong> {quickViewProduct.fabric}</p>
                  <p><strong>Style:</strong> {quickViewProduct.style}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-6 space-y-3">
                <div className="flex gap-2">
                  <button
                    onClick={handleAddToCart}
                    disabled={currentVariant.stock <= 0}
                    className="flex-1 py-3 bg-[#092328] text-white text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-[#12544F] transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>{currentVariant.stock > 0 ? 'Add to Bag' : 'Sold Out'}</span>
                  </button>

                  <button
                    onClick={() => toggleWishlist(quickViewProduct.id)}
                    className="p-3 border border-[#092328]/20 rounded-xl hover:bg-[#FAF8F5] transition-colors cursor-pointer text-[#092328]"
                    aria-label="Wishlist"
                  >
                    <Heart className={`w-4 h-4 ${isWish ? 'fill-rose-500 text-rose-500' : ''}`} />
                  </button>
                </div>

                <button
                  onClick={handleViewFullDetails}
                  className="w-full text-center text-xs font-semibold text-[#12544F] hover:underline flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span>View Complete Garment Specifications</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
