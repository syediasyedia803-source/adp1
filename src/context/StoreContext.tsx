import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  ProductVariant,
  Category,
  Collection,
  CartItem,
  Order,
  OrderStatus,
  Customer,
  Review,
  Coupon,
  StoreSettings,
  InventoryLog,
  AuditLog,
  StaffMember,
  AbandonedCart,
  ReturnRequest,
  ReturnStatus,
  Address
} from '../types';

import {
  INITIAL_PRODUCTS,
  INITIAL_CATEGORIES,
  INITIAL_COLLECTIONS,
  INITIAL_ORDERS,
  INITIAL_CUSTOMERS,
  INITIAL_REVIEWS,
  INITIAL_COUPONS,
  INITIAL_SETTINGS,
  INITIAL_STAFF,
  INITIAL_INVENTORY_LOGS,
  INITIAL_AUDIT_LOGS,
  INITIAL_ABANDONED_CARTS
} from '../data/seedData';

type ViewMode =
  | 'home'
  | 'shop'
  | 'product'
  | 'checkout'
  | 'order-success'
  | 'track-order'
  | 'account'
  | 'about'
  | 'contact'
  | 'admin';

interface StoreContextType {
  // Navigation & View
  activeView: ViewMode;
  setActiveView: (view: ViewMode) => void;
  selectedProductId: string | null;
  setSelectedProductId: (id: string | null) => void;
  selectedCategory: string | null;
  setSelectedCategory: (cat: string | null) => void;
  lastPlacedOrder: Order | null;
  setLastPlacedOrder: (order: Order | null) => void;
  
  // Modals
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  sizeGuideProduct: Product | null;
  setSizeGuideProduct: (product: Product | null) => void;
  reviewingItem: { orderId: string; productId: string; productTitle: string } | null;
  setReviewingItem: (item: { orderId: string; productId: string; productTitle: string } | null) => void;
  returningOrder: Order | null;
  setReturningOrder: (order: Order | null) => void;
  
  // Toast
  toast: { message: string; type: 'success' | 'error' | 'info' } | null;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;

