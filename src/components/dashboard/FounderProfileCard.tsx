import React from 'react';
import { Edit3, UserCheck, Mail, Phone, Building2, MapPin, Globe } from 'lucide-react';

export const FounderProfileCard: React.FC = () => {
  return (
    <div className="p-6 rounded-[2rem] bg-white shadow-sm border border-gray-200/60 space-y-6">
      
      {/* Header Row: Logo emblem + Title + Action Pills */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        
        {/* Emblem & Name */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-[#f3f4f6] border border-gray-200 flex flex-col items-center justify-center text-center p-2 shadow-inner">
            <span className="text-[10px] font-black tracking-widest text-[#0f1218] uppercase leading-none">AURA</span>
            <span className="text-[8px] text-gray-500 uppercase tracking-tighter mt-0.5">FINANCIAL</span>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#0f1218] tracking-tight">MTM Investment Bank</h2>
            <p className="text-xs text-gray-500 font-medium">Cuenta de Crecimiento Founder & Startup</p>
          </div>
        </div>

        {/* Action Pills */}
        <div className="flex items-center gap-2 flex-wrap">
          <button className="px-4 py-2 rounded-full bg-[#0f1218] text-white text-xs font-bold shadow-md">
            Account Details
          </button>

          <button className="px-4 py-2 rounded-full bg-white border border-gray-300 text-gray-700 text-xs font-semibold hover:bg-gray-50 transition-all">
            Record Details
          </button>

          <button className="px-4 py-2 rounded-full bg-white border border-gray-300 text-gray-700 text-xs font-semibold hover:bg-gray-50 transition-all">
            AURA Hint
          </button>

          <button className="w-9 h-9 rounded-full bg-gray-100 text-gray-700 flex items-center justify-center hover:bg-gray-200 transition-all">
            <Edit3 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Metadata Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-y-5 gap-x-6 text-xs border-t border-gray-100 pt-5">
        
        {/* Type */}
        <div className="space-y-1">
          <span className="text-gray-400 font-medium flex items-center gap-1">
            <UserCheck className="w-3.5 h-3.5" /> Type
          </span>
          <p className="font-bold text-[#0f1218]">Customer / Founder CEO</p>
        </div>

        {/* Email */}
        <div className="space-y-1">
          <span className="text-gray-400 font-medium flex items-center gap-1">
            <Mail className="w-3.5 h-3.5" /> Email
          </span>
          <p className="font-bold text-[#0f1218]">support@mtmbank.com</p>
        </div>

        {/* Office Phone */}
        <div className="space-y-1">
          <span className="text-gray-400 font-medium flex items-center gap-1">
            <Phone className="w-3.5 h-3.5" /> Office Phone
          </span>
          <p className="font-bold text-[#0f1218]">+1 - 641 - 321 - 5050</p>
        </div>

        {/* Industry */}
        <div className="space-y-1">
          <span className="text-gray-400 font-medium flex items-center gap-1">
            <Building2 className="w-3.5 h-3.5" /> Industry
          </span>
          <p className="font-bold text-[#0f1218]">Education / Startup FinTech</p>
        </div>

        {/* Billing Address */}
        <div className="space-y-1">
          <span className="text-gray-400 font-medium flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" /> Billing Address
          </span>
          <p className="font-bold text-[#0f1218] leading-tight">
            259 Bel Air Ave<br />Orlando, Florida 32812 USA
          </p>
        </div>

        {/* Web Site */}
        <div className="space-y-1">
          <span className="text-gray-400 font-medium flex items-center gap-1">
            <Globe className="w-3.5 h-3.5" /> Web Site
          </span>
          <p className="font-bold text-[#0f1218] truncate">mtmbank.com</p>
        </div>

      </div>

    </div>
  );
};
