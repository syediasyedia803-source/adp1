import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  User,
  ShoppingBag,
  Heart,
  MapPin,
  Settings,
  Star,
  Clock,
  RotateCcw,
  CheckCircle2,
  Trash2,
  Plus,
  ArrowRight,
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import { ProductCard } from './ProductCard';

export const CustomerDashboard: React.FC = () => {
  const {
    customer,
    orders,
    wishlist,
    products,
    updateProfile,
    addCustomerAddress,
    removeCustomerAddress,
    setDefaultAddress,
    formatPrice,
    setActiveView,
    setSelectedProductId,
    addToCart,
    setReturningOrder,
    setReviewingItem,
    showToast,
    setIsAuthModalOpen,
    cancelOrder
  } = useStore();

  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'wishlist' | 'addresses' | 'profile'>('overview');

  // Address Modal / Form state
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addrTitle, setAddrTitle] = useState('Home');
  const [addrName, setAddrName] = useState(customer?.name || '');
  const [addrPhone, setAddrPhone] = useState(customer?.phone || '');
  const [addrStreet, setAddrStreet] = useState('');
  const [addrArea, setAddrArea] = useState('');
  const [addrCity, setAddrCity] = useState('Lahore');
  const [addrProvince, setAddrProvince] = useState('Punjab');
  const [addrPostal, setAddrPostal] = useState('54000');

  // Profile Edit state
  const [editName, setEditName] = useState(customer?.name || '');
  const [editPhone, setEditPhone] = useState(customer?.phone || '');

  if (!customer) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 bg-[#FAF8F5] text-center">
        <div className="w-16 h-16 rounded-full bg-[#12544F]/10 text-[#12544F] flex items-center justify-center mb-4">
          <User className="w-8 h-8" />
        </div>
        <h2 className="font-serif-luxury text-3xl text-[#092328]">Atelier Account Sign In</h2>
        <p className="text-xs text-[#092328]/60 mt-1 max-w-sm mb-6">
          Sign in to view your orders, live tracking timelines, saved addresses, and submit verified reviews.
        </p>
        <button
          onClick={() => setIsAuthModalOpen(true)}
          className="px-8 py-3 bg-[#092328] text-white text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-[#12544F] transition-colors cursor-pointer"
        >
          Sign In / Register
        </button>
      </div>
    );
  }

  // Filter orders belonging to this customer
  const userOrders = orders.filter(
    (o) =>
      o.customer.email.toLowerCase() === customer.email.toLowerCase() ||
      o.customer.phone.replace(/\s+/g, '') === customer.phone.replace(/\s+/g, '')
  );

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addrStreet || !addrCity) {
      showToast('Please provide street and city', 'error');
      return;
    }
    addCustomerAddress({
      title: addrTitle,
      name: addrName || customer.name,
      phone: addrPhone || customer.phone,
      street: addrStreet,
      area: addrArea,
      city: addrCity,
      province: addrProvince,
      country: 'Pakistan',
      postalCode: addrPostal,
      isDefault: customer.addresses.length === 0
    });
    setShowAddressForm(false);
    setAddrStreet('');
    setAddrArea('');
  };

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name: editName, phone: editPhone });
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Welcome Header */}
        <div className="bg-[#092328] text-white p-6 sm:p-10 rounded-3xl shadow-md mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#12544F] border border-[#8BBB92]/40 text-[#8BBB92] flex items-center justify-center font-serif-luxury text-2xl font-bold shadow-inner">
              {customer.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif-luxury text-2xl sm:text-3xl font-light text-white">
                  Welcome, {customer.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#8BBB92]/30 text-[#8BBB92] border border-[#8BBB92]/40">
                  {customer.tier} Member
                </span>
              </div>
              <p className="text-xs text-[#FAF8F5]/70 mt-1">
                {customer.email} · {customer.phone}
              </p>
            </div>
          </div>

          <div className="flex gap-4 sm:gap-6 border-t sm:border-t-0 sm:border-l border-white/10 pt-4 sm:pt-0 sm:pl-6">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#8BBB92] block">
                Total Orders
              </span>
              <span className="text-xl font-bold font-mono tabular-nums text-white">
                {userOrders.length}
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#8BBB92] block">
                Total Acquired
              </span>
              <span className="text-xl font-bold font-mono tabular-nums text-white">
                {formatPrice(customer.totalSpent)}
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#8BBB92] block">
                Wishlist
              </span>
              <span className="text-xl font-bold font-mono tabular-nums text-white">
                {wishlist.length}
              </span>
            </div>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex border-b border-[#092328]/10 overflow-x-auto gap-2 sm:gap-6 mb-8 text-xs font-semibold uppercase tracking-wider">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-3 px-1 transition-colors cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'overview'
                ? 'border-b-2 border-[#12544F] text-[#12544F]'
                : 'text-[#092328]/60 hover:text-[#092328]'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-3 px-1 transition-colors cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'orders'
                ? 'border-b-2 border-[#12544F] text-[#12544F]'
                : 'text-[#092328]/60 hover:text-[#092328]'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>My Orders ({userOrders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('wishlist')}
            className={`pb-3 px-1 transition-colors cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'wishlist'
                ? 'border-b-2 border-[#12544F] text-[#12544F]'
                : 'text-[#092328]/60 hover:text-[#092328]'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>Wishlist ({wishlist.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('addresses')}
            className={`pb-3 px-1 transition-colors cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'addresses'
                ? 'border-b-2 border-[#12544F] text-[#12544F]'
                : 'text-[#092328]/60 hover:text-[#092328]'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Saved Addresses ({customer.addresses.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-3 px-1 transition-colors cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'profile'
                ? 'border-b-2 border-[#12544F] text-[#12544F]'
                : 'text-[#092328]/60 hover:text-[#092328]'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Profile Settings</span>
          </button>
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Quick Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-6 bg-white rounded-2xl border border-[#092328]/10 shadow-xs space-y-1">
                <span className="text-xs uppercase font-semibold text-[#2A835F]">Active Orders</span>
                <p className="text-2xl font-bold font-mono text-[#092328]">
                  {userOrders.filter((o) => o.status !== 'Delivered' && o.status !== 'Cancelled').length}
                </p>
                <p className="text-[11px] text-[#092328]/60">In production & transit</p>
              </div>

              <div className="p-6 bg-white rounded-2xl border border-[#092328]/10 shadow-xs space-y-1">
                <span className="text-xs uppercase font-semibold text-[#2A835F]">Tier Status</span>
                <p className="text-2xl font-bold font-serif-luxury text-[#12544F]">
                  {customer.tier}
                </p>
                <p className="text-[11px] text-[#092328]/60">Complimentary express shipping on all orders</p>
              </div>

              <div className="p-6 bg-white rounded-2xl border border-[#092328]/10 shadow-xs space-y-1">
                <span className="text-xs uppercase font-semibold text-[#2A835F]">Default Address</span>
                <p className="text-xs font-semibold text-[#092328] line-clamp-1">
                  {customer.addresses.find((a) => a.isDefault)?.city || 'None set'}
                </p>
                <p className="text-[11px] text-[#092328]/60 line-clamp-1">
                  {customer.addresses.find((a) => a.isDefault)?.street || 'Add an address in Saved Addresses'}
                </p>
              </div>
            </div>

            {/* Recent Orders List */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#092328]/10 shadow-xs space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-serif-luxury text-xl font-normal text-[#092328]">
                  Recent Orders
                </h3>
                <button
                  onClick={() => setActiveTab('orders')}
                  className="text-xs font-semibold text-[#12544F] hover:underline cursor-pointer"
                >
                  View All Orders →
                </button>
              </div>

              {userOrders.length === 0 ? (
                <p className="text-xs text-[#092328]/60 py-6 text-center">
                  You haven't placed any orders yet. Discover our latest collections!
                </p>
              ) : (
                <div className="divide-y divide-[#092328]/10">
                  {userOrders.slice(0, 2).map((order) => (
                    <div key={order.id} className="py-4 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-[#12544F]">
                            {order.id}
                          </span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-[#FAF8F5] border border-[#092328]/15 text-[#092328]">
                            {order.status}
                          </span>
                        </div>
                        <p className="text-xs text-[#092328]/60 mt-1">
                          {order.items.length} garments · Placed {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-[#092328] tabular-nums">
                          {formatPrice(order.pricing.total)}
                        </span>
                        <button
                          onClick={() => {
                            setActiveView('track-order');
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="px-3 py-1.5 bg-[#092328] text-white text-xs font-semibold rounded-lg hover:bg-[#12544F] cursor-pointer"
                        >
                          Track Shipment
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Orders */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {userOrders.length === 0 ? (
              <div className="bg-white p-12 rounded-3xl border border-[#092328]/10 text-center space-y-3">
                <ShoppingBag className="w-10 h-10 text-[#12544F]/40 mx-auto" />
                <h3 className="font-serif-luxury text-xl text-[#092328]">No Orders Found</h3>
                <p className="text-xs text-[#092328]/60">Explore our luxury pret and formal collections.</p>
                <button
                  onClick={() => setActiveView('shop')}
                  className="px-6 py-2.5 bg-[#092328] text-white text-xs font-semibold rounded-xl"
                >
                  Explore Shop
                </button>
              </div>
            ) : (
              userOrders.map((order) => {
                const canCancel = order.status === 'Pending' || order.status === 'Confirmed';
                const isDelivered = order.status === 'Delivered';

                return (
                  <div
                    key={order.id}
                    className="bg-white rounded-3xl p-6 sm:p-8 border border-[#092328]/10 shadow-xs space-y-6"
                  >
                    {/* Order Header */}
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 pb-4 border-b border-[#092328]/10">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm font-bold text-[#12544F]">
                            {order.id}
                          </span>
                          <span className="px-2.5 py-0.5 rounded text-[11px] font-bold uppercase bg-[#8BBB92]/20 text-[#12544F] border border-[#2A835F]/30">
                            {order.status}
                          </span>
                        </div>
                        <p className="text-xs text-[#092328]/60 mt-1">
                          Date: {new Date(order.createdAt).toLocaleString()} · Carrier: {order.shipping.provider}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        {canCancel && (
                          <button
                            onClick={() => cancelOrder(order.id, 'Customer requested cancellation from account')}
                            className="px-3.5 py-1.5 border border-rose-300 text-rose-700 rounded-xl text-xs font-semibold hover:bg-rose-50 cursor-pointer"
                          >
                            Cancel Order
                          </button>
                        )}

                        {isDelivered && (
                          <button
                            onClick={() => setReturningOrder(order)}
                            className="px-3.5 py-1.5 border border-[#12544F] text-[#12544F] rounded-xl text-xs font-semibold hover:bg-[#FAF8F5] flex items-center gap-1.5 cursor-pointer"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span>Request Return / Exchange</span>
                          </button>
                        )}

                        <button
                          onClick={() => {
                            setActiveView('track-order');
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="px-4 py-1.5 bg-[#092328] text-white rounded-xl text-xs font-semibold hover:bg-[#12544F] transition-colors cursor-pointer"
                        >
                          Track Order
                        </button>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="divide-y divide-[#092328]/10">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="py-3 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-14 h-18 object-cover rounded-lg bg-[#FAF8F5] border border-[#092328]/10 shrink-0"
                              referrerPolicy="no-referrer"
                            />
                            <div>
                              <h4 className="text-xs font-semibold text-[#092328]">{item.title}</h4>
                              <p className="text-[11px] text-[#092328]/60 mt-0.5">
                                Size: {item.size} · Color: {item.color} · Qty: {item.quantity}
                              </p>
                              <span className="text-[10px] font-mono text-[#092328]/40">
                                SKU: {item.sku}
                              </span>
                            </div>
                          </div>

                          <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2">
                            <span className="text-xs font-bold text-[#092328] tabular-nums">
                              {formatPrice(item.price * item.quantity)}
                            </span>

                            {isDelivered && (
                              <button
                                onClick={() =>
                                  setReviewingItem({
                                    orderId: order.id,
                                    productId: item.productId,
                                    productTitle: item.title
                                  })
                                }
                                className="text-[11px] text-[#2A835F] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                              >
                                <Star className="w-3 h-3 fill-current" />
                                <span>Write Review</span>
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Financial Footer */}
                    <div className="flex justify-between items-center pt-3 border-t border-[#092328]/10 text-xs">
                      <span className="text-[#092328]/60">
                        Payment: <strong className="uppercase">{order.payment.method}</strong> ({order.payment.status})
                      </span>
                      <span className="text-sm font-bold text-[#12544F] tabular-nums">
                        Total: {formatPrice(order.pricing.total)}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* Tab 3: Wishlist */}
        {activeTab === 'wishlist' && (
          <div>
            {wishlistProducts.length === 0 ? (
              <div className="bg-white p-12 rounded-3xl border border-[#092328]/10 text-center space-y-3">
                <Heart className="w-10 h-10 text-rose-300 mx-auto" />
                <h3 className="font-serif-luxury text-xl text-[#092328]">Your Wishlist is Empty</h3>
                <p className="text-xs text-[#092328]/60">
                  Save pieces while exploring our collections for easy ordering later.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {wishlistProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Addresses */}
        {activeTab === 'addresses' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-serif-luxury text-2xl text-[#092328]">Saved Delivery Destinations</h3>
              <button
                onClick={() => setShowAddressForm(true)}
                className="px-4 py-2 bg-[#092328] text-white text-xs font-semibold rounded-xl hover:bg-[#12544F] flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add New Address</span>
              </button>
            </div>

            {/* Address Form Modal */}
            {showAddressForm && (
              <div className="p-6 bg-white rounded-3xl border border-[#12544F]/30 shadow-md">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#092328] mb-4">
                  New Delivery Address
                </h4>
                <form onSubmit={handleSaveAddress} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-[11px] font-medium text-[#092328] mb-1">
                      Label (e.g. Home, Atelier, Office)
                    </label>
                    <input
                      type="text"
                      required
                      value={addrTitle}
                      onChange={(e) => setAddrTitle(e.target.value)}
                      className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#092328]/20 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-[#092328] mb-1">
                      Recipient Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={addrName}
                      onChange={(e) => setAddrName(e.target.value)}
                      className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#092328]/20 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-[#092328] mb-1">
                      Contact Phone
                    </label>
                    <input
                      type="text"
                      required
                      value={addrPhone}
                      onChange={(e) => setAddrPhone(e.target.value)}
                      className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#092328]/20 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-[#092328] mb-1">City</label>
                    <input
                      type="text"
                      required
                      value={addrCity}
                      onChange={(e) => setAddrCity(e.target.value)}
                      placeholder="e.g. Lahore / Karachi"
                      className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#092328]/20 rounded-xl"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-medium text-[#092328] mb-1">
                      Street Address
                    </label>
                    <input
                      type="text"
                      required
                      value={addrStreet}
                      onChange={(e) => setAddrStreet(e.target.value)}
                      placeholder="e.g. House 42, Street 7, Sector F-7"
                      className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#092328]/20 rounded-xl"
                    />
                  </div>

                  <div className="sm:col-span-2 flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowAddressForm(false)}
                      className="px-4 py-2 border border-[#092328]/20 rounded-xl text-xs text-[#092328]"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-[#12544F] text-white rounded-xl text-xs font-semibold"
                    >
                      Save Destination
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* List of saved addresses */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {customer.addresses.map((addr) => (
                <div
                  key={addr.id}
                  className={`p-6 rounded-3xl border bg-white shadow-xs space-y-3 relative ${
                    addr.isDefault ? 'border-[#12544F] ring-2 ring-[#8BBB92]/30' : 'border-[#092328]/10'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-xs text-[#092328]">{addr.title}</span>
                      {addr.isDefault && (
                        <span className="text-[10px] bg-[#8BBB92]/20 text-[#12544F] font-bold px-2 py-0.5 rounded">
                          Default Address
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => removeCustomerAddress(addr.id)}
                      className="text-[#092328]/40 hover:text-rose-600 transition-colors p-1"
                      aria-label="Delete address"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <p className="text-xs text-[#092328] font-medium">{addr.name} ({addr.phone})</p>
                  <p className="text-xs text-[#092328]/70 leading-relaxed">
                    {addr.street}, {addr.area ? `${addr.area}, ` : ''}{addr.city}, {addr.province}, {addr.country}
                  </p>

                  {!addr.isDefault && (
                    <button
                      onClick={() => setDefaultAddress(addr.id)}
                      className="text-xs text-[#12544F] font-semibold hover:underline cursor-pointer block pt-2"
                    >
                      Set as Default
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Profile */}
        {activeTab === 'profile' && (
          <div className="max-w-xl bg-white rounded-3xl p-6 sm:p-8 border border-[#092328]/10 shadow-xs space-y-6">
            <h3 className="font-serif-luxury text-2xl text-[#092328]">Profile Credentials</h3>
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#092328] mb-1">Full Name</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F5] border border-[#092328]/20 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#092328] mb-1">
                  Email (read-only)
                </label>
                <input
                  type="email"
                  disabled
                  value={customer.email}
                  className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F5] border border-[#092328]/10 rounded-xl opacity-60"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#092328] mb-1">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F5] border border-[#092328]/20 rounded-xl"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#092328] text-white text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-[#12544F] transition-colors cursor-pointer"
              >
                Update Profile
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
