import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  Star,
  Heart,
  Share2,
  Truck,
  RotateCcw,
  ShieldCheck,
  Ruler,
  ShoppingBag,
  Zap,
  Check,
  ChevronRight,
  Sparkles,
  MessageSquare
} from 'lucide-react';
import { ProductVariant } from '../../types';
import { ProductCard } from './ProductCard';

export const ProductDetailPage: React.FC = () => {
  const {
    products,
    selectedProductId,
    setSelectedProductId,
    addToCart,
    toggleWishlist,
    isInWishlist,
    formatPrice,
    setSizeGuideProduct,
    setActiveView,
    customer,
    reviews,
    showToast,
    orders
  } = useStore();

  const product = products.find((p) => p.id === selectedProductId) || products[0];

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(product?.variants[0]);
  const [selectedImgIdx, setSelectedImgIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'fabric' | 'shipping' | 'returns'>('fabric');

  useEffect(() => {
    if (product) {
      setSelectedVariant(product.variants[0]);
      setSelectedImgIdx(0);
      setQuantity(1);
    }
  }, [product?.id]);

  if (!product) return null;

  const currentVariant = selectedVariant || product.variants[0];
  const isWish = isInWishlist(product.id);
  const isOutOfStock = currentVariant.stock <= 0;

  // Filter approved reviews for this product
  const productReviews = reviews.filter(
    (r) => r.productId === product.id && r.status === 'approved'
  );

  // Check if current user has a delivered order for this product
  const hasPurchasedAndDelivered = orders.some(
    (o) =>
      o.status === 'Delivered' &&
      o.customer.email.toLowerCase() === (customer?.email || '').toLowerCase() &&
      o.items.some((item) => item.productId === product.id)
  );

  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product, currentVariant, quantity);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    addToCart(product, currentVariant, quantity);
    setActiveView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Garment link copied to clipboard!');
    }
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-[#092328]/60 mb-8">
          <button onClick={() => setActiveView('home')} className="hover:text-[#092328] cursor-pointer">
            Home
          </button>
          <span>/</span>
          <button onClick={() => setActiveView('shop')} className="hover:text-[#092328] cursor-pointer">
            {product.category}
          </button>
          <span>/</span>
          <span className="text-[#092328] font-semibold truncate max-w-xs">{product.title}</span>
        </div>

        {/* Main Product Frame */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 bg-white p-6 sm:p-10 rounded-3xl border border-[#092328]/10 shadow-sm">
          {/* Left Column: Gallery (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto shrink-0 md:w-20">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImgIdx(idx)}
                    className={`aspect-[3/4] w-18 md:w-full rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                      selectedImgIdx === idx ? 'border-[#12544F] shadow-sm' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            )}

            {/* Hero Main Image View */}
            <div className="flex-1 aspect-[3/4] rounded-2xl overflow-hidden bg-[#FAF8F5] border border-[#092328]/10 relative group shadow-inner">
              <img
                src={product.images[selectedImgIdx] || product.images[0]}
                alt={product.title}
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-108"
                referrerPolicy="no-referrer"
              />

              {product.badge && (
                <div className="absolute top-4 left-4 z-10">
                  <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 bg-[#092328] text-[#8BBB92] rounded shadow">
                    {product.badge}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Category, SKU, and Rating */}
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-semibold tracking-widest text-[#2A835F]">
                  {product.category} · {product.collection}
                </span>
                <span className="text-[11px] font-mono text-[#092328]/50">SKU: {currentVariant.sku}</span>
              </div>

              {/* Title */}
              <h1 className="font-serif-luxury text-3xl sm:text-4xl font-normal text-[#092328] leading-tight">
                {product.title}
              </h1>

              {/* Rating Summary */}
              <div className="flex items-center gap-3">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-xs font-semibold text-[#092328]">
                  {product.rating} / 5.0
                </span>
                <span className="text-xs text-[#092328]/60">
                  ({productReviews.length + product.reviewCount} Verified Reviews)
                </span>
              </div>

              {/* Price & Discounts */}
              <div className="flex items-baseline gap-3 pt-2">
                <span className="text-2xl sm:text-3xl font-bold text-[#12544F] tabular-nums">
                  {formatPrice(currentVariant.price)}
                </span>
                {currentVariant.compareAtPrice && (
                  <span className="text-base text-[#092328]/40 line-through tabular-nums">
                    {formatPrice(currentVariant.compareAtPrice)}
                  </span>
                )}
                {currentVariant.compareAtPrice && (
                  <span className="text-xs font-bold text-[#2A835F] bg-[#8BBB92]/20 px-2 py-0.5 rounded">
                    Save {Math.round(((currentVariant.compareAtPrice - currentVariant.price) / currentVariant.compareAtPrice) * 100)}%
                  </span>
                )}
              </div>

              {/* Stock Indicator */}
              <div className="text-xs flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full ${
                    currentVariant.stock > 5
                      ? 'bg-[#2A835F]'
                      : currentVariant.stock > 0
                      ? 'bg-amber-500 animate-pulse'
                      : 'bg-rose-500'
                  }`}
                />
                <span className="font-medium text-[#092328]">
                  {currentVariant.stock > 5
                    ? 'In Stock & Ready for Immediate Dispatch'
                    : currentVariant.stock > 0
                    ? `Only ${currentVariant.stock} pieces remaining in atelier`
                    : 'Sold Out — Join waitlist'}
                </span>
              </div>

              {/* Size Selector */}
              <div className="pt-2">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#092328]">
                    Select Size
                  </label>
                  <button
                    onClick={() => setSizeGuideProduct(product)}
                    className="text-xs text-[#12544F] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>Find My Size Guide</span>
                  </button>
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant)}
                      className={`py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                        currentVariant.id === variant.id
                          ? 'bg-[#12544F] text-white shadow-sm'
                          : 'bg-[#FAF8F5] text-[#092328] border border-[#092328]/15 hover:border-[#12544F]'
                      }`}
                    >
                      {variant.size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Picker */}
              <div className="flex items-center gap-4 pt-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#092328]">
                  Quantity
                </label>
                <div className="flex items-center border border-[#092328]/20 rounded-xl bg-[#FAF8F5] px-2 py-1">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-2 py-1 text-xs text-[#092328] hover:text-[#12544F] cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-3 text-xs font-bold text-[#092328] tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(currentVariant.stock, q + 1))}
                    disabled={quantity >= currentVariant.stock}
                    className="px-2 py-1 text-xs text-[#092328] hover:text-[#12544F] cursor-pointer disabled:opacity-30"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4 border-t border-[#092328]/10">
              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  className="flex-1 py-3.5 bg-[#092328] text-white text-xs font-semibold uppercase tracking-widest rounded-xl hover:bg-[#12544F] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{isOutOfStock ? 'Sold Out' : 'Add to Bag'}</span>
                </button>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="p-3.5 border border-[#092328]/20 rounded-xl hover:bg-[#FAF8F5] transition-colors cursor-pointer text-[#092328]"
                  aria-label="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isWish ? 'fill-rose-500 text-rose-500' : ''}`} />
                </button>

                <button
                  onClick={handleShare}
                  className="p-3.5 border border-[#092328]/20 rounded-xl hover:bg-[#FAF8F5] transition-colors cursor-pointer text-[#092328]"
                  aria-label="Share"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              <button
                onClick={handleBuyNow}
                disabled={isOutOfStock}
                className="w-full py-3.5 bg-[#2A835F] text-white text-xs font-semibold uppercase tracking-widest rounded-xl hover:bg-[#12544F] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
              >
                <Zap className="w-4 h-4" />
                <span>Instant Checkout (Buy Now)</span>
              </button>

              {/* Guarantees Strip */}
              <div className="grid grid-cols-2 gap-3 pt-3 text-[11px] text-[#092328]/70 border-t border-[#092328]/5">
                <div className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-[#2A835F] shrink-0" />
                  <span>Express Dispatch in 24-48 Hours</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <RotateCcw className="w-4 h-4 text-[#2A835F] shrink-0" />
                  <span>14-Day Hassle-Free Returns</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#2A835F] shrink-0" />
                  <span>Cash on Delivery Available</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#2A835F] shrink-0" />
                  <span>100% Authentic Handloom Silk</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Tabs: Fabric, Shipping, Returns */}
        <div className="mt-12 bg-white rounded-3xl p-6 sm:p-10 border border-[#092328]/10 shadow-sm">
          <div className="flex border-b border-[#092328]/10 gap-8">
            <button
              onClick={() => setActiveTab('fabric')}
              className={`pb-4 text-xs font-semibold uppercase tracking-widest cursor-pointer transition-colors ${
                activeTab === 'fabric'
                  ? 'border-b-2 border-[#12544F] text-[#12544F]'
                  : 'text-[#092328]/60 hover:text-[#092328]'
              }`}
            >
              Fabric & Craftsmanship
            </button>
            <button
              onClick={() => setActiveTab('shipping')}
              className={`pb-4 text-xs font-semibold uppercase tracking-widest cursor-pointer transition-colors ${
                activeTab === 'shipping'
                  ? 'border-b-2 border-[#12544F] text-[#12544F]'
                  : 'text-[#092328]/60 hover:text-[#092328]'
              }`}
            >
              Delivery & Shipping
            </button>
            <button
              onClick={() => setActiveTab('returns')}
              className={`pb-4 text-xs font-semibold uppercase tracking-widest cursor-pointer transition-colors ${
                activeTab === 'returns'
                  ? 'border-b-2 border-[#12544F] text-[#12544F]'
                  : 'text-[#092328]/60 hover:text-[#092328]'
              }`}
            >
              Exchange & Returns Policy
            </button>
          </div>

          <div className="pt-6">
            {activeTab === 'fabric' && (
              <div className="space-y-4 text-xs text-[#092328]/80 leading-relaxed max-w-3xl">
                <p>
                  <strong>Description:</strong> {product.description}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#092328]/5 space-y-1">
                    <span className="font-semibold text-[#092328]">Garment Silhouette & Cut</span>
                    <p>{product.style}</p>
                    <p>{product.length}</p>
                  </div>
                  <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#092328]/5 space-y-1">
                    <span className="font-semibold text-[#092328]">Care & Preservation</span>
                    <ul className="list-disc pl-4 space-y-0.5">
                      {product.careInstructions.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="space-y-3 text-xs text-[#092328]/80 leading-relaxed max-w-3xl">
                <p>
                  All Comfort orders are dispatched through insured priority couriers (TCS Express, Leopard Courier, or DHL Express for international parcels).
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 bg-[#FAF8F5] rounded-xl">
                    <h4 className="font-semibold text-[#092328] mb-1">Domestic Delivery (Pakistan)</h4>
                    <p>Major Cities (Lahore, Karachi, Islamabad): 2-3 business days.</p>
                    <p>Other Regions: 3-5 business days. Free shipping on orders over Rs. 12,000.</p>
                  </div>
                  <div className="p-4 bg-[#FAF8F5] rounded-xl">
                    <h4 className="font-semibold text-[#092328] mb-1">International Courier (DHL)</h4>
                    <p>UK, USA, UAE, Canada, Australia: 4-7 business days with end-to-end flight tracking.</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'returns' && (
              <div className="space-y-3 text-xs text-[#092328]/80 leading-relaxed max-w-3xl">
                <p>
                  We want you to be completely enamored with your Comfort garment. We gladly offer a <strong>14-day exchange and return policy</strong> from the date of package delivery.
                </p>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Garment must be unworn, unwashed with all Comfort security tags intact.</li>
                  <li>Our courier will arrange complimentary doorstep pickup for size exchanges.</li>
                  <li>Refunds are processed within 48 hours of inspection via Bank Transfer or Store Credit.</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Verified Customer Reviews Section */}
        <div className="mt-12 bg-white rounded-3xl p-6 sm:p-10 border border-[#092328]/10 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 border-b border-[#092328]/10 gap-4">
            <div>
              <h3 className="font-serif-luxury text-2xl sm:text-3xl font-normal text-[#092328]">
                Customer Experiences & Reviews
              </h3>
              <p className="text-xs text-[#092328]/60 mt-1">
                Authentic feedback from verified women who purchased Comfort designer garments.
              </p>
            </div>

            {hasPurchasedAndDelivered ? (
              <button
                onClick={() => {
                  useStore().setReviewingItem({
                    orderId: 'COM-DELIVERED',
                    productId: product.id,
                    productTitle: product.title
                  });
                }}
                className="px-5 py-2.5 bg-[#12544F] text-white text-xs font-semibold rounded-xl hover:bg-[#092328] transition-colors flex items-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Write a Verified Review</span>
              </button>
            ) : (
              <div className="text-[11px] text-[#092328]/60 bg-[#FAF8F5] px-3 py-1.5 rounded-lg border border-[#092328]/10">
                Reviews are reserved for customers with verified delivered purchases.
              </div>
            )}
          </div>

          {/* Rating Breakdown Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-6 border-b border-[#092328]/10">
            <div className="text-center sm:text-left space-y-1">
              <span className="text-4xl font-serif-luxury font-bold text-[#12544F]">
                {product.rating}
              </span>
              <div className="flex justify-center sm:justify-start text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs text-[#092328]/60">Overall Atelier Rating</p>
            </div>

            <div className="p-3 bg-[#FAF8F5] rounded-xl flex flex-col justify-center">
              <span className="text-xs font-semibold text-[#092328]">Fabric & Stitch Quality</span>
              <div className="w-full bg-[#092328]/10 h-1.5 rounded-full mt-1.5">
                <div className="bg-[#2A835F] h-full rounded-full w-[96%]" />
              </div>
              <span className="text-[10px] text-[#2A835F] font-bold mt-1">98% Exceptional Rating</span>
            </div>

            <div className="p-3 bg-[#FAF8F5] rounded-xl flex flex-col justify-center">
              <span className="text-xs font-semibold text-[#092328]">True to Size Fit</span>
              <div className="w-full bg-[#092328]/10 h-1.5 rounded-full mt-1.5">
                <div className="bg-[#2A835F] h-full rounded-full w-[94%]" />
              </div>
              <span className="text-[10px] text-[#2A835F] font-bold mt-1">94% Fit Exactly as Expected</span>
            </div>
          </div>

          {/* Reviews List */}
          <div className="pt-6 space-y-6">
            {productReviews.length === 0 ? (
              <p className="text-xs text-[#092328]/60 text-center py-6">
                Be the first verified customer to share an experience after receiving your order!
              </p>
            ) : (
              productReviews.map((rev) => (
                <div key={rev.id} className="p-5 bg-[#FAF8F5] rounded-2xl border border-[#092328]/5 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-[#092328]">{rev.customerName}</span>
                        {rev.verifiedPurchase && (
                          <span className="text-[10px] bg-[#8BBB92]/30 text-[#12544F] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                            <Check className="w-3 h-3 text-[#2A835F]" /> Verified Purchase
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-[#092328]/40">
                        {new Date(rev.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < rev.rating ? 'fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <h4 className="text-xs font-semibold text-[#092328]">{rev.title}</h4>
                  <p className="text-xs text-[#092328]/70 leading-relaxed">{rev.comment}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Related Products Carousel */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <div className="flex justify-between items-end mb-8">
              <div>
                <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#2A835F]">
                  Complete The Ensemble
                </span>
                <h3 className="font-serif-luxury text-2xl sm:text-3xl font-normal text-[#092328] mt-1">
                  You May Also Admire
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
