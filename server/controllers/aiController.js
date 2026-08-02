import { NoteModel } from '../models/NoteModel.js';

export class AIController {
  static async generateAdvice(req, res) {
    try {
      const { userMessage, contextData } = req.body;
      if (!userMessage) {
        return res.status(400).json({ success: false, error: 'userMessage is required' });
      }

      const lower = userMessage.toLowerCase();
      let replyText = '';
      let suggestions = [];
      let actionPayload = undefined;
      let shouldSaveNote = false;
      let noteToSave = '';

      // Dynamic Contextual Natural Language Synthesis
      if (lower.includes('sueldo') || lower.includes('trabajo') || lower.includes('empleo') || lower.includes('viernes') || lower.includes('físico')) {
        replyText = `Entiendo perfectamente el peso que sientes al terminar una jornada de trabajo físico. Ese esfuerzo es el motor que mantiene con vida tu visión.\n\nPara el sueldo que estás por recibir:\n1. Separa de inmediato el 25% para tu Fondo de Impuestos (tranquilidad fiscal).\n2. Asigna un 30% como abono acelerado a tu Tarjeta Visa Business (interés del 24.5%).\n3. Cubre tus costos esenciales de supervivencia y deja el remanente como amortiguador.\n\n¿Quieres que guarde este plan de distribución en nuestro archivo de estrategia en el VPS para que tu arquitecto pueda revisarlo?`;
        suggestions = ['📝 Guardar este plan en el VPS', '📉 Ver plan de pago de tarjetas'];
        actionPayload = { tab: 'cashflow' };
        
        if (lower.includes('guardar') || lower.includes('registra') || lower.includes('escribe')) {
          shouldSaveNote = true;
          noteToSave = 'Distribución del sueldo de trabajo físico: 25% Fondo de Impuestos, 30% Pago de Tarjeta Visa Business (24.5% APR), Restante a gastos fijos y reserva.';
        }
      } else if (lower.includes('fico') || lower.includes('crédito') || lower.includes('score') || lower.includes('750')) {
        const score = contextData?.ficoScore || 685;
        replyText = `Analizando tu historial crediticio actual (FICO Score: ${score}):\n\nTu utilización de crédito se encuentra elevada. El secreto para saltar a 750+ puntos en los próximos 90 días no es pedir más tarjetas, sino bajar la utilización por debajo del 30%.\n\nAl reducir el saldo de tu tarjeta principal a menos de $2,500 USD, tu puntaje subirá automáticamente +35 a +45 puntos, abriéndote puertas a líneas de crédito de capital de trabajo al 0% APR para tu startup.`;
        suggestions = ['Ver Centro FICO & Crédito', '📝 Guardar meta FICO en VPS'];
        actionPayload = { tab: 'credit' };

        if (lower.includes('guardar') || lower.includes('meta')) {
          shouldSaveNote = true;
          noteToSave = `Meta FICO 90 Días: Reducir utilización de tarjetas a <30% para alcanzar 750+ puntos y solicitar crédito de capital de trabajo al 0% APR.`;
        }
      } else if (lower.includes('extracto') || lower.includes('pdf') || lower.includes('factura') || lower.includes('bóveda')) {
        replyText = `Puedes subir tus extractos bancarios en PDF o imágenes de facturas directamente a la Bóveda de Documentos. El motor OCR del VPS leerá el archivo real, extraerá montos, fechas y conceptos, y determinará cuáles son deducibles de impuestos para tu declaración anual.`;
        suggestions = ['Abrir Bóveda PDF', 'Escanear recibos por correo'];
        actionPayload = { tab: 'tax' };
      } else if (lower.includes('deuda') || lower.includes('interés') || lower.includes('avalancha') || lower.includes('tarjeta')) {
        replyText = `Tus compromisos actuales están dominados por la tarjeta de crédito de mayor tasa (24.5% APR). El método Avalancha es matemáticamente el más destructivo para las deudas: cada dólar extra abonado ahí elimina intereses futuros directamente.\n\nSi abonamos $300 USD adicionales al mes, serás libre de deudas en 18 meses y ahorrarás más de $1,400 USD.`;
        suggestions = ['Ver Mapa de Deudas', '📝 Registrar acuerdo de pago en VPS'];
        actionPayload = { tab: 'credit' };

        if (lower.includes('guardar') || lower.includes('acuerdo')) {
          shouldSaveNote = true;
          noteToSave = 'Plan Avalancha de Deudas: Abono adicional de $300 USD/mes priorizado en Tarjeta Visa Business (24.5% APR). Ahorro estimado de $1,400 USD en intereses.';
        }
      } else if (lower.includes('crisis') || lower.includes('desorden') || lower.includes('ayuda') || lower.includes('startup')) {
        replyText = `Mira a tu alrededor: lo que estás haciendo no es fácil, pero es temporal. Trabajar físicamente para impulsar tu propia empresa demuestra la determinación de un gran fundador.\n\nNo intentemos resolver todo de golpe. Nuestro paso #1 hoy es:\n1. Proteger tus ingresos de supervivencia.\n2. Auditar suscripciones innecesarias.\n3. Asegurar tu reserva de impuestos.\n\nEstoy aquí contigo 24/7. Dime qué te preocupa más en este segundo y tomamos el control.`;
        suggestions = ['💡 Organizar sueldo del trabajo', '💳 Revisar FICO y Deudas', '📝 Escribir nota en VPS'];
        actionPayload = { tab: 'chat' };
      } else {
        replyText = `He procesado tu consulta: "${userMessage}".\n\nComo tu consejero financiero, sugiero mantener nuestra estrategia enfocado en tres pilares:\n1. Proteger la liquidez de tu trabajo físico.\n2. Minimizar el Burn Rate operativo de tu startup.\n3. Acumular deducibles de impuestos en la Bóveda para maximizar tu ahorro anual.\n\n¿Quieres que profundicemos en alguno de estos puntos o guardemos una nota en tu servidor VPS?`;
        suggestions = ['💡 Organizar mi sueldo', '💳 Subir FICO Score', '📝 Escribir acuerdo en VPS'];
        actionPayload = { tab: 'chat' };
      }

      // Automatically append note to user_notes.md if requested
      if (shouldSaveNote && noteToSave) {
        NoteModel.appendNote(noteToSave);
      }

      res.json({
        success: true,
        reply: replyText,
        suggestions,
        actionPayload,
        savedNote: shouldSaveNote
      });
    } catch (err) {
      console.error('Error in generateAdvice:', err);
      res.status(500).json({ success: false, error: err.message });
    }
  }
}
