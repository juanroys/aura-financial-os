import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3005;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

const DATA_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

// Ensure database directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Helper to read DB
const readDB = () => {
  try {
    if (fs.existsSync(DB_FILE)) {
      const content = fs.readFileSync(DB_FILE, 'utf-8');
      return JSON.parse(content);
    }
  } catch (err) {
    console.error('Error reading DB file:', err);
  }
  return null;
};

// Helper to write DB
const writeDB = (data) => {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error writing DB file:', err);
    return false;
  }
};

// API Endpoints
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'AURA Financial OS API', timestamp: new Date().toISOString() });
});

app.get('/api/financials', (req, res) => {
  const data = readDB();
  res.json({ success: true, data });
});

app.post('/api/financials/sync', (req, res) => {
  const { payload } = req.body;
  if (!payload) {
    return res.status(400).json({ success: false, error: 'Payload missing' });
  }

  const saved = writeDB(payload);
  if (saved) {
    res.json({ success: true, message: 'Financial state synced to VPS local DB', syncedAt: new Date().toISOString() });
  } else {
    res.status(500).json({ success: false, error: 'Failed to write to local DB' });
  }
});

app.post('/api/email/scan', (req, res) => {
  const simulatedReceipt = {
    id: `receipt-${Date.now()}`,
    sender: 'billing@aws.amazon.com',
    subject: 'AWS Invoice - EC2 & RDS Cloud Hosting',
    date: new Date().toISOString().split('T')[0],
    amount: 145.00,
    vendorName: 'Amazon Web Services',
    isSubscription: true,
    items: ['Cloud Infrastructure Compute'],
    suggestedCategory: 'cloud',
    isDeductible: true,
    imported: false
  };

  res.json({ success: true, newReceipt: simulatedReceipt });
});

// Serve frontend static dist files if available
const DIST_PATH = path.join(__dirname, '../dist');
if (fs.existsSync(DIST_PATH)) {
  app.use(express.static(DIST_PATH));
  app.get('/(.*)', (req, res) => {
    res.sendFile(path.join(DIST_PATH, 'index.html'));
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 AURA Financial OS Local API running on http://0.0.0.0:${PORT}`);
});
