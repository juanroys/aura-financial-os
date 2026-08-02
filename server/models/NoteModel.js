import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, '../data');
const NOTES_FILE = path.join(DATA_DIR, 'user_notes.md');

const INITIAL_NOTES_CONTENT = `# AURA Financial OS - Archivo de Estrategia & Notas VPS
===================================================
Servidor: 187.77.3.244
Fecha de Inicio: ${new Date().toLocaleDateString()}

## 🎯 Metas & Compromisos de Libertad Financiera

1. **Protección del Sueldo de Trabajo Físico**:
   - Reservar 25% para impuestos en cada cobro.
   - Destinar 30% a aceleración de pago de tarjetas.

2. **Optimización de Crédito FICO**:
   - Reducir utilización de Tarjeta Visa Business por debajo del 30%.
   - Meta a 90 días: FICO Score 750+.

3. **Separación de Fondos Startup**:
   - Mantener presupuesto de supervivencia personal separado del Burn Rate de la startup.

---
*Este archivo se actualiza dinámicamente desde el chat del Asistente IA y puede ser revisado por tu Arquitecto de Software en el VPS.*
`;

export class NoteModel {
  static ensureDir() {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
  }

  static getNotes() {
    this.ensureDir();
    try {
      if (fs.existsSync(NOTES_FILE)) {
        return fs.readFileSync(NOTES_FILE, 'utf-8');
      } else {
        fs.writeFileSync(NOTES_FILE, INITIAL_NOTES_CONTENT, 'utf-8');
        return INITIAL_NOTES_CONTENT;
      }
    } catch (err) {
      console.error('Error reading user_notes.md:', err);
      return '';
    }
  }

  static appendNote(noteText) {
    this.ensureDir();
    try {
      const timestamp = new Date().toLocaleString();
      const entry = `\n\n### 📝 Acuerdo del ${timestamp}\n${noteText}\n`;
      fs.appendFileSync(NOTES_FILE, entry, 'utf-8');
      return this.getNotes();
    } catch (err) {
      console.error('Error appending to user_notes.md:', err);
      return null;
    }
  }

  static updateNotes(fullContent) {
    this.ensureDir();
    try {
      fs.writeFileSync(NOTES_FILE, fullContent, 'utf-8');
      return true;
    } catch (err) {
      console.error('Error updating user_notes.md:', err);
      return false;
    }
  }
}
