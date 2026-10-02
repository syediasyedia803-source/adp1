import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { ShieldCheck, UserCheck, Plus, Check } from 'lucide-react';
import { StaffMember } from '../../types';

export const AdminRoles: React.FC = () => {
  const { staff, updateStaffRole } = useStore();

  const roleOptions: StaffMember['role'][] = [
    'Super Admin',
    'Store Manager',
    'Order Manager',
    'Product Specialist',
    'Support Staff'
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif-luxury text-3xl font-semibold text-[#092328]">
          Staff & Granular Role Permissions
        </h1>
        <p className="text-xs text-[#092328]/60 mt-0.5">
          Role-Based Access Control (RBAC) governing products, orders, inventory, analytics, and billing modules.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-[#092328]/10 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-[#092328]/10 flex justify-between items-center text-xs">
          <span className="font-semibold text-[#092328]">Active Atelier Staff ({staff.length})</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#FAF8F5] text-[#092328] uppercase text-[10px] tracking-wider border-b border-[#092328]/10">
              <tr>
                <th className="py-3 px-4">Staff Member</th>
                <th className="py-3 px-4">Role Assignment</th>
                <th className="py-3 px-4">Products</th>
                <th className="py-3 px-4">Orders</th>
                <th className="py-3 px-4">Inventory</th>
                <th className="py-3 px-4">Analytics</th>
                <th className="py-3 px-4">Settings</th>
                <th className="py-3 px-4">Last Activity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#092328]/10">
              {staff.map((member) => (
                <tr key={member.id} className="hover:bg-[#FAF8F5]/80 transition-colors">
                  <td className="py-3.5 px-4">
                    <p className="font-semibold text-[#092328]">{member.name}</p>
                    <p className="text-[11px] text-[#092328]/60">{member.email}</p>
                  </td>
                  <td className="py-3.5 px-4">
                    <select
                      value={member.role}
                      onChange={(e) => updateStaffRole(member.id, e.target.value as any)}
                      className="p-1.5 bg-white border border-[#092328]/20 rounded-lg text-xs font-semibold focus:outline-none"
                    >
                      {roleOptions.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="py-3.5 px-4">
                    {member.permissions.products ? (
                      <Check className="w-4 h-4 text-[#2A835F]" />
                    ) : (
                      <span className="text-gray-300">—</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    {member.permissions.orders ? (
                      <Check className="w-4 h-4 text-[#2A835F]" />
                    ) : (
                      <span className="text-gray-300">—</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    {member.permissions.inventory ? (
                      <Check className="w-4 h-4 text-[#2A835F]" />
                    ) : (
                      <span className="text-gray-300">—</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    {member.permissions.analytics ? (
                      <Check className="w-4 h-4 text-[#2A835F]" />
                    ) : (
                      <span className="text-gray-300">—</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    {member.permissions.settings ? (
                      <Check className="w-4 h-4 text-[#2A835F]" />
                    ) : (
                      <span className="text-gray-300">—</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-[#092328]/60 text-[11px]">
                    {member.lastActive}
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