  // Products & Catalog
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'rating' | 'reviewCount'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  duplicateProduct: (id: string) => void;
  bulkUpdatePrices: (ids: string[], deltaPercent: number) => void;
  bulkUpdatePublishStatus: (ids: string[], isPublished: boolean) => void;
  bulkDeleteProducts: (ids: string[]) => void;
  categories: Category[];
  addCategory: (category: Omit<Category, 'id' | 'itemCount'>) => void;
  updateCategory: (id: string, updates: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  collections: Collection[];

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, variant: ProductVariant, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  cartSubtotal: number;
  cartDiscount: number;
  cartShipping: number;
  cartTax: number;
  cartTotal: number;
  freeShippingRemaining: number;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  moveWishlistToCart: (productId: string) => void;

  // Orders & Tracking
  orders: Order[];
  createOrder: (orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt' | 'timeline'>) => Order;
  updateOrderStatus: (
    orderId: string,
    status: OrderStatus,
    trackingNumber?: string,
    courierProvider?: string,
    notes?: string
  ) => void;
  cancelOrder: (orderId: string, reason?: string) => void;
  lookupOrder: (orderId: string, query: string) => Order | undefined;

  // Customer Auth
  customer: Customer | null;
  login: (email: string, name?: string) => boolean;
  register: (name: string, email: string, phone: string) => boolean;
  logout: () => void;
  updateProfile: (updates: Partial<Customer>) => void;
  addCustomerAddress: (address: Omit<Address, 'id'>) => void;
  removeCustomerAddress: (addressId: string) => void;
  setDefaultAddress: (addressId: string) => void;

  // Reviews
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'createdAt' | 'status'>) => void;
  updateReviewStatus: (reviewId: string, status: 'approved' | 'rejected') => void;

  // Returns
  returns: ReturnRequest[];
  createReturnRequest: (data: Omit<ReturnRequest, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => void;
  updateReturnStatus: (returnId: string, status: ReturnStatus, notes?: string) => void;

  // Coupons
  coupons: Coupon[];
  addCoupon: (coupon: Omit<Coupon, 'id' | 'usedCount'>) => void;
  updateCoupon: (id: string, updates: Partial<Coupon>) => void;
  deleteCoupon: (id: string) => void;

  // Inventory & Audits
  inventoryLogs: InventoryLog[];
  adjustInventoryStock: (productId: string, variantId: string, change: number, reason: any) => void;
  auditLogs: AuditLog[];
  addAuditLog: (action: string, objectType: AuditLog['objectType'], objectId: string, details: string) => void;

  // Marketing & Abandoned Carts
  abandonedCarts: AbandonedCart[];
  sendRecoveryReminder: (cartId: string) => void;

  // Staff & Settings
  staff: StaffMember[];
  updateStaffRole: (id: string, role: StaffMember['role']) => void;
  settings: StoreSettings;
  updateSettings: (updates: Partial<StoreSettings>) => void;
  formatPrice: (amountInPkr: number) => string;
  changeCurrency: (currency: StoreSettings['currency']) => void;
  resetToDefaultData: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Safe localStorage helper
  const getStored = <T,>(key: string, fallback: T): T => {
    try {
      const item = localStorage.getItem(`comfort_${key}`);
      return item ? JSON.parse(item) : fallback;
    } catch {
      return fallback;
    }
  };

  const setStored = <T,>(key: string, value: T) => {
    try {
      localStorage.setItem(`comfort_${key}`, JSON.stringify(value));
    } catch {
      // Ignore quota errors
    }
  };

  // State initialization with persistence
  const [activeView, setActiveView] = useState<ViewMode>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [lastPlacedOrder, setLastPlacedOrder] = useState<Order | null>(null);

  // Modals & Overlays
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [sizeGuideProduct, setSizeGuideProduct] = useState<Product | null>(null);
  const [reviewingItem, setReviewingItem] = useState<{ orderId: string; productId: string; productTitle: string } | null>(null);
  const [returningOrder, setReturningOrder] = useState<Order | null>(null);

  // Toast
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Data Stores
  const [products, setProducts] = useState<Product[]>(() => getStored('products', INITIAL_PRODUCTS));
  const [categories, setCategories] = useState<Category[]>(() => getStored('categories', INITIAL_CATEGORIES));
  const [collections] = useState<Collection[]>(INITIAL_COLLECTIONS);
  const [cart, setCart] = useState<CartItem[]>(() => getStored('cart', []));
  const [wishlist, setWishlist] = useState<string[]>(() => getStored('wishlist', ['prod-1', 'prod-3']));
  const [orders, setOrders] = useState<Order[]>(() => getStored('orders', INITIAL_ORDERS));
  const [customer, setCustomer] = useState<Customer | null>(() => getStored('customer', INITIAL_CUSTOMERS[0]));
  const [reviews, setReviews] = useState<Review[]>(() => getStored('reviews', INITIAL_REVIEWS));
  const [coupons, setCoupons] = useState<Coupon[]>(() => getStored('coupons', INITIAL_COUPONS));
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [returns, setReturns] = useState<ReturnRequest[]>(() => getStored('returns', []));
  const [inventoryLogs, setInventoryLogs] = useState<InventoryLog[]>(() => getStored('inventoryLogs', INITIAL_INVENTORY_LOGS));
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => getStored('auditLogs', INITIAL_AUDIT_LOGS));
  const [staff, setStaff] = useState<StaffMember[]>(() => getStored('staff', INITIAL_STAFF));
  const [settings, setSettings] = useState<StoreSettings>(() => getStored('settings', INITIAL_SETTINGS));
  const [abandonedCarts, setAbandonedCarts] = useState<AbandonedCart[]>(() => getStored('abandonedCarts', INITIAL_ABANDONED_CARTS));

  // Sync to localStorage
  useEffect(() => setStored('products', products), [products]);
  useEffect(() => setStored('categories', categories), [categories]);
  useEffect(() => setStored('cart', cart), [cart]);
  useEffect(() => setStored('wishlist', wishlist), [wishlist]);
  useEffect(() => setStored('orders', orders), [orders]);
  useEffect(() => setStored('customer', customer), [customer]);
  useEffect(() => setStored('reviews', reviews), [reviews]);
  useEffect(() => setStored('coupons', coupons), [coupons]);
  useEffect(() => setStored('returns', returns), [returns]);
  useEffect(() => setStored('inventoryLogs', inventoryLogs), [inventoryLogs]);
  useEffect(() => setStored('auditLogs', auditLogs), [auditLogs]);
  useEffect(() => setStored('staff', staff), [staff]);
  useEffect(() => setStored('settings', settings), [settings]);
  useEffect(() => setStored('abandonedCarts', abandonedCarts), [abandonedCarts]);

  // Currency & Formatting
  const exchangeRates: Record<StoreSettings['currency'], { rate: number; symbol: string; prefix: boolean }> = {
    PKR: { rate: 1, symbol: 'Rs. ', prefix: true },
    USD: { rate: 0.0036, symbol: '$', prefix: true },
    GBP: { rate: 0.0028, symbol: '£', prefix: true },
    AED: { rate: 0.0132, symbol: 'AED ', prefix: true },
    EUR: { rate: 0.0033, symbol: '€', prefix: true }
  };

  const formatPrice = (amountInPkr: number): string => {
    const config = exchangeRates[settings.currency] || exchangeRates.PKR;
    const converted = amountInPkr * config.rate;
    if (settings.currency === 'PKR') {
      return `${config.symbol}${Math.round(converted).toLocaleString('en-PK')}`;
    }
    return `${config.symbol}${converted.toFixed(2)}`;
  };

  const changeCurrency = (currency: StoreSettings['currency']) => {
    setSettings((prev) => ({
      ...prev,
      currency,
      currencySymbol: exchangeRates[currency]?.symbol || 'Rs.',
      exchangeRate: exchangeRates[currency]?.rate || 1
    }));
    showToast(`Currency changed to ${currency}`);
  };

  // Audit Log Helper
  const addAuditLog = (
    action: string,
    objectType: AuditLog['objectType'],
    objectId: string,
    details: string
  ) => {
    const newLog: AuditLog = {
      id: `aud-${Date.now()}`,
      adminName: customer?.name || 'Administrator',
      adminRole: customer?.role === 'admin' ? 'Super Admin' : 'Staff',
      action,
      objectType,
      objectId,
      details,
      timestamp: new Date().toISOString()
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  // Cart Calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  let cartDiscount = 0;
  if (appliedCoupon && appliedCoupon.isActive) {
    if (cartSubtotal >= appliedCoupon.minOrderValue) {
      if (appliedCoupon.type === 'percentage') {
        cartDiscount = Math.round((cartSubtotal * appliedCoupon.value) / 100);
      } else if (appliedCoupon.type === 'fixed') {
        cartDiscount = appliedCoupon.value;
      }
    }
  }

  const isFreeShippingByCoupon = appliedCoupon?.type === 'free_shipping' && cartSubtotal >= appliedCoupon.minOrderValue;
  const isFreeShippingByThreshold = cartSubtotal >= settings.freeShippingThreshold;
  const cartShipping = cart.length === 0 ? 0 : (isFreeShippingByCoupon || isFreeShippingByThreshold ? 0 : settings.defaultShippingFee);
  const cartTax = Math.round(((cartSubtotal - cartDiscount) * settings.taxRate) / 100);
  const cartTotal = Math.max(0, cartSubtotal - cartDiscount + cartShipping + cartTax);
  const freeShippingRemaining = Math.max(0, settings.freeShippingThreshold - cartSubtotal);

  // Cart Operations
  const addToCart = (product: Product, variant: ProductVariant, quantity: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.productId === product.id && item.variantId === variant.id);
      if (existing) {
        const newQty = Math.min(existing.quantity + quantity, variant.stock);
        return prev.map((item) => (item.id === existing.id ? { ...item, quantity: newQty } : item));
      } else {
        const newItem: CartItem = {
          id: `cart-${Date.now()}-${variant.id}`,
          productId: product.id,
          variantId: variant.id,
          productTitle: product.title,
          variantTitle: `${variant.color} / ${variant.size}`,
          size: variant.size,
          color: variant.color,
          price: variant.price,
          quantity: Math.min(quantity, variant.stock),
          image: variant.image || product.images[0],
          maxStock: variant.stock,
          sku: variant.sku
        };
        return [...prev, newItem];
      }
    });
    setIsCartOpen(true);
    showToast(`Added ${product.title} (${variant.size}) to your bag`);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
    showToast('Item removed from cart', 'info');
  };

