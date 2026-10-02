import React from 'react';
import { useStore } from '../../context/StoreContext';
import { FileText, Shield, Clock } from 'lucide-react';

export const AdminAuditLogs: React.FC = () => {
  const { auditLogs } = useStore();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif-luxury text-3xl font-semibold text-[#092328]">
          Atelier Audit & Security Trail
        </h1>
        <p className="text-xs text-[#092328]/60 mt-0.5">
          Immutable chronological ledger of system price changes, inventory adjustments, and status transitions.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-[#092328]/10 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-[#092328]/10 flex justify-between items-center text-xs">
          <span className="font-semibold text-[#092328]">
            Activity Records ({auditLogs.length})
          </span>
        </div>

        <div className="divide-y divide-[#092328]/10">
          {auditLogs.map((log) => (
            <div key={log.id} className="p-5 flex flex-col sm:flex-row justify-between sm:items-center gap-3 hover:bg-[#FAF8F5]/80 transition-colors text-xs">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-[#092328]">{log.adminName}</span>
                  <span className="text-[10px] bg-[#12544F]/10 text-[#12544F] font-bold uppercase px-2 py-0.2 rounded">
                    {log.adminRole}
                  </span>
                  <span className="text-[10px] bg-[#FAF8F5] border border-[#092328]/15 px-2 py-0.2 rounded font-mono">
                    {log.action}
                  </span>
                </div>
                <p className="text-xs text-[#092328]/80">{log.details}</p>
                <span className="text-[10px] text-[#092328]/50 font-mono">
                  Target: {log.objectType} [{log.objectId}]
                </span>
              </div>

              <div className="text-right text-[11px] text-[#092328]/50 shrink-0 font-mono">
                {new Date(log.timestamp).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
