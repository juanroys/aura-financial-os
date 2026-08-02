import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const MEMORY_FILE = path.join(__dirname, '../data/ai_memory.json');

const DEFAULT_MEMORY = {
  userProfile: {
    role: 'Founder & CEO',
    physicalJob: true,
    targetFico: 750,
    preferredCurrency: 'USD'
  },
  learnedPreferences: [
    'Priorizar siempre la reserva del 25% para impuestos en cada cobro de sueldo.',
    'Separar el presupuesto de supervivencia personal del Burn Rate de la startup.',
    'Avanzar paso a paso, sección por sección en las decisiones financieras.'
  ],
  conversationInsights: [],
  lastUpdated: new Date().toISOString()
};

export class MemoryModel {
  static getMemory() {
    try {
      if (!fs.existsSync(MEMORY_FILE)) {
        fs.mkdirSync(path.dirname(MEMORY_FILE), { recursive: true });
        fs.writeFileSync(MEMORY_FILE, JSON.stringify(DEFAULT_MEMORY, null, 2), 'utf8');
        return DEFAULT_MEMORY;
      }
      const data = fs.readFileSync(MEMORY_FILE, 'utf8');
      return JSON.parse(data);
    } catch (err) {
      console.error('Error reading ai_memory.json:', err);
      return DEFAULT_MEMORY;
    }
  }

  static addPreference(preferenceText) {
    try {
      const memory = this.getMemory();
      if (!memory.learnedPreferences.includes(preferenceText)) {
        memory.learnedPreferences.push(preferenceText);
        memory.lastUpdated = new Date().toISOString();
        fs.writeFileSync(MEMORY_FILE, JSON.stringify(memory, null, 2), 'utf8');
      }
      return memory;
    } catch (err) {
      console.error('Error saving preference to ai_memory.json:', err);
      return null;
    }
  }

  static addInsight(insightText) {
    try {
      const memory = this.getMemory();
      memory.conversationInsights.push({
        text: insightText,
        timestamp: new Date().toISOString()
      });
      if (memory.conversationInsights.length > 50) {
        memory.conversationInsights.shift();
      }
      memory.lastUpdated = new Date().toISOString();
      fs.writeFileSync(MEMORY_FILE, JSON.stringify(memory, null, 2), 'utf8');
      return memory;
    } catch (err) {
      console.error('Error adding insight:', err);
      return null;
    }
  }
}
