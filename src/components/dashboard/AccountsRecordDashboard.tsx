import React, { useState, useRef, useEffect } from 'react';
import { ArrowUpRight, Bot, Send, Sparkles, User, Save } from 'lucide-react';
import { useFinancials } from '../../context/FinancialContext';

export const AccountsRecordDashboard: React.FC = () => {
  const { chatMessages, sendChatMessage, ficoReport } = useFinancials();

  const [input, setInput] = useState('');
  const [newNoteInput, setNewNoteInput] = useState('');
  const [isSavingNote, setIsSavingNote] = useState(false);
  const [noteSaved, setNoteSaved] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendChatMessage(input);
    setInput('');
  };

  const handleSaveVpsNote = async () => {
    if (!newNoteInput.trim()) return;
    setIsSavingNote(true);
    try {
      const res = await fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ noteText: newNoteInput })
      });
      if (res.ok) {
        setNewNoteInput('');
        setNoteSaved(true);
        setTimeout(() => setNoteSaved(false), 2500);
      }
    } catch (err) {
      console.error('Error saving VPS note:', err);
    } finally {
      setIsSavingNote(false);
    }
  };

  return (
    <div className="rounded-[2.2rem] bg-white shadow-sm border border-gray-200/70 overflow-hidden space-y-4 flex flex-col h-full">
      
      {/* Dark Header Cap (Matching Reference Image) */}
      <div className="dark-header-cap px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#10d670]/20 border border-[#10d670]/40 flex items-center justify-center">
            <Bot className="w-4.5 h-4.5 text-[#10d670]" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-white tracking-tight flex items-center gap-1.5">
              AURA AI Counselor
              <span className="w-2 h-2 rounded-full bg-[#10d670] animate-pulse" />
            </h3>
            <p className="text-[10px] text-gray-300 font-medium">Asistente Ejecutivo VPS</p>
          </div>
        </div>

        <button className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-all">
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>

      <div className="px-6 pb-6 space-y-4 flex-1 flex flex-col">
        
        {/* Opportunity Metrics & 3-Tone Organic Donut Chart Widget (Matching Reference Image) */}
        <div className="sub-card-white p-4.5 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-[#12161e]">Opportunity Metrics</h4>
            <span className="text-[10px] text-gray-400 font-bold">FICO: {ficoReport.score} ({ficoReport.tier})</span>
          </div>

          <div className="grid grid-cols-2 items-center gap-3">
            <div className="space-y-1.5 text-xs">
              <div>
                <span className="text-[9px] text-gray-400 font-medium block">Won</span>
                <span className="text-sm font-black text-[#12161e]">$ 32,760</span>
              </div>
              <div>
                <span className="text-[9px] text-gray-400 font-medium block">Active</span>
                <span className="text-sm font-black text-[#12161e]">$ 32,760</span>
              </div>
              <div>
                <span className="text-[9px] text-gray-400 font-medium block">Lost</span>
                <span className="text-sm font-black text-gray-400">$ 2,520</span>
              </div>
            </div>

            {/* Custom 3-Tone Organic Donut Chart */}
            <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path strokeDasharray="40, 100" strokeDashoffset="0" strokeWidth="4.5" stroke="#d6f535" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path strokeDasharray="35, 100" strokeDashoffset="-40" strokeWidth="4.5" stroke="#10d670" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path strokeDasharray="20, 100" strokeDashoffset="-75" strokeWidth="4.5" stroke="#e64a53" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl font-black text-[#12161e]">6</span>
                <span className="text-[7px] text-gray-400 font-bold uppercase tracking-wider">Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Real Conversational AI Chat Area */}
        <div className="flex-1 flex flex-col bg-[#f8fafc] rounded-2xl border border-gray-200/70 p-3.5 space-y-3 min-h-[360px] max-h-[460px] overflow-hidden">
          
          {/* Scrollable Messages */}
          <div className="flex-1 overflow-y-auto space-y-3 pr-1">
            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start gap-2.5 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                  msg.sender === 'user' ? 'bg-[#12161e] text-white' : 'bg-[#10d670]/20 text-[#10d670] border border-[#10d670]/40'
                }`}>
                  {msg.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Sparkles className="w-3.5 h-3.5" />}
                </div>

                <div className="max-w-[85%] space-y-1.5">
                  <div className={`p-3 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#12161e] text-white rounded-tr-none shadow-sm'
                      : 'bg-white text-gray-800 border border-gray-200/80 rounded-tl-none shadow-sm'
                  }`}>
                    {msg.text.split('\n').map((line, idx) => (
                      <p key={idx} className={idx > 0 ? 'mt-1' : ''}>{line}</p>
                    ))}
                  </div>

                  {msg.sender === 'ai' && msg.suggestions && (
                    <div className="flex flex-wrap gap-1">
                      {msg.suggestions.map((st, idx) => (
                        <button
                          key={idx}
                          onClick={() => sendChatMessage(st)}
                          className="px-2.5 py-1 rounded-xl bg-white border border-gray-200 text-gray-700 text-[10px] font-semibold hover:bg-gray-100 transition-all text-left shadow-2xs"
                        >
                          {st}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Form Input */}
          <form onSubmit={handleSend} className="flex items-center gap-2 pt-2 border-t border-gray-200">
            <input
              type="text"
              placeholder="Consulta o pide consejo..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-3 py-2 rounded-xl bg-white border border-gray-300 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#10d670]"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="p-2 rounded-xl bg-[#12161e] text-white disabled:opacity-40 hover:scale-105 transition-all shadow"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* Quick VPS Note Writing Widget */}
        <div className="p-3 rounded-2xl bg-white border border-gray-200 space-y-2">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-bold text-[#12161e] flex items-center gap-1">
              <Save className="w-3.5 h-3.5 text-[#10d670]" /> Guardar Nota en VPS (`user_notes.md`)
            </span>
            {noteSaved && <span className="text-[#10d670] font-bold text-[10px]">✓ Guardado</span>}
          </div>

          <div className="flex gap-1.5">
            <input
              type="text"
              placeholder="Ej: Guardar regla de ahorro 25% impuestos..."
              value={newNoteInput}
              onChange={(e) => setNewNoteInput(e.target.value)}
              className="flex-1 px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200 text-xs text-gray-800"
            />
            <button
              onClick={handleSaveVpsNote}
              disabled={!newNoteInput.trim() || isSavingNote}
              className="px-3 py-1.5 rounded-lg bg-[#12161e] text-white text-[11px] font-bold disabled:opacity-40 hover:bg-black transition-all"
            >
              {isSavingNote ? '...' : 'Guardar'}
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
