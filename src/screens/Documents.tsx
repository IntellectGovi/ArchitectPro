import React, { useState, useRef } from 'react';
import { Search, Bell, Settings, FileText, Download, Share2, Plus, Filter, LayoutGrid, List, Trash2, File, FileCode, FileImage, X, Cloud, MoreVertical } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';
import { cn } from '../lib/utils';
import { Document } from '../types';

export default function Documents() {
  const { documents, setDocuments, addNotification } = useApp();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedDocId, setSelectedDocId] = useState<string | null>(documents[0]?.id || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const selectedDoc = documents.find(d => d.id === selectedDocId) || documents[0];

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newDocs: Document[] = Array.from(files).map((file: any) => ({
      id: Math.random().toString(36).substring(2, 9),
      name: file.name,
      type: file.name.split('.').pop()?.toLowerCase() || 'file',
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      modifiedAt: 'Just now',
      category: 'Uncategorized',
      project: 'General'
    }));

    setDocuments(prev => [...newDocs, ...prev]);
    addNotification(`${files.length} document(s) uploaded`, 'success');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDelete = (id: string) => {
    setDocuments(prev => prev.filter(d => d.id !== id));
    if (selectedDocId === id) {
      setSelectedDocId(documents.find(d => d.id !== id)?.id || null);
    }
    addNotification('Document removed', 'info');
  };

  const handleDownload = (name: string) => {
    addNotification(`Downloading ${name}...`, 'info');
  };

  const handleShare = (name: string) => {
    addNotification(`Share link generated for ${name}`, 'success');
  };

  const getFileIcon = (type: string) => {
    const t = type.toLowerCase();
    if (t.includes('pdf')) return <FileText className="w-6 h-6 text-error" />;
    if (t.includes('png') || t.includes('jpg') || t.includes('jpeg')) return <FileImage className="w-6 h-6 text-tertiary" />;
    if (t.includes('ts') || t.includes('js') || t.includes('json') || t.includes('html')) return <FileCode className="w-6 h-6 text-primary" />;
    return <File className="w-6 h-6 text-on-surface-variant" />;
  };

  return (
    <main className="flex-1 flex flex-col lg:flex-row min-h-screen bg-surface overflow-hidden">
      {/* Document List Column */}
      <section className="flex-1 flex flex-col border-r border-outline-variant/10 overflow-hidden">
        <div className="p-4 md:p-8 overflow-y-auto custom-scrollbar h-full">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-on-surface">Repository</h2>
              <p className="text-sm text-on-surface-variant mt-1">Managing {documents.length} curated architectural assets</p>
            </div>
            <div className="flex items-center gap-2 md:gap-4">
              <div className="flex bg-surface-container-low p-1 rounded-lg border border-outline-variant/10">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={cn("px-3 py-1.5 rounded-md transition-all", viewMode === 'grid' ? "bg-surface-container-highest shadow-sm text-primary" : "text-on-surface-variant hover:text-on-surface")}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={cn("px-3 py-1.5 rounded-md transition-all", viewMode === 'list' ? "bg-surface-container-highest shadow-sm text-primary" : "text-on-surface-variant hover:text-on-surface")}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
              <input 
                type="file" 
                multiple 
                className="hidden" 
                ref={fileInputRef} 
                onChange={handleUpload}
              />
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="bg-primary text-on-primary px-4 py-2 rounded-lg font-bold flex items-center gap-2 shadow-lg shadow-primary/20 active:scale-95 transition-all text-sm"
              >
                <Plus className="w-4 h-4" />
                Upload
              </button>
            </div>
          </div>

          {/* Bento Style Categories */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            <div className="bg-surface-container rounded-xl p-4 md:p-5 hover:bg-surface-container-high transition-colors cursor-pointer group">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-primary-container/10 rounded-lg flex items-center justify-center text-primary mb-3 md:mb-4 group-hover:scale-110 transition-transform">
                <FileText className="w-4 h-4 md:w-5 md:h-5" />
              </div>
              <p className="text-on-surface font-bold text-sm md:text-base">Blueprints</p>
              <p className="text-[10px] text-on-surface-variant uppercase tracking-widest mt-1">{documents.filter(d => d.type === 'pdf').length} Files</p>
            </div>
            <div className="bg-surface-container rounded-xl p-4 md:p-5 hover:bg-surface-container-high transition-colors cursor-pointer group">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-tertiary/10 rounded-lg flex items-center justify-center text-tertiary mb-3 md:mb-4 group-hover:scale-110 transition-transform">
                <FileImage className="w-4 h-4 md:w-5 md:h-5" />
              </div>
              <p className="text-on-surface font-bold text-sm md:text-base">Renders</p>
              <p className="text-[10px] text-on-surface-variant uppercase tracking-widest mt-1">{documents.filter(d => ['png', 'jpg', 'jpeg'].includes(d.type)).length} Files</p>
            </div>
            <div className="col-span-2 bg-gradient-to-br from-surface-container to-[#1a233a] rounded-xl p-4 md:p-5 border border-primary/5">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-on-surface font-bold text-base md:text-lg">Storage Cloud</p>
                  <p className="text-xs md:text-sm text-on-surface-variant">84% of 1TB utilized</p>
                </div>
                <Cloud className="text-primary w-4 h-4 md:w-5 md:h-5" />
              </div>
              <div className="mt-4 h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '84%' }}
                  className="h-full bg-primary"
                ></motion.div>
              </div>
            </div>
          </div>

          {/* Recent Files List */}
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-on-surface-variant/60 mb-4">Recent Documents</h3>
          <div className={cn(
            "space-y-1",
            viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 space-y-0" : ""
          )}>
            <AnimatePresence mode="popLayout">
              {documents.map((doc) => (
                <motion.div 
                  key={doc.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  onClick={() => setSelectedDocId(doc.id)}
                  className={cn(
                    "flex items-center p-4 rounded-xl group cursor-pointer transition-all hover:bg-surface-container",
                    selectedDocId === doc.id ? "bg-surface-container-low border-l-2 border-primary shadow-md" : "bg-surface-container/30",
                    viewMode === 'grid' ? "flex-col items-start gap-4" : ""
                  )}
                >
                  <div className={cn(
                    "w-12 h-12 bg-surface-container-highest rounded-lg flex items-center justify-center",
                    selectedDocId === doc.id ? "text-primary" : "text-on-surface-variant",
                    viewMode === 'grid' ? "w-full aspect-video h-auto" : "mr-4"
                  )}>
                    {getFileIcon(doc.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-on-surface font-medium truncate">{doc.name}</h4>
                    <p className="text-xs text-on-surface-variant">Modified {doc.lastModified} • {doc.size}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleDelete(doc.id); }}
                      className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-error/20 text-on-surface-variant hover:text-error rounded transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <MoreVertical className="w-4 h-4 text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Details Sidebar */}
      <AnimatePresence mode="wait">
        {selectedDoc && (
          <motion.aside 
            key={selectedDoc.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="fixed inset-y-0 right-0 z-[60] w-full sm:w-96 bg-surface-container-low p-8 flex flex-col overflow-y-auto custom-scrollbar shadow-[-12px_0_24px_rgba(0,0,0,0.2)] lg:relative lg:inset-auto lg:z-0 lg:shadow-none lg:border-l lg:border-outline-variant/10"
          >
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-bold text-on-surface">Document Intel</h3>
              <button 
                onClick={() => setSelectedDocId(null)}
                className="text-on-surface-variant hover:text-on-surface transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Document Preview Card */}
            <div className="rounded-2xl overflow-hidden bg-surface-container shadow-xl mb-8 relative aspect-[4/3] group">
              <div className="absolute inset-0 flex items-center justify-center bg-surface-container-highest">
                {React.cloneElement(getFileIcon(selectedDoc.type) as React.ReactElement, { className: 'w-16 h-16 opacity-20' })}
              </div>
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWAVtr-QabGLj0SGV745LkeFiEXUQpowvEMNE1qLYrs8QAnWU9A8_JYvh-mfWs7ewhmyq8ykrs48_nkCksHWo0IQcs3vPu8vR7yEQaS8VfVp_NIsGI70T78qSrW5DNgstP13n9z_WuVlUSjTQsr6zRJKqefBQRziXJGJ3zjo-AnvRTk2mffCdHI3uZ-6q2FMClHaCUP7O7ENsn81WiZ5KY8MUb1xonacQS3aXRW-7TM4nVqroFwdCrT-V0JA_cLx-iSYWji4QWGtc" 
                className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700"
                alt="Preview"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent flex items-end p-6">
                <div>
                  <p className="text-primary font-bold text-sm tracking-widest uppercase">{selectedDoc.category}</p>
                  <h4 className="text-white text-xl font-bold truncate max-w-[200px]">{selectedDoc.name}</h4>
                </div>
              </div>
            </div>

            {/* Meta Data Grid */}
            <div className="space-y-6">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant/60 block mb-2">Technical Details</label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-surface-container p-3 rounded-lg">
                    <p className="text-[10px] text-on-surface-variant uppercase mb-1">Extension</p>
                    <p className="text-sm font-medium text-on-surface">{selectedDoc.type.toUpperCase()}</p>
                  </div>
                  <div className="bg-surface-container p-3 rounded-lg">
                    <p className="text-[10px] text-on-surface-variant uppercase mb-1">Size</p>
                    <p className="text-sm font-medium text-on-surface">{selectedDoc.size}</p>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant/60 block mb-2">Contributors</label>
                <div className="flex -space-x-2">
                  {[1, 2, 3].map(i => (
                    <img 
                      key={i}
                      src={`https://i.pravatar.cc/150?u=${i + 10}`}
                      alt="Contributor" 
                      className="w-8 h-8 rounded-full border-2 border-surface-container-low"
                      referrerPolicy="no-referrer"
                    />
                  ))}
                  <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center text-[10px] font-bold border-2 border-surface-container-low">+4</div>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant/60 block mb-2">Audit Log</label>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5"></div>
                    <div>
                      <p className="text-xs text-on-surface">Uploaded to Repository</p>
                      <p className="text-[10px] text-on-surface-variant">{selectedDoc.lastModified}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 grid grid-cols-2 gap-3">
                <button 
                  onClick={() => handleShare(selectedDoc.name)}
                  className="bg-primary/10 text-primary font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-primary/20 transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  <span className="text-xs uppercase tracking-widest">Share</span>
                </button>
                <button 
                  onClick={() => handleDownload(selectedDoc.name)}
                  className="bg-gradient-to-br from-primary-container to-primary text-on-primary-container font-bold py-3 rounded-lg flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
                >
                  <Download className="w-4 h-4" />
                  <span className="text-xs uppercase tracking-widest">Get</span>
                </button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </main>
  );
}
