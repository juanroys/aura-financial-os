import React from 'react';
import { Edit3, UserCheck, Mail, Phone, Building2, MapPin, Globe } from 'lucide-react';

export const FounderProfileCard: React.FC = () => {
  return (
    <div className="w-full bg-transparent p-6 space-y-6 font-jakarta">
      
      {/* Header Row: Logo emblem + Title + Independent Standalone Action Pills */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        
        {/* Emblem Stadium Oval & Title Stack */}
        <div className="flex items-center gap-6">
          
          {/* White Oval Stadium Emblem */}
          <div className="w-36 h-20 rounded-full bg-white flex flex-col items-center justify-center text-center p-2 shadow-2xs border border-gray-200/50 shrink-0">
            <span className="font-serif-logo font-black text-2xl text-[#101217] tracking-tight leading-none">MTM</span>
            <span className="font-serif-logo text-[7px] text-gray-500 font-bold tracking-widest mt-1">INVESTMENT</span>
          </div>

          {/* Title Stack */}
          <h2 className="font-jakarta text-2xl font-extrabold text-[#101217] leading-tight tracking-tight">
            MTM<br />Investment<br />Bank
          </h2>
        </div>

        {/* Action Pills - Completely Separate Standalone Pills Set Directly on Silver Canvas */}
        <div className="flex items-center gap-3 flex-wrap">
          <button className="px-6 py-2.5 rounded-full bg-[#101217] text-white font-jakarta font-bold text-xs shadow-sm hover:scale-105 transition-all">
            Account Details
          </button>

          <button className="px-5 py-2.5 rounded-full bg-transparent border border-gray-300/80 text-[#101217] font-jakarta font-semibold text-xs hover:bg-white/50 transition-all">
            Record Details
          </button>

          <button className="px-5 py-2.5 rounded-full bg-transparent border border-gray-300/80 text-[#101217] font-jakarta font-semibold text-xs hover:bg-white/50 transition-all">
            Sugar Hint
          </button>

          <button 
            className="w-9 h-9 rounded-full border border-gray-300/80 bg-transparent text-gray-700 flex items-center justify-center hover:bg-white/50 transition-all"
            title="Editar Información"
          >
            <Edit3 className="w-4 h-4 text-gray-600 stroke-[1.75]" />
          </button>
        </div>
      </div>

      {/* Metadata Grid (3 Cols, 2 Rows, Set Directly on Silver Canvas) */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-8 text-xs font-jakarta pt-2">
        
        {/* Type */}
        <div className="space-y-1">
          <span className="text-[#101217] font-bold flex items-center gap-1.5">
            <UserCheck className="w-4 h-4 text-gray-500 stroke-[1.75]" /> Type
          </span>
          <p className="text-gray-500 font-medium pl-5.5">Customer</p>
        </div>

        {/* Email */}
        <div className="space-y-1">
          <span className="text-[#101217] font-bold flex items-center gap-1.5">
            <Mail className="w-4 h-4 text-gray-500 stroke-[1.75]" /> Email
          </span>
          <p className="text-gray-500 font-medium pl-5.5">support@mtmbank.com</p>
        </div>

        {/* Office Phone */}
        <div className="space-y-1">
          <span className="text-[#101217] font-bold flex items-center gap-1.5">
            <Phone className="w-4 h-4 text-gray-500 stroke-[1.75]" /> Office Phone
          </span>
          <p className="text-gray-500 font-medium pl-5.5">+ 1 - 641 - 321 - 5050</p>
        </div>

        {/* Industry */}
        <div className="space-y-1">
          <span className="text-[#101217] font-bold flex items-center gap-1.5">
            <Building2 className="w-4 h-4 text-gray-500 stroke-[1.75]" /> Industry
          </span>
          <p className="text-gray-500 font-medium pl-5.5">Education</p>
        </div>

        {/* Billing Address */}
        <div className="space-y-1">
          <span className="text-[#101217] font-bold flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-gray-500 stroke-[1.75]" /> Billing Address
          </span>
          <p className="text-gray-500 font-medium leading-tight pl-5.5">
            259 Bel Air Ave<br />Orlando, Florida 32812<br />USA
          </p>
        </div>

        {/* Shipping Address */}
        <div className="space-y-1">
          <span className="text-[#101217] font-bold flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-gray-500 stroke-[1.75]" /> Shipping Address
          </span>
          <p className="text-gray-500 font-medium leading-tight pl-5.5">
            259 Bel Air Ave<br />Orlando, Florida 32812<br />USA
          </p>
        </div>

        {/* Web Site */}
        <div className="space-y-1 col-span-1">
          <span className="text-[#101217] font-bold flex items-center gap-1.5">
            <Globe className="w-4 h-4 text-gray-500 stroke-[1.75]" /> Web Site
          </span>
          <p className="text-gray-500 font-medium pl-5.5 truncate">mtmbank.com</p>
        </div>

      </div>

    </div>
  );
};
