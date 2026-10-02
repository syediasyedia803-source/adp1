import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  X,
  ShieldCheck,
  ChevronDown,
  Globe
} from 'lucide-react';
import bannerLogo from '../../assets/images/banner.png';

export const Navbar: React.FC = () => {
  const {
    activeView,
    setActiveView,
    cart,
    setIsCartOpen,
    wishlist,
    setIsSearchOpen,
    customer,
    setIsAuthModalOpen,
    logout,
    settings,
    changeCurrency,
    setSelectedCategory
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks = [
    { label: 'Home', view: 'home' as const },
    { label: 'Shop', view: 'shop' as const },
    { label: 'New Arrivals', view: 'shop' as const, badge: 'New' },
    { label: 'Track Order', view: 'track-order' as const },
    { label: 'About Us', view: 'about' as const },
    { label: 'Contact', view: 'contact' as const }
  ];

  const handleNavClick = (view: any, cat?: string) => {
    if (cat) {
      setSelectedCategory(cat);
    } else {
      setSelectedCategory(null);
    }
    setActiveView(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#092328]/10 transition-all duration-200">
      {/* Top Utility & Announcement Banner */}
      <div className="bg-[#092328] text-[#FAF8F5] text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="hidden md:flex items-center gap-4 text-[#8BBB92]">
            <span>Atelier Concierge: {settings.contactPhone}</span>
            <span>·</span>
            <span>Worldwide DHL Express Available</span>
          </div>

          <div className="text-center mx-auto md:mx-0 font-medium tracking-wide">
            {settings.announcementText}
          </div>

          <div className="hidden md:flex items-center gap-4">
            {/* Currency Selector */}
            <div className="relative">
              <button
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className="flex items-center gap-1.5 text-xs text-[#FAF8F5]/90 hover:text-white transition-colors cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5 text-[#8BBB92]" />
                <span>{settings.currency}</span>
                <ChevronDown className="w-3 h-3 opacity-70" />
              </button>

              {currencyDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-28 bg-[#092328] border border-[#2A835F]/40 shadow-xl rounded py-1 z-50 text-left"
                  onMouseLeave={() => setCurrencyDropdownOpen(false)}
                >
                  {(['PKR', 'USD', 'GBP', 'AED', 'EUR'] as const).map((curr) => (
                    <button
                      key={curr}
                      onClick={() => {
                        changeCurrency(curr);
                        setCurrencyDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs hover:bg-[#12544F] transition-colors cursor-pointer ${
                        settings.currency === curr ? 'text-[#8BBB92] font-semibold' : 'text-[#FAF8F5]/80'
                      }`}
                    >
                      {curr}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Admin Access pill */}
            <button
              onClick={() => handleNavClick(activeView === 'admin' ? 'home' : 'admin')}
              className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                activeView === 'admin'
                  ? 'bg-[#8BBB92] text-[#092328] font-bold'
                  : 'bg-[#12544F] text-[#FAF8F5] hover:bg-[#2A835F]'
              }`}
            >
              <ShieldCheck className="w-3 h-3" />
              <span>{activeView === 'admin' ? 'View Storefront' : 'Admin Portal'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#092328] hover:text-[#12544F] cursor-pointer"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Brand Logo Lockup */}
          <div className="flex items-center">
            <button
              onClick={() => handleNavClick('home')}
              className="group text-left cursor-pointer flex items-center gap-3"
            >
              <img
                src={bannerLogo}
                alt="Comfort - Designer Lady Garments"
                className="h-11 sm:h-13 w-auto object-contain transition-transform duration-300 group-hover:scale-105 shrink-0"
                referrerPolicy="no-referrer"
              />
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-serif-luxury text-2xl sm:text-3xl font-semibold tracking-wider text-[#092328] uppercase group-hover:text-[#12544F] transition-colors leading-none">
                    Comfort
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2A835F]"></span>
                </div>
                <span className="text-[9px] sm:text-[10px] tracking-[0.22em] uppercase text-[#12544F]/80 font-medium mt-1">
                  Designer Lady Garments
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.view)}
                className={`relative py-2 text-sm tracking-wide transition-colors cursor-pointer ${
                  activeView === link.view
                    ? 'text-[#12544F] font-semibold'
                    : 'text-[#092328]/80 hover:text-[#12544F]'
                }`}
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="ml-1 text-[10px] text-[#2A835F] font-bold uppercase tracking-wider">
                    · {link.badge}
                  </span>
                )}
                {activeView === link.view && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#12544F]"></span>
                )}
              </button>
            ))}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-[#092328]/80 hover:text-[#12544F] hover:bg-[#12544F]/5 rounded-full transition-colors cursor-pointer"
              aria-label="Search collection"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => handleNavClick('account')}
              className="relative p-2 text-[#092328]/80 hover:text-[#12544F] hover:bg-[#12544F]/5 rounded-full transition-colors cursor-pointer"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#2A835F] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-[#092328]/80 hover:text-[#12544F] hover:bg-[#12544F]/5 rounded-full transition-colors cursor-pointer"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#092328] text-[#8BBB92] text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Account Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  if (!customer) {
                    setIsAuthModalOpen(true);
                  } else {
                    setAccountDropdownOpen(!accountDropdownOpen);
                  }
                }}
                className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 text-xs text-[#092328] hover:bg-[#12544F]/5 rounded-lg transition-colors cursor-pointer"
              >
                <div className="w-7 h-7 rounded-full bg-[#12544F]/10 text-[#12544F] flex items-center justify-center font-medium">
                  {customer ? customer.name.charAt(0) : <User className="w-4 h-4" />}
                </div>
                <span className="hidden sm:inline font-medium text-xs max-w-[100px] truncate">
                  {customer ? customer.name.split(' ')[0] : 'Sign In'}
                </span>
              </button>

              {customer && accountDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-56 bg-white border border-[#092328]/10 shadow-2xl rounded-xl py-2 z-50"
                  onMouseLeave={() => setAccountDropdownOpen(false)}
                >
                  <div className="px-4 py-2 border-b border-[#092328]/10">
                    <p className="text-xs font-semibold text-[#092328]">{customer.name}</p>
                    <p className="text-[11px] text-[#092328]/60 truncate">{customer.email}</p>
                    <span className="inline-block mt-1 px-2 py-0.5 bg-[#8BBB92]/20 text-[#12544F] text-[10px] font-bold uppercase rounded">
                      {customer.tier} Member
                    </span>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => {
                        handleNavClick('account');
                        setAccountDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-[#092328] hover:bg-[#FAF8F5] cursor-pointer"
                    >
                      My Dashboard & Orders
                    </button>
                    <button
                      onClick={() => {
                        handleNavClick('track-order');
                        setAccountDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-[#092328] hover:bg-[#FAF8F5] cursor-pointer"
                    >
                      Track Shipment
                    </button>
                    <button
                      onClick={() => {
                        handleNavClick('admin');
                        setAccountDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-[#2A835F] font-semibold hover:bg-[#FAF8F5] cursor-pointer"
                    >
                      Admin Dashboard
                    </button>
                  </div>

                  <div className="border-t border-[#092328]/10 pt-1">
                    <button
                      onClick={() => {
                        logout();
                        setAccountDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 cursor-pointer"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#092328]/10 bg-[#FAF8F5] px-4 pt-3 pb-6 space-y-3">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.view)}
                className={`w-full text-left py-2.5 px-3 rounded-lg text-sm font-medium ${
                  activeView === link.view
                    ? 'bg-[#12544F] text-white'
                    : 'text-[#092328] hover:bg-[#12544F]/5'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-[#092328]/10 flex flex-col gap-2">
            <button
              onClick={() => handleNavClick(activeView === 'admin' ? 'home' : 'admin')}
              className="w-full py-2.5 px-3 bg-[#092328] text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-[#8BBB92]" />
              {activeView === 'admin' ? 'Switch to Storefront' : 'Switch to Shopify-Style Admin'}
            </button>

            <div className="flex items-center justify-between text-xs pt-2 text-[#092328]/70">
              <span>Currency:</span>
              <div className="flex gap-1">
                {(['PKR', 'USD', 'GBP', 'AED', 'EUR'] as const).map((curr) => (
                  <button
                    key={curr}
                    onClick={() => changeCurrency(curr)}
                    className={`px-2 py-1 rounded text-[11px] ${
                      settings.currency === curr
                        ? 'bg-[#12544F] text-white font-bold'
                        : 'bg-[#092328]/5 text-[#092328]'
                    }`}
                  >
                    {curr}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