  const updateCartQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === cartItemId) {
          return { ...item, quantity: Math.min(quantity, item.maxStock) };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const found = coupons.find((c) => c.code.toUpperCase() === cleanCode && c.isActive);
    if (!found) {
      return { success: false, message: 'Invalid or inactive promotional code.' };
    }
    if (cartSubtotal < found.minOrderValue) {
      return {
        success: false,
        message: `Requires minimum cart order of ${formatPrice(found.minOrderValue)}.`
      };
    }
    if (found.usedCount >= found.usageLimit) {
      return { success: false, message: 'This coupon usage limit has been reached.' };
    }
    setAppliedCoupon(found);
    return { success: true, message: `Promo code "${found.code}" applied successfully!` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Promo code removed', 'info');
  };

  // Wishlist
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from Wishlist', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to your Wishlist ❤️');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const moveWishlistToCart = (productId: string) => {
    const prod = products.find((p) => p.id === productId);
    if (!prod || prod.variants.length === 0) return;
    const defaultVariant = prod.variants[0];
    addToCart(prod, defaultVariant, 1);
    setWishlist((prev) => prev.filter((id) => id !== productId));
  };

  // Orders
  const createOrder = (orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt' | 'timeline'>): Order => {
    const year = new Date().getFullYear();
    const nextNum = String(orders.length + 413).padStart(6, '0');
    const orderId = `COM-${year}-${nextNum}`;

    const newOrder: Order = {
      ...orderData,
      id: orderId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      timeline: [
        {
          status: 'Pending',
          title: 'Order Placed',
          description: `Order successfully confirmed via ${
            orderData.payment.method === 'cod'
              ? 'Cash on Delivery'
              : orderData.payment.method === 'bank_transfer'
              ? 'Direct Bank Transfer'
              : 'Card Gateway'
          }.`,
          timestamp: new Date().toISOString(),
          updatedBy: 'Customer Checkout'
        }
      ]
    };

    // Deduct inventory
    newOrder.items.forEach((item) => {
      adjustInventoryStock(item.productId, item.variantId, -item.quantity, 'Order Placed');
    });

    // Update coupon usage
    if (appliedCoupon) {
      setCoupons((prev) =>
        prev.map((c) => (c.id === appliedCoupon.id ? { ...c, usedCount: c.usedCount + 1 } : c))
      );
    }

    setOrders((prev) => [newOrder, ...prev]);
    setLastPlacedOrder(newOrder);
    clearCart();

    // If logged in customer, increment their stats
    if (customer) {
      setCustomer((prev) =>
        prev
          ? {
              ...prev,
              orderCount: prev.orderCount + 1,
              totalSpent: prev.totalSpent + newOrder.pricing.total
            }
          : null
      );
    }

    addAuditLog('Placed Order', 'Order', orderId, `Customer ${newOrder.customer.name} placed order ${orderId} for ${formatPrice(newOrder.pricing.total)}.`);
    return newOrder;
  };

  const updateOrderStatus = (
    orderId: string,
    status: OrderStatus,
    trackingNumber?: string,
    courierProvider?: string,
    notes?: string
  ) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id !== orderId) return order;

        const timelineEntry = {
          status,
          title: `Status: ${status}`,
          description:
            status === 'Shipped'
              ? `Dispatched via ${courierProvider || order.shipping.provider}. Tracking: ${trackingNumber || order.shipping.trackingNumber || 'Pending'}`
              : `Order marked as ${status}. ${notes || ''}`,
          timestamp: new Date().toISOString(),
          updatedBy: customer?.name || 'Administrator'
        };

        const updatedShipping = {
          ...order.shipping,
          ...(trackingNumber ? { trackingNumber } : {}),
          ...(courierProvider ? { provider: courierProvider } : {})
        };

        return {
          ...order,
          status,
          shipping: updatedShipping,
          notes: notes ? `${order.notes ? order.notes + ' | ' : ''}${notes}` : order.notes,
          timeline: [...order.timeline, timelineEntry],
          updatedAt: new Date().toISOString()
        };
      })
    );

    addAuditLog('Updated Order Status', 'Order', orderId, `Changed status to ${status}. Tracking: ${trackingNumber || 'N/A'}`);
    showToast(`Order ${orderId} updated to ${status}`);
  };

  const cancelOrder = (orderId: string, reason?: string) => {
    const target = orders.find((o) => o.id === orderId);
    if (!target) return;

    // Restore stock
    target.items.forEach((item) => {
      adjustInventoryStock(item.productId, item.variantId, item.quantity, 'Order Cancelled');
    });

    updateOrderStatus(orderId, 'Cancelled', undefined, undefined, reason || 'Cancelled by customer/admin');
    showToast(`Order ${orderId} cancelled & stock restored.`, 'info');
  };

  const lookupOrder = (orderId: string, query: string): Order | undefined => {
    const cleanId = orderId.trim().toUpperCase();
    const cleanQ = query.trim().toLowerCase();
    return orders.find(
      (o) =>
        o.id.toUpperCase() === cleanId &&
        (o.customer.email.toLowerCase() === cleanQ ||
          o.customer.phone.replace(/\s+/g, '') === cleanQ.replace(/\s+/g, ''))
    );
  };

  // Customer Auth
  const login = (email: string, name?: string) => {
    const existing = INITIAL_CUSTOMERS.find((c) => c.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      setCustomer(existing);
      showToast(`Welcome back, ${existing.name}`);
      setIsAuthModalOpen(false);
      return true;
    } else {
      const newCust: Customer = {
        id: `cust-${Date.now()}`,
        name: name || email.split('@')[0],
        email,
        phone: '+92 300 1234567',
        role: email.includes('admin') || email.includes('syedia') ? 'admin' : 'customer',
        tier: 'Standard',
        totalSpent: 0,
        orderCount: 0,
        wishlistIds: [],
        addresses: [],
        createdAt: new Date().toISOString()
      };
      setCustomer(newCust);
      showToast(`Welcome to Comfort, ${newCust.name}`);
      setIsAuthModalOpen(false);
      return true;
    }
  };

  const register = (name: string, email: string, phone: string) => {
    const newCust: Customer = {
      id: `cust-${Date.now()}`,
      name,
      email,
      phone,
      role: email.includes('admin') || email.includes('syedia') ? 'admin' : 'customer',
      tier: 'Standard',
      totalSpent: 0,
      orderCount: 0,
      wishlistIds: [],
      addresses: [],
      createdAt: new Date().toISOString()
    };
    setCustomer(newCust);
    showToast(`Account created successfully for ${name}!`);
    setIsAuthModalOpen(false);
    return true;
  };

  const logout = () => {
    setCustomer(null);
    showToast('You have been signed out', 'info');
  };

  const updateProfile = (updates: Partial<Customer>) => {
    if (!customer) return;
    setCustomer((prev) => (prev ? { ...prev, ...updates } : null));
    showToast('Profile updated successfully');
  };

  const addCustomerAddress = (address: Omit<Address, 'id'>) => {
    if (!customer) return;
    const newAddress: Address = {
      ...address,
      id: `addr-${Date.now()}`
    };
    const updated = customer.addresses.length === 0 ? { ...newAddress, isDefault: true } : newAddress;
    setCustomer((prev) =>
      prev
        ? {
            ...prev,
            addresses: [...prev.addresses, updated]
          }
        : null
    );
    showToast('Delivery address saved');
  };

  const removeCustomerAddress = (addressId: string) => {
    if (!customer) return;
    setCustomer((prev) =>
      prev
        ? {
            ...prev,
            addresses: prev.addresses.filter((a) => a.id !== addressId)
          }
        : null
    );
    showToast('Address removed', 'info');
  };

  const setDefaultAddress = (addressId: string) => {
    if (!customer) return;
    setCustomer((prev) =>
      prev
        ? {
            ...prev,
            addresses: prev.addresses.map((a) => ({
              ...a,
              isDefault: a.id === addressId
            }))
          }
        : null
    );
    showToast('Default address updated');
  };

  // Product Operations
  const addProduct = (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'rating' | 'reviewCount'>) => {
    const newProduct: Product = {
      ...productData,
      id: `prod-${Date.now()}`,
      rating: 5.0,
      reviewCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setProducts((prev) => [newProduct, ...prev]);
    addAuditLog('Created Product', 'Product', newProduct.sku, `Created new product "${newProduct.title}" with ${newProduct.variants.length} variants.`);
    showToast(`Product "${newProduct.title}" created successfully`);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((prod) => (prod.id === id ? { ...prod, ...updates, updatedAt: new Date().toISOString() } : prod))
    );
    addAuditLog('Updated Product', 'Product', id, `Updated product details for ${id}.`);
    showToast('Product updated');
  };

  const deleteProduct = (id: string) => {
    const target = products.find((p) => p.id === id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
    addAuditLog('Deleted Product', 'Product', id, `Deleted product "${target?.title || id}".`);
    showToast('Product deleted', 'info');
  };

  const duplicateProduct = (id: string) => {
    const original = products.find((p) => p.id === id);
    if (!original) return;
    const duplicated: Product = {
      ...original,
      id: `prod-${Date.now()}`,
      title: `${original.title} (Copy)`,
      sku: `${original.sku}-COPY`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setProducts((prev) => [duplicated, ...prev]);
    showToast(`Duplicated ${original.title}`);
  };

  const bulkUpdatePrices = (ids: string[], deltaPercent: number) => {
    setProducts((prev) =>
      prev.map((prod) => {
        if (!ids.includes(prod.id)) return prod;
        const factor = 1 + deltaPercent / 100;
        const newPrice = Math.round(prod.price * factor);
        const updatedVariants = prod.variants.map((v) => ({
          ...v,
          price: Math.round(v.price * factor)
        }));
        return {
          ...prod,
          price: newPrice,
          variants: updatedVariants,
          updatedAt: new Date().toISOString()
        };
      })
    );
    addAuditLog('Bulk Price Update', 'Product', `${ids.length} products`, `Adjusted prices by ${deltaPercent}% across ${ids.length} products.`);
    showToast(`Updated prices for ${ids.length} products`);
  };

  const bulkUpdatePublishStatus = (ids: string[], isPublished: boolean) => {
    setProducts((prev) =>
      prev.map((p) => (ids.includes(p.id) ? { ...p, isPublished, updatedAt: new Date().toISOString() } : p))
    );
    showToast(`${isPublished ? 'Published' : 'Unpublished'} ${ids.length} products`);
  };

  const bulkDeleteProducts = (ids: string[]) => {
    setProducts((prev) => prev.filter((p) => !ids.includes(p.id)));
    showToast(`Deleted ${ids.length} products`, 'info');
  };

  // Category Operations
  const addCategory = (categoryData: Omit<Category, 'id' | 'itemCount'>) => {
    const newCat: Category = {
      ...categoryData,
      id: `cat-${Date.now()}`,
      itemCount: 0
    };
    setCategories((prev) => [...prev, newCat]);
    showToast(`Category "${newCat.name}" added`);
  };

  const updateCategory = (id: string, updates: Partial<Category>) => {
    setCategories((prev) => prev.map((c) => (c.id === id ? { ...c, ...updates } : c)));
    showToast('Category updated');
  };

  const deleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
    showToast('Category deleted', 'info');
  };

  // Inventory Adjustment
  const adjustInventoryStock = (productId: string, variantId: string, change: number, reason: any) => {
    let prevStock = 0;
    let newStock = 0;
    let prodTitle = '';
    let varSku = '';

    setProducts((prevProds) =>
      prevProds.map((prod) => {
        if (prod.id !== productId) return prod;
        prodTitle = prod.title;

        const updatedVariants = prod.variants.map((v) => {
          if (v.id !== variantId) return v;
          prevStock = v.stock;
          newStock = Math.max(0, v.stock + change);
          varSku = v.sku;
          return { ...v, stock: newStock };
        });

        const totalProductStock = updatedVariants.reduce((sum, v) => sum + v.stock, 0);
        return {
          ...prod,
          stock: totalProductStock,
          variants: updatedVariants
        };
      })
    );

    const log: InventoryLog = {
      id: `inv-${Date.now()}`,
      date: new Date().toISOString(),
      productId,
      productTitle: prodTitle,
      variantSku: varSku,
      quantityChange: change,
      previousStock: prevStock,
      newStock,
      reason,
      adminUser: customer?.name || 'Store Manager'
    };
    setInventoryLogs((prev) => [log, ...prev]);
  };

  // Reviews
  const addReview = (reviewData: Omit<Review, 'id' | 'createdAt' | 'status'>) => {
    const newReview: Review = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      status: 'pending', // Requires admin moderation
      createdAt: new Date().toISOString()
    };
    setReviews((prev) => [newReview, ...prev]);
    showToast('Review submitted! It will appear once approved by our atelier.', 'success');
  };

  const updateReviewStatus = (reviewId: string, status: 'approved' | 'rejected') => {
    setReviews((prev) => prev.map((r) => (r.id === reviewId ? { ...r, status } : r)));
    addAuditLog('Moderated Review', 'Review', reviewId, `Review marked as ${status}.`);
    showToast(`Review ${status}`);
  };

  // Returns
  const createReturnRequest = (data: Omit<ReturnRequest, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => {
    const newReturn: ReturnRequest = {
      ...data,
      id: `RET-${Date.now().toString().slice(-6)}`,
      status: 'Requested',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setReturns((prev) => [newReturn, ...prev]);
    showToast(`Return request #${newReturn.id} submitted. Our concierge will contact you within 24 hours.`);
  };

  const updateReturnStatus = (returnId: string, status: ReturnStatus, notes?: string) => {
    setReturns((prev) =>
      prev.map((r) => (r.id === returnId ? { ...r, status, adminNotes: notes || r.adminNotes, updatedAt: new Date().toISOString() } : r))
    );
    addAuditLog('Updated Return Status', 'Return', returnId, `Return status changed to ${status}.`);
    showToast(`Return #${returnId} status updated to ${status}`);
  };

  // Coupons
  const addCoupon = (couponData: Omit<Coupon, 'id' | 'usedCount'>) => {
    const newCoupon: Coupon = {
      ...couponData,
      id: `coup-${Date.now()}`,
      usedCount: 0
    };
    setCoupons((prev) => [...prev, newCoupon]);
    showToast(`Discount coupon ${newCoupon.code} created`);
  };

  const updateCoupon = (id: string, updates: Partial<Coupon>) => {
    setCoupons((prev) => prev.map((c) => (c.id === id ? { ...c, ...updates } : c)));
    showToast('Coupon updated');
  };

  const deleteCoupon = (id: string) => {
    setCoupons((prev) => prev.filter((c) => c.id !== id));
    showToast('Coupon deleted', 'info');
  };

  // Marketing Abandoned Carts
  const sendRecoveryReminder = (cartId: string) => {
    setAbandonedCarts((prev) =>
      prev.map((c) => (c.id === cartId ? { ...c, recoveryEmailSent: true } : c))
    );
    showToast('Recovery email with 10% personalized incentive dispatched via SMTP!');
  };

  // Staff Management
  const updateStaffRole = (id: string, role: StaffMember['role']) => {
    setStaff((prev) => prev.map((s) => (s.id === id ? { ...s, role } : s)));
    showToast('Staff permissions updated');
  };

  // Settings
  const updateSettings = (updates: Partial<StoreSettings>) => {
    setSettings((prev) => ({ ...prev, ...updates }));
    addAuditLog('Updated Store Settings', 'Settings', 'Global', 'Updated store policies, thresholds, or contact info.');
    showToast('Store settings saved');
  };

  // Factory reset
  const resetToDefaultData = () => {
    setProducts(INITIAL_PRODUCTS);
    setCategories(INITIAL_CATEGORIES);
    setOrders(INITIAL_ORDERS);
    setCustomer(INITIAL_CUSTOMERS[0]);
    setReviews(INITIAL_REVIEWS);
    setCoupons(INITIAL_COUPONS);
    setInventoryLogs(INITIAL_INVENTORY_LOGS);
    setAuditLogs(INITIAL_AUDIT_LOGS);
    setStaff(INITIAL_STAFF);
    setSettings(INITIAL_SETTINGS);
    setAbandonedCarts(INITIAL_ABANDONED_CARTS);
    setReturns([]);
    showToast('Factory demo data restored');
  };

  return (
    <StoreContext.Provider
      value={{
        activeView,
        setActiveView,
        selectedProductId,
        setSelectedProductId,
        selectedCategory,
        setSelectedCategory,
        lastPlacedOrder,
        setLastPlacedOrder,

        isCartOpen,
        setIsCartOpen,
        isSearchOpen,
        setIsSearchOpen,
        searchQuery,
        setSearchQuery,
        isAuthModalOpen,
        setIsAuthModalOpen,
        quickViewProduct,
        setQuickViewProduct,
        sizeGuideProduct,
        setSizeGuideProduct,
        reviewingItem,
        setReviewingItem,
        returningOrder,
        setReturningOrder,

        toast,
        showToast,

        products,
        addProduct,
        updateProduct,
        deleteProduct,
        duplicateProduct,
        bulkUpdatePrices,
        bulkUpdatePublishStatus,
        bulkDeleteProducts,
        categories,
        addCategory,
        updateCategory,
        deleteCategory,
        collections,

        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        cartSubtotal,
        cartDiscount,
        cartShipping,
        cartTax,
        cartTotal,
        freeShippingRemaining,

        wishlist,
        toggleWishlist,
        isInWishlist,
        moveWishlistToCart,

        orders,
        createOrder,
        updateOrderStatus,
        cancelOrder,
        lookupOrder,

        customer,
        login,
        register,
        logout,
        updateProfile,
        addCustomerAddress,
        removeCustomerAddress,
        setDefaultAddress,

        reviews,
        addReview,
        updateReviewStatus,

        returns,
        createReturnRequest,
        updateReturnStatus,

        coupons,
        addCoupon,
        updateCoupon,
        deleteCoupon,

        inventoryLogs,
        adjustInventoryStock,
        auditLogs,
        addAuditLog,

        abandonedCarts,
        sendRecoveryReminder,

        staff,
        updateStaffRole,
        settings,
        updateSettings,
        formatPrice,
        changeCurrency,
        resetToDefaultData
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
