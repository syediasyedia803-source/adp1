import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from './ProductCard';
import { ArrowRight } from 'lucide-react';

export const FeaturedCollection: React.FC = () => {
  const { products, setActiveView, setSelectedCategory } = useStore();
  const [activeTab, setActiveTab] = useState<'All' | 'New' | 'Bestseller' | 'Festive' | 'Co-Ord'>('All');

  const filtered = products.filter((p) => {
    if (!p.isPublished) return false;
    if (activeTab === 'All') return true;
    if (activeTab === 'New') return p.badge === 'New' || p.badge === 'Trending';
    if (activeTab === 'Bestseller') return p.badge === 'Bestseller';
    if (activeTab === 'Festive') return p.category === 'Luxury Pret' || p.category === 'Velvet Edition';
    if (activeTab === 'Co-Ord') return p.category === 'Co-Ord Sets';
    return true;
  });

  const handleViewAll = () => {
    setSelectedCategory(null);
    setActiveView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-[#092328]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Title and Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-[1px] bg-[#2A835F]"></span>
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#2A835F]">
                Featured Collection
              </span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-normal text-[#092328]">
              The Atelier Showcase
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-[#FAF8F5] rounded-xl border border-[#092328]/10 overflow-x-auto">
            {(['All', 'New', 'Bestseller', 'Festive', 'Co-Ord'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === tab
                    ? 'bg-[#092328] text-white shadow-sm'
                    : 'text-[#092328]/70 hover:text-[#092328] hover:bg-white/50'
                }`}
              >
                {tab === 'All' ? 'All Pieces' : tab}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {filtered.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All CTA */}
        <div className="mt-14 text-center">
          <button
            onClick={handleViewAll}
            className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-[#092328] text-[#092328] hover:bg-[#092328] hover:text-white rounded-xl text-xs font-semibold uppercase tracking-widest transition-all cursor-pointer"
          >
            <span>Explore Entire Collection ({products.length} Garments)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
