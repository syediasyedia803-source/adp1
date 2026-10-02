import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  ShieldCheck,
  Truck,
  CreditCard,
  Building,
  Banknote,
  ArrowRight,
  CheckCircle2,
  Lock,
  Tag
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    cartDiscount,
    cartShipping,
    cartTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    formatPrice,
    createOrder,
    setActiveView,
    customer,
    showToast
  } = useStore();

  // Form Fields
  const [name, setName] = useState(customer?.name || '');
  const [email, setEmail] = useState(customer?.email || '');
  const [phone, setPhone] = useState(customer?.phone || '');
  const [country, setCountry] = useState('Pakistan');
  const [province, setProvince] = useState('Punjab');
  const [city, setCity] = useState('Lahore');
  const [area, setArea] = useState('Gulberg III');
  const [street, setStreet] = useState('House 14, Main Boulevard');
  const [postalCode, setPostalCode] = useState('54000');
  const [instructions, setInstructions] = useState('');

  // Shipping Method
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'priority'>('standard');

  // Payment Method
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bank_transfer' | 'card'>('cod');

  // Bank Transfer Reference
  const [bankRef, setBankRef] = useState('');

  // Card details
  const [cardNumber, setCardNumber] = useState('');
  const [cardExp, setCardExp] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  // Coupon
  const [couponCodeInput, setCouponCodeInput] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6 bg-[#FAF8F5]">
        <h2 className="font-serif-luxury text-3xl text-[#092328]">Your bag is currently empty</h2>
        <p className="text-xs text-[#092328]/60 mt-2 mb-6">
          Please select your desired garments from our collection before proceeding to checkout.
        </p>
        <button
          onClick={() => setActiveView('shop')}
          className="px-6 py-3 bg-[#092328] text-white text-xs font-semibold rounded-xl hover:bg-[#12544F] transition-colors cursor-pointer"
        >
          Explore Collection
        </button>
      </div>
    );
  }

  const shippingCost = shippingMethod === 'priority' ? cartShipping + 400 : cartShipping;
  const finalTotal = cartTotal + (shippingMethod === 'priority' ? 400 : 0);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !street || !city) {
      showToast('Please fill all required customer and delivery details', 'error');
      return;
    }

    if (paymentMethod === 'card' && (!cardNumber || !cardExp || !cardCvv)) {
      showToast('Please enter your card credentials', 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      const order = createOrder({
        customer: {
          name,
          email,
          phone,
          isGuest: !customer,
          userId: customer?.id
        },
        shippingAddress: {
          country,
          province,
          city,
          area,
          street,
          postalCode,
          instructions
        },
        items: cart.map((item) => ({
          productId: item.productId,
          variantId: item.variantId,
          title: item.productTitle,
          size: item.size,
          color: item.color,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
          sku: item.sku
        })),
        pricing: {
          subtotal: cartSubtotal,
          shipping: shippingCost,
          discount: cartDiscount,
          couponCode: appliedCoupon?.code,
          tax: 0,
          total: finalTotal
        },
        payment: {
          method: paymentMethod,
          status: paymentMethod === 'card' ? 'paid' : 'pending',
          transactionId: paymentMethod === 'card' ? `AUTH-PKR-${Date.now()}` : undefined,
          bankReference: paymentMethod === 'bank_transfer' ? bankRef || 'Ref-Pending' : undefined
        },
        shipping: {
          provider: 'TCS Express Pakistan',
          estimatedDelivery: '3-4 Business Days',
          method: shippingMethod === 'priority' ? 'Next-Day Air Priority' : 'Express Insured Ground'
        },
        status: 'Pending',
        notes: instructions
      });

      // Fire victory confetti!
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

      showToast(`Order #${order.id} placed successfully!`);
      setActiveView('order-success');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      showToast('Could not complete checkout. Please review details.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <span className="text-xs uppercase tracking-widest text-[#2A835F] font-semibold">
            Comfort Atelier Checkout
          </span>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl text-[#092328] mt-1">
            Complete Your Acquisition
          </h1>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Form: Customer, Address & Payment (7 Cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Step 1: Customer Contact */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#092328]/10 shadow-sm space-y-4">
              <div className="flex items-center gap-2 border-b border-[#092328]/10 pb-3">
                <div className="w-6 h-6 rounded-full bg-[#12544F] text-white text-xs font-bold flex items-center justify-center">
                  1
                </div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-[#092328]">
                  Customer Contact Information
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-[#092328] mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Syeda Fatima Zahra"
                    className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F5] border border-[#092328]/20 rounded-xl focus:outline-none focus:border-[#12544F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#092328] mb-1">
                    Email Address (for order tracking receipt) *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F5] border border-[#092328]/20 rounded-xl focus:outline-none focus:border-[#12544F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#092328] mb-1">
                    Mobile Phone (for delivery SMS & call) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+92 300 8472911"
                    className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F5] border border-[#092328]/20 rounded-xl focus:outline-none focus:border-[#12544F]"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Delivery Destination */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#092328]/10 shadow-sm space-y-4">
              <div className="flex items-center gap-2 border-b border-[#092328]/10 pb-3">
                <div className="w-6 h-6 rounded-full bg-[#12544F] text-white text-xs font-bold flex items-center justify-center">
                  2
                </div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-[#092328]">
                  Delivery Address
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#092328] mb-1">Country</label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F5] border border-[#092328]/20 rounded-xl focus:outline-none focus:border-[#12544F]"
                  >
                    <option value="Pakistan">Pakistan</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="United States">United States</option>
                    <option value="United Arab Emirates">United Arab Emirates</option>
                    <option value="Canada">Canada</option>
                    <option value="Saudi Arabia">Saudi Arabia</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#092328] mb-1">Province / Region</label>
                  <select
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F5] border border-[#092328]/20 rounded-xl focus:outline-none focus:border-[#12544F]"
                  >
                    <option value="Punjab">Punjab</option>
                    <option value="Sindh">Sindh</option>
                    <option value="Khyber Pakhtunkhwa">Khyber Pakhtunkhwa</option>
                    <option value="Balochistan">Balochistan</option>
                    <option value="Islamabad Capital Territory">Islamabad Capital Territory</option>
                    <option value="Azad Jammu & Kashmir">Azad Jammu & Kashmir</option>
                    <option value="Gilgit-Baltistan">Gilgit-Baltistan</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#092328] mb-1">City *</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Lahore / Karachi / Islamabad"
                    className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F5] border border-[#092328]/20 rounded-xl focus:outline-none focus:border-[#12544F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#092328] mb-1">Area / Sector</label>
                  <input
                    type="text"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    placeholder="e.g. DHA Phase 5 / Clifton Block 4"
                    className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F5] border border-[#092328]/20 rounded-xl focus:outline-none focus:border-[#12544F]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-[#092328] mb-1">
                    Street Address / House Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    placeholder="e.g. House 42, Street 7"
                    className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F5] border border-[#092328]/20 rounded-xl focus:outline-none focus:border-[#12544F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#092328] mb-1">Postal Code</label>
                  <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="e.g. 54000"
                    className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F5] border border-[#092328]/20 rounded-xl focus:outline-none focus:border-[#12544F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#092328] mb-1">
                    Delivery Instructions (Optional)
                  </label>
                  <input
                    type="text"
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    placeholder="e.g. Please ring front bell"
                    className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F5] border border-[#092328]/20 rounded-xl focus:outline-none focus:border-[#12544F]"
                  />
                </div>
              </div>
            </div>

            {/* Step 3: Shipping Method */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#092328]/10 shadow-sm space-y-4">
              <div className="flex items-center gap-2 border-b border-[#092328]/10 pb-3">
                <div className="w-6 h-6 rounded-full bg-[#12544F] text-white text-xs font-bold flex items-center justify-center">
                  3
                </div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-[#092328]">
                  Shipping Courier
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div
                  onClick={() => setShippingMethod('standard')}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3 ${
                    shippingMethod === 'standard'
                      ? 'border-[#12544F] bg-[#12544F]/5'
                      : 'border-[#092328]/10 hover:border-[#092328]/30'
                  }`}
                >
                  <Truck className="w-5 h-5 text-[#12544F] shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-[#092328]">TCS Express Insured</span>
                      <span className="text-xs font-bold text-[#2A835F]">
                        {cartShipping === 0 ? 'Free' : formatPrice(cartShipping)}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#092328]/60 mt-1">
                      Estimated 2-3 Business Days nationwide.
                    </p>
                  </div>
                </div>

                <div
                  onClick={() => setShippingMethod('priority')}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3 ${
                    shippingMethod === 'priority'
                      ? 'border-[#12544F] bg-[#12544F]/5'
                      : 'border-[#092328]/10 hover:border-[#092328]/30'
                  }`}
                >
                  <Truck className="w-5 h-5 text-[#2A835F] shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-[#092328]">Priority Next-Day Air</span>
                      <span className="text-xs font-bold text-[#12544F]">
                        {formatPrice(cartShipping + 400)}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#092328]/60 mt-1">
                      Guaranteed priority dispatch in custom garment box.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4: Payment Methods */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#092328]/10 shadow-sm space-y-4">
              <div className="flex items-center gap-2 border-b border-[#092328]/10 pb-3">
                <div className="w-6 h-6 rounded-full bg-[#12544F] text-white text-xs font-bold flex items-center justify-center">
                  4
                </div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-[#092328]">
                  Payment Options
                </h3>
              </div>

              <div className="space-y-3">
                {/* Cash on Delivery */}
                <div
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3 ${
                    paymentMethod === 'cod'
                      ? 'border-[#12544F] bg-[#12544F]/5'
                      : 'border-[#092328]/10 hover:border-[#092328]/30'
                  }`}
                >
                  <Banknote className="w-5 h-5 text-[#2A835F] shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-[#092328]">Cash on Delivery (COD)</span>
                      <span className="text-[10px] uppercase font-bold bg-[#8BBB92]/20 text-[#12544F] px-2 py-0.5 rounded">
                        Most Popular
                      </span>
                    </div>
                    <p className="text-[11px] text-[#092328]/60 mt-1">
                      Pay cash upon delivery at your doorstep. Inspect security seals prior to handing cash to rider.
                    </p>
                  </div>
                </div>

                {/* Direct Bank Transfer */}
                <div
                  onClick={() => setPaymentMethod('bank_transfer')}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3 ${
                    paymentMethod === 'bank_transfer'
                      ? 'border-[#12544F] bg-[#12544F]/5'
                      : 'border-[#092328]/10 hover:border-[#092328]/30'
                  }`}
                >
                  <Building className="w-5 h-5 text-[#12544F] shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <span className="text-xs font-bold text-[#092328]">Direct Bank Transfer (IBAN)</span>
                    <p className="text-[11px] text-[#092328]/60 mt-1">
                      Transfer directly via HBL or Meezan Internet Banking.
                    </p>

                    {paymentMethod === 'bank_transfer' && (
                      <div className="mt-3 p-3 bg-white rounded-xl border border-[#092328]/10 text-xs space-y-1 text-[#092328]">
                        <p><strong>Bank:</strong> Habib Bank Limited (HBL) Luxury Corporate</p>
                        <p><strong>Account Title:</strong> Comfort Designer Garments Pvt Ltd</p>
                        <p><strong>Account #:</strong> 0042 7901 8820 03</p>
                        <p className="font-mono text-[11px]"><strong>IBAN:</strong> PK36 HABB 0000 4279 0188 2003</p>
                        <div className="pt-2">
                          <label className="block text-[11px] font-medium text-[#092328]/70 mb-1">
                            Transaction Reference / Sender Bank
                          </label>
                          <input
                            type="text"
                            value={bankRef}
                            onChange={(e) => setBankRef(e.target.value)}
                            placeholder="e.g. HBL-FT-99201481"
                            className="w-full px-3 py-1.5 text-xs bg-[#FAF8F5] border border-[#092328]/20 rounded-lg focus:outline-none"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Credit / Debit Card */}
                <div
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3 ${
                    paymentMethod === 'card'
                      ? 'border-[#12544F] bg-[#12544F]/5'
                      : 'border-[#092328]/10 hover:border-[#092328]/30'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-[#092328] shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <span className="text-xs font-bold text-[#092328]">Credit or Debit Card</span>
                    <p className="text-[11px] text-[#092328]/60 mt-1">
                      Visa, MasterCard, PayPak, UnionPay accepted with 3D Secure OTP verification.
                    </p>

                    {paymentMethod === 'card' && (
                      <div className="mt-3 space-y-2 p-3 bg-white rounded-xl border border-[#092328]/10">
                        <div>
                          <label className="block text-[11px] font-medium text-[#092328] mb-1">Card Number</label>
                          <input
                            type="text"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            placeholder="•••• •••• •••• 4242"
                            className="w-full px-3 py-1.5 text-xs bg-[#FAF8F5] border border-[#092328]/20 rounded-lg focus:outline-none"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[11px] font-medium text-[#092328] mb-1">Expiry</label>
                            <input
                              type="text"
                              value={cardExp}
                              onChange={(e) => setCardExp(e.target.value)}
                              placeholder="MM/YY"
                              className="w-full px-3 py-1.5 text-xs bg-[#FAF8F5] border border-[#092328]/20 rounded-lg focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-medium text-[#092328] mb-1">CVV</label>
                            <input
                              type="password"
                              value={cardCvv}
                              onChange={(e) => setCardCvv(e.target.value)}
                              placeholder="•••"
                              className="w-full px-3 py-1.5 text-xs bg-[#FAF8F5] border border-[#092328]/20 rounded-lg focus:outline-none"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar: Order Summary (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#092328]/10 shadow-sm space-y-6 sticky top-28">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#092328] border-b border-[#092328]/10 pb-3">
                Order Review ({cart.reduce((s, i) => s + i.quantity, 0)} Items)
              </h3>

              {/* Items List */}
              <div className="divide-y divide-[#092328]/10 max-h-72 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={item.id} className="py-3 flex gap-3">
                    <img
                      src={item.image}
                      alt={item.productTitle}
                      className="w-16 h-20 object-cover rounded-lg bg-[#FAF8F5] shrink-0 border border-[#092328]/10"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-semibold text-[#092328] truncate">{item.productTitle}</h4>
                      <p className="text-[11px] text-[#092328]/60 mt-0.5">
                        {item.size} · {item.color} · Qty: {item.quantity}
                      </p>
                      <span className="text-xs font-bold text-[#12544F] tabular-nums mt-1 block">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Promo Code Input */}
              <div className="pt-2">
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-2.5 bg-[#8BBB92]/15 border border-[#2A835F]/30 rounded-xl text-xs text-[#12544F]">
                    <span>Coupon <strong>{appliedCoupon.code}</strong> applied (-{formatPrice(cartDiscount)})</span>
                    <button
                      type="button"
                      onClick={removeCoupon}
                      className="text-rose-600 hover:underline cursor-pointer font-medium"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 absolute left-3 top-3 text-[#092328]/40" />
                      <input
                        type="text"
                        value={couponCodeInput}
                        onChange={(e) => setCouponCodeInput(e.target.value)}
                        placeholder="Coupon code (e.g. COMFORT10)"
                        className="w-full pl-8 pr-3 py-2 text-xs uppercase bg-[#FAF8F5] border border-[#092328]/20 rounded-xl focus:outline-none"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const res = applyCoupon(couponCodeInput);
                        if (!res.success) showToast(res.message, 'error');
                        else setCouponCodeInput('');
                      }}
                      className="px-3.5 py-2 bg-[#092328] text-white text-xs font-semibold rounded-xl hover:bg-[#12544F] cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                )}
              </div>

              {/* Cost Calculations */}
              <div className="space-y-2 text-xs text-[#092328]/80 border-t border-[#092328]/10 pt-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#092328] tabular-nums">
                    {formatPrice(cartSubtotal)}
                  </span>
                </div>

                {cartDiscount > 0 && (
                  <div className="flex justify-between text-[#2A835F]">
                    <span>Discount</span>
                    <span className="font-semibold tabular-nums">-{formatPrice(cartDiscount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Shipping ({shippingMethod === 'priority' ? 'Air Priority' : 'Standard TCS'})</span>
                  <span className="font-semibold tabular-nums">
                    {shippingCost === 0 ? <span className="text-[#2A835F]">Free</span> : formatPrice(shippingCost)}
                  </span>
                </div>

                <div className="flex justify-between text-base font-bold text-[#092328] pt-3 border-t border-[#092328]/10">
                  <span>Grand Total</span>
                  <span className="text-xl text-[#12544F] tabular-nums">
                    {formatPrice(finalTotal)}
                  </span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[#092328] text-white text-xs font-semibold uppercase tracking-widest rounded-xl hover:bg-[#12544F] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xl disabled:opacity-50"
              >
                <Lock className="w-4 h-4 text-[#8BBB92]" />
                <span>{isSubmitting ? 'Securing Order...' : 'Confirm & Place Order'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-[11px] text-[#092328]/60 text-center space-y-1">
                <p>By placing this order you agree to Comfort Atelier Terms & Conditions.</p>
                <p className="text-[#2A835F] font-semibold">14-Day Free Exchange & Doorstep Return Guarantee</p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
