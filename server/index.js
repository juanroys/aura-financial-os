import express from 'express';
import cors from 'cors';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { FinancialController } from './controllers/financialController.js';
import { DocumentController } from './controllers/documentController.js';
import { AIController } from './controllers/aiController.js';
import { NoteController } from './controllers/noteController.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3005;

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 25 * 1024 * 1024 } });

app.use(cors());
app.use(express.json({ limit: '15mb' }));

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'AURA Financial OS MVC Engine', timestamp: new Date().toISOString() });
});

// Financial Routes
app.get('/api/financials', FinancialController.getFinancials);
app.post('/api/financials/sync', FinancialController.syncFinancials);
app.post('/api/email/scan', FinancialController.scanEmail);

// Document OCR Route
app.post('/api/documents/parse', upload.single('file'), DocumentController.parseFile);

// AI Generator Route
app.post('/api/ai/chat', AIController.generateAdvice);

// VPS Notes Routes
app.get('/api/notes', NoteController.getNotes);
app.post('/api/notes', NoteController.appendNote);
app.post('/api/notes/update', NoteController.updateNotes);

// Serve Static Production SPA
const DIST_PATH = path.join(__dirname, '../dist');
if (fs.existsSync(DIST_PATH)) {
  app.use(express.static(DIST_PATH));
  app.use((req, res) => {
    res.sendFile(path.join(DIST_PATH, 'index.html'));
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 AURA Financial OS MVC Engine running on http://0.0.0.0:${PORT}`);
});
