import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit2,
  Trash2,
  Copy,
  Upload,
  Download,
  CheckSquare,
  Square,
  AlertTriangle,
  X,
  Sparkles,
  Eye,
  Check
} from 'lucide-react';
import { Product, ProductVariant, BadgeType } from '../../types';

export const AdminProducts: React.FC = () => {
  const {
    products,
    categories,
    collections,
    addProduct,
    updateProduct,
    deleteProduct,
    duplicateProduct,
    bulkUpdatePrices,
    bulkUpdatePublishStatus,
    bulkDeleteProducts,
    formatPrice,
    showToast
  } = useStore();

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Modal State for Add / Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [sku, setSku] = useState('');
  const [barcode, setBarcode] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(categories[0]?.name || 'Luxury Pret');
  const [collection, setCollection] = useState(collections[0]?.name || 'Festive Pret 2026');
  const [tagsInput, setTagsInput] = useState('Raw Silk, Embroidered');
  const [price, setPrice] = useState(18500);
  const [compareAtPrice, setCompareAtPrice] = useState(22000);
  const [costPrice, setCostPrice] = useState(9000);
  const [fabric, setFabric] = useState('Pure Raw Silk 80g');
  const [style, setStyle] = useState('Straight Boxy Kurta with Cigarette Pants');
  const [length, setLength] = useState('Shirt: 44 inches');
  const [badge, setBadge] = useState<BadgeType | ''>('New');
  const [isPublished, setIsPublished] = useState(true);
  const [imageUrl, setImageUrl] = useState('');

  // Bulk Price Modal
  const [isBulkPriceModalOpen, setIsBulkPriceModalOpen] = useState(false);
  const [bulkPercent, setBulkPercent] = useState(10);

  const filteredProducts = products.filter((p) => {
    if (search && !p.title.toLowerCase().includes(search.toLowerCase()) && !p.sku.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    if (categoryFilter !== 'all' && p.category !== categoryFilter) {
      return false;
    }
    return true;
  });

  const handleSelectAll = () => {
    if (selectedIds.length === filteredProducts.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredProducts.map((p) => p.id));
    }
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const openCreateModal = () => {
    setEditingProductId(null);
    setTitle('');
    setSlug('');
    setSku(`COM-LPR-00${products.length + 1}`);
    setBarcode(`8964001928${products.length + 10}`);
    setDescription('');
    setCategory(categories[0]?.name || 'Luxury Pret');
    setCollection(collections[0]?.name || 'Festive Pret 2026');
    setTagsInput('Silk, Pret, Festive');
    setPrice(18500);
    setCompareAtPrice(22000);
    setCostPrice(9000);
    setFabric('Pure Raw Silk 80g with Tissue Lining');
    setStyle('Flared A-line Silhouette');
    setLength('Shirt: 44 inches');
    setBadge('New');
    setIsPublished(true);
    setImageUrl(products[0]?.images[0] || '');
    setIsModalOpen(true);
  };

  const openEditModal = (p: Product) => {
    setEditingProductId(p.id);
    setTitle(p.title);
    setSlug(p.slug);
    setSku(p.sku);
    setBarcode(p.barcode);
    setDescription(p.description);
    setCategory(p.category);
    setCollection(p.collection);
    setTagsInput(p.tags.join(', '));
    setPrice(p.price);
    setCompareAtPrice(p.compareAtPrice || 0);
    setCostPrice(p.costPrice || 0);
    setFabric(p.fabric);
    setStyle(p.style);
    setLength(p.length);
    setBadge(p.badge || '');
    setIsPublished(p.isPublished);
    setImageUrl(p.images[0] || '');
    setIsModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !sku || !price) {
      showToast('Please fill all required garment fields', 'error');
      return;
    }

    const tags = tagsInput.split(',').map((t) => t.trim()).filter(Boolean);

    // Standard variants template
    const defaultVariants: ProductVariant[] = [
      {
        id: `var-${Date.now()}-s`,
        size: 'S',
        color: 'Deep Teal',
        colorHex: '#12544F',
        sku: `${sku}-S`,
        price: Number(price),
        compareAtPrice: Number(compareAtPrice) || undefined,
        stock: 6,
        lowStockThreshold: 2
      },
      {
        id: `var-${Date.now()}-m`,
        size: 'M',
        color: 'Deep Teal',
        colorHex: '#12544F',
        sku: `${sku}-M`,
        price: Number(price),
        compareAtPrice: Number(compareAtPrice) || undefined,
        stock: 8,
        lowStockThreshold: 2
      },
      {
        id: `var-${Date.now()}-l`,
        size: 'L',
        color: 'Deep Teal',
        colorHex: '#12544F',
        sku: `${sku}-L`,
        price: Number(price),
        compareAtPrice: Number(compareAtPrice) || undefined,
        stock: 5,
        lowStockThreshold: 2
      }
    ];

    if (editingProductId) {
      updateProduct(editingProductId, {
        title,
        slug: slug || title.toLowerCase().replace(/\s+/g, '-'),
        sku,
        barcode,
        description,
        category,
        collection,
        tags,
        price: Number(price),
        compareAtPrice: compareAtPrice ? Number(compareAtPrice) : undefined,
        costPrice: Number(costPrice),
        fabric,
        style,
        length,
        badge: (badge as BadgeType) || undefined,
        isPublished,
        images: imageUrl ? [imageUrl] : products.find((p) => p.id === editingProductId)?.images || []
      });
    } else {
      addProduct({
        title,
        slug: slug || title.toLowerCase().replace(/\s+/g, '-'),
        sku,
        barcode,
        description: description || `Exquisite handcrafted ${category} in ${fabric}.`,
        category,
        collection,
        tags,
        price: Number(price),
        compareAtPrice: compareAtPrice ? Number(compareAtPrice) : undefined,
        costPrice: Number(costPrice),
        stock: 19,
        lowStockThreshold: 4,
        isPublished,
        badge: (badge as BadgeType) || undefined,
        images: [imageUrl || products[0]?.images[0] || ''],
        fabric,
        style,
        length,
        careInstructions: ['Dry clean only', 'Store in garment bag'],
        variants: defaultVariants
      });
    }

    setIsModalOpen(false);
  };

  const handleExportCSV = () => {
    const headers = 'ID,Title,SKU,Category,Price,Stock,Published\n';
    const rows = products.map((p) => `"${p.id}","${p.title}","${p.sku}","${p.category}",${p.price},${p.stock},${p.isPublished}`).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `comfort_products_export_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    showToast('Products catalog exported to CSV successfully');
  };

  return (
    <div className="space-y-6">
      {/* Header and Actions Bar */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="font-serif-luxury text-3xl font-semibold text-[#092328]">
            Product & Variation Matrix
          </h1>
          <p className="text-xs text-[#092328]/60 mt-0.5">
            Manage silhouettes, sizes, SKUs, inventory thresholds, and commercial prices.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 bg-white border border-[#092328]/15 rounded-xl text-xs font-semibold text-[#092328] hover:bg-[#FAF8F5] flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={openCreateModal}
            className="px-4 py-2 bg-[#092328] text-white rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-[#12544F] transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Create Garment</span>
          </button>
        </div>
      </div>

      {/* Bulk Action Toolbar if items selected */}
      {selectedIds.length > 0 && (
        <div className="p-3 bg-[#12544F] text-white rounded-2xl flex flex-wrap items-center justify-between gap-3 shadow-md animate-in fade-in duration-200">
          <div className="flex items-center gap-2 text-xs font-semibold">
            <CheckSquare className="w-4 h-4 text-[#8BBB92]" />
            <span>{selectedIds.length} Garments Selected</span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={() => setIsBulkPriceModalOpen(true)}
              className="px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg cursor-pointer"
            >
              Update Price %
            </button>
            <button
              onClick={() => bulkUpdatePublishStatus(selectedIds, true)}
              className="px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg cursor-pointer"
            >
              Publish Selected
            </button>
            <button
              onClick={() => bulkUpdatePublishStatus(selectedIds, false)}
              className="px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg cursor-pointer"
            >
              Unpublish Selected
            </button>
            <button
              onClick={() => {
                if (confirm(`Are you sure you want to delete ${selectedIds.length} garments?`)) {
                  bulkDeleteProducts(selectedIds);
                  setSelectedIds([]);
                }
              }}
              className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 rounded-lg text-white cursor-pointer"
            >
              Delete
            </button>
            <button
              onClick={() => setSelectedIds([])}
              className="px-2 py-1 text-white/70 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Filters & Search Table Container */}
      <div className="bg-white rounded-3xl border border-[#092328]/10 shadow-xs overflow-hidden">
        {/* Table Filters */}
        <div className="p-4 sm:p-6 border-b border-[#092328]/10 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-[#092328]/40 absolute left-3 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by garment title, SKU, or cut..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#FAF8F5] border border-[#092328]/15 rounded-xl focus:outline-none focus:border-[#12544F]"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-[#092328]/60 font-medium">Category:</span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-1.5 bg-[#FAF8F5] border border-[#092328]/15 rounded-xl text-xs font-semibold text-[#092328] focus:outline-none cursor-pointer"
            >
              <option value="all">All Categories ({products.length})</option>
              {categories.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Product Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#FAF8F5] text-[#092328] uppercase text-[10px] tracking-wider border-b border-[#092328]/10">
              <tr>
                <th className="py-3 px-4 w-10">
                  <input
                    type="checkbox"
                    checked={selectedIds.length === filteredProducts.length && filteredProducts.length > 0}
                    onChange={handleSelectAll}
                    className="w-4 h-4 rounded accent-[#12544F] cursor-pointer"
                  />
                </th>
                <th className="py-3 px-4">Garment</th>
                <th className="py-3 px-4">SKU & Barcode</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Inventory</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#092328]/10">
              {filteredProducts.map((p) => {
                const isSelected = selectedIds.includes(p.id);
                const isLow = p.stock <= p.lowStockThreshold;

                return (
                  <tr
                    key={p.id}
                    className={`hover:bg-[#FAF8F5]/80 transition-colors ${
                      isSelected ? 'bg-[#8BBB92]/10' : ''
                    }`}
                  >
                    <td className="py-3.5 px-4">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleToggleSelect(p.id)}
                        className="w-4 h-4 rounded accent-[#12544F] cursor-pointer"
                      />
                    </td>
                    <td className="py-3.5 px-4 flex items-center gap-3">
                      <img
                        src={p.images[0]}
                        alt={p.title}
                        className="w-12 h-16 object-cover rounded-lg bg-[#FAF8F5] border border-[#092328]/10 shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <h4 className="font-semibold text-xs text-[#092328] line-clamp-1">{p.title}</h4>
                        <p className="text-[11px] text-[#092328]/50 line-clamp-1">{p.fabric}</p>
                        {p.badge && (
                          <span className="inline-block mt-0.5 text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 bg-[#12544F]/10 text-[#12544F] rounded">
                            {p.badge}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono">
                      <p className="font-bold text-[#092328]">{p.sku}</p>
                      <p className="text-[10px] text-[#092328]/50">{p.barcode}</p>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-[#092328]">
                      {p.category}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-[#12544F] tabular-nums">
                        {formatPrice(p.price)}
                      </span>
                      {p.compareAtPrice && (
                        <span className="block text-[10px] text-[#092328]/40 line-through tabular-nums">
                          {formatPrice(p.compareAtPrice)}
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`font-mono font-bold ${
                          isLow ? 'text-amber-600' : 'text-[#2A835F]'
                        }`}
                      >
                        {p.stock} units
                      </span>
                      <span className="block text-[10px] text-[#092328]/50">
                        {p.variants.length} variant sizes
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          p.isPublished
                            ? 'bg-[#2A835F]/15 text-[#2A835F]'
                            : 'bg-[#092328]/10 text-[#092328]/60'
                        }`}
                      >
                        {p.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openEditModal(p)}
                          className="p-1.5 text-[#092328]/70 hover:text-[#12544F] hover:bg-[#FAF8F5] rounded-md transition-colors cursor-pointer"
                          title="Edit Garment"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => duplicateProduct(p.id)}
                          className="p-1.5 text-[#092328]/70 hover:text-[#12544F] hover:bg-[#FAF8F5] rounded-md transition-colors cursor-pointer"
                          title="Duplicate Garment"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Delete garment "${p.title}"?`)) {
                              deleteProduct(p.id);
                            }
                          }}
                          className="p-1.5 text-[#092328]/40 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors cursor-pointer"
                          title="Delete Garment"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Create or Edit Product */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div
            className="fixed inset-0 bg-[#092328]/70 backdrop-blur-xs"
            onClick={() => setIsModalOpen(false)}
          />

          <div className="relative min-h-screen flex items-center justify-center p-4">
            <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-[#092328]/10 overflow-hidden">
              <div className="p-6 bg-[#092328] text-white flex items-center justify-between">
                <div>
                  <h3 className="font-serif-luxury text-xl font-normal text-white">
                    {editingProductId ? 'Edit Designer Garment' : 'Create New Silhouette'}
                  </h3>
                  <p className="text-xs text-[#8BBB92] mt-0.5">
                    Configure specifications, price points, and inventory variations.
                  </p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 text-white/60 hover:text-white rounded-full cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveProduct} className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-[#092328] mb-1">
                      Garment Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. Noor-e-Kashmir Raw Silk Kalidar"
                      className="w-full p-2.5 bg-[#FAF8F5] border border-[#092328]/20 rounded-xl focus:outline-none focus:border-[#12544F]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#092328] mb-1">
                      Master SKU *
                    </label>
                    <input
                      type="text"
                      required
                      value={sku}
                      onChange={(e) => setSku(e.target.value)}
                      placeholder="e.g. COM-LPR-007"
                      className="w-full p-2.5 font-mono uppercase bg-[#FAF8F5] border border-[#092328]/20 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#092328] mb-1">
                      Barcode / EAN
                    </label>
                    <input
                      type="text"
                      value={barcode}
                      onChange={(e) => setBarcode(e.target.value)}
                      placeholder="e.g. 896400192899"
                      className="w-full p-2.5 font-mono bg-[#FAF8F5] border border-[#092328]/20 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#092328] mb-1">
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full p-2.5 bg-[#FAF8F5] border border-[#092328]/20 rounded-xl"
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#092328] mb-1">
                      Collection
                    </label>
                    <select
                      value={collection}
                      onChange={(e) => setCollection(e.target.value)}
                      className="w-full p-2.5 bg-[#FAF8F5] border border-[#092328]/20 rounded-xl"
                    >
                      {collections.map((col) => (
                        <option key={col.id} value={col.name}>
                          {col.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#092328] mb-1">
                      Retail Price (PKR) *
                    </label>
                    <input
                      type="number"
                      required
                      value={price}
                      onChange={(e) => setPrice(Number(e.target.value))}
                      className="w-full p-2.5 font-mono font-bold bg-[#FAF8F5] border border-[#092328]/20 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#092328] mb-1">
                      Compare-at Price (PKR)
                    </label>
                    <input
                      type="number"
                      value={compareAtPrice}
                      onChange={(e) => setCompareAtPrice(Number(e.target.value))}
                      className="w-full p-2.5 font-mono bg-[#FAF8F5] border border-[#092328]/20 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#092328] mb-1">
                      Fabric Composition
                    </label>
                    <input
                      type="text"
                      value={fabric}
                      onChange={(e) => setFabric(e.target.value)}
                      placeholder="e.g. 100% Pure Raw Silk with Tissue Lining"
                      className="w-full p-2.5 bg-[#FAF8F5] border border-[#092328]/20 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#092328] mb-1">
                      Badge
                    </label>
                    <select
                      value={badge}
                      onChange={(e) => setBadge(e.target.value as any)}
                      className="w-full p-2.5 bg-[#FAF8F5] border border-[#092328]/20 rounded-xl"
                    >
                      <option value="">No Badge</option>
                      <option value="New">New</option>
                      <option value="Bestseller">Bestseller</option>
                      <option value="Trending">Trending</option>
                      <option value="Sale">Sale</option>
                      <option value="Limited Stock">Limited Stock</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-[#092328] mb-1">
                      Product Description
                    </label>
                    <textarea
                      rows={3}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe the silhouette, embroidery technique, and occasion..."
                      className="w-full p-2.5 bg-[#FAF8F5] border border-[#092328]/20 rounded-xl"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-[#092328] mb-1">
                      Search Tags (comma separated)
                    </label>
                    <input
                      type="text"
                      value={tagsInput}
                      onChange={(e) => setTagsInput(e.target.value)}
                      placeholder="Silk, Emerald, Kalidar, Pret"
                      className="w-full p-2.5 bg-[#FAF8F5] border border-[#092328]/20 rounded-xl"
                    />
                  </div>

                  <div className="sm:col-span-2 flex items-center gap-3 pt-2">
                    <input
                      type="checkbox"
                      id="publish-toggle"
                      checked={isPublished}
                      onChange={(e) => setIsPublished(e.target.checked)}
                      className="w-4 h-4 rounded accent-[#12544F] cursor-pointer"
                    />
                    <label htmlFor="publish-toggle" className="text-xs font-semibold text-[#092328] cursor-pointer">
                      Publish immediately to customer storefront
                    </label>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4 border-t border-[#092328]/10">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2.5 border border-[#092328]/20 rounded-xl text-xs cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#092328] text-white font-semibold rounded-xl hover:bg-[#12544F] cursor-pointer shadow-md"
                  >
                    {editingProductId ? 'Update Garment' : 'Save Garment'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Price Adjustment Modal */}
      {isBulkPriceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#092328]/70">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full space-y-4">
            <h3 className="text-sm font-semibold uppercase text-[#092328]">
              Bulk Adjust Prices
            </h3>
            <p className="text-xs text-[#092328]/60">
              Adjust retail price for {selectedIds.length} selected garments by percentage:
            </p>

            <div>
              <label className="block text-xs font-semibold text-[#092328] mb-1">
                Percentage Change (+/-)
              </label>
              <input
                type="number"
                value={bulkPercent}
                onChange={(e) => setBulkPercent(Number(e.target.value))}
                placeholder="e.g. 10 for +10% or -15 for -15%"
                className="w-full p-2.5 text-xs bg-[#FAF8F5] border border-[#092328]/20 rounded-xl font-mono"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setIsBulkPriceModalOpen(false)}
                className="px-4 py-2 border rounded-xl text-xs"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  bulkUpdatePrices(selectedIds, bulkPercent);
                  setIsBulkPriceModalOpen(false);
                  setSelectedIds([]);
                }}
                className="px-4 py-2 bg-[#12544F] text-white rounded-xl text-xs font-semibold"
              >
                Apply Percentage
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
