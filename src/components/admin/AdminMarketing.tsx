import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Megaphone, Mail, Send, CheckCircle2, ShoppingBag, Clock } from 'lucide-react';

export const AdminMarketing: React.FC = () => {
  const { abandonedCarts, sendRecoveryReminder, formatPrice } = useStore();

  const totalAbandonedValue = abandonedCarts.reduce((sum, c) => sum + c.cartTotal, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif-luxury text-3xl font-semibold text-[#092328]">
          Marketing Automation & Cart Recovery
        </h1>
        <p className="text-xs text-[#092328]/60 mt-0.5">
          Recapture high-intent couture shoppers with targeted email reminders and personalized discount incentives.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="p-6 bg-white rounded-2xl border border-[#092328]/10 shadow-xs space-y-1">
          <span className="text-xs uppercase font-semibold text-[#092328]/60">Abandoned Carts</span>
          <p className="text-2xl font-bold font-mono text-[#092328]">{abandonedCarts.length}</p>
          <p className="text-[11px] text-[#092328]/60">Captured within last 24 hours</p>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-[#092328]/10 shadow-xs space-y-1">
          <span className="text-xs uppercase font-semibold text-[#12544F]">At-Risk Pipeline Value</span>
          <p className="text-2xl font-bold font-mono text-[#12544F] tabular-nums">
            {formatPrice(totalAbandonedValue)}
          </p>
          <p className="text-[11px] text-[#2A835F] font-semibold">Average recovery conversion: 24.2%</p>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-[#092328]/10 shadow-xs space-y-1">
          <span className="text-xs uppercase font-semibold text-[#2A835F]">Recovery Incentives</span>
          <p className="text-sm font-semibold text-[#092328]">COMFORT10 Attached</p>
          <p className="text-[11px] text-[#092328]/60">10% discount automatically provided in email</p>
        </div>
      </div>

      {/* Abandoned Carts Table */}
      <div className="bg-white rounded-3xl border border-[#092328]/10 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-[#092328]/10">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[#092328]">
            Abandoned Checkouts Pipeline
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#FAF8F5] text-[#092328] uppercase text-[10px] tracking-wider border-b border-[#092328]/10">
              <tr>
                <th className="py-3 px-4">Shopper</th>
                <th className="py-3 px-4">Abandoned Garments</th>
                <th className="py-3 px-4">Cart Value</th>
                <th className="py-3 px-4">Abandoned At</th>
                <th className="py-3 px-4">Campaign Status</th>
                <th className="py-3 px-4 text-right">Recovery Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#092328]/10">
              {abandonedCarts.map((cart) => (
                <tr key={cart.id} className="hover:bg-[#FAF8F5]/80 transition-colors">
                  <td className="py-3.5 px-4">
                    <p className="font-semibold text-[#092328]">{cart.customerName}</p>
                    <p className="text-[11px] text-[#092328]/60">{cart.email}</p>
                    <p className="text-[10px] font-mono text-[#092328]/40">{cart.phone}</p>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="space-y-1">
                      {cart.items.map((item, i) => (
                        <p key={i} className="text-[#092328] font-medium">
                          {item.productTitle} ({item.size})
                        </p>
                      ))}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-[#12544F] tabular-nums">
                    {formatPrice(cart.cartTotal)}
                  </td>
                  <td className="py-3.5 px-4 text-[#092328]/60 font-medium">
                    {cart.abandonedAt}
                  </td>
                  <td className="py-3.5 px-4">
                    {cart.recoveryEmailSent ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-[#2A835F]/20 text-[#2A835F] flex items-center gap-1 w-max">
                        <CheckCircle2 className="w-3 h-3" /> Dispatched
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-100 text-amber-800 flex items-center gap-1 w-max">
                        <Clock className="w-3 h-3" /> Ready to Send
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => sendRecoveryReminder(cart.id)}
                      disabled={cart.recoveryEmailSent}
                      className="px-3.5 py-1.5 bg-[#092328] text-white rounded-lg text-xs font-semibold hover:bg-[#12544F] transition-colors flex items-center gap-1.5 ml-auto cursor-pointer disabled:opacity-40"
                    >
                      <Send className="w-3 h-3" />
                      <span>{cart.recoveryEmailSent ? 'Re-send Email' : 'Send Incentive Email'}</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
