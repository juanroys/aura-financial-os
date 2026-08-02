import { FinancialModel } from '../models/FinancialModel.js';

export class FinancialController {
  static getFinancials(req, res) {
    const data = FinancialModel.getData();
    res.json({ success: true, data });
  }

  static syncFinancials(req, res) {
    const { payload } = req.body;
    if (!payload) {
      return res.status(400).json({ success: false, error: 'Payload missing' });
    }

    const saved = FinancialModel.saveData(payload);
    if (saved) {
      res.json({ 
        success: true, 
        message: 'Estado financiero sincronizado en el modelo MVC del VPS', 
        syncedAt: new Date().toISOString() 
      });
    } else {
      res.status(500).json({ success: false, error: 'Error guardando en el modelo de base de datos' });
    }
  }

  static scanEmail(req, res) {
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
  }
}
