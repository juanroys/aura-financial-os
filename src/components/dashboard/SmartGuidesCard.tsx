import React from 'react';
import { Settings, Plus, Users, Search, SlidersHorizontal, ChevronDown, Star, Eye } from 'lucide-react';

export const SmartGuidesCard: React.FC = () => {
  return (
    <div className="rounded-[2rem] bg-white shadow-sm border border-gray-200/60 overflow-hidden space-y-4">
      
      {/* Dark Header Cap */}
      <div className="dark-header-cap px-6 py-4 flex items-center justify-between">
        <h3 className="text-base font-bold text-white tracking-tight">Smart Guides</h3>

        <div className="flex items-center gap-2">
          <button className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-all">
            <Settings className="w-4 h-4" />
          </button>
          <button className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-all">
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Sub-header Controls Row */}
      <div className="px-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#0f1218] text-white flex items-center justify-center">
            <Users className="w-4 h-4" />
          </div>
          <span className="text-sm font-bold text-[#0f1218]">Contacts (3)</span>
        </div>

        <div className="flex items-center gap-2">
          <button className="w-8 h-8 rounded-full bg-gray-100 text-gray-700 flex items-center justify-center hover:bg-gray-200 transition-all">
            <Search className="w-4 h-4" />
          </button>
          <button className="w-8 h-8 rounded-full bg-gray-100 text-gray-700 flex items-center justify-center hover:bg-gray-200 transition-all">
            <SlidersHorizontal className="w-4 h-4" />
          </button>
          <button className="px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold flex items-center gap-1 hover:bg-gray-200 transition-all">
            <span>Related</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Vibrant Neo-Glow Cards Row */}
      <div className="px-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Card 1: Emerald Green */}
        <div className="neo-card-green p-4 rounded-2xl relative overflow-hidden">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2.5">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" 
                alt="Brian Carpenter" 
                className="w-10 h-10 rounded-full object-cover ring-2 ring-white/50"
              />
              <div>
                <h4 className="text-xs font-bold text-white leading-tight">Brian<br />Carpenter</h4>
              </div>
            </div>
            <Star className="w-4 h-4 text-white/80" />
          </div>

          <div className="mt-4 pt-3 border-t border-white/20 grid grid-cols-2 text-[10px] space-y-0.5">
            <div>
              <span className="opacity-80 block">Office Phone</span>
              <strong className="text-white">+ 1 - 622 - 484 - 8164</strong>
            </div>
            <div>
              <span className="opacity-80 block">City</span>
              <strong className="text-white">Chicago</strong>
            </div>
          </div>
          <span className="text-[10px] opacity-90 block mt-2">Email</span>
        </div>

        {/* Card 2: Electric Lime Yellow */}
        <div className="neo-card-lime p-4 rounded-2xl relative overflow-hidden">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2.5">
              <img 
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80" 
                alt="Brandon Harvey" 
                className="w-10 h-10 rounded-full object-cover ring-2 ring-black/20"
              />
              <div>
                <h4 className="text-xs font-bold text-[#101217] leading-tight">Brandon<br />Harvey</h4>
              </div>
            </div>
            <Star className="w-4 h-4 text-black/60" />
          </div>

          <div className="mt-4 pt-3 border-t border-black/10 grid grid-cols-2 text-[10px] space-y-0.5">
            <div>
              <span className="opacity-70 block">Office Phone</span>
              <strong className="text-[#101217]">+ 1 - 487 - 535 - 2016</strong>
            </div>
            <div>
              <span className="opacity-70 block">City</span>
              <strong className="text-[#101217]">Chicago</strong>
            </div>
          </div>
          <span className="text-[10px] opacity-80 block mt-2">Email</span>
        </div>

        {/* Card 3: Coral Red */}
        <div className="neo-card-red p-4 rounded-2xl relative overflow-hidden">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2.5">
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80" 
                alt="Steven Hansen" 
                className="w-10 h-10 rounded-full object-cover ring-2 ring-white/50"
              />
              <div>
                <h4 className="text-xs font-bold text-white leading-tight">Steven<br />Hansen</h4>
              </div>
            </div>
            <Star className="w-4 h-4 text-white/80" />
          </div>

          <div className="mt-4 pt-3 border-t border-white/20 grid grid-cols-2 text-[10px] space-y-0.5">
            <div>
              <span className="opacity-80 block">Office Phone</span>
              <strong className="text-white">+ 1 - 761 - 512 - 3030</strong>
            </div>
            <div>
              <span className="opacity-80 block">City</span>
              <strong className="text-white">Chicago</strong>
            </div>
          </div>
          <span className="text-[10px] opacity-90 block mt-2">Email</span>
        </div>

      </div>

      {/* Table Section */}
      <div className="px-6 pb-6 pt-2 space-y-3">
        <div className="flex items-center justify-between border-b border-gray-100 pb-2">
          <h4 className="text-xs font-bold text-[#0f1218]">Calls (1-5 of 6) / Transacciones Deducibles</h4>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-[10px] text-gray-400 uppercase border-b border-gray-100">
                <th className="py-2 pl-2">⭐</th>
                <th className="py-2 font-medium">Subject</th>
                <th className="py-2 font-medium">Status</th>
                <th className="py-2 font-medium">Start Date</th>
                <th className="py-2 font-medium">End Date</th>
                <th className="py-2 font-medium">Assigned User</th>
                <th className="py-2 text-right pr-2">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              <tr className="hover:bg-gray-50/80 transition-all">
                <td className="py-2.5 pl-2"><Star className="w-3.5 h-3.5 text-gray-300" /></td>
                <td className="py-2.5 font-bold text-[#0f1218]">Left a message</td>
                <td className="py-2.5">
                  <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 text-[10px] font-bold">Scheduled</span>
                </td>
                <td className="py-2.5 text-gray-500">2023-10-25 04:55</td>
                <td className="py-2.5 text-gray-500">2023-10-25 05:15</td>
                <td className="py-2.5 font-medium text-[#0f1218]">Jim Brennan</td>
                <td className="py-2.5 text-right pr-2">
                  <button className="p-1 rounded hover:bg-gray-200"><Eye className="w-3.5 h-3.5 text-gray-500" /></button>
                </td>
              </tr>

              <tr className="hover:bg-gray-50/80 transition-all">
                <td className="py-2.5 pl-2"><Star className="w-3.5 h-3.5 text-gray-300" /></td>
                <td className="py-2.5 font-bold text-[#0f1218]">Pago Vercel Cloud Hosting</td>
                <td className="py-2.5">
                  <span className="px-2 py-0.5 rounded-full bg-[#00e676]/20 text-[#00e676] text-[10px] font-bold">Deducible</span>
                </td>
                <td className="py-2.5 text-gray-500">2026-08-01 10:00</td>
                <td className="py-2.5 text-gray-500">2026-08-01 10:15</td>
                <td className="py-2.5 font-medium text-[#0f1218]">AURA System</td>
                <td className="py-2.5 text-right pr-2">
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
