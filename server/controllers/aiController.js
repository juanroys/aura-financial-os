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

      // 1. Check if user is teaching, correcting, or giving preferences to the AI
      if (lower.includes('prefiero') || lower.includes('no me gusta') || lower.includes('recuerda que') || lower.includes('mi meta es') || lower.includes('en adelante')) {
        MemoryModel.addPreference(rawMsg);
        replyText = `¡Perfecto! He registrado esta regla en mi memoria permanente en tu VPS:\n\n📌 *"${rawMsg}"*\n\nA partir de este momento la tomaré en cuenta en cada análisis estratégico que hagamos juntos. ¿En qué nos enfocamos ahora?`;
        suggestions = ['📝 Escribir nota en VPS', '💡 Organizar mi sueldo', '💳 Revisar FICO Score'];
        
        return res.json({
          success: true,
          reply: replyText,
          suggestions,
          actionPayload: { tab: 'chat' },
          savedNote: false,
          memoryCount: memory.learnedPreferences.length + 1
        });
      }

      // 2. Check if user explicitly wants to write or define something in the VPS file
      if (lower.includes('escribe') || lower.includes('guarda en vps') || lower.includes('registra en vps') || lower.includes('crea una nota') || lower.includes('anota en el vps')) {
        let extractedNote = rawMsg.replace(/(escribe|guarda en vps|registra en vps|crea una nota|anota en el vps|en el vps|que)/gi, '').trim();
        if (!extractedNote || extractedNote.length < 5) {
          extractedNote = `Acuerdo definido con el Founder: ${rawMsg}`;
        }
        
        NoteModel.appendNote(extractedNote);
        replyText = `✓ **Escrito exitosamente en tu VPS** (\`server/data/user_notes.md\`):\n\n> "${extractedNote}"\n\nEste acuerdo ya está grabado en el servidor para que tú o tu equipo lo revisen en cualquier momento. Si necesitas ajustar o corregir algo de lo escrito, solo dímelo y lo modificamos de inmediato.`;
        suggestions = ['📋 Ver notas del VPS', '💡 Siguiente paso estratégico', '💳 Revisar FICO Score'];
        
        return res.json({
          success: true,
          reply: replyText,
          suggestions,
          actionPayload: { tab: 'chat' },
          savedNote: true,
          memoryCount: memory.learnedPreferences.length
        });
      }

      // 3. Greetings & Warm Casual Intros
      const isGreeting = /^(hola|buenas|buenos dias|buenas noches|hey|que tal|saludos|hola aura|hola ai)/i.test(lower);
      if (isGreeting && lower.length < 25) {
        replyText = `¡Hola! Qué gusto conversar contigo. Estoy aquí contigo 100% activo en tu ecosistema AURA.\n\nComo tu consejero financiero y pair programmer de negocios, dime: ¿en qué nos concentramos hoy?\n\n- **Flujo de Caja**: Distribuir el sueldo de tu jornada física y proteger tu liquidez.\n- **Score FICO**: Aceleración de tarjetas para romper la barrera de los 750 puntos.\n- **Escribir en VPS**: Definir cualquier estrategia para dejarla grabada en tu archivo del servidor.`;
        suggestions = ['💡 Organizar mi sueldo del trabajo', '💳 Plan para FICO Score 750+', '📝 Escribir un acuerdo en el VPS'];
        
        return res.json({
          success: true,
          reply: replyText,
          suggestions,
          actionPayload: { tab: 'chat' },
          savedNote: false,
          memoryCount: memory.learnedPreferences.length
        });
      }

      // 4. Physical Salary & Cashflow Strategy
      if (lower.includes('sueldo') || lower.includes('trabajo') || lower.includes('empleo') || lower.includes('físico') || lower.includes('ingreso') || lower.includes('quincena')) {
        replyText = `Entiendo perfectamente la exigencia física y mental de tu jornada. Ese esfuerzo diario es la columna vertebral que mantiene en pie y financia tu startup.\n\nTeniendo en cuenta tus reglas en memoria:\n${memory.learnedPreferences.slice(-2).map(p => `• ${p}`).join('\n')}\n\nTe propongo esta distribución clara para tu próximo cobro:\n1. 🛡️ **25% Reserva Impuestos IRS**: Mantén la paz mental con el fisco.\n2. 💳 **35% Aceleración de Deuda**: Inyección directa a la tarjeta de mayor tasa para acelerar tu Score FICO.\n3. 🏠 **40% Operación & Supervivencia**: Cobertura de gastos esenciales.\n\n¿Quieres que escriba este plan de distribución directamente en el archivo \`user_notes.md\` de tu VPS?`;
        suggestions = ['📝 Escribir este plan en el VPS', '📊 Ver mi Score FICO', '📉 Simulador Avalancha'];
        actionPayload = { tab: 'cashflow' };
      }
      
      // 5. FICO Score & Debt Acceleration
      else if (lower.includes('fico') || lower.includes('crédito') || lower.includes('score') || lower.includes('750') || lower.includes('tarjeta')) {
        const score = contextData?.ficoScore || memory.userProfile.targetFico || 685;
        replyText = `Analizando tu estado crediticio actual (FICO Score: ${score}):\n\nTu meta prioritaria es superar los 750 puntos. La palanca clave para lograrlo en los próximos 60-90 días es:\n\n1. **Bajar la Utilización a <30%**: Al abonar agresivamente a tu tarjeta principal, sumarás automáticamente entre +35 y +50 puntos.\n2. **Acceso a Capital 0% APR**: Con FICO > 750 calificarás para tarjetas de crédito corporativas sin intereses durante 12-18 meses para tu startup.\n\n¿Escribimos esta meta FICO en tu archivo de notas del VPS para hacerle seguimiento?`;
        suggestions = ['💳 Ver Centro FICO', '📝 Escribir meta FICO en VPS', '📉 Simulador Avalancha'];
        actionPayload = { tab: 'credit' };
      }

      // 6. Tax Deductibles & OCR Vault
      else if (lower.includes('impuesto') || lower.includes('tax') || lower.includes('irs') || lower.includes('deducible') || lower.includes('factura')) {
        replyText = `Para un Founder que combina empleo físico con desarrollo de startup, cada gasto operativo en servidores (AWS, Vercel), licencias y equipos es 100% deducible.\n\nPuedes subir tus extractos bancarios en PDF o fotos de recibos a la Bóveda de Documentos. El motor OCR del VPS los leerá y extraerá el ahorro fiscal de forma automática.\n\n¿Abrimos la Bóveda de Documentos PDF o simulamos un escaneo por correo?`;
        suggestions = ['📄 Abrir Bóveda PDF', '⚡ Escanear facturas por correo'];
        actionPayload = { tab: 'tax' };
      }

      // 7. General Conversational Fallback (Natural, Empathetic, Non-Robotic)
      else {
        replyText = `Te escucho atentamente. Sobre tu mensaje: "${rawMsg}"\n\nComo tu consejero financiero y pair programmer, mi objetivo es asegurarme de que cada movimiento que hagamos fortalezca la liquidez de tu trabajo físico y proteja el futuro de tu startup.\n\nPodemos abordar esto desde tres ángulos:\n1. 💡 **Escribir un acuerdo en el VPS** para fijar ideas y corregirlas juntos.\n2. 💳 **Optimizar deudas o Score FICO** para liberar flujo de caja.\n3. 🛡️ **Asegurar deducciones de impuestos** para tu declaración annual.\n\n¿Hacia dónde prefieres que movamos la conversación ahora?`;
        suggestions = ['💡 Organizar mi sueldo del trabajo', '💳 Ver Score FICO', '📝 Escribir una nota en el VPS'];
        actionPayload = { tab: 'chat' };
      }

      MemoryModel.addInsight(`User: "${rawMsg.substring(0, 50)}" -> Dynamic Conversational Response.`);

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
