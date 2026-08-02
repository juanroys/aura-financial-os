import React, { useState } from 'react';
import { X, Edit3, Save } from 'lucide-react';

interface FounderEditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FounderEditModal: React.FC<FounderEditModalProps> = ({ isOpen, onClose }) => {
  const [phone, setPhone] = useState('+1 - 641 - 321 - 5050');
  const [industry, setIndustry] = useState('Education / Startup FinTech');
  const [address, setAddress] = useState('259 Bel Air Ave, Orlando, Florida 32812 USA');
  const [website, setWebsite] = useState('mtmbank.com');
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 font-jakarta animate-fadeIn">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden space-y-4">
        
        {/* Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-[#101217] text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center">
              <Edit3 className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-white">Editar Perfil Ejecutivo Founder</h3>
              <p className="text-[10px] text-gray-300">MTM Investment Bank / Configuración de la Cuenta</p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSave} className="p-6 space-y-4 text-xs font-jakarta">
          {savedSuccess && (
            <div className="p-3 rounded-xl bg-[#10d670]/20 border border-[#10d670]/40 text-[#10d670] font-bold text-center">
              ✓ Cambios guardados con éxito en el servidor
            </div>
          )}

          <div className="space-y-1.5">
            <label className="font-bold text-gray-700">Office Phone</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-300 font-medium text-[#101217] focus:outline-none focus:border-[#101217]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-gray-700">Industry</label>
            <input
              type="text"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-300 font-medium text-[#101217] focus:outline-none focus:border-[#101217]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-gray-700">Billing & Shipping Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-300 font-medium text-[#101217] focus:outline-none focus:border-[#101217]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-gray-700">Website</label>
            <input
              type="text"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-300 font-medium text-[#101217] focus:outline-none focus:border-[#101217]"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-full border border-gray-300 text-gray-700 font-bold hover:bg-gray-100 transition-all"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-[#101217] text-white font-bold hover:bg-black transition-all shadow flex items-center gap-1.5"
            >
              <Save className="w-4 h-4" /> Guardar Cambios
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
