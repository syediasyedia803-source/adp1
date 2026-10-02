import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Users, Search, Mail, Phone, ShoppingBag, Award, Eye, X } from 'lucide-react';
import { Customer } from '../../types';

export const AdminCustomers: React.FC = () => {
  const { customer, orders, formatPrice } = useStore();
  const [search, setSearch] = useState('');
  const [selectedCust, setSelectedCust] = useState<Customer | null>(null);

  // Derive all customers from orders + registered customer
  const customerList = [
    ...(customer ? [customer] : []),
    {
      id: 'cust-demo-2',
      name: 'Amina Tariq',
      email: 'amina.tariq@gmail.com',
      phone: '+92 321 4458922',
      role: 'customer' as const,
      tier: 'Gold' as const,
      totalSpent: 62000,
      orderCount: 2,
      addresses: [],
      wishlistIds: [],
      createdAt: '2026-06-18T00:00:00Z'
    },
    {
      id: 'cust-demo-3',
      name: 'Zara Rehman',
      email: 'zara.rehman@hotmail.com',
      phone: '+92 333 9821445',
      role: 'customer' as const,
      tier: 'Silver' as const,
      totalSpent: 28500,
      orderCount: 1,
      addresses: [],
      wishlistIds: [],
      createdAt: '2026-07-22T00:00:00Z'
    },
    {
      id: 'cust-demo-4',
      name: 'Mahnoor Bilal',
      email: 'mahnoor.bilal@outlook.com',
      phone: '+92 333 5521908',
      role: 'customer' as const,
      tier: 'Standard' as const,
      totalSpent: 18500,
      orderCount: 1,
      addresses: [],
      wishlistIds: [],
      createdAt: '2026-09-01T00:00:00Z'
    }
  ];

  const filtered = customerList.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search)
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif-luxury text-3xl font-semibold text-[#092328]">
          Customer Directory & Loyalty
        </h1>
        <p className="text-xs text-[#092328]/60 mt-0.5">
          Patron profiles, lifetime value, acquisition metrics, and VIP tier allocations.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-[#092328]/10 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-[#092328]/10 flex justify-between items-center">
          <div className="relative max-w-sm w-full">
            <Search className="w-4 h-4 text-[#092328]/40 absolute left-3 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by patron name, email, or phone..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#FAF8F5] border border-[#092328]/15 rounded-xl focus:outline-none"
            />
          </div>
          <span className="text-xs text-[#092328]/60">{filtered.length} Patrons Enrolled</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#FAF8F5] text-[#092328] uppercase text-[10px] tracking-wider border-b border-[#092328]/10">
              <tr>
                <th className="py-3 px-4">Patron Name</th>
                <th className="py-3 px-4">Contact</th>
                <th className="py-3 px-4">VIP Tier</th>
                <th className="py-3 px-4">Orders</th>
                <th className="py-3 px-4">Lifetime Spend</th>
                <th className="py-3 px-4">Enrolled Since</th>
                <th className="py-3 px-4 text-right">View Profile</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#092328]/10">
              {filtered.map((c) => (
                <tr key={c.id} className="hover:bg-[#FAF8F5]/80 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-[#092328]">
                    {c.name}
                  </td>
                  <td className="py-3.5 px-4">
                    <p className="text-[#092328]">{c.email}</p>
                    <p className="text-[11px] text-[#092328]/60 font-mono">{c.phone}</p>
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                        c.tier === 'VIP'
                          ? 'bg-[#8BBB92]/30 text-[#12544F] border border-[#2A835F]/30'
                          : c.tier === 'Gold'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-[#FAF8F5] text-[#092328]'
                      }`}
                    >
                      {c.tier} Member
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-[#092328] tabular-nums">
                    {c.orderCount}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-[#12544F] tabular-nums">
                    {formatPrice(c.totalSpent)}
                  </td>
                  <td className="py-3.5 px-4 text-[#092328]/60">
                    {new Date(c.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setSelectedCust(c)}
                      className="p-1.5 bg-[#FAF8F5] hover:bg-[#12544F] hover:text-white rounded-lg transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Detail Modal */}
      {selectedCust && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#092328]/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-5 border border-[#092328]/10 shadow-2xl">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#2A835F] tracking-wider">
                  Patron Dossier
                </span>
                <h3 className="font-serif-luxury text-2xl text-[#092328]">{selectedCust.name}</h3>
                <p className="text-xs text-[#092328]/60">{selectedCust.email} · {selectedCust.phone}</p>
              </div>
              <button onClick={() => setSelectedCust(null)} className="p-1">
                <X className="w-5 h-5 text-[#092328]/60" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-[#FAF8F5] rounded-xl">
                <span className="text-[#092328]/60 block text-[11px]">VIP Tier</span>
                <strong className="text-[#12544F] text-sm">{selectedCust.tier}</strong>
              </div>
              <div className="p-3 bg-[#FAF8F5] rounded-xl">
                <span className="text-[#092328]/60 block text-[11px]">Lifetime Spend</span>
                <strong className="text-[#12544F] text-sm tabular-nums">{formatPrice(selectedCust.totalSpent)}</strong>
              </div>
            </div>

            <div className="pt-2">
              <h4 className="text-xs font-semibold uppercase text-[#092328] mb-2">
                Order Activity
              </h4>
              <p className="text-xs text-[#092328]/70">
                Customer has completed {selectedCust.orderCount} orders with average satisfaction rating of 5.0 stars.
              </p>
            </div>

            <div className="flex justify-end pt-3">
              <button
                onClick={() => setSelectedCust(null)}
                className="px-5 py-2 bg-[#092328] text-white text-xs font-semibold rounded-xl"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
