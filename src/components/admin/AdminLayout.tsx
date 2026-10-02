import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  LayoutDashboard,
  Package,
  Layers,
  ShoppingBag,
  Users,
  Star,
  Tag,
  Megaphone,
  ShieldAlert,
  FileText,
  Sliders,
  Store,
  LogOut,
  Bell,
  Search,
  ExternalLink,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';
import bannerLogo from '../../assets/images/banner.png';

export type AdminTab =
  | 'overview'
  | 'products'
  | 'inventory'
  | 'orders'
  | 'customers'
  | 'reviews'
  | 'discounts'
  | 'marketing'
  | 'cms'
  | 'staff'
  | 'audit'
  | 'settings';

interface AdminLayoutProps {
  currentTab: AdminTab;
  setCurrentTab: (tab: AdminTab) => void;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  currentTab,
  setCurrentTab,
  children
}) => {
  const { setActiveView, customer, orders, products, reviews } = useStore();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const pendingOrders = orders.filter((o) => o.status === 'Pending' || o.status === 'Confirmed').length;
  const pendingReviews = reviews.filter((r) => r.status === 'pending').length;
  const lowStockCount = products.filter((p) => p.stock <= p.lowStockThreshold).length;

  const menuItems = [
    { id: 'overview' as const, label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    {
      id: 'orders' as const,
      label: 'Orders',
      icon: <ShoppingBag className="w-4 h-4" />,
      badge: pendingOrders > 0 ? String(pendingOrders) : undefined
    },
    { id: 'products' as const, label: 'Products & Variants', icon: <Package className="w-4 h-4" /> },
    {
      id: 'inventory' as const,
      label: 'Inventory Tracker',
      icon: <Layers className="w-4 h-4" />,
      badge: lowStockCount > 0 ? 'Alert' : undefined,
      badgeColor: 'bg-amber-600 text-white'
    },
    { id: 'customers' as const, label: 'Customers', icon: <Users className="w-4 h-4" /> },
    {
      id: 'reviews' as const,
      label: 'Reviews Moderation',
      icon: <Star className="w-4 h-4" />,
      badge: pendingReviews > 0 ? String(pendingReviews) : undefined
    },
    { id: 'discounts' as const, label: 'Discounts & Coupons', icon: <Tag className="w-4 h-4" /> },
    { id: 'marketing' as const, label: 'Marketing & Abandoned', icon: <Megaphone className="w-4 h-4" /> },
    { id: 'cms' as const, label: 'Store CMS & Hero Banners', icon: <FileText className="w-4 h-4" /> },
    { id: 'staff' as const, label: 'Staff & Roles (RBAC)', icon: <ShieldAlert className="w-4 h-4" /> },
    { id: 'audit' as const, label: 'Audit / Activity Log', icon: <FileText className="w-4 h-4" /> },
    { id: 'settings' as const, label: 'Store Settings', icon: <Sliders className="w-4 h-4" /> }
  ];

  return (
    <div className="min-h-screen bg-[#F4F2ED] flex">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex w-64 bg-[#092328] text-white flex-col justify-between shrink-0 border-r border-[#12544F]/50">
        <div>
          {/* Logo & Store Info */}
          <div className="p-5 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={bannerLogo}
                alt="Comfort"
                className="h-10 w-auto object-contain shrink-0 rounded"
                referrerPolicy="no-referrer"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-serif-luxury text-xl font-bold tracking-wider uppercase text-white leading-none">
                    Comfort
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8BBB92]"></span>
                </div>
                <p className="text-[9px] text-[#8BBB92] uppercase tracking-[0.18em] font-semibold mt-0.5">
                  Shopify Suite
                </p>
              </div>
            </div>

            <button
              onClick={() => setActiveView('home')}
              className="p-1.5 bg-[#12544F]/60 text-[#8BBB92] hover:text-white rounded-lg transition-colors cursor-pointer shrink-0"
              title="Return to Storefront"
            >
              <Store className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1">
            {menuItems.map((item) => {
              const active = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                    active
                      ? 'bg-[#12544F] text-white font-semibold shadow-sm'
                      : 'text-[#FAF8F5]/70 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={active ? 'text-[#8BBB92]' : 'opacity-70'}>{item.icon}</span>
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                        item.badgeColor || 'bg-[#2A835F] text-white'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* User Card & Storefront link */}
        <div className="p-4 border-t border-white/10 space-y-3">
          <div className="p-3 bg-white/5 rounded-xl flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#2A835F] text-white font-bold flex items-center justify-center text-xs">
              {customer?.name.charAt(0) || 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate">
                {customer?.name || 'Administrator'}
              </p>
              <p className="text-[10px] text-[#8BBB92] uppercase font-bold tracking-wider">
                {customer?.role === 'admin' ? 'Super Admin' : 'Staff Manager'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setActiveView('home')}
            className="w-full py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#8BBB92]" />
            <span>Open Storefront</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header */}
        <header className="bg-white border-b border-[#092328]/10 h-16 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-xs">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 text-[#092328] hover:bg-[#FAF8F5] rounded-lg"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 text-xs text-[#092328]/60">
              <span className="font-semibold text-[#092328]">Admin Management</span>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="capitalize text-[#12544F] font-bold">
                {menuItems.find((m) => m.id === currentTab)?.label}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveView('home')}
              className="px-3.5 py-1.5 border border-[#092328]/15 rounded-lg text-xs font-semibold text-[#092328] hover:bg-[#FAF8F5] flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Store className="w-3.5 h-3.5 text-[#12544F]" />
              <span className="hidden sm:inline">View Customer Storefront</span>
            </button>
          </div>
        </header>

        {/* Content Container */}
        <main className="p-4 sm:p-8 flex-1">{children}</main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
          <div
            className="fixed inset-0 bg-[#092328]/70 backdrop-blur-xs"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 max-w-full flex pr-10">
            <div className="w-screen max-w-xs bg-[#092328] text-white p-6 flex flex-col justify-between overflow-y-auto">
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-white/10">
                  <div className="font-serif-luxury text-2xl font-bold uppercase text-white">
                    Comfort Admin
                  </div>
                  <button onClick={() => setMobileSidebarOpen(false)} className="p-1 text-white/60">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="space-y-1">
                  {menuItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setCurrentTab(item.id);
                        setMobileSidebarOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium ${
                        currentTab === item.id
                          ? 'bg-[#12544F] text-white font-bold'
                          : 'text-white/70 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span>{item.icon}</span>
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className="text-[10px] bg-[#2A835F] text-white px-2 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="pt-6 border-t border-white/10">
                <button
                  onClick={() => setActiveView('home')}
                  className="w-full py-2.5 bg-white text-[#092328] font-bold rounded-xl text-xs flex items-center justify-center gap-2"
                >
                  <Store className="w-4 h-4" />
                  <span>Exit to Storefront</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
