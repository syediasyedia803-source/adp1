import React from 'react';
import { useStore } from '../../context/StoreContext';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast } = useStore();

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-4 h-4 text-[#8BBB92]" />,
    error: <AlertCircle className="w-4 h-4 text-rose-300" />,
    info: <Info className="w-4 h-4 text-[#8BBB92]" />
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-200">
      <div className="flex items-center gap-2.5 px-4 py-3 bg-[#092328] text-white text-xs font-medium rounded-xl shadow-2xl border border-[#2A835F]/40 max-w-md">
        {icons[toast.type]}
        <span>{toast.message}</span>
      </div>
    </div>
  );
};
