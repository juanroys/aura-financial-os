import React, { useState } from 'react';
import { Search, X, FileText, DollarSign, Award } from 'lucide-react';
import { useFinancials } from '../../context/FinancialContext';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ isOpen, onClose }) => {
  const { transactions, debts, documents } = useFinancials();
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filteredTx = transactions.filter(t => 
    t.title.toLowerCase().includes(query.toLowerCase()) || 
    t.category.toLowerCase().includes(query.toLowerCase())
  );

  const filteredDebts = debts.filter(d => 
    d.name.toLowerCase().includes(query.toLowerCase()) || 
    d.creditor.toLowerCase().includes(query.toLowerCase())
  );

  const filteredDocs = documents.filter(doc => 
    doc.fileName.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 font-jakarta animate-fadeIn">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col max-h-[80vh]">
        
        {/* Search Header Input */}
        <div className="p-4 border-b border-gray-100 flex items-center gap-3 bg-gray-50/50">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar transacciones, deudas, facturas PDF o notas..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="flex-1 bg-transparent text-sm font-bold text-[#101217] placeholder-gray-400 focus:outline-none"
          />
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-200/80 text-gray-600 flex items-center justify-center hover:bg-gray-300 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          {!query.trim() ? (
            <div className="text-center py-8 text-xs text-gray-400">
              Escribe algo para buscar en tu ecosistema AURA (ej: Stripe, Vercel, Visa)...
            </div>
          ) : (
            <>
              {/* Transactions Section */}
              {filteredTx.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                    <DollarSign className="w-3.5 h-3.5 text-[#10d670]" /> Transacciones ({filteredTx.length})
                  </span>
                  <div className="space-y-1.5">
                    {filteredTx.map(tx => (
                      <div key={tx.id} className="p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all flex items-center justify-between text-xs">
                        <div>
                          <strong className="text-[#101217] font-bold block">{tx.title}</strong>
                          <span className="text-gray-400 text-[10px]">{tx.date} • {tx.category}</span>
                        </div>
                        <span className={`font-black ${tx.type === 'income' ? 'text-[#10d670]' : 'text-[#101217]'}`}>
                          {tx.type === 'income' ? '+' : '-'}${tx.amount.toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Debts Section */}
              {filteredDebts.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-[#d6f535]" /> Deudas ({filteredDebts.length})
                  </span>
                  <div className="space-y-1.5">
                    {filteredDebts.map(d => (
                      <div key={d.id} className="p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all flex items-center justify-between text-xs">
                        <div>
                          <strong className="text-[#101217] font-bold block">{d.name}</strong>
                          <span className="text-gray-400 text-[10px]">{d.creditor} • APR {d.interestRate}%</span>
                        </div>
                        <span className="font-black text-[#e64a53]">${d.remainingBalance.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Documents Section */}
              {filteredDocs.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5 text-[#101217]" /> Documentos PDF ({filteredDocs.length})
                  </span>
                  <div className="space-y-1.5">
                    {filteredDocs.map(doc => (
                      <div key={doc.id} className="p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all flex items-center justify-between text-xs">
                        <div>
                          <strong className="text-[#101217] font-bold block">{doc.fileName}</strong>
                          <span className="text-gray-400 text-[10px]">{doc.uploadDate} • {doc.fileSize}</span>
                        </div>
                        <span className="font-bold text-[#10d670]">✓ {doc.parsedStatus}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {filteredTx.length === 0 && filteredDebts.length === 0 && filteredDocs.length === 0 && (
                <div className="text-center py-8 text-xs text-gray-400">
                  No se encontraron registros que coincidan con "{query}".
                </div>
              )}
            </>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 border-t border-gray-100 bg-gray-50/50 text-center text-[10px] text-gray-400 font-medium">
          Presiona ESC o clic fuera para cerrar
        </div>

      </div>
    </div>
  );
};
