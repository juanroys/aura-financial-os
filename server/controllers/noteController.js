import { NoteModel } from '../models/NoteModel.js';

export class NoteController {
  static getNotes(req, res) {
    const content = NoteModel.getNotes();
    res.json({ success: true, content });
  }

  static appendNote(req, res) {
    const { noteText } = req.body;
    if (!noteText) {
      return res.status(400).json({ success: false, error: 'noteText is required' });
    }

    const updated = NoteModel.appendNote(noteText);
    if (updated !== null) {
      res.json({ success: true, content: updated, message: 'Nota guardada exitosamente en el VPS' });
    } else {
      res.status(500).json({ success: false, error: 'Error escribiendo en el VPS' });
    }
  }

  static updateNotes(req, res) {
    const { content } = req.body;
    if (content === undefined) {
      return res.status(400).json({ success: false, error: 'content is required' });
    }

    const saved = NoteModel.updateNotes(content);
    if (saved) {
      res.json({ success: true, message: 'Archivo user_notes.md actualizado' });
    } else {
      res.status(500).json({ success: false, error: 'Error actualizando user_notes.md' });
    }
  }
}
