import React, { useState } from 'react';
import { FileText, UploadCloud, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { useFinancials } from '../../context/FinancialContext';
import { GlassCard } from '../common/GlassCard';

export const DocumentVault: React.FC = () => {
  const { documents, uploadDocument, addTransaction } = useFinancials();

  const [selectedDocId, setSelectedDocId] = useState<string | null>(
    documents.length > 0 ? documents[0].id : null
  );

  const [isUploading, setIsUploading] = useState(false);

  const selectedDoc = documents.find(d => d.id === selectedDocId);

  const handleSimulatedFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    setTimeout(() => {
      uploadDocument({
        fileName: file.name,
        fileType: file.name.toLowerCase().includes('fico') ? 'fico_report' :
                  file.name.toLowerCase().includes('factura') ? 'invoice' :
                  file.name.toLowerCase().includes('tax') ? 'tax_document' : 'bank_statement',
        fileSize: `${(file.size / 1024).toFixed(1)} KB`,
        uploadDate: new Date().toISOString().split('T')[0],
        parsedStatus: 'parsed',
        extractedData: {
          vendorOrClient: 'Empresa Servicios Tech',
          totalAmount: 480.00,
          detectedDate: new Date().toISOString().split('T')[0],
          suggestedCategory: 'services',
          isDeductible: true,
          summaryText: `Extracto detectado con 1 factura de servicios por $480.00 USD. Deducible de impuestos IRS/DIAN validado.`
        }
      });
      setIsUploading(false);
    }, 1800);
  };

  const handleImportExtractedItem = () => {
    if (!selectedDoc || !selectedDoc.extractedData) return;

    const data = selectedDoc.extractedData;
    addTransaction({
      date: data.detectedDate || new Date().toISOString().split('T')[0],
      title: `Importado de Bóveda: ${selectedDoc.fileName}`,
      amount: data.totalAmount || 0,
      type: 'expense',
      category: data.suggestedCategory || 'services',
      purposeTag: `Extraído automáticamente del archivo ${selectedDoc.fileName}`,
      isDeductible: data.isDeductible || false,
      paymentMethod: 'Bóveda PDF Sync',
      vendor: data.vendorOrClient || 'Proveedor',
      status: 'completed',
      receiptAttached: true
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <GlassCard glow="cyan">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#00f2fe]/10 text-[#00f2fe] border border-[#00f2fe]/30 flex items-center gap-1">
                <FileText className="w-3 h-3" /> Bóveda Inteligente de Documentos
              </span>
              <span className="text-xs text-gray-400">Lectura de Extractos & Facturas</span>
            </div>
            <h2 className="text-xl font-bold text-white mt-1">Bóveda de Documentos & OCR Inteligente</h2>
            <p className="text-xs text-gray-300 max-w-2xl mt-1">
              Sube tus extractos bancarios, facturas o reportes FICO en PDF/imagen. <strong className="text-white">AURA analiza el documento, extrae los valores deducibles y te guía para organizarlos</strong>.
            </p>
          </div>

          {/* Upload Button Input */}
          <label className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#00f2fe] via-[#7928ca] to-[#10b981] text-white font-bold text-xs shadow-[0_0_20px_rgba(0,242,254,0.4)] hover:scale-105 transition-all cursor-pointer">
            <UploadCloud className={`w-4 h-4 ${isUploading ? 'animate-bounce' : ''}`} />
            {isUploading ? 'Analizando Documento...' : 'Subir Extracto / Factura (PDF)'}
            <input 
              type="file" 
              accept=".pdf,.png,.jpg,.jpeg" 
              onChange={handleSimulatedFileUpload} 
              className="hidden" 
            />
          </label>
        </div>
      </GlassCard>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left List */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-white flex items-center justify-between">
            <span>Archivos en Bóveda ({documents.length})</span>
            <span className="text-xs text-gray-400">Haz clic para revisar</span>
          </h3>

          {documents.map((doc) => {
            const isSelected = doc.id === selectedDocId;
            return (
              <GlassCard
                key={doc.id}
                onClick={() => setSelectedDocId(doc.id)}
                glow={isSelected ? 'cyan' : 'none'}
                className={`transition-all ${isSelected ? 'border-[#00f2fe] bg-white/10' : 'opacity-80 hover:opacity-100'}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <FileText className="w-5 h-5 text-[#00f2fe] shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold text-white max-w-[180px] truncate">{doc.fileName}</h4>
                      <span className="text-[10px] text-gray-400">{doc.fileSize} • {doc.uploadDate}</span>
                    </div>
                  </div>

                  <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                    doc.parsedStatus === 'parsed' ? 'bg-[#10b981]/20 text-[#10b981]' : 'bg-[#f59e0b]/20 text-[#f59e0b]'
                  }`}>
                    {doc.parsedStatus === 'parsed' ? '✓ Analizado' : 'Pendiente'}
                  </span>
                </div>
              </GlassCard>
            );
          })}
        </div>

        {/* Right AI Extraction Inspector */}
        <GlassCard glow="violet" className="lg:col-span-2 space-y-4">
          {selectedDoc ? (
            <>
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <span className="text-xs text-gray-400">Documento Inspeccionado:</span>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    {selectedDoc.fileName}
                    <span className="text-xs px-2 py-0.5 rounded bg-white/10 text-gray-300 font-normal">
                      {selectedDoc.fileType}
                    </span>
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#10b981] font-bold flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4" /> OCR Validado por AI
                  </span>
                </div>
              </div>

              {/* Extracted Data Card */}
              {selectedDoc.extractedData && (
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-white border-b border-white/10 pb-2">
                    <span className="flex items-center gap-1.5 text-[#00f2fe]">
                      <Sparkles className="w-4 h-4" /> Extracción Inteligente AURA
                    </span>
                    <span>Monto Detectado: <strong className="text-white font-black text-sm">${selectedDoc.extractedData.totalAmount?.toFixed(2)} USD</strong></span>
                  </div>

                  <p className="text-xs text-gray-300 leading-relaxed">
                    {selectedDoc.extractedData.summaryText}
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs pt-1">
                    <div className="bg-black/30 p-2.5 rounded-xl border border-white/10">
                      <span className="text-[10px] text-gray-400 block">Proveedor / Entidad</span>
                      <span className="font-bold text-white">{selectedDoc.extractedData.vendorOrClient}</span>
                    </div>

                    <div className="bg-black/30 p-2.5 rounded-xl border border-white/10">
                      <span className="text-[10px] text-gray-400 block">Categoría Sugerida</span>
                      <span className="font-bold text-white capitalize">{selectedDoc.extractedData.suggestedCategory}</span>
                    </div>

                    <div className="bg-black/30 p-2.5 rounded-xl border border-white/10">
                      <span className="text-[10px] text-gray-400 block">Elegible Impuestos</span>
                      <span className="font-bold text-[#10b981]">
                        {selectedDoc.extractedData.isDeductible ? '✓ Sí Deducible' : 'No Deducible'}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Guided Step */}
              <div className="pt-2 flex items-center justify-between">
                <p className="text-xs text-gray-400">¿Deseas agregar este ítem extraído a tu contabilidad general?</p>
                <button
                  onClick={handleImportExtractedItem}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#00f2fe] via-[#7928ca] to-[#10b981] text-white font-bold text-xs shadow-[0_0_20px_rgba(0,242,254,0.3)] hover:scale-105 transition-all flex items-center gap-1.5"
                >
                  Confirmar e Importar <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-12 text-gray-400 text-xs">
              Selecciona o sube un documento para ver el informe de lectura OCR.
            </div>
          )}
        </GlassCard>

      </div>

    </div>
  );
};
