import React, { useState } from 'react';
import { Target, Plus, Users, Search, SlidersHorizontal, ChevronDown, Star, Eye } from 'lucide-react';
import { useFinancials } from '../../context/FinancialContext';

export const SmartGuidesCard: React.FC = () => {
  const { transactions } = useFinancials();

  const [filterStatus, setFilterStatus] = useState<'all' | 'Scheduled' | 'Deducible'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [showRelatedDropdown, setShowRelatedDropdown] = useState(false);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({
    'c1': true,
    'c2': false,
    'c3': true
  });
  const [inspectedTx, setInspectedTx] = useState<any | null>(null);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredTransactions = transactions.filter(tx => {
    const matchesSearch = tx.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tx.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;
    if (filterStatus === 'Deducible') return tx.isDeductible;
    if (filterStatus === 'Scheduled') return tx.status === 'pending';
    return true;
  });

  return (
    <div className="flex flex-col relative w-full font-jakarta">
      
      {/* Dark Header Cap (Interlocking Top) */}
      <div className="interlock-dark-cap flex items-center justify-between">
        <h3 className="text-base font-extrabold text-white tracking-tight font-jakarta">Smart Guides</h3>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => alert('Ajustes de Guías Inteligentes AURA')}
            className="w-8 h-8 rounded-full border border-white/25 bg-transparent text-white flex items-center justify-center hover:bg-white/15 transition-all shadow-2xs"
            title="Ajustes de Guías"
          >
            <Target className="w-3.5 h-3.5 stroke-[1.75]" />
          </button>
          <button 
            onClick={() => alert('Agregar Nuevo Contacto / Guía')}
            className="w-8 h-8 rounded-full border border-white/25 bg-transparent text-white flex items-center justify-center hover:bg-white/15 transition-all shadow-2xs"
            title="Agregar Guía"
          >
            <Plus className="w-3.5 h-3.5 stroke-[1.75]" />
          </button>
        </div>
      </div>

      {/* White Card Body (Interlocking Concave Entry into Dark Cap) */}
      <div className="interlock-white-body pt-6 space-y-4">
        
        {/* Sub-header Controls Row */}
        <div className="px-7 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#101217] text-white flex items-center justify-center shadow-xs">
              <Users className="w-4 h-4 stroke-[1.75]" />
            </div>
            <span className="text-sm font-extrabold text-[#101217] tracking-tight">
              Contacts <span className="font-semibold text-gray-400 text-xs ml-0.5">(3)</span>
            </span>
          </div>

          {/* Interactive Control Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Live Search Input Toggle */}
            {showSearchInput ? (
              <div className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full border border-gray-300">
                <Search className="w-3.5 h-3.5 text-gray-500" />
                <input
                  type="text"
                  placeholder="Filtrar llamadas/transacciones..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="bg-transparent text-xs text-[#101217] font-medium focus:outline-none w-36"
                />
                <button onClick={() => setShowSearchInput(false)} className="text-gray-400 font-bold hover:text-gray-600">×</button>
              </div>
            ) : (
              <button 
                onClick={() => setShowSearchInput(true)}
                className="w-8.5 h-8.5 rounded-full border border-gray-300/80 bg-transparent text-gray-700 flex items-center justify-center hover:bg-gray-100 transition-all shadow-2xs"
                title="Buscar en tiempo real"
              >
                <Search className="w-3.5 h-3.5 text-gray-600 stroke-[1.75]" />
              </button>
            )}

            {/* Filter Toggle Button */}
            <button 
              onClick={() => {
                if (filterStatus === 'all') setFilterStatus('Scheduled');
                else if (filterStatus === 'Scheduled') setFilterStatus('Deducible');
                else setFilterStatus('all');
              }}
              className={`w-8.5 h-8.5 rounded-full border border-gray-300/80 bg-transparent flex items-center justify-center transition-all shadow-2xs ${
                filterStatus !== 'all' ? 'bg-[#101217] text-white border-[#101217]' : 'text-gray-700 hover:bg-gray-100'
              }`}
              title={`Filtro actual: ${filterStatus}`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5 stroke-[1.75]" />
            </button>

            {/* Related Items Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setShowRelatedDropdown(!showRelatedDropdown)}
                className="px-3.5 py-1.5 rounded-full border border-gray-300/80 bg-transparent text-[#101217] font-jakarta font-bold text-xs flex items-center gap-1.5 hover:bg-gray-100 transition-all shadow-2xs"
              >
                <span>Related</span>
                <ChevronDown className="w-3.5 h-3.5 stroke-[1.75]" />
              </button>

              {showRelatedDropdown && (
                <div className="absolute right-0 top-9 z-30 w-44 bg-white rounded-2xl shadow-xl border border-gray-200 p-2 text-xs font-medium space-y-1 animate-fadeIn">
                  <button 
                    onClick={() => { setFilterStatus('all'); setShowRelatedDropdown(false); }}
                    className="w-full text-left px-3 py-1.5 rounded-xl hover:bg-gray-100 font-bold text-[#101217]"
                  >
                    Todos los Registros
                  </button>
                  <button 
                    onClick={() => { setFilterStatus('Scheduled'); setShowRelatedDropdown(false); }}
                    className="w-full text-left px-3 py-1.5 rounded-xl hover:bg-gray-100 text-gray-700"
                  >
                    Solo Programados
                  </button>
                  <button 
                    onClick={() => { setFilterStatus('Deducible'); setShowRelatedDropdown(false); }}
                    className="w-full text-left px-3 py-1.5 rounded-xl hover:bg-gray-100 text-[#10d670] font-bold"
                  >
                    Solo Deducibles IRS
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Vibrant Neo-Glow Cards Row (With Interactive Star Toggles) */}
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
              <button onClick={() => toggleFavorite('c1')} className="p-1 text-white hover:scale-110 transition-all">
                <Star className={`w-4 h-4 ${favorites['c1'] ? 'fill-white text-white' : 'fill-white/20 text-white/60'}`} />
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
              <button onClick={() => toggleFavorite('c2')} className="p-1 text-[#101217] hover:scale-110 transition-all">
                <Star className={`w-4 h-4 ${favorites['c2'] ? 'fill-[#101217] text-[#101217]' : 'fill-black/10 text-black/40'}`} />
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
              <button onClick={() => toggleFavorite('c3')} className="p-1 text-white hover:scale-110 transition-all">
                <Star className={`w-4 h-4 ${favorites['c3'] ? 'fill-white text-white' : 'fill-white/20 text-white/60'}`} />
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
            <h4 className="text-xs font-extrabold text-[#101217]">
              Calls & Transacciones ({filteredTransactions.length}) {filterStatus !== 'all' && `• Filtro: ${filterStatus}`}
            </h4>
          </div>

          {/* Data Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-jakarta">
              <thead>
                <tr className="text-[10px] text-gray-400 uppercase border-b border-gray-100 font-semibold">
                  <th className="py-2 pl-2">⭐</th>
                  <th className="py-2">Subject</th>
                  <th className="py-2">Status</th>
                  <th className="py-2">Fecha</th>
                  <th className="py-2">Assigned User</th>
                  <th className="py-2 text-right pr-2">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                {filteredTransactions.slice(0, 5).map((tx, idx) => (
                  <tr key={tx.id} className="hover:bg-gray-50/80 transition-all">
                    <td className="py-3 pl-2">
                      <button onClick={() => toggleFavorite(tx.id)}>
                        <Star className={`w-3.5 h-3.5 ${favorites[tx.id] ? 'text-[#d6f535] fill-[#d6f535]' : 'text-gray-300'}`} />
                      </button>
                    </td>
                    <td className="py-3 font-bold text-[#101217]">{tx.title}</td>
                    <td className="py-3">
                      {tx.isDeductible ? (
                        <span className="px-2.5 py-1 rounded-full bg-[#10d670]/20 text-[#10d670] text-[10px] font-bold">Deducible</span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 text-[10px] font-bold">Scheduled</span>
                      )}
                    </td>
                    <td className="py-3 text-gray-500">{tx.date}</td>
                    <td className="py-3 font-medium text-[#101217]">{idx % 2 === 0 ? 'Jim Brennan' : 'AURA System'}</td>
                    <td className="py-3 text-right pr-2">
                      <button 
                        onClick={() => setInspectedTx(tx)}
                        className="p-1 rounded hover:bg-gray-200 transition-all" 
                        title="Ver Detalles"
                      >
                        <Eye className="w-3.5 h-3.5 text-gray-500" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Transaction Inspect Popover Modal */}
      {inspectedTx && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 font-jakarta animate-fadeIn">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl space-y-4 border border-gray-200">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-sm font-extrabold text-[#101217]">Inspección de Transacción</h3>
              <button onClick={() => setInspectedTx(null)} className="text-gray-400 font-bold hover:text-gray-600">×</button>
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <span className="text-gray-400 font-medium block">Concepto</span>
                <strong className="text-sm font-black text-[#101217]">{inspectedTx.title}</strong>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-2">
                <div>
                  <span className="text-gray-400 font-medium block">Monto</span>
                  <strong className="text-sm font-black text-[#10d670]">${inspectedTx.amount} USD</strong>
                </div>
                <div>
                  <span className="text-gray-400 font-medium block">Deducible Fiscal</span>
                  <strong className="text-sm font-bold text-[#101217]">{inspectedTx.isDeductible ? '✓ Sí (Aprobado IRS)' : 'No'}</strong>
                </div>
              </div>
            </div>

            <button
              onClick={() => setInspectedTx(null)}
              className="w-full py-2.5 rounded-xl bg-[#101217] text-white font-bold text-xs hover:bg-black transition-all"
            >
              Cerrar Inspección
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
