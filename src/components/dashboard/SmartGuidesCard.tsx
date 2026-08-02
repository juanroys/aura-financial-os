import React from 'react';
import { Target, Plus, Users, Search, SlidersHorizontal, ChevronDown, Star, Eye } from 'lucide-react';

export const SmartGuidesCard: React.FC = () => {
  return (
    <div className="rounded-[2.2rem] bg-white shadow-sm border border-gray-200/70 overflow-hidden space-y-4 font-jakarta">
      
      {/* Dark Header Cap (Matching Reference Image Exact Geometry & Buttons) */}
      <div className="dark-header-cap px-7 py-4 flex items-center justify-between shadow-md">
        <h3 className="text-base font-extrabold text-white tracking-tight font-jakarta">Smart Guides</h3>

        <div className="flex items-center gap-2">
          <button 
            className="w-8 h-8 rounded-full border border-white/25 bg-transparent text-white flex items-center justify-center hover:bg-white/15 transition-all shadow-2xs"
            title="Ajustes"
          >
            <Target className="w-3.5 h-3.5 stroke-[1.75]" />
          </button>
          <button 
            className="w-8 h-8 rounded-full border border-white/25 bg-transparent text-white flex items-center justify-center hover:bg-white/15 transition-all shadow-2xs"
            title="Agregar"
          >
            <Plus className="w-3.5 h-3.5 stroke-[1.75]" />
          </button>
        </div>
      </div>

      {/* Sub-header Controls Row */}
      <div className="px-7 flex items-center justify-between gap-4 pt-1">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#101217] text-white flex items-center justify-center shadow-xs">
            <Users className="w-4 h-4 stroke-[1.75]" />
          </div>
          <span className="text-sm font-extrabold text-[#101217] tracking-tight">
            Contacts <span className="font-semibold text-gray-400 text-xs ml-0.5">(3)</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button className="w-8.5 h-8.5 rounded-full border border-gray-300/80 bg-transparent text-gray-700 flex items-center justify-center hover:bg-gray-100 transition-all shadow-2xs">
            <Search className="w-3.5 h-3.5 text-gray-600 stroke-[1.75]" />
          </button>
          <button className="w-8.5 h-8.5 rounded-full border border-gray-300/80 bg-transparent text-gray-700 flex items-center justify-center hover:bg-gray-100 transition-all shadow-2xs">
            <SlidersHorizontal className="w-3.5 h-3.5 text-gray-600 stroke-[1.75]" />
          </button>
          <button className="px-3.5 py-1.5 rounded-full border border-gray-300/80 bg-transparent text-[#101217] font-jakarta font-bold text-xs flex items-center gap-1.5 hover:bg-gray-100 transition-all shadow-2xs">
            <span>Related</span>
            <ChevronDown className="w-3.5 h-3.5 stroke-[1.75]" />
          </button>
        </div>
      </div>

      {/* Section 4: Vibrant Neo-Glow Cards Row (Matching Reference Image 100% Pixel-Perfect) */}
      <div className="px-7 grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Card 1: Emerald Green (#10D670) */}
        <div className="neo-card-green p-4.5 rounded-2xl relative overflow-hidden flex flex-col justify-between shadow-md">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" 
                alt="Brian Carpenter" 
                className="w-11 h-11 rounded-full object-cover ring-2 ring-white/60 shadow-md"
              />
              <h4 className="text-xs font-extrabold text-white leading-tight font-jakarta">Brian<br />Carpenter</h4>
            </div>
            <button className="p-1 text-white/90 hover:text-white transition-all">
              <Star className="w-4 h-4 fill-white/20" />
            </button>
          </div>

          <div className="mt-4 pt-3 border-t border-white/20 grid grid-cols-2 text-[10px] space-y-0.5 font-jakarta">
            <div>
              <span className="opacity-80 block font-medium">Office Phone</span>
              <strong className="text-white font-extrabold">+ 1 - 622 - 484 - 8164</strong>
            </div>
            <div>
              <span className="opacity-80 block font-medium">City</span>
              <strong className="text-white font-extrabold">Chicago</strong>
            </div>
          </div>
          <span className="text-[10px] opacity-90 block mt-2 font-medium font-jakarta">Email</span>
        </div>

        {/* Card 2: Electric Volt Lime (#D6F535) */}
        <div className="neo-card-lime p-4.5 rounded-2xl relative overflow-hidden flex flex-col justify-between shadow-md">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <img 
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80" 
                alt="Brandon Harvey" 
                className="w-11 h-11 rounded-full object-cover ring-2 ring-black/20 shadow-md"
              />
              <h4 className="text-xs font-extrabold text-[#101217] leading-tight font-jakarta">Brandon<br />Harvey</h4>
            </div>
            <button className="p-1 text-black/70 hover:text-black transition-all">
              <Star className="w-4 h-4 fill-black/10" />
            </button>
          </div>

          <div className="mt-4 pt-3 border-t border-black/15 grid grid-cols-2 text-[10px] space-y-0.5 font-jakarta">
            <div>
              <span className="opacity-75 block font-medium">Office Phone</span>
              <strong className="text-[#101217] font-extrabold">+ 1 - 487 - 535 - 2016</strong>
            </div>
            <div>
              <span className="opacity-75 block font-medium">City</span>
              <strong className="text-[#101217] font-extrabold">Chicago</strong>
            </div>
          </div>
          <span className="text-[10px] opacity-85 block mt-2 font-medium font-jakarta">Email</span>
        </div>

        {/* Card 3: Soft Coral Ruby (#E64A53) */}
        <div className="neo-card-red p-4.5 rounded-2xl relative overflow-hidden flex flex-col justify-between shadow-md">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80" 
                alt="Steven Hansen" 
                className="w-11 h-11 rounded-full object-cover ring-2 ring-white/60 shadow-md"
              />
              <h4 className="text-xs font-extrabold text-white leading-tight font-jakarta">Steven<br />Hansen</h4>
            </div>
            <button className="p-1 text-white/90 hover:text-white transition-all">
              <Star className="w-4 h-4 fill-white/20" />
            </button>
          </div>

          <div className="mt-4 pt-3 border-t border-white/20 grid grid-cols-2 text-[10px] space-y-0.5 font-jakarta">
            <div>
              <span className="opacity-80 block font-medium">Office Phone</span>
              <strong className="text-white font-extrabold">+ 1 - 761 - 512 - 3030</strong>
            </div>
            <div>
              <span className="opacity-80 block font-medium">City</span>
              <strong className="text-white font-extrabold">Chicago</strong>
            </div>
          </div>
          <span className="text-[10px] opacity-90 block mt-2 font-medium font-jakarta">Email</span>
        </div>

      </div>

      {/* Table Section */}
      <div className="px-7 pb-6 pt-2 space-y-3 relative">
        <div className="flex items-center justify-between border-b border-gray-100 pb-2">
          <h4 className="text-xs font-extrabold text-[#101217]">Calls (1-5 of 6) / Transacciones & Impuestos</h4>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-jakarta">
            <thead>
              <tr className="text-[10px] text-gray-400 uppercase border-b border-gray-100 font-semibold">
                <th className="py-2 pl-2">⭐</th>
                <th className="py-2">Subject</th>
                <th className="py-2">Status</th>
                <th className="py-2">Start Date</th>
                <th className="py-2">End Date</th>
                <th className="py-2">Assigned User</th>
                <th className="py-2 text-right pr-2">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              <tr className="hover:bg-gray-50/80 transition-all">
                <td className="py-3 pl-2"><Star className="w-3.5 h-3.5 text-gray-300" /></td>
                <td className="py-3 font-bold text-[#101217]">Left a message</td>
                <td className="py-3">
                  <span className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 text-[10px] font-bold">Scheduled</span>
                </td>
                <td className="py-3 text-gray-500">2023-10-25 04:55</td>
                <td className="py-3 text-gray-500">2023-10-25 05:15</td>
                <td className="py-3 font-medium text-[#101217]">Jim Brennan</td>
                <td className="py-3 text-right pr-2">
                  <button className="p-1 rounded hover:bg-gray-200"><Eye className="w-3.5 h-3.5 text-gray-500" /></button>
                </td>
              </tr>

              <tr className="hover:bg-gray-50/80 transition-all">
                <td className="py-3 pl-2"><Star className="w-3.5 h-3.5 text-gray-300" /></td>
                <td className="py-3 font-bold text-[#101217]">Pago Vercel Cloud Hosting</td>
                <td className="py-3">
                  <span className="px-2.5 py-1 rounded-full bg-[#10d670]/20 text-[#10d670] text-[10px] font-bold">Deducible</span>
                </td>
                <td className="py-3 text-gray-500">2026-08-01 10:00</td>
                <td className="py-3 text-gray-500">2026-08-01 10:15</td>
                <td className="py-3 font-medium text-[#101217]">AURA System</td>
                <td className="py-3 text-right pr-2">
                  <button className="p-1 rounded hover:bg-gray-200"><Eye className="w-3.5 h-3.5 text-gray-500" /></button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
