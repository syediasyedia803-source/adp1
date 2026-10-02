import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Sparkles,
  Tag,
  Check,
  ShieldCheck
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateCartQuantity,
    cartSubtotal,
    cartDiscount,
    cartShipping,
    cartTotal,
    freeShippingRemaining,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    formatPrice,
    settings,
    setActiveView
  } = useStore();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState<string | null>(null);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput) return;
    setCouponError(null);
    const result = applyCoupon(couponInput);
    if (!result.success) {
      setCouponError(result.message);
    } else {
      setCouponInput('');
    }
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setActiveView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const freeShippingProgress = Math.min(
    100,
    Math.round(((settings.freeShippingThreshold - freeShippingRemaining) / settings.freeShippingThreshold) * 100)
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#092328]/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] shadow-2xl flex flex-col border-l border-[#092328]/10">
          {/* Header */}
          <div className="px-6 py-5 border-b border-[#092328]/10 flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#12544F]" />
              <h2 className="text-base font-semibold text-[#092328] tracking-wide">
                Your Shopping Bag
              </h2>
              <span className="text-xs text-[#12544F] font-bold">
                ({cart.reduce((sum, item) => sum + item.quantity, 0)})
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-[#092328]/60 hover:text-[#092328] rounded-full hover:bg-[#FAF8F5] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Meter */}
          <div className="bg-[#FAF8F5] px-6 py-3 border-b border-[#092328]/10">
            {freeShippingRemaining > 0 ? (
              <div className="space-y-1.5">
                <p className="text-xs text-[#092328]/80 font-medium">
                  Add <span className="font-bold text-[#12544F]">{formatPrice(freeShippingRemaining)}</span> more for <span className="text-[#2A835F] font-semibold">Free Express Shipping</span>
                </p>
                <div className="w-full bg-[#092328]/10 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#2A835F] h-full rounded-full transition-all duration-300"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-xs text-[#2A835F] font-semibold">
                <Sparkles className="w-4 h-4 text-[#8BBB92]" />
                <span>You've unlocked Complimentary Express Delivery!</span>
              </div>
            )}
          </div>

          {/* Item List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-[#092328]/10">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#12544F]/10 flex items-center justify-center text-[#12544F]">
                  <ShoppingBag className="w-8 h-8 opacity-60" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#092328]">Your bag is currently empty</h3>
                  <p className="text-xs text-[#092328]/60 mt-1 max-w-xs">
                    Explore our luxury pret, lawn, and festive collections to find your perfect fit.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setActiveView('shop');
                  }}
                  className="px-6 py-2.5 bg-[#092328] text-white text-xs font-semibold rounded-lg hover:bg-[#12544F] transition-colors cursor-pointer"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="py-4 flex gap-4">
                  {/* Thumbnail */}
                  <div className="w-20 h-26 bg-[#092328]/5 rounded-lg overflow-hidden shrink-0 border border-[#092328]/10">
                    <img
                      src={item.image}
                      alt={item.productTitle}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="text-xs font-semibold text-[#092328] line-clamp-1">
                          {item.productTitle}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#092328]/40 hover:text-rose-600 transition-colors cursor-pointer p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[11px] text-[#092328]/60 mt-0.5 space-x-1">
                        <span>Size: <strong className="text-[#092328]">{item.size}</strong></span>
                        <span>·</span>
                        <span>Color: <strong className="text-[#092328]">{item.color}</strong></span>
                      </div>

                      <div className="text-[10px] text-[#092328]/40 font-mono mt-0.5">
                        SKU: {item.sku}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-[#092328]/20 rounded bg-white">
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="p-1 text-[#092328]/70 hover:text-[#092328] cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-medium tabular-nums text-[#092328]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="p-1 text-[#092328]/70 hover:text-[#092328] cursor-pointer disabled:opacity-30"
                          disabled={item.quantity >= item.maxStock}
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Line Price */}
                      <div className="text-right">
                        <span className="text-xs font-bold text-[#092328] tabular-nums">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                        {item.quantity > 1 && (
                          <div className="text-[10px] text-[#092328]/50">
                            {formatPrice(item.price)} each
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Area */}
          {cart.length > 0 && (
            <div className="px-6 py-4 bg-white border-t border-[#092328]/10 space-y-4">
              {/* Promo Code Input */}
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-2.5 bg-[#8BBB92]/15 border border-[#2A835F]/30 rounded-lg text-xs">
                  <div className="flex items-center gap-2 text-[#12544F]">
                    <Check className="w-4 h-4 text-[#2A835F]" />
                    <span>
                      Coupon <strong>{appliedCoupon.code}</strong> applied (-{formatPrice(cartDiscount)})
                    </span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-xs text-rose-600 font-medium hover:underline cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="space-y-1">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 absolute left-3 top-3 text-[#092328]/40" />
                      <input
                        type="text"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        placeholder="Promo code (e.g. COMFORT10)"
                        className="w-full pl-8 pr-3 py-2 text-xs uppercase bg-[#FAF8F5] border border-[#092328]/20 rounded-lg focus:outline-none focus:border-[#12544F]"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-3 py-2 bg-[#092328] text-white text-xs font-semibold rounded-lg hover:bg-[#12544F] transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                  {couponError && (
                    <p className="text-[11px] text-rose-600 pl-1">{couponError}</p>
                  )}
                </form>
              )}

              {/* Order Calculations */}
              <div className="space-y-1.5 text-xs text-[#092328]/80">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-[#092328] tabular-nums">
                    {formatPrice(cartSubtotal)}
                  </span>
                </div>

                {cartDiscount > 0 && (
                  <div className="flex justify-between text-[#2A835F]">
                    <span>Discount ({appliedCoupon?.code})</span>
                    <span className="font-semibold tabular-nums">-{formatPrice(cartDiscount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span className="font-medium tabular-nums">
                    {cartShipping === 0 ? (
                      <span className="text-[#2A835F] font-semibold">Free Express</span>
                    ) : (
                      formatPrice(cartShipping)
                    )}
                  </span>
                </div>

                <div className="pt-2 border-t border-[#092328]/10 flex justify-between text-sm font-bold text-[#092328]">
                  <span>Total</span>
                  <span className="tabular-nums text-base text-[#12544F]">
                    {formatPrice(cartTotal)}
                  </span>
                </div>
              </div>

              {/* CTA Button */}
              <div className="space-y-2">
                <button
                  onClick={handleCheckout}
                  className="w-full py-3.5 bg-[#092328] text-white text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-[#12544F] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-center gap-2 text-[11px] text-[#092328]/60 pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#2A835F]" />
                  <span>Secure 256-Bit SSL Checkout · Cash on Delivery</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
