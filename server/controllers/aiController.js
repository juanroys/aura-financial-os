import { NoteModel } from '../models/NoteModel.js';
import { MemoryModel } from '../models/MemoryModel.js';

export class AIController {
  static async generateAdvice(req, res) {
    try {
      const { userMessage, contextData } = req.body;
      if (!userMessage) {
        return res.status(400).json({ success: false, error: 'userMessage is required' });
      }

      const lower = userMessage.toLowerCase();
      const memory = MemoryModel.getMemory();

      // Check if user is teaching/correcting the AI
      let learnedNewThing = false;
      if (lower.includes('prefiero') || lower.includes('no me gusta') || lower.includes('recuerda que') || lower.includes('mi meta es')) {
        MemoryModel.addPreference(userMessage);
        learnedNewThing = true;
      }

      let replyText = '';
      let suggestions = [];
      let actionPayload = undefined;
      let shouldSaveNote = false;
      let noteToSave = '';

      // Deep Contextual Dynamic Synthesis incorporating memory
      const memorySummary = memory.learnedPreferences.slice(-3).map(p => `• ${p}`).join('\n');

      if (lower.includes('sueldo') || lower.includes('trabajo') || lower.includes('empleo') || lower.includes('físico') || lower.includes('ingreso')) {
        replyText = `Entiendo perfectamente la exigencia física y mental de tu jornada. Ese esfuerzo diario es la columna vertebral que financia tu startup.\n\nTeniendo en cuenta tu perfil de Founder y tus reglas aprendidas:\n${memorySummary}\n\nTe propongo esta distribución estratégica para tu próximo cobro:\n1. 🛡️ **25% Reserva Impuestos IRS**: Garantiza tu tranquilidad fiscal.\n2. 💳 **30% Aceleración de Deuda**: Inyección directa a la tarjeta de mayor APR para bajar tu utilización por debajo del 30%.\n3. 🏠 **45% Operación & Supervivencia**: Cubre tus gastos esenciales sin tocar el capital de la empresa.\n\n¿Escribimos este compromiso en tu archivo VPS \`user_notes.md\` para dejarlo fijado?`;
        suggestions = ['📝 Guardar este acuerdo en VPS', '📊 Ver mi Score FICO', '📉 Simulador de Deudas'];
        actionPayload = { tab: 'cashflow' };

        if (lower.includes('guardar') || lower.includes('acuerdo') || lower.includes('escribe')) {
          shouldSaveNote = true;
          noteToSave = 'Distribución del sueldo de trabajo físico: 25% Reserva Impuestos, 30% Aceleración de Tarjetas (FICO 750+), 45% Operación y gastos fijos.';
        }
      } else if (lower.includes('fico') || lower.includes('crédito') || lower.includes('score') || lower.includes('750')) {
        const score = contextData?.ficoScore || memory.userProfile.targetFico || 685;
        replyText = `Analizando tu estado crediticio actual (FICO Score: ${score}):\n\nTus aprendizajes en memoria señalan que tu meta es superar los 750 puntos. La palanca más rápida no es pedir más crédito, sino la utilización estratégica:\n\n1. **Reducción de Saldo**: Al bajar la utilización total por debajo del 30% (menos de $2,550 USD), ganarás entre +35 y +50 puntos en 60-90 días.\n2. **Apalancamiento de Capital**: Con FICO > 750 accederás a tarjetas de crédito corporativas al 0% APR durante 12-18 meses para tu startup.\n\n¿Fijamos la meta FICO en tu archivo de notas VPS?`;
        suggestions = ['💳 Ver Centro FICO', '📝 Guardar meta FICO en VPS', '📊 Simulador Avalancha'];
        actionPayload = { tab: 'credit' };

        if (lower.includes('guardar') || lower.includes('meta')) {
          shouldSaveNote = true;
          noteToSave = `Meta FICO 90 Días: Reducir utilización de tarjetas a <30% para alcanzar 750+ puntos y desbloquear líneas de crédito corporativo al 0% APR.`;
        }
      } else if (lower.includes('impuesto') || lower.includes('tax') || lower.includes('irs') || lower.includes('deducible')) {
        replyText = `En tu estructura como Founder con trabajo físico y startup, la clave del ahorro fiscal radica en la Bóveda de Documentos:\n\n1. **Deducciones Aprobadas**: Cada gasto en servidores (AWS, Vercel), licencias SaaS y herramientas de desarrollo es 100% deducible.\n2. **Escaneo de Facturas**: Sube tus extractos en PDF a la Bóveda o reenvía facturas por correo para registrar el ahorro automáticamente.\n\n¿Quieres abrir la Bóveda de Documentos OCR o simular un escaneo?`;
        suggestions = ['📄 Abrir Bóveda PDF', '⚡ Escanear facturas por correo'];
        actionPayload = { tab: 'tax' };
      } else {
        replyText = `Procesando tu consulta: "${userMessage}".\n\n${learnedNewThing ? '🧠 *He guardado tu preferencia en mi memoria persistente del VPS para aplicar en nuestras próximas conversaciones.*\n\n' : ''}Como tu consejero financiero y pair programmer de negocios, mantendré nuestro enfoque en tus pilares activos:\n\n${memorySummary}\n\n¿Hacia dónde quieres que movamos la estrategia ahora?`;
        suggestions = ['💡 Organizar sueldo del trabajo', '💳 Ver FICO y Deudas', '📝 Escribir nota en VPS'];
        actionPayload = { tab: 'chat' };
      }

      if (shouldSaveNote && noteToSave) {
        NoteModel.appendNote(noteToSave);
      }

      MemoryModel.addInsight(`User: "${userMessage.substring(0, 50)}" -> Response generated.`);

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
