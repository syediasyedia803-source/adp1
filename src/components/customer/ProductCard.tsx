import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Product } from '../../types';
import { Heart, Eye, ShoppingBag, Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    setSelectedProductId,
    setActiveView,
    toggleWishlist,
    isInWishlist,
    setQuickViewProduct,
    addToCart,
    formatPrice
  } = useStore();

  const isWish = isInWishlist(product.id);
  const defaultVariant = product.variants[0];
  const isOutOfStock = product.stock <= 0;

  const handleCardClick = () => {
    setSelectedProductId(product.id);
    setActiveView('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isOutOfStock) return;
    if (product.variants.length > 1) {
      setQuickViewProduct(product);
    } else {
      addToCart(product, defaultVariant, 1);
    }
  };

  const badgeStyles: Record<string, string> = {
    Bestseller: 'bg-[#092328] text-[#8BBB92]',
    Trending: 'bg-[#12544F] text-white',
    New: 'bg-[#2A835F] text-white',
    Sale: 'bg-rose-700 text-white',
    'Limited Stock': 'bg-amber-700 text-white',
    'Sold Out': 'bg-zinc-800 text-zinc-300'
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative flex flex-col bg-white rounded-2xl border border-[#092328]/10 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#FAF8F5]">
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          referrerPolicy="no-referrer"
        />

        {/* Secondary image preview on hover if available */}
        {product.images[1] && (
          <img
            src={product.images[1]}
            alt={product.title}
            className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
            referrerPolicy="no-referrer"
          />
        )}

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3 z-10">
            <span
              className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded shadow-sm ${
                badgeStyles[product.badge] || 'bg-[#092328] text-white'
              }`}
            >
              {product.badge}
            </span>
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-[#092328] shadow-md hover:bg-white hover:scale-110 transition-all cursor-pointer"
          aria-label="Save to Wishlist"
        >
          <Heart className={`w-4 h-4 ${isWish ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>

        {/* Hover Quick Actions Bar */}
        <div className="absolute inset-x-3 bottom-3 z-10 flex gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="flex-1 py-2.5 px-3 bg-white/95 backdrop-blur-xs text-[#092328] hover:text-[#12544F] text-xs font-semibold rounded-lg shadow-md hover:bg-white transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>

          <button
            onClick={handleQuickAdd}
            disabled={isOutOfStock}
            className="p-2.5 bg-[#092328] text-white hover:bg-[#12544F] rounded-lg shadow-md transition-colors flex items-center justify-center cursor-pointer disabled:opacity-50"
            aria-label="Add to Bag"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Details Container */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-2">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-[11px] text-[#092328]/60 mb-1">
            <span className="uppercase tracking-wider font-medium text-[#2A835F]">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-amber-500">
              <Star className="w-3 h-3 fill-current" />
              <span className="text-[#092328]/70 text-[10px] tabular-nums font-semibold">
                {product.rating}
              </span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xs sm:text-sm font-semibold text-[#092328] group-hover:text-[#12544F] transition-colors line-clamp-1">
            {product.title}
          </h3>

          {/* Fabric Subtitle */}
          <p className="text-[11px] text-[#092328]/50 line-clamp-1 mt-0.5">
            {product.fabric}
          </p>
        </div>

        {/* Pricing & Variant Indicators */}
        <div className="pt-2 border-t border-[#092328]/5 flex items-baseline justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-sm sm:text-base font-bold text-[#092328] tabular-nums">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="text-xs text-[#092328]/40 line-through tabular-nums">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>

          {/* Size Pills count */}
          <span className="text-[10px] text-[#092328]/50 uppercase tracking-wider">
            {product.variants.length} Sizes
          </span>
        </div>
      </div>
    </div>
  );
};
