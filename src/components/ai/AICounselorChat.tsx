import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  PanelLeft, 
  PanelRight, 
  ArrowDownCircle, 
  Zap
} from 'lucide-react';
import { useFinancials } from '../../context/FinancialContext';

interface AICounselorChatProps {
  onNavigateTab: (tab: string) => void;
  isMobile?: boolean;
}

export const AICounselorChat: React.FC<AICounselorChatProps> = ({ onNavigateTab, isMobile = false }) => {
  const { 
    chatMessages, 
    sendChatMessage, 
    chatDockPosition, 
    setChatDockPosition,
    ficoReport
  } = useFinancials();

  const [input, setInput] = useState('');
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

  const quickPrompts = [
    '💡 ¿Cómo organizo mi sueldo de este viernes entre supervivencia e impuestos?',
    '📈 ¿Cómo subo mi FICO Score de ' + ficoReport.score + ' a 750+ en 90 días?',
    '📄 ¿Cómo importo mi extracto bancario en PDF?',
    '🚀 ¿Cuál es mi Burn Rate y cómo acelero salir de la crisis?',
  ];

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={`flex flex-col h-full vision-glass rounded-3xl border border-white/20 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden ${
        isMobile ? 'min-h-[80vh]' : ''
      }`}
    >
      
      {/* Header */}
      <div className="px-5 py-4 bg-white/5 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#00f2fe] via-[#7928ca] to-[#10b981] p-[2px] shadow-[0_0_15px_rgba(0,242,254,0.4)]">
            <div className="w-full h-full bg-[#05060b] rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5 text-[#00f2fe]" />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              AURA AI Financial Counselor
              <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
            </h3>
            <p className="text-[11px] text-gray-300">Asistente de Crisis & Estrategia para Founders</p>
          </div>
        </div>

        {/* Position Controls (Desktop Only with Framer Motion spring layout) */}
        {!isMobile && (
          <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/10">
            <button
              onClick={() => setChatDockPosition('left')}
              className={`p-1.5 rounded-lg text-xs transition-all ${
                chatDockPosition === 'left' ? 'bg-[#00f2fe] text-black font-bold shadow-md scale-105' : 'text-gray-400 hover:text-white'
              }`}
              title="Acoplar a la Izquierda"
            >
              <PanelLeft className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setChatDockPosition('right')}
              className={`p-1.5 rounded-lg text-xs transition-all ${
                chatDockPosition === 'right' ? 'bg-[#00f2fe] text-black font-bold shadow-md scale-105' : 'text-gray-400 hover:text-white'
              }`}
              title="Acoplar a la Derecha"
            >
              <PanelRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setChatDockPosition('bottom')}
              className={`p-1.5 rounded-lg text-xs transition-all ${
                chatDockPosition === 'bottom' ? 'bg-[#00f2fe] text-black font-bold shadow-md scale-105' : 'text-gray-400 hover:text-white'
              }`}
              title="Cajón Flotante Abajo"
            >
              <ArrowDownCircle className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 max-h-[550px]">
        <AnimatePresence initial={false}>
          {chatMessages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className={`flex items-start gap-3 ${
                msg.sender === 'user' ? 'flex-row-reverse' : ''
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-xs ${
                msg.sender === 'user' 
                  ? 'bg-gradient-to-r from-[#7928ca] to-[#ff416c] text-white shadow-md' 
                  : 'bg-[#00f2fe]/20 text-[#00f2fe] border border-[#00f2fe]/40'
              }`}>
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
              </div>

              <div className={`max-w-[82%] space-y-2`}>
                <div className={`p-4 rounded-2xl text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-r from-[#7928ca]/30 to-[#ff416c]/20 border border-white/15 text-white rounded-tr-none'
                    : 'bg-white/5 border border-white/10 text-gray-200 rounded-tl-none shadow-xl'
                }`}>
                  {msg.text.split('\n').map((line, idx) => (
                    <p key={idx} className={idx > 0 ? 'mt-1.5' : ''}>{line}</p>
                  ))}
                </div>

                {/* Action Buttons inside AI message */}
                {msg.sender === 'ai' && msg.suggestions && msg.suggestions.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {msg.suggestions.map((promptText, pIdx) => (
                      <button
                        key={pIdx}
                        onClick={() => sendChatMessage(promptText)}
                        className="px-3 py-1 rounded-xl bg-[#00f2fe]/10 hover:bg-[#00f2fe]/20 border border-[#00f2fe]/30 text-[#00f2fe] text-[11px] font-semibold transition-all text-left"
                      >
                        {promptText}
                      </button>
                    ))}
                  </div>
                )}

                {/* Quick Navigation link payload if provided */}
                {msg.actionPayload?.tab && (
                  <button
                    onClick={() => onNavigateTab(msg.actionPayload!.tab!)}
                    className="px-3.5 py-1.5 rounded-xl bg-[#10b981] hover:bg-[#10b981]/80 text-black font-bold text-xs transition-all flex items-center gap-1 shadow-md"
                  >
                    Abrir Módulo de Control <Zap className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts Ticker */}
      <div className="px-4 py-2 bg-black/30 border-t border-white/10 flex items-center gap-2 overflow-x-auto no-scrollbar">
        <span className="text-[10px] text-gray-400 font-bold uppercase shrink-0">Sugeridos:</span>
        {quickPrompts.map((qp, idx) => (
          <button
            key={idx}
            onClick={() => sendChatMessage(qp)}
            className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 text-[11px] whitespace-nowrap transition-all hover:scale-105"
          >
            {qp}
          </button>
        ))}
      </div>

      {/* Form Input */}
      <form onSubmit={handleSend} className="p-3 bg-black/50 border-t border-white/10 flex items-center gap-2">
        <input
          type="text"
          placeholder="Escribe tu consulta o pide consejo sobre tu sueldo, FICO o deudas..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 px-4 py-2.5 rounded-2xl bg-white/5 border border-white/15 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-[#00f2fe]"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className="p-2.5 rounded-2xl bg-gradient-to-r from-[#00f2fe] to-[#7928ca] text-white font-bold disabled:opacity-40 hover:scale-105 transition-all shadow-lg"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

    </motion.div>
  );
};
