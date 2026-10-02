import React, { useState } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { CartDrawer } from './components/common/CartDrawer';
import { SearchModal } from './components/common/SearchModal';
import { AuthModal } from './components/common/AuthModal';
import { QuickViewModal } from './components/common/QuickViewModal';
import { SizeGuideModal } from './components/common/SizeGuideModal';
import { Toast } from './components/common/Toast';

// Customer Sections
import { HeroSection } from './components/customer/HeroSection';
import { TrustSection } from './components/customer/TrustSection';
import { CategoryGrid } from './components/customer/CategoryGrid';
import { FeaturedCollection } from './components/customer/FeaturedCollection';
import { CampaignBanner } from './components/customer/CampaignBanner';
import { CraftsmanshipBanner } from './components/customer/CraftsmanshipBanner';
import { ShopPage } from './components/customer/ShopPage';
import { ProductDetailPage } from './components/customer/ProductDetailPage';
import { CheckoutPage } from './components/customer/CheckoutPage';
import { OrderSuccessPage } from './components/customer/OrderSuccessPage';
import { OrderTrackingPage } from './components/customer/OrderTrackingPage';
import { CustomerDashboard } from './components/customer/CustomerDashboard';
import { ReturnRequestModal } from './components/customer/ReturnRequestModal';
import { ReviewModal } from './components/customer/ReviewModal';
import { AboutPage } from './components/customer/AboutPage';
import { ContactPage } from './components/customer/ContactPage';

// Admin Sections
import { AdminLayout, AdminTab } from './components/admin/AdminLayout';
import { AdminDashboardHome } from './components/admin/AdminDashboardHome';
import { AdminProducts } from './components/admin/AdminProducts';
import { AdminInventory } from './components/admin/AdminInventory';
import { AdminOrders } from './components/admin/AdminOrders';
import { AdminCustomers } from './components/admin/AdminCustomers';
import { AdminDiscounts } from './components/admin/AdminDiscounts';
import { AdminReviews } from './components/admin/AdminReviews';
import { AdminCMS } from './components/admin/AdminCMS';
import { AdminMarketing } from './components/admin/AdminMarketing';
import { AdminRoles } from './components/admin/AdminRoles';
import { AdminAuditLogs } from './components/admin/AdminAuditLogs';
import { AdminSettings } from './components/admin/AdminSettings';

const StorefrontApp: React.FC = () => {
  const { activeView } = useStore();
  const [adminTab, setAdminTab] = useState<AdminTab>('overview');

  // If in Shopify-style Admin Mode
  if (activeView === 'admin') {
    return (
      <AdminLayout currentTab={adminTab} setCurrentTab={setAdminTab}>
        {adminTab === 'overview' && <AdminDashboardHome onNavigateTab={setAdminTab} />}
        {adminTab === 'products' && <AdminProducts />}
        {adminTab === 'inventory' && <AdminInventory />}
        {adminTab === 'orders' && <AdminOrders />}
        {adminTab === 'customers' && <AdminCustomers />}
        {adminTab === 'reviews' && <AdminReviews />}
        {adminTab === 'discounts' && <AdminDiscounts />}
        {adminTab === 'marketing' && <AdminMarketing />}
        {adminTab === 'cms' && <AdminCMS />}
        {adminTab === 'staff' && <AdminRoles />}
        {adminTab === 'audit' && <AdminAuditLogs />}
        {adminTab === 'settings' && <AdminSettings />}

        <Toast />
      </AdminLayout>
    );
  }

  // Customer Facing Storefront
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
      <Navbar />

      <main className="flex-1">
        {activeView === 'home' && (
          <>
            <HeroSection />
            <TrustSection />
            <CategoryGrid />
            <FeaturedCollection />
            <CampaignBanner />
            <CraftsmanshipBanner />
          </>
        )}

        {activeView === 'shop' && <ShopPage />}
        {activeView === 'product' && <ProductDetailPage />}
        {activeView === 'checkout' && <CheckoutPage />}
        {activeView === 'order-success' && <OrderSuccessPage />}
        {activeView === 'track-order' && <OrderTrackingPage />}
        {activeView === 'account' && <CustomerDashboard />}
        {activeView === 'about' && <AboutPage />}
        {activeView === 'contact' && <ContactPage />}
      </main>

      <Footer />

      {/* Global Interactive Overlays */}
      <CartDrawer />
      <SearchModal />
      <AuthModal />
      <QuickViewModal />
      <SizeGuideModal />
      <ReturnRequestModal />
      <ReviewModal />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <StorefrontApp />
    </StoreProvider>
  );
}
