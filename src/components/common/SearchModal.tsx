import React, { useState, useMemo } from 'react';
import { useStore } from '../../context/StoreContext';
import { Search, X, ArrowRight } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    products,
    setSelectedProductId,
    setActiveView,
    formatPrice
  } = useStore();

  const [query, setQuery] = useState('');

  const trendingKeywords = ['Raw Silk', 'Sage Co-Ord', 'Velvet', 'Kalidar', 'Chikankari', 'Lawn'];

  const filteredProducts = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products
      .filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.fabric.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      )
      .slice(0, 6);
  }, [products, query]);

  if (!isSearchOpen) return null;

  const handleSelectProduct = (productId: string) => {
    setSelectedProductId(productId);
    setActiveView('product');
    setIsSearchOpen(false);
    setQuery('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-[#092328]/70 backdrop-blur-xs transition-opacity"
        onClick={() => setIsSearchOpen(false)}
      />

      <div className="relative min-h-screen flex items-start justify-center p-4 sm:p-6 lg:p-8 pt-16 sm:pt-24">
        <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-[#092328]/10 overflow-hidden">
          {/* Search Input Bar */}
          <div className="p-4 sm:p-6 border-b border-[#092328]/10 flex items-center gap-3">
            <Search className="w-5 h-5 text-[#12544F] shrink-0" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by collection, fabric, cut, or SKU (e.g. Silk, Velvet, Sage)..."
              className="w-full text-sm sm:text-base text-[#092328] placeholder-[#092328]/40 focus:outline-none bg-transparent"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="p-1 text-[#092328]/40 hover:text-[#092328] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => setIsSearchOpen(false)}
              className="px-2.5 py-1 text-xs text-[#092328]/60 hover:text-[#092328] border border-[#092328]/10 rounded-md cursor-pointer ml-2"
            >
              ESC
            </button>
          </div>

          {/* Quick Keywords */}
          <div className="px-6 py-3 bg-[#FAF8F5] border-b border-[#092328]/10 flex items-center gap-2 overflow-x-auto text-xs">
            <span className="text-[#092328]/50 font-medium shrink-0">Popular:</span>
            {trendingKeywords.map((kw) => (
              <button
                key={kw}
                onClick={() => setQuery(kw)}
                className="px-2.5 py-1 bg-white border border-[#092328]/10 rounded-full text-xs text-[#092328]/80 hover:border-[#12544F] hover:text-[#12544F] transition-colors whitespace-nowrap cursor-pointer"
              >
                {kw}
              </button>
            ))}
          </div>

          {/* Results Area */}
          <div className="p-6 max-h-[60vh] overflow-y-auto">
            {query.trim() === '' ? (
              <div className="text-center py-10 text-[#092328]/60 text-xs">
                Type something to search Comfort’s catalog of designer pret and bespoke garments.
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-10 space-y-2">
                <p className="text-sm font-semibold text-[#092328]">No couture garments found for "{query}"</p>
                <p className="text-xs text-[#092328]/60">
                  Try searching for terms like "Raw Silk", "Kurti", "Velvet", or "Embroidered".
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-xs font-semibold text-[#092328]/50 uppercase tracking-wider">
                  Products ({filteredProducts.length})
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {filteredProducts.map((prod) => (
                    <button
                      key={prod.id}
                      onClick={() => handleSelectProduct(prod.id)}
                      className="flex items-center gap-3 p-2.5 rounded-xl border border-[#092328]/10 hover:border-[#2A835F] hover:bg-[#FAF8F5] transition-all text-left group cursor-pointer"
                    >
                      <img
                        src={prod.images[0]}
                        alt={prod.title}
                        className="w-14 h-18 object-cover rounded-lg shrink-0 bg-[#092328]/5"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] text-[#2A835F] uppercase font-semibold tracking-wider">
                          {prod.category}
                        </span>
                        <h4 className="text-xs font-medium text-[#092328] group-hover:text-[#12544F] truncate">
                          {prod.title}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs font-bold text-[#092328] tabular-nums">
                            {formatPrice(prod.price)}
                          </span>
                          {prod.compareAtPrice && (
                            <span className="text-[10px] text-[#092328]/40 line-through tabular-nums">
                              {formatPrice(prod.compareAtPrice)}
                            </span>
                          )}
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#092328]/30 group-hover:text-[#12544F] transition-colors" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
