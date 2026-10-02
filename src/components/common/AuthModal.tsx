import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { X, Lock, Mail, User, Phone, CheckCircle, Shield } from 'lucide-react';
import bannerLogo from '../../assets/images/banner.png';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, login, register, showToast, setActiveView } = useStore();
  const [tab, setTab] = useState<'login' | 'register'>('login');

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  if (!isAuthModalOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      showToast('Please enter both email and password', 'error');
      return;
    }
    const success = login(email);
    if (success) {
      setIsAuthModalOpen(false);
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !password) {
      showToast('Please fill all required registration fields', 'error');
      return;
    }
    if (password !== confirmPassword) {
      showToast('Passwords do not match', 'error');
      return;
    }
    const success = register(name, email, phone);
    if (success) {
      setIsAuthModalOpen(false);
    }
  };

  const fillDemoCustomer = () => {
    setEmail('syediasyedia803@gmail.com');
    setPassword('comfort2026!');
    login('syediasyedia803@gmail.com', 'Syeda Fatima Zahra');
    setIsAuthModalOpen(false);
  };

  const fillDemoAdmin = () => {
    setEmail('admin@comfortgarments.pk');
    setPassword('comfortAdmin99!');
    login('admin@comfortgarments.pk', 'Syeda Fatima Zahra (Super Admin)');
    setIsAuthModalOpen(false);
    setActiveView('admin');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-[#092328]/70 backdrop-blur-xs transition-opacity"
        onClick={() => setIsAuthModalOpen(false)}
      />

      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-[#092328]/10 overflow-hidden">
          {/* Header */}
          <div className="p-6 bg-[#092328] text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={bannerLogo}
                alt="Comfort"
                className="h-10 w-auto object-contain shrink-0"
                referrerPolicy="no-referrer"
              />
              <div>
                <span className="font-serif-luxury text-2xl font-bold tracking-wider uppercase leading-none block">
                  Comfort
                </span>
                <p className="text-[10px] text-[#8BBB92] uppercase tracking-[0.2em] font-medium mt-0.5">
                  Designer Lady Garments
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsAuthModalOpen(false)}
              className="p-1.5 text-white/60 hover:text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Demo Credentials Bar */}
          <div className="p-3 bg-[#FAF8F5] border-b border-[#092328]/10 text-xs">
            <div className="flex items-center justify-between text-[11px] text-[#092328]/70 mb-2 font-medium">
              <span>Fast One-Click Demo Access:</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={fillDemoCustomer}
                className="py-1.5 px-2 bg-white border border-[#2A835F]/40 text-[#12544F] rounded text-[11px] font-medium hover:bg-[#8BBB92]/10 transition-colors flex items-center justify-center gap-1 cursor-pointer"
              >
                <User className="w-3 h-3 text-[#2A835F]" />
                <span>Customer Login</span>
              </button>
              <button
                type="button"
                onClick={fillDemoAdmin}
                className="py-1.5 px-2 bg-[#092328] text-white rounded text-[11px] font-medium hover:bg-[#12544F] transition-colors flex items-center justify-center gap-1 cursor-pointer"
              >
                <Shield className="w-3 h-3 text-[#8BBB92]" />
                <span>Super Admin</span>
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-[#092328]/10">
            <button
              type="button"
              onClick={() => setTab('login')}
              className={`flex-1 py-3 text-xs font-semibold uppercase tracking-wider text-center cursor-pointer transition-colors ${
                tab === 'login'
                  ? 'border-b-2 border-[#12544F] text-[#12544F]'
                  : 'text-[#092328]/60 hover:text-[#092328]'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setTab('register')}
              className={`flex-1 py-3 text-xs font-semibold uppercase tracking-wider text-center cursor-pointer transition-colors ${
                tab === 'register'
                  ? 'border-b-2 border-[#12544F] text-[#12544F]'
                  : 'text-[#092328]/60 hover:text-[#092328]'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Forms */}
          <div className="p-6">
            {tab === 'login' ? (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-[#092328] mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#092328]/40 absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. fatima@example.com"
                      className="w-full pl-9 pr-3 py-2 text-xs bg-[#FAF8F5] border border-[#092328]/20 rounded-lg focus:outline-none focus:border-[#12544F]"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-xs font-medium text-[#092328]">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => showToast('Password reset link sent to registered email', 'info')}
                      className="text-[11px] text-[#12544F] hover:underline cursor-pointer"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#092328]/40 absolute left-3 top-3" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-3 py-2 text-xs bg-[#FAF8F5] border border-[#092328]/20 rounded-lg focus:outline-none focus:border-[#12544F]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#092328] text-white text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-[#12544F] transition-colors cursor-pointer shadow-md"
                >
                  Sign In to Atelier
                </button>
              </form>
            ) : (
              <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-medium text-[#092328] mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#092328]/40 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Syeda Fatima"
                      className="w-full pl-9 pr-3 py-2 text-xs bg-[#FAF8F5] border border-[#092328]/20 rounded-lg focus:outline-none focus:border-[#12544F]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#092328] mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#092328]/40 absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@domain.com"
                      className="w-full pl-9 pr-3 py-2 text-xs bg-[#FAF8F5] border border-[#092328]/20 rounded-lg focus:outline-none focus:border-[#12544F]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#092328] mb-1">
                    Mobile Phone (for delivery SMS)
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#092328]/40 absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+92 300 1234567"
                      className="w-full pl-9 pr-3 py-2 text-xs bg-[#FAF8F5] border border-[#092328]/20 rounded-lg focus:outline-none focus:border-[#12544F]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-medium text-[#092328] mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••"
                      className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#092328]/20 rounded-lg focus:outline-none focus:border-[#12544F]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#092328] mb-1">
                      Confirm
                    </label>
                    <input
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••"
                      className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#092328]/20 rounded-lg focus:outline-none focus:border-[#12544F]"
                    />
                  </div>
                </div>

                <div className="text-[11px] text-[#092328]/60 space-y-1 pt-1">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-[#2A835F]" />
                    <span>Free membership with reward points on every order</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#092328] text-white text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-[#12544F] transition-colors cursor-pointer shadow-md"
                >
                  Create Account
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
