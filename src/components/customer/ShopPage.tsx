import React, { useState, useMemo } from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from './ProductCard';
import {
  SlidersHorizontal,
  LayoutGrid,
  List,
  X,
  Search,
  Check,
  ChevronDown,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import bannerImg from '../../assets/images/banner.png';
import clothImg from '../../assets/images/cloth.webp';

export const ShopPage: React.FC = () => {
  const {
    products,
    categories,
    collections,
    selectedCategory,
    setSelectedCategory,
    setSelectedProductId,
    setActiveView,
    formatPrice
  } = useStore();

  // Filters
  const [search, setSearch] = useState('');
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [maxPrice, setMaxPrice] = useState<number>(50000);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'newest' | 'price-asc' | 'price-desc' | 'bestselling' | 'rating'>('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const colors = [
    { name: 'Deep Forest', hex: '#092328' },
    { name: 'Deep Teal', hex: '#12544F' },
    { name: 'Emerald Green', hex: '#2A835F' },
    { name: 'Soft Sage', hex: '#8BBB92' }
  ];

  const sizes = ['XS', 'S', 'M', 'L', 'XL'];

  // Filtering & Sorting logic
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (!p.isPublished) return false;
      if (search && !p.title.toLowerCase().includes(search.toLowerCase()) && !p.sku.toLowerCase().includes(search.toLowerCase())) {
        return false;
      }
      if (selectedCategory && p.category !== selectedCategory) {
        return false;
      }
      if (selectedCollection && p.collection !== selectedCollection) {
        return false;
      }
      if (selectedSize && !p.variants.some((v) => v.size === selectedSize && v.stock > 0)) {
        return false;
      }
      if (selectedColor && !p.variants.some((v) => v.color.toLowerCase() === selectedColor.toLowerCase())) {
        return false;
      }
      if (p.price > maxPrice) {
        return false;
      }
      if (inStockOnly && p.stock <= 0) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'bestselling') return (b.badge === 'Bestseller' ? 1 : 0) - (a.badge === 'Bestseller' ? 1 : 0);
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [products, search, selectedCategory, selectedCollection, selectedSize, selectedColor, maxPrice, inStockOnly, sortBy]);

  const clearAllFilters = () => {
    setSearch('');
    setSelectedCategory(null);
    setSelectedCollection(null);
    setSelectedSize(null);
    setSelectedColor(null);
    setMaxPrice(50000);
    setInStockOnly(false);
  };

  const hasActiveFilters = Boolean(
    search || selectedCategory || selectedCollection || selectedSize || selectedColor || maxPrice < 50000 || inStockOnly
  );

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Title */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-[#092328]/60 mb-2">
            <span>Home</span>
            <span>/</span>
            <span className="text-[#092328] font-medium">Couture Catalog</span>
            {selectedCategory && (
              <>
                <span>/</span>
                <span className="text-[#12544F] font-semibold">{selectedCategory}</span>
              </>
            )}
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-normal text-[#092328]">
                {selectedCategory || 'All Designer Garments'}
              </h1>
              <p className="text-xs sm:text-sm text-[#092328]/60 mt-1">
                Showing {filteredProducts.length} handcrafted pieces tailored with elegance in every stitch
              </p>
            </div>

            {/* Mobile Filter & View Toggles */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden px-4 py-2 bg-white border border-[#092328]/15 rounded-lg text-xs font-semibold text-[#092328] flex items-center gap-2 shadow-xs cursor-pointer"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#12544F]" />
                <span>Filters {hasActiveFilters && '•'}</span>
              </button>

              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="appearance-none bg-white border border-[#092328]/15 rounded-lg px-3.5 py-2 pr-8 text-xs font-medium text-[#092328] focus:outline-none focus:border-[#12544F] cursor-pointer shadow-xs"
                >
                  <option value="newest">Sort: Newest Arrivals</option>
                  <option value="bestselling">Sort: Bestsellers</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-[#092328]/50 absolute right-2.5 top-3 pointer-events-none" />
              </div>

              {/* View Layout Toggle */}
              <div className="hidden sm:flex items-center bg-white border border-[#092328]/15 rounded-lg p-0.5">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded transition-colors cursor-pointer ${
                    viewMode === 'grid' ? 'bg-[#12544F] text-white' : 'text-[#092328]/60 hover:text-[#092328]'
                  }`}
                  aria-label="Grid view"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded transition-colors cursor-pointer ${
                    viewMode === 'list' ? 'bg-[#12544F] text-white' : 'text-[#092328]/60 hover:text-[#092328]'
                  }`}
                  aria-label="List view"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block space-y-6">
            <div className="p-6 bg-white rounded-2xl border border-[#092328]/10 space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-[#092328]/10 pb-4">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#092328]">
                  <SlidersHorizontal className="w-4 h-4 text-[#12544F]" />
                  <span>Refine Catalog</span>
                </div>
                {hasActiveFilters && (
                  <button
                    onClick={clearAllFilters}
                    className="text-xs text-rose-600 hover:underline cursor-pointer font-medium"
                  >
                    Reset All
                  </button>
                )}
              </div>

              {/* Search Inside Shop */}
              <div>
                <label className="block text-xs font-semibold text-[#092328] mb-2">
                  Keyword Search
                </label>
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-[#092328]/40 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search titles, fabrics..."
                    className="w-full pl-8 pr-3 py-1.5 text-xs bg-[#FAF8F5] border border-[#092328]/15 rounded-lg focus:outline-none focus:border-[#12544F]"
                  />
                </div>
              </div>

              {/* Categories */}
              <div>
                <h4 className="text-xs font-semibold text-[#092328] uppercase tracking-wider mb-2.5">
                  Categories
                </h4>
                <div className="space-y-1">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-between cursor-pointer ${
                      selectedCategory === null
                        ? 'bg-[#12544F] text-white font-medium'
                        : 'text-[#092328]/70 hover:bg-[#FAF8F5]'
                    }`}
                  >
                    <span>All Silhouettes</span>
                    <span className="text-[10px] opacity-70">{products.length}</span>
                  </button>
                  {categories.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedCategory(selectedCategory === c.name ? null : c.name)}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-between cursor-pointer ${
                        selectedCategory === c.name
                          ? 'bg-[#12544F] text-white font-medium'
                          : 'text-[#092328]/70 hover:bg-[#FAF8F5]'
                      }`}
                    >
                      <span>{c.name}</span>
                      <span className="text-[10px] opacity-70">
                        {products.filter((p) => p.category === c.name).length}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Collections */}
              <div>
                <h4 className="text-xs font-semibold text-[#092328] uppercase tracking-wider mb-2.5">
                  Collection
                </h4>
                <div className="space-y-1">
                  {collections.map((col) => (
                    <button
                      key={col.id}
                      onClick={() => setSelectedCollection(selectedCollection === col.name ? null : col.name)}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-between cursor-pointer ${
                        selectedCollection === col.name
                          ? 'bg-[#12544F] text-white font-medium'
                          : 'text-[#092328]/70 hover:bg-[#FAF8F5]'
                      }`}
                    >
                      <span>{col.name}</span>
                      {selectedCollection === col.name && <Check className="w-3.5 h-3.5" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div>
                <h4 className="text-xs font-semibold text-[#092328] uppercase tracking-wider mb-2.5">
                  Size
                </h4>
                <div className="grid grid-cols-5 gap-1.5">
                  {sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(selectedSize === sz ? null : sz)}
                      className={`py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                        selectedSize === sz
                          ? 'bg-[#092328] text-white'
                          : 'bg-[#FAF8F5] text-[#092328] border border-[#092328]/15 hover:border-[#12544F]'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Tones */}
              <div>
                <h4 className="text-xs font-semibold text-[#092328] uppercase tracking-wider mb-2.5">
                  Brand Color Tones
                </h4>
                <div className="flex flex-wrap gap-2">
                  {colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(selectedColor === c.name ? null : c.name)}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs border transition-all cursor-pointer ${
                        selectedColor === c.name
                          ? 'border-[#092328] bg-[#092328] text-white'
                          : 'border-[#092328]/15 bg-[#FAF8F5] text-[#092328]/80'
                      }`}
                    >
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.hex }} />
                      <span className="text-[11px]">{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-xs font-semibold text-[#092328] uppercase tracking-wider">
                    Max Price
                  </h4>
                  <span className="text-xs font-bold text-[#12544F] tabular-nums">
                    {formatPrice(maxPrice)}
                  </span>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="50000"
                  step="1000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#12544F] cursor-pointer"
                />
              </div>

              {/* Availability Toggle */}
              <div className="pt-2 border-t border-[#092328]/10 flex items-center justify-between">
                <span className="text-xs text-[#092328] font-medium">In Stock Only</span>
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="w-4 h-4 rounded text-[#12544F] focus:ring-[#12544F] cursor-pointer accent-[#12544F]"
                />
              </div>
            </div>
          </aside>

          {/* Products Grid / Results */}
          <main className="lg:col-span-3">
            {!search && (
              <div className="mb-8 rounded-2xl bg-[#092328] text-white p-5 sm:p-6 border border-[#2A835F]/30 shadow-md relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-20 sm:w-20 sm:h-24 rounded-xl overflow-hidden border border-[#8BBB92]/40 shrink-0 shadow-md">
                    <img
                      src={clothImg}
                      alt="Signature Ensemble"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Sparkles className="w-3.5 h-3.5 text-[#8BBB92]" />
                      <span className="text-[10px] font-bold text-[#8BBB92] uppercase tracking-widest">
                        New In Atelier
                      </span>
                    </div>
                    <h3 className="font-serif-luxury text-lg sm:text-xl font-medium text-white">
                      Meher-o-Maha Embroidered Ensemble
                    </h3>
                    <p className="text-xs text-white/70 line-clamp-1 max-w-md mt-0.5">
                      Signature pure chiffon & raw silk suit with antique gold tilla threadwork.
                    </p>
                    <span className="inline-block mt-1 text-xs font-semibold text-[#8BBB92]">
                      PKR 26,500
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
                  <button
                    onClick={() => {
                      setSelectedProductId('prod-cloth-signature');
                      setActiveView('product');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-full sm:w-auto px-5 py-2.5 bg-[#8BBB92] hover:bg-white text-[#092328] text-xs font-semibold uppercase tracking-wider rounded-xl transition-all cursor-pointer text-center flex items-center justify-center gap-2"
                  >
                    <span>View Piece</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {filteredProducts.length === 0 ? (
              <div className="p-12 bg-white rounded-2xl border border-[#092328]/10 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#12544F]/10 text-[#12544F] flex items-center justify-center mx-auto">
                  <SlidersHorizontal className="w-6 h-6 opacity-60" />
                </div>
                <h3 className="font-serif-luxury text-2xl text-[#092328]">
                  No matching garments found
                </h3>
                <p className="text-xs text-[#092328]/60 max-w-sm mx-auto">
                  Try adjusting your price range, category, or size filters to find available creations.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="px-6 py-2.5 bg-[#092328] text-white text-xs font-semibold rounded-lg hover:bg-[#12544F] transition-colors cursor-pointer"
                >
                  Clear All Filters
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => {
                      useStore().setSelectedProductId(product.id);
                      useStore().setActiveView('product');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="p-4 bg-white rounded-2xl border border-[#092328]/10 hover:shadow-lg transition-all flex flex-col sm:flex-row gap-6 cursor-pointer"
                  >
                    <div className="w-full sm:w-44 aspect-[3/4] rounded-xl overflow-hidden bg-[#FAF8F5] shrink-0">
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <span className="text-[11px] uppercase tracking-wider font-semibold text-[#2A835F]">
                          {product.category} · {product.fabric}
                        </span>
                        <h3 className="font-serif-luxury text-xl font-semibold text-[#092328] mt-1">
                          {product.title}
                        </h3>
                        <p className="text-xs text-[#092328]/70 mt-2 line-clamp-2 leading-relaxed">
                          {product.description}
                        </p>
                        <div className="flex gap-2 mt-3">
                          {product.variants.map((v) => (
                            <span
                              key={v.id}
                              className="px-2 py-0.5 bg-[#FAF8F5] border border-[#092328]/15 rounded text-[11px] font-semibold"
                            >
                              {v.size}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-baseline justify-between pt-4 border-t border-[#092328]/10">
                        <span className="text-lg font-bold text-[#12544F] tabular-nums">
                          {formatPrice(product.price)}
                        </span>
                        <span className="text-xs font-semibold text-[#12544F] hover:underline">
                          View Details →
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
          <div
            className="fixed inset-0 bg-[#092328]/60 backdrop-blur-xs"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-xs bg-white shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
              <div className="space-y-6">
                <div className="flex justify-between items-center pb-4 border-b border-[#092328]/10">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-[#092328]">
                    Filter Garments
                  </h3>
                  <button onClick={() => setMobileFilterOpen(false)} className="p-1">
                    <X className="w-5 h-5 text-[#092328]" />
                  </button>
                </div>

                {/* Categories */}
                <div>
                  <h4 className="text-xs font-semibold text-[#092328] uppercase mb-2">Category</h4>
                  <div className="space-y-1">
                    {categories.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => setSelectedCategory(selectedCategory === c.name ? null : c.name)}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs ${
                          selectedCategory === c.name ? 'bg-[#12544F] text-white font-medium' : 'text-[#092328]/70'
                        }`}
                      >
                        {c.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sizes */}
                <div>
                  <h4 className="text-xs font-semibold text-[#092328] uppercase mb-2">Size</h4>
                  <div className="grid grid-cols-5 gap-1.5">
                    {sizes.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(selectedSize === sz ? null : sz)}
                        className={`py-1.5 rounded-lg text-xs font-semibold ${
                          selectedSize === sz ? 'bg-[#092328] text-white' : 'bg-[#FAF8F5] text-[#092328]'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-[#092328]/10 space-y-2">
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="w-full py-3 bg-[#092328] text-white text-xs font-semibold uppercase rounded-lg"
                >
                  Apply Filters
                </button>
                {hasActiveFilters && (
                  <button
                    onClick={clearAllFilters}
                    className="w-full py-2 text-xs text-rose-600 font-medium"
                  >
                    Clear All
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
