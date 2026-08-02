import React, { useState, useEffect } from 'react';
import { FileText, Save, RefreshCw, CheckCircle2 } from 'lucide-react';
import { GlassCard } from '../common/GlassCard';

export const VpsStrategyNotes: React.FC = () => {
  const [notes, setNotes] = useState<string>('');
  const [newNoteInput, setNewNoteInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  const fetchNotes = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/notes');
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setNotes(data.content || '');
        }
      }
    } catch (err) {
      console.warn('Error fetching notes:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleAppendNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteInput.trim()) return;

    setIsSaving(true);
    try {
      const res = await fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ noteText: newNoteInput })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setNotes(data.content);
          setNewNoteInput('');
          setSaveSuccess(true);
          setTimeout(() => setSaveSuccess(false), 2500);
        }
      }
    } catch (err) {
      console.error('Error appending note:', err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <GlassCard glow="cyan" className="space-y-4">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-[#00f2fe]/10 text-[#00f2fe] border border-[#00f2fe]/30">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              Archivo de Estrategia VPS (`user_notes.md`)
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#10b981]/20 text-[#10b981] font-bold">
                Sincronización Directa VPS
              </span>
            </h3>
            <p className="text-[11px] text-gray-400">
              Compromisos guardados por el Consejero IA y revisables por tu Arquitecto de Software
            </p>
          </div>
        </div>

        <button
          onClick={fetchNotes}
          disabled={isLoading}
          className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs flex items-center gap-1 border border-white/10 transition-all"
          title="Recargar archivo del VPS"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
          <span className="hidden sm:inline">Recargar</span>
        </button>
      </div>

      {/* Write Note Form */}
      <form onSubmit={handleAppendNote} className="flex gap-2">
        <input
          type="text"
          placeholder="Escribe un nuevo acuerdo o regla financiera para guardar en el VPS..."
          value={newNoteInput}
          onChange={(e) => setNewNoteInput(e.target.value)}
          className="flex-1 px-3.5 py-2 rounded-xl bg-white/5 border border-white/15 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-[#00f2fe]"
        />
        <button
          type="submit"
          disabled={!newNoteInput.trim() || isSaving}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#00f2fe] to-[#7928ca] text-white font-bold text-xs disabled:opacity-40 hover:scale-105 transition-all shadow-md flex items-center gap-1"
        >
          <Save className="w-3.5 h-3.5" />
          <span>{isSaving ? 'Guardando...' : 'Escribir en VPS'}</span>
        </button>
      </form>

      {saveSuccess && (
        <div className="p-2.5 rounded-xl bg-[#10b981]/15 border border-[#10b981]/30 text-[#10b981] text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>¡Acuerdo guardado exitosamente en `user_notes.md` en tu VPS!</span>
        </div>
      )}

      {/* Render Markdown Notes Content */}
      <div className="p-4 rounded-2xl bg-black/50 border border-white/10 text-xs text-gray-300 font-mono overflow-y-auto max-h-72 leading-relaxed whitespace-pre-wrap">
        {notes || 'Cargando archivo user_notes.md desde el servidor VPS...'}
      </div>
    </GlassCard>
  );
};
