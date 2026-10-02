import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, CheckCircle2 } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { settings, showToast } = useStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Bespoke Bridal Inquiry');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      showToast('Please complete all contact form fields', 'error');
      return;
    }
    setSent(true);
    showToast('Your message has been received by our atelier concierge.');
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#2A835F]">
            Direct Concierge Service
          </span>
          <h1 className="font-serif-luxury text-3xl sm:text-5xl font-normal text-[#092328]">
            Connect With Our Atelier
          </h1>
          <p className="text-xs sm:text-sm text-[#092328]/70 max-w-lg mx-auto">
            Whether inquiring about custom sizing, bridal appointments, or order dispatches, our dedicated stylist team is here to assist.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Form & WhatsApp (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white p-6 sm:p-10 rounded-3xl border border-[#092328]/10 shadow-sm space-y-6">
              <h2 className="font-serif-luxury text-2xl text-[#092328]">Send an Inquiry</h2>

              {sent ? (
                <div className="p-8 text-center bg-[#8BBB92]/15 border border-[#2A835F]/30 rounded-2xl space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-[#2A835F] mx-auto" />
                  <h3 className="font-serif-luxury text-xl text-[#092328]">Inquiry Received</h3>
                  <p className="text-xs text-[#092328]/70 max-w-sm mx-auto">
                    An atelier stylist will review your message and reply via email or WhatsApp within 4 business hours.
                  </p>
                  <button
                    onClick={() => {
                      setSent(false);
                      setMessage('');
                    }}
                    className="text-xs text-[#12544F] font-semibold hover:underline cursor-pointer"
                  >
                    Send another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#092328] mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Syeda Fatima"
                        className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#092328]/20 rounded-xl focus:outline-none focus:border-[#12544F]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#092328] mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. name@domain.com"
                        className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#092328]/20 rounded-xl focus:outline-none focus:border-[#12544F]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#092328] mb-1">
                      Inquiry Category
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#092328]/20 rounded-xl focus:outline-none focus:border-[#12544F]"
                    >
                      <option value="Bespoke Bridal Inquiry">Bespoke Couture & Bridal Inquiry</option>
                      <option value="Size Consultation">Size & Fit Consultation</option>
                      <option value="Order Tracking & Dispatch">Order Tracking & Dispatch</option>
                      <option value="Exchange or Return">Exchange or Return Assistance</option>
                      <option value="Wholesale / Stockist">Wholesale & International Stockist</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#092328] mb-1">
                      Your Message *
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Please include product names, measurements, or order numbers if applicable..."
                      className="w-full p-3.5 bg-[#FAF8F5] border border-[#092328]/20 rounded-xl focus:outline-none focus:border-[#12544F]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#092328] text-white text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-[#12544F] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Atelier Inquiry</span>
                  </button>
                </form>
              )}
            </div>

            {/* Instant WhatsApp Card */}
            <div className="p-6 bg-[#12544F] text-white rounded-3xl shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-[#8BBB92]">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold">Prefer WhatsApp Concierge?</h4>
                  <p className="text-xs text-[#FAF8F5]/80 mt-0.5">
                    Live chat with our master stylists: {settings.whatsappNumber}
                  </p>
                </div>
              </div>

              <a
                href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 bg-white text-[#092328] hover:bg-[#8BBB92] rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors inline-block text-center whitespace-nowrap cursor-pointer"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Right Column: Physical Boutiques (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="font-serif-luxury text-2xl text-[#092328]">Flagship Ateliers</h2>
            <div className="space-y-4">
              {settings.storeLocations.map((loc, idx) => (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-2xl border border-[#092328]/10 shadow-xs space-y-3"
                >
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#2A835F]" />
                    <h3 className="font-serif-luxury text-base font-semibold text-[#092328]">
                      {loc.title}
                    </h3>
                  </div>

                  <p className="text-xs text-[#092328]/70 leading-relaxed">{loc.address}</p>

                  <div className="pt-2 border-t border-[#092328]/5 flex flex-col gap-1 text-[11px] text-[#092328]/60">
                    <div className="flex items-center gap-2">
                      <Phone className="w-3 h-3 text-[#12544F]" />
                      <span>{loc.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3 h-3 text-[#12544F]" />
                      <span>{loc.timing}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
