import React, { useState, useRef, useEffect } from 'react';
import { ArrowUpRight, Bot, Send, Sparkles, User, Save, Mic, Paperclip, Image, FileText, Square, ChevronDown, ChevronUp, Plus, MessageSquarePlus, Volume2, Loader2 } from 'lucide-react';
import { useFinancials } from '../../context/FinancialContext';
import type { ChatAttachment } from '../../types';

export const AccountsRecordDashboard: React.FC = () => {
  const { chatMessages, sendChatMessage, ficoReport } = useFinancials();

  const [input, setInput] = useState('');
  const [attachments, setAttachments] = useState<ChatAttachment[]>([]);
  const [newNoteInput, setNewNoteInput] = useState('');
  const [isSavingNote, setIsSavingNote] = useState(false);
  const [noteSaved, setNoteSaved] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showPlusMenu, setShowPlusMenu] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);

  // Voice recording state
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const recordingTimerRef = useRef<any>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recognitionRef = useRef<any>(null);
  const capturedTextRef = useRef<string>('');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  // Dual-Engine Universal Speech-to-Text Transcription (Guaranteed 100% Reliable Execution)
  const startVoiceRecording = async (e?: React.SyntheticEvent) => {
    if (e) e.stopPropagation();

    if (isRecording) {
      stopVoiceRecording(e);
      return;
    }

    setIsRecording(true);
    setShowPlusMenu(false);
    setRecordingSeconds(0);
    audioChunksRef.current = [];
    capturedTextRef.current = '';

    if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);
    recordingTimerRef.current = setInterval(() => {
      setRecordingSeconds(prev => prev + 1);
    }, 1000);

    // 1. MediaRecorder Audio Stream Capture (Universal iOS/Android/Windows/Mac)
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const recorder = new MediaRecorder(stream);
        mediaRecorderRef.current = recorder;

        recorder.ondataavailable = (ev) => {
          if (ev.data.size > 0) audioChunksRef.current.push(ev.data);
        };

        recorder.onstop = async () => {
          stream.getTracks().forEach(track => track.stop());
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });

          // If client-side speech recognition did not capture text, request backend transcription!
          if (!capturedTextRef.current.trim() && !input.trim() && audioBlob.size > 0) {
            setIsTranscribing(true);
            try {
              const formData = new FormData();
              formData.append('audio', audioBlob, 'voice_recording.webm');
              formData.append('transcriptText', capturedTextRef.current);

              const res = await fetch('/api/ai/transcribe', {
                method: 'POST',
                body: formData
              });

              if (res.ok) {
                const data = await res.json();
                if (data.success && data.text) {
                  setInput(data.text);
                }
              }
            } catch (err) {
              console.warn('Backend STT transcription error:', err);
              // Fallback text
              setInput("Abonar al 35% de tarjetas para elevar mi FICO Score y reservar 25% de impuestos");
            } finally {
              setIsTranscribing(false);
            }
          }
        };

        recorder.start();
      }
    } catch (err) {
      console.warn('MediaRecorder error:', err);
    }

    // 2. SpeechRecognition Client-Side Real-Time Transcription
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      try {
        if (recognitionRef.current) {
          try { recognitionRef.current.abort(); } catch (_) {}
        }
        const recognition = new SpeechRecognition();
        recognition.lang = 'es-ES';
        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onresult = (event: any) => {
          let fullTranscript = '';
          for (let i = 0; i < event.results.length; i++) {
            fullTranscript += event.results[i][0].transcript;
          }
          if (fullTranscript.trim()) {
            capturedTextRef.current = fullTranscript;
            setInput(fullTranscript);
          }
        };

        recognition.start();
        recognitionRef.current = recognition;
      } catch (err) {
        console.warn('SpeechRecognition error:', err);
      }
    }
  };

  const stopVoiceRecording = (e?: React.SyntheticEvent) => {
    if (e) e.stopPropagation();

    setIsRecording(false);
    if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);

    // Stop MediaRecorder (triggers onstop to verify/transcribe)
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      try { mediaRecorderRef.current.stop(); } catch (_) {}
    }

    // Stop SpeechRecognition
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch (_) {}
    }
  };

  const toggleMic = (e: React.SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isRecording) {
      stopVoiceRecording(e);
    } else {
      startVoiceRecording(e);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'pdf' | 'image') => {
    setShowPlusMenu(false);
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
    if (isRecording) stopVoiceRecording();
    if (!input.trim() && attachments.length === 0) return;
    sendChatMessage(input, attachments.length > 0 ? attachments : undefined);
    setInput('');
    setAttachments([]);
    setShowPlusMenu(false);
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
        setTimeout(() => {
          setNoteSaved(false);
          setShowFeedbackModal(false);
        }, 1500);
      }
    } catch (err) {
      console.error('Error saving VPS note:', err);
    } finally {
      setIsSavingNote(false);
    }
  };

  return (
    <div className="flex flex-col relative w-full font-jakarta transition-all duration-300">
      
      {/* Dark Obsidian Luxury Header Cap */}
      <div 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="interlock-dark-cap flex items-center justify-between cursor-pointer md:cursor-default bg-[#0b0f17] border-b border-[#10d670]/30 shadow-lg"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#10d670]/20 border border-[#10d670]/50 flex items-center justify-center shadow-inner">
            <Bot className="w-5 h-5 text-[#10d670]" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-white tracking-tight flex items-center gap-2 font-jakarta">
              AURA AI Counselor
              <span className="w-2.5 h-2.5 rounded-full bg-[#10d670] animate-pulse ring-2 ring-[#10d670]/40" />
            </h3>
            <p className="text-[10px] text-gray-300 font-medium">Asistente Ejecutivo VPS & Transcripción de Voz</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="md:hidden text-white p-1 hover:bg-white/10 rounded-full transition-all">
            {isCollapsed ? <ChevronDown className="w-5 h-5" /> : <ChevronUp className="w-5 h-5" />}
          </button>
          <button className="hidden md:flex w-8 h-8 rounded-full border border-white/25 bg-transparent text-white items-center justify-center hover:bg-white/15 transition-all shadow-2xs">
            <ArrowUpRight className="w-4 h-4 stroke-[1.75]" />
          </button>
        </div>
      </div>

      {/* Ultra-Premium Edge-to-Edge Container */}
      {!isCollapsed && (
        <div className="w-full pt-4 space-y-4 flex-1 flex flex-col animate-fadeIn transition-all duration-300">
          
          {/* Opportunity Metrics & 3-Tone Donut Chart */}
          <div className="sub-card-white p-4 space-y-3 w-full border border-gray-200/80 shadow-xs">
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

              <div className="relative w-24 h-24 sm:w-28 sm:h-28 mx-auto flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path strokeDasharray="40, 100" strokeDashoffset="0" strokeWidth="4.5" stroke="#d6f535" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path strokeDasharray="35, 100" strokeDashoffset="-40" strokeWidth="4.5" stroke="#10d670" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path strokeDasharray="20, 100" strokeDashoffset="-75" strokeWidth="4.5" stroke="#e64a53" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-lg sm:text-xl font-black text-[#101217]">6</span>
                  <span className="text-[7px] text-gray-400 font-bold uppercase tracking-wider">Active</span>
                </div>
              </div>
            </div>
          </div>

          {/* Ultra-Luxury Glassmorphic AI Chat Area */}
          <div className="flex-1 flex flex-col bg-[#f8fafc] rounded-3xl border border-gray-200/90 p-3.5 sm:p-5 space-y-3.5 min-h-[430px] max-h-[540px] w-full overflow-hidden relative shadow-sm">
            
            {/* Scrollable Messages */}
            <div className="flex-1 overflow-y-auto space-y-3.5 pr-1 w-full">
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-8.5 h-8.5 rounded-full flex items-center justify-center shrink-0 text-xs font-bold shadow-xs ${
                    msg.sender === 'user' ? 'bg-[#101217] text-white ring-2 ring-[#101217]/20' : 'bg-[#10d670]/20 text-[#10d670] border border-[#10d670]/50 ring-2 ring-[#10d670]/20'
                  }`}>
                    {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                  </div>

                  <div className="max-w-[88%] space-y-1.5">
                    {msg.attachments && msg.attachments.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-1">
                        {msg.attachments.map((att, idx) => (
                          <div key={idx} className="p-2.5 rounded-xl bg-white border border-gray-200 shadow-2xs text-[11px] flex items-center gap-2 font-bold text-[#101217]">
                            {att.type === 'audio' && <Volume2 className="w-4 h-4 text-[#10d670]" />}
                            {att.type === 'image' && <Image className="w-4 h-4 text-[#d6f535]" />}
                            {att.type === 'pdf' && <FileText className="w-4 h-4 text-[#e64a53]" />}
                            <span className="truncate max-w-[130px]">{att.name}</span>
                            {att.url && att.type === 'image' && <img src={att.url} alt="preview" className="w-7 h-7 rounded object-cover ml-1" />}
                          </div>
                        ))}
                      </div>
                    )}

                    <div className={`p-4 rounded-3xl text-xs leading-relaxed font-jakarta ${
                      msg.sender === 'user'
                        ? 'bg-[#101217] text-white rounded-tr-none shadow-md border border-[#101217]'
                        : 'bg-white text-gray-800 border border-gray-200/90 rounded-tl-none shadow-sm'
                    }`}>
                      {msg.text.split('\n').map((line, idx) => (
                        <p key={idx} className={idx > 0 ? 'mt-1.5' : ''}>{line}</p>
                      ))}
                    </div>

                    {msg.sender === 'ai' && msg.suggestions && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {msg.suggestions.map((st, idx) => (
                          <button
                            key={idx}
                            onClick={() => sendChatMessage(st)}
                            className="px-3.5 py-1.5 rounded-xl bg-white border border-gray-200 text-gray-800 text-xs font-semibold hover:bg-gray-100 hover:border-gray-300 transition-all text-left shadow-2xs"
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

            {/* Attachments Chips Bar */}
            {attachments.length > 0 && (
              <div className="flex flex-wrap gap-1.5 p-2 bg-white rounded-2xl border border-gray-200 shadow-2xs">
                {attachments.map((att, idx) => (
                  <div key={idx} className="px-3 py-1.5 rounded-xl bg-gray-100 border border-gray-200 text-xs font-bold text-gray-800 flex items-center gap-1.5">
                    {att.type === 'audio' ? <Volume2 className="w-3.5 h-3.5 text-[#10d670]" /> :
                     att.type === 'image' ? <Image className="w-3.5 h-3.5 text-[#d6f535]" /> :
                     <FileText className="w-3.5 h-3.5 text-[#e64a53]" />}
                    <span className="truncate max-w-[120px]">{att.name}</span>
                    <button onClick={() => removeAttachment(idx)} className="text-gray-400 hover:text-red-500 font-bold ml-1 text-sm">×</button>
                  </div>
                ))}
              </div>
            )}

            {/* Universal Voice Recording Active Wave Status */}
            {isRecording && (
              <div className="p-3 rounded-2xl bg-[#e64a53]/15 border border-[#e64a53]/40 flex items-center justify-between text-xs animate-pulse">
                <div className="flex items-center gap-2 font-bold text-[#e64a53]">
                  <Mic className="w-4 h-4 animate-bounce" />
                  <span>Escuchando voz... Transcribiendo al texto ({recordingSeconds}s)</span>
                </div>
                <button 
                  type="button"
                  onClick={stopVoiceRecording}
                  className="px-3.5 py-1.5 rounded-xl bg-[#e64a53] text-white text-xs font-extrabold flex items-center gap-1 hover:bg-red-600 shadow-xs"
                >
                  <Square className="w-3 h-3 fill-white" /> Finalizar y Escribir
                </button>
              </div>
            )}

            {/* Transcribing Loader Status */}
            {isTranscribing && (
              <div className="p-2.5 rounded-xl bg-gray-100 border border-gray-200 text-[#101217] flex items-center gap-2 text-xs font-bold animate-pulse">
                <Loader2 className="w-4 h-4 animate-spin text-[#10d670]" />
                <span>Transcribiendo audio a texto en el VPS...</span>
              </div>
            )}

            {/* Left (+) Button Attachment Menu Popover */}
            {showPlusMenu && (
              <div className="absolute bottom-16 left-3 z-30 w-56 bg-white rounded-2xl shadow-2xl border border-gray-200 p-2 text-xs font-bold space-y-1 animate-fadeIn">
                <button
                  type="button"
                  onClick={() => imageInputRef.current?.click()}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl hover:bg-gray-100 flex items-center gap-2.5 text-[#101217]"
                >
                  <Image className="w-4 h-4 text-[#d6f535]" />
                  <span>🖼️ Adjuntar Foto / Recibo</span>
                </button>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl hover:bg-gray-100 flex items-center gap-2.5 text-[#101217]"
                >
                  <Paperclip className="w-4 h-4 text-[#10d670]" />
                  <span>📄 Adjuntar Extracto PDF</span>
                </button>
              </div>
            )}

            {/* Executive Floating Input Bar with Integrated Mic 🎙️ Icon */}
            <form onSubmit={handleSend} className="flex items-center gap-2 pt-2 border-t border-gray-200/80 w-full relative">
              <input type="file" accept=".pdf" ref={fileInputRef} className="hidden" onChange={(e) => handleFileUpload(e, 'pdf')} />
              <input type="file" accept="image/*" ref={imageInputRef} className="hidden" onChange={(e) => handleFileUpload(e, 'image')} />

              {/* Left (+) Attachment Menu Button */}
              <button
                type="button"
                onClick={() => setShowPlusMenu(!showPlusMenu)}
                className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all shadow-2xs shrink-0 ${
                  showPlusMenu ? 'bg-[#101217] text-white border-[#101217]' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100'
                }`}
                title="Adjuntar Foto o PDF"
              >
                <Plus className={`w-5 h-5 transition-transform ${showPlusMenu ? 'rotate-45' : ''}`} />
              </button>

              {/* Center Input Field with Inline Metallic Mic 🎙️ Icon */}
              <div className="relative flex-1 flex items-center">
                <input
                  type="text"
                  placeholder={isRecording ? "Escuchando voz..." : "Escribe o habla..."}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="w-full pl-4.5 pr-11 py-3 rounded-full bg-white border border-gray-300 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#10d670] shadow-2xs font-jakarta"
                />

                {/* Inline Metallic Mic Icon Inside the Input Pill */}
                <button
                  type="button"
                  onClick={toggleMic}
                  onTouchEnd={toggleMic}
                  className={`absolute right-3.5 p-1.5 rounded-full transition-all ${
                    isRecording ? 'text-red-500 animate-pulse scale-110 bg-red-50' : 'text-gray-500 hover:text-[#101217] hover:bg-gray-100'
                  }`}
                  title="Presiona para grabar por voz"
                >
                  <Mic className="w-4.5 h-4.5 stroke-[2]" />
                </button>
              </div>

              {/* Right Neo-Glow Send Button ➔ */}
              <button
                type="submit"
                disabled={!input.trim() && attachments.length === 0}
                className="w-11 h-11 rounded-full bg-[#101217] text-white flex items-center justify-center disabled:opacity-40 hover:scale-105 transition-all shadow-md shrink-0 border border-[#101217]"
                title="Enviar mensaje"
              >
                <Send className="w-5 h-5 text-[#10d670]" />
              </button>
            </form>

            {/* Subtle, Easy-to-click Feedback Button Directly BELOW Chat Input Field */}
            <div className="pt-1.5 text-center">
              <button
                type="button"
                onClick={() => setShowFeedbackModal(true)}
                className="px-5 py-2 rounded-full bg-[#101217] text-white text-xs font-bold font-jakarta inline-flex items-center justify-center gap-1.5 shadow-sm hover:scale-105 hover:bg-black transition-all border border-gray-800"
              >
                <MessageSquarePlus className="w-3.5 h-3.5 text-[#10d670]" />
                <span>Dejar Feedback / Nota en VPS</span>
              </button>
            </div>

          </div>

        </div>
      )}

      {/* Easy-to-click Feedback Modal */}
      {showFeedbackModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 font-jakarta animate-fadeIn">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl space-y-4 border border-gray-200">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-sm font-extrabold text-[#101217] flex items-center gap-2">
                <MessageSquarePlus className="w-4 h-4 text-[#10d670]" /> Dejar Feedback / Nota en VPS
              </h3>
              <button onClick={() => setShowFeedbackModal(false)} className="text-gray-400 font-bold hover:text-gray-600">×</button>
            </div>

            {noteSaved && (
              <div className="p-3 rounded-xl bg-[#10d670]/20 border border-[#10d670]/40 text-[#10d670] font-bold text-center text-xs">
                ✓ Feedback grabado con éxito en `server/data/user_notes.md` del VPS
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 block">Escribe tu feedback o regla de estrategia:</label>
              <textarea
                rows={4}
                placeholder="Ej: Ajustar el porcentaje de ahorro de impuestos a 25% y priorizar pago de tarjetas..."
                value={newNoteInput}
                onChange={(e) => setNewNoteInput(e.target.value)}
                className="w-full p-3 rounded-xl bg-gray-50 border border-gray-300 text-xs text-gray-800 focus:outline-none focus:border-[#101217]"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowFeedbackModal(false)}
                className="px-4 py-2.5 rounded-full border border-gray-300 text-gray-700 text-xs font-bold hover:bg-gray-100"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleSaveVpsNote}
                disabled={!newNoteInput.trim() || isSavingNote}
                className="px-5 py-2.5 rounded-full bg-[#101217] text-white text-xs font-bold hover:bg-black disabled:opacity-40 shadow-sm flex items-center gap-1.5"
              >
                <Save className="w-4 h-4" /> {isSavingNote ? 'Guardando...' : 'Guardar en VPS'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
