import { NoteModel } from '../models/NoteModel.js';
import { MemoryModel } from '../models/MemoryModel.js';

export class AIController {
  static async generateAdvice(req, res) {
    try {
      const { userMessage, contextData } = req.body;
      if (!userMessage || !userMessage.trim()) {
        return res.status(400).json({ success: false, error: 'userMessage is required' });
      }

      const rawMsg = userMessage.trim();
      const lower = rawMsg.toLowerCase();
      const memory = MemoryModel.getMemory();

      let replyText = '';
      let suggestions = [];
      let actionPayload = undefined;
      let shouldSaveNote = false;
      let noteToSave = '';

      // 1. Check if user is teaching/giving preferences
      if (lower.includes('prefiero') || lower.includes('no me gusta') || lower.includes('recuerda que') || lower.includes('mi meta es')) {
        MemoryModel.addPreference(rawMsg);
        replyText = `Entendido 👌 Guardado en memoria. A partir de ahora lo tomaré en cuenta. ¿Qué otro punto revisamos?`;
        
        return res.json({
          success: true,
          reply: replyText,
          suggestions: [],
          actionPayload: undefined,
          savedNote: false,
          memoryCount: memory.learnedPreferences.length + 1
        });
      }

      // 2. Check if user wants to write a note in VPS
      if (lower.includes('escribe') || lower.includes('guarda en vps') || lower.includes('registra en vps') || lower.includes('crea una nota')) {
        let extractedNote = rawMsg.replace(/(escribe|guarda en vps|registra en vps|crea una nota|en el vps|que)/gi, '').trim();
        if (!extractedNote || extractedNote.length < 3) {
          extractedNote = rawMsg;
        }
        
        NoteModel.appendNote(extractedNote);
        replyText = `✓ Listo, ya lo dejé escrito en tu VPS (\`user_notes.md\`):\n\n"${extractedNote}"\n\nPuedes revisarlo o decirme si quieres corregir algo.`;
        
        return res.json({
          success: true,
          reply: replyText,
          suggestions: [],
          actionPayload: undefined,
          savedNote: true,
          memoryCount: memory.learnedPreferences.length
        });
      }

      // 3. Simple Warm Greetings (WhatsApp style - Short & Direct)
      const isGreeting = /^(hola|buenas|buenos dias|buenas noches|hey|que tal|saludos|hola aura)/i.test(lower);
      if (isGreeting && lower.length < 20) {
        replyText = `¡Hola! ¿Cómo estás? Dime en qué trabajamos hoy: ¿flujo de caja, tarjetas FICO o dejamos alguna nota en el VPS?`;
        
        return res.json({
          success: true,
          reply: replyText,
          suggestions: ['💡 Sueldo de trabajo físico', '💳 Subir Score FICO 750+', '📝 Escribir nota en VPS'],
          actionPayload: undefined,
          savedNote: false,
          memoryCount: memory.learnedPreferences.length
        });
      }

      // 4. Physical Job Salary Strategy
      if (lower.includes('sueldo') || lower.includes('trabajo') || lower.includes('empleo') || lower.includes('físico') || lower.includes('ingreso') || lower.includes('quincena')) {
        replyText = `Totalmente de acuerdo. Con el sueldo de tu trabajo físico, la mejor jugada hoy es:\n\n1. 25% para reserva de impuestos.\n2. 35% abono directo a tarjetas (para acelerar FICO).\n3. 40% para supervivencia personal.\n\n¿Quieres que guarde esta distribución en tu archivo VPS?`;
        suggestions = ['📝 Guardar en VPS', '📊 Ver Score FICO'];
        actionPayload = { tab: 'cashflow' };
      }
      
      // 5. FICO Credit Score Strategy
      else if (lower.includes('fico') || lower.includes('crédito') || lower.includes('score') || lower.includes('750') || lower.includes('tarjeta')) {
        const score = contextData?.ficoScore || memory.userProfile.targetFico || 685;
        replyText = `Tu FICO actual está en ${score}. Para llegar a 750+ en 60 días, bajemos la utilización de tus tarjetas a menos del 30%. Eso te abrirá capital corporativo al 0% APR para la startup.\n\n¿Anoto esta meta en tu VPS?`;
        suggestions = ['💳 Ver Centro FICO', '📝 Guardar meta FICO'];
        actionPayload = { tab: 'credit' };
      }

      // 6. Tax Deductibles & PDF Vault
      else if (lower.includes('impuesto') || lower.includes('tax') || lower.includes('irs') || lower.includes('deducible') || lower.includes('factura')) {
        replyText = `Recuerda que tus gastos de AWS, Vercel y herramientas SaaS son 100% deducibles. Puedes subir tus PDFs a la Bóveda y el OCR extraerá los ahorros fiscales automáticamente.\n\n¿Abrimos la Bóveda?`;
        suggestions = ['📄 Abrir Bóveda PDF', '⚡ Escanear facturas'];
        actionPayload = { tab: 'tax' };
      }

      // 7. Conversational Short Responses (WhatsApp fluid style)
      else {
        replyText = `Claro, te entiendo perfectamente. Si quieres podemos ajustar esa estrategia, registrarla en tu archivo del VPS o simular el impacto en tu caja.\n\n¿Qué prefieres hacer primero?`;
        suggestions = ['💡 Organizar caja', '📝 Escribir nota en VPS'];
        actionPayload = undefined;
      }

      MemoryModel.addInsight(`User: "${rawMsg.substring(0, 30)}" -> Fluid WhatsApp Response.`);

      res.json({
        success: true,
        reply: replyText,
        suggestions,
        actionPayload,
        savedNote: shouldSaveNote,
        memoryCount: memory.learnedPreferences.length
      });
    } catch (err) {
      console.error('Error in AIController:', err);
      res.status(500).json({ success: false, error: err.message });
    }
  }

  static async getMemory(req, res) {
    try {
      const memory = MemoryModel.getMemory();
      res.json({ success: true, memory });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}
