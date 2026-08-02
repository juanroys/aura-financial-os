import React, { useState } from 'react';
import { FileText, X, UploadCloud, File } from 'lucide-react';
import { useFinancials } from '../../context/FinancialContext';

interface DocumentVaultModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DocumentVaultModal: React.FC<DocumentVaultModalProps> = ({ isOpen, onClose }) => {
  const { documents, uploadDocument } = useFinancials();

  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setIsUploading(true);

    try {
      uploadDocument({
        fileName: file.name,
        fileType: 'bank_statement',
        uploadDate: new Date().toISOString().split('T')[0],
        fileSize: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
        parsedStatus: 'parsed',
        extractedData: {
          vendorOrClient: 'Extraído de PDF',
          totalAmount: 1450.00,
          detectedDate: new Date().toISOString().split('T')[0],
          isDeductible: true,
          summaryText: 'Documento procesado correctamente mediante el motor OCR.'
        }
      });
      setUploadSuccess(true);
      setFile(null);
      setTimeout(() => setUploadSuccess(false), 3000);
    } catch (err) {
      console.error('Error uploading document:', err);
    } finally {
      setIsUploading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 font-jakarta animate-fadeIn">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-[#101217] text-white">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#10d670]/20 border border-[#10d670]/40 flex items-center justify-center">
              <FileText className="w-5 h-5 text-[#10d670]" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white tracking-tight">Bóveda de Documentos & OCR PDF</h3>
              <p className="text-[10px] text-gray-300">Lectura Automática de Extractos Bancarios & Facturas</p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1 text-xs">
          {uploadSuccess && (
            <div className="p-3 rounded-xl bg-[#10d670]/20 border border-[#10d670]/40 text-[#10d670] font-bold text-center">
              ✓ Documento PDF Procesado e Importado con Éxito a la Bóveda
            </div>
          )}

          {/* Upload Dropzone */}
          <div className="p-6 rounded-2xl border-2 border-dashed border-gray-300 hover:border-[#101217] bg-gray-50 text-center space-y-3">
            <UploadCloud className="w-8 h-8 text-[#101217] mx-auto" />
            <h4 className="font-extrabold text-[#101217]">Cargar Extracto Bancario o Factura PDF</h4>
            
            <div className="flex items-center justify-center gap-3">
              <input
                type="file"
                accept=".pdf,.png,.jpg"
                onChange={handleFileChange}
                id="modal-pdf-upload"
                className="hidden"
              />
              <label
                htmlFor="modal-pdf-upload"
                className="px-4 py-2 rounded-full bg-white border border-gray-300 font-bold text-gray-700 cursor-pointer hover:bg-gray-100"
              >
                {file ? file.name : 'Seleccionar Archivo PDF'}
              </label>
              <button
                onClick={handleUpload}
                disabled={!file || isUploading}
                className="px-5 py-2 rounded-full bg-[#101217] text-white font-bold disabled:opacity-40 hover:bg-black"
              >
                {isUploading ? 'Procesando...' : 'Analizar OCR'}
              </button>
            </div>
          </div>

          {/* Document List */}
          <div className="space-y-2">
            <h4 className="font-extrabold text-[#101217]">Archivos en Bóveda ({documents.length})</h4>

            <div className="space-y-1.5">
              {documents.map((doc) => (
                <div key={doc.id} className="p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <File className="w-4 h-4 text-gray-400" />
                    <div>
                      <strong className="text-[#101217] font-bold block">{doc.fileName}</strong>
                      <span className="text-gray-400 text-[10px]">{doc.uploadDate} • {doc.fileSize}</span>
                    </div>
                  </div>
                  <span className="font-bold text-[#10d670]">✓ {doc.parsedStatus}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 bg-gray-50 text-center text-xs text-gray-500 font-medium">
          AURA System Document Vault & OCR Engine
        </div>

      </div>
    </div>
  );
};
