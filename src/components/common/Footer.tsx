import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import bannerLogo from '../../assets/images/banner.png';

export const Footer: React.FC = () => {
  const { setActiveView, setSelectedCategory, settings, showToast } = useStore();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      showToast('Please enter a valid email address', 'error');
      return;
    }
    setSubscribed(true);
    showToast('Welcome to the Comfort Atelier Circle. Check your inbox for 10% off!');
    setNewsletterEmail('');
  };

  const navigateTo = (view: any, cat?: string) => {
    if (cat) setSelectedCategory(cat);
    else setSelectedCategory(null);
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#092328] text-[#FAF8F5] pt-16 pb-12 border-t border-[#12544F]/50">
      {/* Upper Atelier Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-[#FAF8F5]/10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#12544F]/40 border border-[#8BBB92]/30 flex items-center justify-center shrink-0 text-[#8BBB92]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold tracking-wide text-white">Pure Craftsmanship</h4>
              <p className="text-xs text-[#FAF8F5]/70 mt-1 leading-relaxed">
                Hand-embroidered zardozi, tilla, and pure raw silk fabrics crafted by master artisans.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#12544F]/40 border border-[#8BBB92]/30 flex items-center justify-center shrink-0 text-[#8BBB92]">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold tracking-wide text-white">Complimentary Delivery</h4>
              <p className="text-xs text-[#FAF8F5]/70 mt-1 leading-relaxed">
                Free insured express delivery across Pakistan on orders above Rs. 12,000.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#12544F]/40 border border-[#8BBB92]/30 flex items-center justify-center shrink-0 text-[#8BBB92]">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold tracking-wide text-white">14-Day Effortless Returns</h4>
              <p className="text-xs text-[#FAF8F5]/70 mt-1 leading-relaxed">
                Hassle-free doorstep pickup exchange and full refunds on all unstitched & pret wear.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#12544F]/40 border border-[#8BBB92]/30 flex items-center justify-center shrink-0 text-[#8BBB92]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold tracking-wide text-white">Cash on Delivery & Secure</h4>
              <p className="text-xs text-[#FAF8F5]/70 mt-1 leading-relaxed">
                Inspect before paying with Cash on Delivery or pay securely via direct bank transfer.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={bannerLogo}
                alt="Comfort"
                className="h-12 w-auto object-contain shrink-0"
                referrerPolicy="no-referrer"
              />
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-serif-luxury text-3xl font-semibold tracking-wider text-white uppercase leading-none">
                    Comfort
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8BBB92]"></span>
                </div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#8BBB92] font-medium mt-1">
                  Designer Lady Garments
                </span>
              </div>
            </div>
            <p className="text-xs text-[#FAF8F5]/75 leading-relaxed max-w-sm">
              Rooted in Pakistan’s rich sartorial heritage, Comfort reimagines contemporary women’s couture with refined tailoring, breathable organic silks, and heirloom embroidery designed to empower every woman with unmatched confidence.
            </p>

            <div className="pt-2 space-y-2 text-xs text-[#FAF8F5]/80">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#8BBB92]" />
                <span>Concierge & WhatsApp: {settings.whatsappNumber}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#8BBB92]" />
                <span>{settings.contactEmail}</span>
              </div>
            </div>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="text-xs font-semibold tracking-[0.15em] uppercase text-[#8BBB92] mb-4">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-xs text-[#FAF8F5]/70">
              <li>
                <button
                  onClick={() => navigateTo('track-order')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Track Your Shipment
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('account')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  My Orders & Returns
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Size Guide & Measurements
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Delivery & Shipping Rates
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contact Atelier Support
                </button>
              </li>
            </ul>
          </div>

          {/* Collections */}
          <div>
            <h4 className="text-xs font-semibold tracking-[0.15em] uppercase text-[#8BBB92] mb-4">
              Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-[#FAF8F5]/70">
              <li>
                <button
                  onClick={() => navigateTo('shop', 'Luxury Pret')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Luxury Pret 2026
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('shop', 'Shalwar Kameez')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Shalwar Kameez
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('shop', 'Co-Ord Sets')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Linen Co-Ord Sets
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('shop', 'Velvet Edition')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Velvet Royal Edition
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('shop', 'Kurti & Tunics')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Daily Elegance Kurtis
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xs font-semibold tracking-[0.15em] uppercase text-[#8BBB92] mb-4">
              Atelier Circle
            </h4>
            <p className="text-xs text-[#FAF8F5]/70 mb-4 leading-relaxed">
              Subscribe for private previews of new collections and invitations to seasonal exhibitions.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 p-3 bg-[#12544F]/50 border border-[#8BBB92]/40 rounded-lg text-xs text-[#8BBB92]">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>You are subscribed to the Comfort Atelier Circle.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full bg-[#12544F]/30 border border-[#FAF8F5]/20 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-[#FAF8F5]/40 focus:outline-none focus:border-[#8BBB92] transition-colors"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1.5 p-1.5 bg-[#2A835F] text-white rounded hover:bg-[#8BBB92] hover:text-[#092328] transition-colors cursor-pointer"
                    aria-label="Subscribe"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[11px] text-[#FAF8F5]/50">
                  By subscribing, you agree to receive Comfort communications.
                </p>
              </form>
            )}

            {/* Atelier Locations Snapshot */}
            <div className="mt-6 pt-4 border-t border-[#FAF8F5]/10">
              <span className="text-[11px] font-medium text-[#8BBB92] flex items-center gap-1.5 mb-1.5">
                <MapPin className="w-3 h-3" /> Flagship Ateliers
              </span>
              <p className="text-[11px] text-[#FAF8F5]/60">
                Lahore: Gulberg Galleria · Karachi: Clifton · Islamabad: Beverly Centre
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-[#FAF8F5]/10 text-xs text-[#FAF8F5]/60 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          © {new Date().getFullYear()} Comfort Designer Lady Garments. All rights reserved.
        </div>
        <div className="flex items-center gap-6">
          <button onClick={() => navigateTo('about')} className="hover:text-white transition-colors cursor-pointer">
            Brand Heritage
          </button>
          <button onClick={() => navigateTo('contact')} className="hover:text-white transition-colors cursor-pointer">
            Privacy & Terms
          </button>
          <button onClick={() => navigateTo('admin')} className="text-[#8BBB92] hover:underline cursor-pointer">
            Staff Portal
          </button>
        </div>
      </div>
    </footer>
  );
};
