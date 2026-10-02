export type BadgeType = 'New' | 'Bestseller' | 'Trending' | 'Sale' | 'Limited Stock' | 'Sold Out';

export interface ProductVariant {
  id: string;
  size: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'Custom';
  color: string;
  colorHex: string;
  fabric?: string;
  sku: string;
  price: number;
  compareAtPrice?: number;
  stock: number;
  image?: string;
  lowStockThreshold: number;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  sku: string;
  barcode: string;
  description: string;
  category: string;
  collection: string;
  tags: string[];
  price: number;
  compareAtPrice?: number;
  costPrice?: number;
  stock: number;
  lowStockThreshold: number;
  isPublished: boolean;
  badge?: BadgeType;
  images: string[];
  videoUrl?: string;
  fabric: string;
  style: string;
  length: string;
  careInstructions: string[];
  variants: ProductVariant[];
  rating: number;
  reviewCount: number;
  seoTitle?: string;
  seoDescription?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  itemCount: number;
  status: 'active' | 'archived';
  seoTitle?: string;
  seoDescription?: string;
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  isFeatured: boolean;
  status: 'active' | 'archived';
}

export interface CartItem {
  id: string;
  productId: string;
  variantId: string;
  productTitle: string;
  variantTitle: string;
  size: string;
  color: string;
  price: number;
  quantity: number;
  image: string;
  maxStock: number;
  sku: string;
}

export type OrderStatus =
  | 'Pending'
  | 'Confirmed'
  | 'Processing'
  | 'Packed'
  | 'Shipped'
  | 'Out for Delivery'
  | 'Delivered'
  | 'Cancelled'
  | 'Returned'
  | 'Refunded';

export interface OrderTimelineEvent {
  status: OrderStatus | string;
  title: string;
  description: string;
  timestamp: string;
  updatedBy?: string;
}

export interface OrderItem {
  productId: string;
  variantId: string;
  title: string;
  size: string;
  color: string;
  price: number;
  quantity: number;
  image: string;
  sku: string;
}

export interface Order {
  id: string; // e.g. COM-2026-000412
  customer: {
    name: string;
    email: string;
    phone: string;
    isGuest: boolean;
    userId?: string;
  };
  shippingAddress: {
    street: string;
    area: string;
    city: string;
    province: string;
    country: string;
    postalCode: string;
    instructions?: string;
  };
  items: OrderItem[];
  pricing: {
    subtotal: number;
    shipping: number;
    discount: number;
    couponCode?: string;
    tax: number;
    total: number;
  };
  payment: {
    method: 'cod' | 'bank_transfer' | 'card';
    status: 'pending' | 'paid' | 'refunded';
    transactionId?: string;
    bankReference?: string;
  };
  shipping: {
    provider: string;
    trackingNumber?: string;
    trackingUrl?: string;
    estimatedDelivery: string;
    method: string;
  };
  status: OrderStatus;
  timeline: OrderTimelineEvent[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  id: string;
  title: string; // 'Home' | 'Office'
  name: string;
  phone: string;
  street: string;
  area: string;
  city: string;
  province: string;
  country: string;
  postalCode: string;
  isDefault: boolean;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatarUrl?: string;
  role: 'customer' | 'admin';
  tier: 'Standard' | 'Silver' | 'Gold' | 'VIP';
  totalSpent: number;
  orderCount: number;
  addresses: Address[];
  wishlistIds: string[];
  createdAt: string;
}

export interface Review {
  id: string;
  productId: string;
  productTitle: string;
  customerId: string;
  customerName: string;
  orderId: string;
  rating: number;
  qualityRating: number;
  fitRating: number;
  comfortRating: number;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  status: 'approved' | 'pending' | 'rejected';
  createdAt: string;
  images?: string[];
}

export type ReturnStatus =
  | 'Requested'
  | 'Approved'
  | 'Rejected'
  | 'Pickup Scheduled'
  | 'Received'
  | 'Inspected'
  | 'Refunded'
  | 'Closed';

export interface ReturnRequest {
  id: string;
  orderId: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  items: {
    productId: string;
    variantId: string;
    title: string;
    quantity: number;
    price: number;
    reason: string;
  }[];
  overallReason: string;
  status: ReturnStatus;
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Coupon {
  id: string;
  code: string;
  type: 'percentage' | 'fixed' | 'free_shipping';
  value: number; // 10 for 10% or 500 for Rs. 500
  minOrderValue: number;
  usageLimit: number;
  usedCount: number;
  isActive: boolean;
  expiresAt: string;
  description: string;
}

export interface InventoryLog {
  id: string;
  date: string;
  productId: string;
  productTitle: string;
  variantSku: string;
  quantityChange: number;
  previousStock: number;
  newStock: number;
  reason: 'Restock' | 'Order Placed' | 'Order Cancelled' | 'Damaged' | 'Return' | 'Manual Correction';
  adminUser: string;
}

export interface AuditLog {
  id: string;
  adminName: string;
  adminRole: string;
  action: string;
  objectType: 'Product' | 'Order' | 'Inventory' | 'Discount' | 'Review' | 'Settings' | 'Return';
  objectId: string;
  details: string;
  timestamp: string;
}

export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  ctaText: string;
  ctaLink: string;
  isActive: boolean;
  order: number;
}

export interface StoreSettings {
  storeName: string;
  tagline: string;
  currency: 'PKR' | 'USD' | 'GBP' | 'AED' | 'EUR';
  currencySymbol: string;
  exchangeRate: number; // Relative to PKR
  freeShippingThreshold: number; // in PKR
  defaultShippingFee: number; // in PKR
  taxRate: number; // in percentage e.g. 5%
  contactEmail: string;
  contactPhone: string;
  whatsappNumber: string;
  announcementText: string;
  storeLocations: {
    city: string;
    title: string;
    address: string;
    phone: string;
    timing: string;
  }[];
  heroSlides: HeroSlide[];
}

export interface AbandonedCart {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  itemsCount: number;
  cartTotal: number;
  items: CartItem[];
  abandonedAt: string;
  recoveryEmailSent: boolean;
}

export interface StaffMember {
  id: string;
  name: string;
  email: string;
  role: 'Super Admin' | 'Store Manager' | 'Order Manager' | 'Product Specialist' | 'Support Staff';
  status: 'Active' | 'Invited' | 'Inactive';
  lastActive: string;
  permissions: {
    products: boolean;
    orders: boolean;
    inventory: boolean;
    customers: boolean;
    discounts: boolean;
    marketing: boolean;
    analytics: boolean;
    settings: boolean;
  };
}
