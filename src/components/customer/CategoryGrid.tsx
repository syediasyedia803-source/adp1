import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ArrowUpRight } from 'lucide-react';

export const CategoryGrid: React.FC = () => {
  const { categories, setSelectedCategory, setActiveView } = useStore();

  const handleCategorySelect = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setActiveView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-16 sm:py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-[1px] bg-[#12544F]"></span>
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#12544F]">
                Curated Silhouettes
              </span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-normal text-[#092328]">
              Shop by Category
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#092328]/70 max-w-md mt-2 md:mt-0 leading-relaxed">
            From regal hand-worked festive kalidars to everyday breathable linen co-ord sets, discover Comfort garments designed for every moment.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {categories.filter((c) => c.status === 'active').map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategorySelect(cat.name)}
              className="group relative flex flex-col overflow-hidden rounded-2xl bg-white border border-[#092328]/10 text-left transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
            >
              {/* Image Frame */}
              <div className="aspect-[4/5] w-full overflow-hidden bg-[#FAF8F5] relative">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#092328]/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/90 text-[#092328] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#12544F]" />
                </div>
              </div>

              {/* Title & Metadata */}
              <div className="p-3.5 bg-white">
                <h3 className="text-xs sm:text-sm font-semibold text-[#092328] group-hover:text-[#12544F] transition-colors truncate">
                  {cat.name}
                </h3>
                <p className="text-[11px] text-[#092328]/60 mt-0.5">
                  {cat.itemCount} Designs
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
