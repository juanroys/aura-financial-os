import React from 'react';
import { Edit3, UserCheck, Mail, Phone, Building2, MapPin, Globe } from 'lucide-react';

export const FounderProfileCard: React.FC = () => {
  return (
    <div className="p-7 rounded-[2.2rem] bg-white shadow-sm border border-gray-200/70 space-y-6">
      
      {/* Header Row: Logo emblem + Title + Separate Standalone Action Pills */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        
        {/* Emblem & Name */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-[#f1f2f4] border border-gray-200 flex flex-col items-center justify-center text-center p-2 shadow-inner">
            <span className="text-[11px] font-black tracking-widest text-[#12161e] uppercase leading-none">MTM</span>
            <span className="text-[7px] text-gray-500 font-bold uppercase tracking-tighter mt-1">INVESTMENT</span>
          </div>

          <div>
            <h2 className="text-xl font-extrabold text-[#12161e] tracking-tight">MTM Investment Bank</h2>
            <p className="text-xs text-gray-500 font-medium">Cuenta Ejecutiva Founder & Startup Capital</p>
          </div>
        </div>

        {/* Action Pills - COMPLETELY SEPARATED STANDALONE PILLS */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <button className="pill-btn-dark">
            Account Details
          </button>

          <button className="pill-btn-light">
            Record Details
          </button>

          <button className="pill-btn-light">
            Sugar Hint
          </button>

          <button 
            className="w-9 h-9 rounded-full bg-[#f1f2f4] text-gray-700 flex items-center justify-center hover:bg-gray-200 transition-all shadow-sm border border-gray-200"
            title="Editar Información"
          >
            <Edit3 className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Metadata Grid (Matching Reference Image) */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-y-5 gap-x-6 text-xs border-t border-gray-100 pt-5">
        
        {/* Type */}
        <div className="space-y-1">
          <span className="text-gray-400 font-medium flex items-center gap-1">
            <UserCheck className="w-3.5 h-3.5 text-gray-400" /> Type
          </span>
          <p className="font-bold text-[#12161e]">Customer / Startup CEO</p>
        </div>

        {/* Email */}
        <div className="space-y-1">
          <span className="text-gray-400 font-medium flex items-center gap-1">
            <Mail className="w-3.5 h-3.5 text-gray-400" /> Email
          </span>
          <p className="font-bold text-[#12161e]">support@mtmbank.com</p>
        </div>

        {/* Office Phone */}
        <div className="space-y-1">
          <span className="text-gray-400 font-medium flex items-center gap-1">
            <Phone className="w-3.5 h-3.5 text-gray-400" /> Office Phone
          </span>
          <p className="font-bold text-[#12161e]">+1 - 641 - 321 - 5050</p>
        </div>

        {/* Industry */}
        <div className="space-y-1">
          <span className="text-gray-400 font-medium flex items-center gap-1">
            <Building2 className="w-3.5 h-3.5 text-gray-400" /> Industry
          </span>
          <p className="font-bold text-[#12161e]">Education / Startup FinTech</p>
        </div>

        {/* Billing Address */}
        <div className="space-y-1">
          <span className="text-gray-400 font-medium flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-gray-400" /> Billing Address
          </span>
          <p className="font-bold text-[#12161e] leading-tight">
            259 Bel Air Ave<br />Orlando, Florida 32812 USA
          </p>
        </div>

        {/* Web Site */}
        <div className="space-y-1">
          <span className="text-gray-400 font-medium flex items-center gap-1">
            <Globe className="w-3.5 h-3.5 text-gray-400" /> Web Site
          </span>
          <p className="font-bold text-[#12161e] truncate">mtmbank.com</p>
        </div>

      </div>

    </div>
  );
};
