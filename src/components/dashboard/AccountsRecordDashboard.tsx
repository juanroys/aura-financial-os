import React, { useState, useRef, useEffect } from 'react';
import { ArrowUpRight, Bot, Send, Sparkles, User, Save, Mic, Paperclip, Image, FileText, Square } from 'lucide-react';
import { useFinancials } from '../../context/FinancialContext';
import type { ChatAttachment } from '../../types';

export const AccountsRecordDashboard: React.FC = () => {
  const { chatMessages, sendChatMessage, ficoReport } = useFinancials();

  const [input, setInput] = useState('');
  const [attachments, setAttachments] = useState<ChatAttachment[]>([]);
  const [newNoteInput, setNewNoteInput] = useState('');
  const [isSavingNote, setIsSavingNote] = useState(false);
  const [noteSaved, setNoteSaved] = useState(false);

  // Voice recording & Speech-to-Text state
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const recordingTimerRef = useRef<any>(null);
  const recognitionRef = useRef<any>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  // Clean Speech-to-Text Voice Recording directly filling the input text (WhatsApp style)
  const startVoiceRecording = () => {
    setIsRecording(true);
    setRecordingSeconds(0);
    recordingTimerRef.current = setInterval(() => {
      setRecordingSeconds(prev => prev + 1);
    }, 1000);

    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = 'es-ES';
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onresult = (event: any) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        if (currentTranscript.trim()) {
          setInput(currentTranscript);
        }
      };

      recognition.onerror = (err: any) => {
        console.warn('Speech recognition error:', err);
      };

      recognition.onend = () => {
        setIsRecording(false);
        if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);
      };

      recognition.start();
      recognitionRef.current = recognition;
    }
  };

  const stopVoiceRecording = () => {
    setIsRecording(false);
    if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (err) {
        console.warn('Error stopping recognition:', err);
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'pdf' | 'image') => {
    if (e.target.files && e.target.files[0]) {
      const f = e.target.files[0];
      const attach: ChatAttachment = {
        name: f.name,
        type,
        size: `${(f.size / 1024).toFixed(0)} KB`,
        url: type === 'image' ? URL.createObjectURL(f) : undefined
      };
      setAttachments(prev => [...prev, attach]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() && attachments.length === 0) return;
    sendChatMessage(input, attachments.length > 0 ? attachments : undefined);
    setInput('');
    setAttachments([]);
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
    <div className="flex flex-col relative w-full h-full font-jakarta">
      
      {/* Dark Header Cap (Interlocking Top) */}
      <div className="interlock-dark-cap flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#10d670]/20 border border-[#10d670]/40 flex items-center justify-center">
            <Bot className="w-4.5 h-4.5 text-[#10d670]" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-white tracking-tight flex items-center gap-1.5 font-jakarta">
              AURA AI Counselor
              <span className="w-2 h-2 rounded-full bg-[#10d670] animate-pulse" />
            </h3>
            <p className="text-[10px] text-gray-300 font-medium">Dictado de Voz en Vivo & Adjuntos</p>
          </div>
        </div>

        <button className="w-8 h-8 rounded-full border border-white/25 bg-transparent text-white flex items-center justify-center hover:bg-white/15 transition-all shadow-2xs">
          <ArrowUpRight className="w-4 h-4 stroke-[1.75]" />
        </button>
      </div>

      {/* White Body (Interlocking Concave Entry into Dark Cap) */}
      <div className="interlock-white-body pt-6 px-6 pb-6 space-y-4 flex-1 flex flex-col">
        
        {/* Opportunity Metrics & 3-Tone Organic Donut Chart Widget */}
        <div className="sub-card-white p-4.5 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-[#101217]">Opportunity Metrics</h4>
            <span className="text-[10px] text-gray-400 font-bold">FICO: {ficoReport.score} ({ficoReport.tier})</span>
          </div>

          <div className="grid grid-cols-2 items-center gap-3">
            <div className="space-y-1.5 text-xs">
              <div>
                <span className="text-[9px] text-gray-400 font-medium block">Won</span>
                <span className="text-sm font-black text-[#101217]">$ 32,760</span>
              </div>
              <div>
                <span className="text-[9px] text-gray-400 font-medium block">Active</span>
                <span className="text-sm font-black text-[#101217]">$ 32,760</span>
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
                <span className="text-xl font-black text-[#101217]">6</span>
                <span className="text-[7px] text-gray-400 font-bold uppercase tracking-wider">Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Real Dynamic AI Chat Area */}
        <div className="flex-1 flex flex-col bg-[#f8fafc] rounded-2xl border border-gray-200/70 p-3.5 space-y-3 min-h-[380px] max-h-[480px] overflow-hidden">
          
          {/* Scrollable Messages */}
          <div className="flex-1 overflow-y-auto space-y-3 pr-1">
            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start gap-2.5 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                  msg.sender === 'user' ? 'bg-[#101217] text-white' : 'bg-[#10d670]/20 text-[#10d670] border border-[#10d670]/40'
                }`}>
                  {msg.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Sparkles className="w-3.5 h-3.5" />}
                </div>

                <div className="max-w-[85%] space-y-1.5">
                  {/* Attachments rendering inside bubbles */}
                  {msg.attachments && msg.attachments.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-1">
                      {msg.attachments.map((att, idx) => (
                        <div key={idx} className="p-2 rounded-xl bg-white border border-gray-200 shadow-2xs text-[10px] flex items-center gap-1.5 font-bold text-[#101217]">
                          {att.type === 'image' && <Image className="w-3.5 h-3.5 text-[#d6f535]" />}
                          {att.type === 'pdf' && <FileText className="w-3.5 h-3.5 text-[#e64a53]" />}
                          <span className="truncate max-w-[120px]">{att.name}</span>
                          {att.url && <img src={att.url} alt="preview" className="w-6 h-6 rounded object-cover ml-1" />}
                        </div>
                      ))}
                    </div>
                  )}

                  <div className={`p-3 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#101217] text-white rounded-tr-none shadow-sm'
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

          {/* Pending Attachments Chips Bar */}
          {attachments.length > 0 && (
            <div className="flex flex-wrap gap-1.5 p-2 bg-white rounded-xl border border-gray-200">
              {attachments.map((att, idx) => (
                <div key={idx} className="px-2.5 py-1 rounded-lg bg-gray-100 border border-gray-200 text-[10px] font-bold text-gray-800 flex items-center gap-1.5">
                  {att.type === 'image' ? <Image className="w-3 h-3 text-[#d6f535]" /> :
                   <FileText className="w-3 h-3 text-[#e64a53]" />}
                  <span className="truncate max-w-[100px]">{att.name}</span>
                  <button onClick={() => removeAttachment(idx)} className="text-gray-400 hover:text-red-500 font-bold ml-1">×</button>
                </div>
              ))}
            </div>
          )}

          {/* Voice Dictation Active Bar */}
          {isRecording && (
            <div className="p-2 rounded-xl bg-[#e64a53]/15 border border-[#e64a53]/40 flex items-center justify-between text-xs animate-pulse">
              <div className="flex items-center gap-2 font-bold text-[#e64a53]">
                <Mic className="w-4 h-4 animate-bounce" />
                <span>Escuchando tu voz... ({recordingSeconds}s)</span>
              </div>
              <button 
                type="button"
                onClick={stopVoiceRecording}
                className="px-3 py-1 rounded-lg bg-[#e64a53] text-white text-[10px] font-extrabold flex items-center gap-1 hover:bg-red-600"
              >
                <Square className="w-3 h-3 fill-white" /> Listo
              </button>
            </div>
          )}

          {/* Multimodal Input Bar (Text Dictation + Images + PDF) */}
          <form onSubmit={handleSend} className="flex items-center gap-1.5 pt-2 border-t border-gray-200">
            {/* Hidden inputs */}
            <input 
              type="file" 
              accept=".pdf" 
              ref={fileInputRef} 
              className="hidden" 
              onChange={(e) => handleFileUpload(e, 'pdf')} 
            />
            <input 
              type="file" 
              accept="image/*" 
              ref={imageInputRef} 
              className="hidden" 
              onChange={(e) => handleFileUpload(e, 'image')} 
            />

            {/* Paperclip PDF */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-2 rounded-xl bg-white border border-gray-300 text-gray-600 hover:bg-gray-100 transition-all shadow-2xs"
              title="Adjuntar extracto PDF"
            >
              <Paperclip className="w-3.5 h-3.5" />
            </button>

            {/* Image photo */}
            <button
              type="button"
              onClick={() => imageInputRef.current?.click()}
              className="p-2 rounded-xl bg-white border border-gray-300 text-gray-600 hover:bg-gray-100 transition-all shadow-2xs"
              title="Adjuntar foto de recibo"
            >
              <Image className="w-3.5 h-3.5" />
            </button>

            {/* WhatsApp-style Mic Button (Hold to Talk or Tap to Dictate) */}
            <button
              type="button"
              onClick={isRecording ? stopVoiceRecording : startVoiceRecording}
              onTouchStart={startVoiceRecording}
              onTouchEnd={stopVoiceRecording}
              onMouseDown={startVoiceRecording}
              onMouseUp={stopVoiceRecording}
              className={`p-2 rounded-xl border transition-all shadow-2xs ${
                isRecording ? 'bg-[#e64a53] text-white border-[#e64a53] animate-pulse scale-110' : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-100'
              }`}
              title="Presiona o mantén presionado para dictar por voz"
            >
              <Mic className="w-3.5 h-3.5" />
            </button>

            <input
              type="text"
              placeholder={isRecording ? "Dictando por voz..." : "Escribe o habla..."}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-3 py-2 rounded-xl bg-white border border-gray-300 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#10d670]"
            />

            <button
              type="submit"
              disabled={!input.trim() && attachments.length === 0}
              className="p-2 rounded-xl bg-[#101217] text-white disabled:opacity-40 hover:scale-105 transition-all shadow"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* Quick VPS Note Writing Widget */}
        <div className="p-3 rounded-2xl bg-white border border-gray-200 space-y-2">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-bold text-[#101217] flex items-center gap-1">
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
              className="px-3 py-1.5 rounded-lg bg-[#101217] text-white text-[11px] font-bold disabled:opacity-40 hover:bg-black transition-all"
            >
              {isSavingNote ? '...' : 'Guardar'}
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
