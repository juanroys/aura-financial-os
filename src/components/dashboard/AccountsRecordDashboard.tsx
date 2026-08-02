import React from 'react';
import { SlidersHorizontal, ChevronDown, ArrowUpRight } from 'lucide-react';
import { useFinancials } from '../../context/FinancialContext';

export const AccountsRecordDashboard: React.FC = () => {
  const { ficoReport } = useFinancials();

  return (
    <div className="rounded-[2rem] bg-white shadow-sm border border-gray-200/60 overflow-hidden space-y-4">
      
      {/* Dark Header Cap (Matching Reference Image) */}
      <div className="dark-header-cap px-6 py-4 flex items-center justify-between">
        <h3 className="text-base font-bold text-white tracking-tight">Accounts Record Dashboard</h3>
      </div>

      <div className="px-6 pb-6 space-y-4">
        
        {/* Sub-card 1: Account Timeline */}
        <div className="sub-card-white p-5 border border-gray-100 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-[#0f1218]">Account Timeline</h4>

            <div className="flex items-center gap-1.5">
              <button className="p-1.5 rounded-full hover:bg-gray-100 text-gray-600 transition-all">
                <SlidersHorizontal className="w-3.5 h-3.5" />
              </button>
              <button className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 text-[10px] font-semibold flex items-center gap-1">
                <span>Related</span>
                <ChevronDown className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Connected Timeline Items */}
          <div className="space-y-3">
            
            {/* Timeline Item 1 */}
            <div className="flex items-start gap-3 p-3 rounded-2xl bg-gray-50 border border-gray-100">
              <div className="w-7 h-7 rounded-full bg-[#0f1218] text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                📋
              </div>

              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between text-[10px] text-gray-400 font-medium">
                  <span>Th, 24.05 3:15 pm</span>
                  <div className="flex items-center gap-1.5 text-gray-700 font-bold">
                    <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80" alt="Jen" className="w-4 h-4 rounded-full object-cover" />
                    <span>Jen Smith</span>
                    <span>→</span>
                    <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80" alt="Jim" className="w-4 h-4 rounded-full object-cover" />
                    <span>Jim Brennan</span>
                  </div>
                </div>

                <h5 className="text-xs font-bold text-[#0f1218]">Schedule Training</h5>

                <div className="flex items-center gap-2 pt-0.5">
                  <span className="text-[9px] text-gray-500 font-medium">Non Started</span>
                  <span className="text-[9px] text-gray-500 font-medium">• Medium</span>
                </div>
              </div>
            </div>

            {/* Timeline Item 2 */}
            <div className="flex items-start gap-3 p-3 rounded-2xl bg-gray-50 border border-gray-100">
              <div className="w-7 h-7 rounded-full bg-[#0f1218] text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                📋
              </div>

              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between text-[10px] text-gray-400 font-medium">
                  <span>Fri, 25.05 10:00 am</span>
                  <div className="flex items-center gap-1.5 text-gray-700 font-bold">
                    <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80" alt="Jen" className="w-4 h-4 rounded-full object-cover" />
                    <span>Jen Smith</span>
                    <span>→</span>
                    <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80" alt="Jim" className="w-4 h-4 rounded-full object-cover" />
                    <span>Jim Brennan</span>
                  </div>
                </div>

                <h5 className="text-xs font-bold text-[#0f1218]">Abono Impuestos Físicos</h5>
              </div>
            </div>

          </div>
        </div>

        {/* Sub-card 2: Opportunity Metrics & 3-Tone Donut Chart */}
        <div className="sub-card-white p-5 border border-gray-100 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-[#0f1218]">Opportunity Metrics</h4>
            <button className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-gray-200">
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Grid Layout: Left Metrics List + Right 3-Tone Donut Chart */}
          <div className="grid grid-cols-2 items-center gap-4">
            
            {/* Metrics List */}
            <div className="space-y-3">
              <div>
                <span className="text-[10px] text-gray-400 font-medium block">Won</span>
                <span className="text-base font-black text-[#0f1218]">$ 32,760</span>
              </div>

              <div>
                <span className="text-[10px] text-gray-400 font-medium block">Active</span>
                <span className="text-base font-black text-[#0f1218]">$ 32,760</span>
              </div>

              <div>
                <span className="text-[10px] text-gray-400 font-medium block">Lost</span>
                <span className="text-base font-black text-gray-400">$ 2,520</span>
              </div>
            </div>

            {/* Custom 3-Tone Donut Chart (Lime, Emerald, Coral) */}
            <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                
                {/* Segment 1: Lime Yellow (#ccff00) */}
                <path
                  strokeDasharray="40, 100"
                  strokeDashoffset="0"
                  strokeWidth="4.5"
                  stroke="#ccff00"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />

                {/* Segment 2: Emerald Green (#00e676) */}
                <path
                  strokeDasharray="35, 100"
                  strokeDashoffset="-40"
                  strokeWidth="4.5"
                  stroke="#00e676"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />

                {/* Segment 3: Coral Red (#ff3b30) */}
                <path
                  strokeDasharray="20, 100"
                  strokeDashoffset="-75"
                  strokeWidth="4.5"
                  stroke="#ff3b30"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>

              {/* Central Badge */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-black text-[#0f1218]">6</span>
                <span className="text-[8px] text-gray-400 font-bold uppercase tracking-wider">Active</span>
              </div>

              {/* Outer Number Badges */}
              <span className="absolute top-0 right-3 text-[10px] font-bold text-[#0f1218] bg-white px-1.5 py-0.5 rounded-full shadow">3</span>
              <span className="absolute bottom-2 right-0 text-[10px] font-bold text-[#ff3b30] bg-white px-1.5 py-0.5 rounded-full shadow">1</span>
              <span className="absolute bottom-2 left-2 text-[10px] font-bold text-[#00e676] bg-white px-1.5 py-0.5 rounded-full shadow">2</span>
            </div>

          </div>
        </div>

        {/* Sub-card 3: Bottom Account Timeline */}
        <div className="sub-card-white p-4 border border-gray-100 flex items-center justify-between">
          <div>
            <h4 className="text-xs font-bold text-[#0f1218]">Account Timeline</h4>
            <span className="text-[10px] text-gray-400">Resumen FICO Score: {ficoReport.score} ({ficoReport.tier})</span>
          </div>
          <button className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-gray-200">
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

    </div>
  );
};
