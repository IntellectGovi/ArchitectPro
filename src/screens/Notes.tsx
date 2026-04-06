import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, Settings, Bold, Italic, List, Image as ImageIcon, Link as LinkIcon, Clock, History, Quote, GripVertical, Plus, Trash2, Save, Edit, Sparkles, FileUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';
import { cn } from '../lib/utils';
import { Note } from '../types';

export default function Notes() {
  const { notes, setNotes, addNotification } = useApp();
  const [activeNoteId, setActiveNoteId] = useState(notes[0]?.id);
  const [isEditing, setIsEditing] = useState(false);
  const [isAiProcessing, setIsAiProcessing] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const activeNote = notes.find(n => n.id === activeNoteId) || notes[0];

  useEffect(() => {
    if (editorRef.current && !isEditing) {
      editorRef.current.innerHTML = activeNote.content;
    }
  }, [activeNoteId, isEditing, activeNote.content]);

  const handleCreateNote = () => {
    const newNote: Note = {
      id: Math.random().toString(36).substring(2, 9),
      title: 'Untitled Manifesto',
      content: 'Start writing your architectural vision...',
      status: 'draft',
      lastEdited: 'Just now',
      tags: ['New']
    };
    setNotes(prev => [newNote, ...prev]);
    setActiveNoteId(newNote.id);
    setIsEditing(true);
    addNotification('New note created', 'success');
  };

  const handleUpdateNote = (updates: Partial<Note>) => {
    setNotes(prev => prev.map(n => n.id === activeNoteId ? { ...n, ...updates, lastEdited: 'Just now' } : n));
  };

  const handleSave = () => {
    if (editorRef.current) {
      handleUpdateNote({ content: editorRef.current.innerHTML });
    }
    setIsEditing(false);
    addNotification('Note saved successfully', 'success');
  };

  const execCommand = (command: string, value: string = '') => {
    if (!isEditing) setIsEditing(true);
    setTimeout(() => {
      document.execCommand(command, false, value);
      if (editorRef.current) editorRef.current.focus();
    }, 0);
  };

  const handleImageUpload = () => {
    const url = prompt('Enter image URL:');
    if (url) execCommand('insertImage', url);
  };

  const handleLink = () => {
    const url = prompt('Enter URL:');
    if (url) execCommand('createLink', url);
  };

  const handleAiSyncClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsAiProcessing(true);
    addNotification(`Analyzing ${file.name}...`, 'info');

    // Simulate AI processing
    setTimeout(() => {
      const aiContent = `
        <div class="ai-insight p-4 bg-tertiary/10 border-l-4 border-tertiary rounded-r-xl my-6">
          <h2 class="text-tertiary font-black uppercase tracking-widest text-xs mb-2">AI Generated Insights from ${file.name}</h2>
          <p class="text-sm font-bold mb-2">Based on your architectural document, here are the key takeaways:</p>
          <ul class="list-disc pl-5 space-y-1 text-sm">
            <li><strong>Structural Integrity:</strong> The proposed cantilever design requires high-tension steel reinforcement.</li>
            <li><strong>Materiality:</strong> Consider using recycled polymer concrete for the facade to reduce carbon footprint.</li>
            <li><strong>Spatial Flow:</strong> The transition between the atrium and the gallery needs more natural light.</li>
          </ul>
          <p class="text-[10px] italic mt-2">Updated via Architect AI Engine</p>
        </div>
      `;
      if (editorRef.current) {
        editorRef.current.innerHTML += aiContent;
        handleSave();
      }
      setIsAiProcessing(false);
      addNotification('AI has analyzed your document and updated the note', 'success');
      if (fileInputRef.current) fileInputRef.current.value = '';
    }, 2500);
  };

  const handleDeleteNote = (id: string) => {
    if (notes.length <= 1) {
      addNotification('Cannot delete the last note', 'error');
      return;
    }
    setNotes(prev => prev.filter(n => n.id !== id));
    if (activeNoteId === id) {
      const nextNote = notes.find(n => n.id !== id);
      setActiveNoteId(nextNote?.id);
    }
    addNotification('Note removed', 'info');
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row overflow-hidden h-full">
      {/* Notes Sidebar (Library) */}
      <section className={cn(
        "w-full lg:w-80 bg-surface-container-low flex flex-col overflow-hidden border-r border-outline-variant/10 transition-all",
        activeNoteId && "hidden lg:flex"
      )}>
        <div className="p-6 flex flex-col h-full">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-primary">Recent Records</h2>
            <button 
              onClick={handleCreateNote}
              className="p-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-3 custom-scrollbar overflow-y-auto flex-1 pr-2">
            {notes.map((note) => (
              <div 
                key={note.id}
                onClick={() => setActiveNoteId(note.id)}
                className={cn(
                  "p-4 rounded-xl cursor-pointer transition-all duration-300 group relative",
                  activeNoteId === note.id 
                    ? "bg-surface-container-highest border-l-2 border-primary shadow-lg" 
                    : "hover:bg-surface-container"
                )}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className={cn(
                    "px-2 py-0.5 text-[10px] font-black uppercase tracking-widest rounded-sm",
                    note.status === 'active' ? "bg-tertiary/10 text-tertiary" : "text-on-surface-variant/40"
                  )}>
                    {note.status}
                  </span>
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleDeleteNote(note.id); }}
                    className="opacity-0 group-hover:opacity-100 p-1 hover:text-error transition-all"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
                <h3 className={cn(
                  "font-bold text-sm mb-1 transition-colors",
                  activeNoteId === note.id ? "text-on-surface" : "text-on-surface-variant group-hover:text-on-surface"
                )}>{note.title}</h3>
                <p className={cn(
                  "text-xs line-clamp-2 leading-relaxed",
                  activeNoteId === note.id ? "text-on-surface-variant" : "text-on-surface-variant/60"
                )} dangerouslySetInnerHTML={{ __html: note.content.substring(0, 100) }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Editor Section */}
      <section className={cn(
        "flex-1 bg-surface-container-lowest p-4 md:p-8 flex flex-col overflow-hidden relative",
        !activeNoteId && "hidden lg:flex"
      )}>
        {/* Back button for mobile */}
        <button 
          onClick={() => setActiveNoteId(undefined as any)}
          className="lg:hidden mb-4 text-primary font-bold text-xs uppercase tracking-widest flex items-center gap-2"
        >
          ← Back to Library
        </button>

        {/* Floating Editor Toolbar */}
        <div className="flex flex-wrap items-center gap-2 bg-surface-container-high/80 backdrop-blur-md p-2 rounded-xl border border-outline-variant/10 shadow-xl z-10 mb-6 lg:absolute lg:top-8 lg:right-8 lg:mb-0">
          <button 
            onClick={() => execCommand('bold')}
            className="p-2 hover:bg-primary/20 text-on-surface-variant hover:text-primary rounded transition-colors"
            title="Bold"
          >
            <Bold className="w-4.5 h-4.5" />
          </button>
          <button 
            onClick={() => execCommand('italic')}
            className="p-2 hover:bg-primary/20 text-on-surface-variant hover:text-primary rounded transition-colors"
            title="Italic"
          >
            <Italic className="w-4.5 h-4.5" />
          </button>
          <button 
            onClick={() => execCommand('insertUnorderedList')}
            className="p-2 hover:bg-primary/20 text-on-surface-variant hover:text-primary rounded transition-colors"
            title="Bullet Points"
          >
            <List className="w-4.5 h-4.5" />
          </button>
          <div className="w-[1px] h-4 bg-outline-variant/20 mx-1"></div>
          <button 
            onClick={handleImageUpload}
            className="p-2 hover:bg-primary/20 text-on-surface-variant hover:text-primary rounded transition-colors"
            title="Insert Image"
          >
            <ImageIcon className="w-4.5 h-4.5" />
          </button>
          <button 
            onClick={handleLink}
            className="p-2 hover:bg-primary/20 text-on-surface-variant hover:text-primary rounded transition-colors"
            title="Insert Link"
          >
            <LinkIcon className="w-4.5 h-4.5" />
          </button>
          <div className="w-[1px] h-4 bg-outline-variant/20 mx-1"></div>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            className="hidden" 
            accept=".pdf,.doc,.docx,.txt"
          />
          <button 
            onClick={handleAiSyncClick}
            disabled={isAiProcessing}
            className={cn(
              "p-2 rounded transition-all flex items-center gap-2",
              isAiProcessing ? "bg-tertiary/20 text-tertiary animate-pulse" : "hover:bg-tertiary/20 text-tertiary"
            )}
            title="AI Document Analysis"
          >
            <Sparkles className="w-4.5 h-4.5" />
            <span className="text-[10px] font-black uppercase hidden sm:inline">AI Sync</span>
          </button>
          <div className="w-[1px] h-4 bg-outline-variant/20 mx-1"></div>
          <button 
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            className={cn(
              "p-2 rounded transition-colors flex items-center gap-2",
              isEditing ? "bg-primary text-on-primary" : "hover:bg-primary/20 text-on-surface-variant hover:text-primary"
            )}
          >
            {isEditing ? <Save className="w-4.5 h-4.5" /> : <Edit className="w-4.5 h-4.5" />}
            <span className="text-[10px] font-black uppercase hidden sm:inline">{isEditing ? 'Save' : 'Edit'}</span>
          </button>
        </div>

        <div className="max-w-3xl mx-auto w-full h-full flex flex-col">
          {/* Document Header */}
          <div className="mb-8 lg:mb-12">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Manifesto Series 01</span>
              <div className="h-[1px] w-12 bg-primary/30"></div>
            </div>
            {isEditing ? (
              <input 
                type="text"
                value={activeNote.title}
                onChange={e => handleUpdateNote({ title: e.target.value })}
                className="w-full bg-transparent border-none text-3xl md:text-5xl font-black tracking-tighter text-on-surface mb-6 leading-tight focus:ring-0 p-0"
              />
            ) : (
              <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-on-surface mb-6 leading-tight">{activeNote.title}</h1>
            )}
            <div className="flex flex-wrap items-center gap-4 lg:gap-6 text-on-surface-variant/50 text-[10px] md:text-xs font-medium">
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> Reading time: {Math.ceil(activeNote.content.replace(/<[^>]*>/g, '').split(' ').length / 200)} min</span>
              <span className="flex items-center gap-1"><History className="w-3.5 h-3.5" /> Last edited {activeNote.lastEdited}</span>
            </div>
          </div>

          {/* Editor Content */}
          <div className="flex-1 custom-scrollbar overflow-y-auto pr-2 lg:pr-6">
            <div className="space-y-8 pb-20">
              <div className="relative group">
                <div className="absolute -left-6 top-1 opacity-0 group-hover:opacity-100 transition-opacity hidden lg:block">
                  <GripVertical className="w-4 h-4 text-on-surface-variant/30" />
                </div>
                <div 
                  ref={editorRef}
                  contentEditable={isEditing}
                  className={cn(
                    "w-full bg-transparent border-none text-lg md:text-xl font-light text-on-surface-variant leading-relaxed focus:ring-0 p-0 min-h-[300px] outline-none prose prose-invert max-w-none",
                    isEditing ? "cursor-text" : "cursor-default"
                  )}
                  onBlur={() => {
                    if (isEditing && editorRef.current) {
                      handleUpdateNote({ content: editorRef.current.innerHTML });
                    }
                  }}
                  dangerouslySetInnerHTML={{ __html: activeNote.content }}
                />
              </div>

              {activeNote.id === '1' && !isEditing && activeNote.content.length < 500 && (
                <div className="opacity-50 pointer-events-none">
                  <div className="grid grid-cols-2 gap-4 py-4">
                    <div className="aspect-[4/5] rounded-tl-[3rem] rounded-br-[3rem] overflow-hidden bg-surface-container shadow-2xl relative">
                      <img 
                        src="https://picsum.photos/seed/arch1/800/1000" 
                        alt="Modern minimalist architecture" 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="aspect-[4/5] rounded-tr-[3rem] rounded-bl-[3rem] overflow-hidden bg-surface-container shadow-2xl relative">
                      <img 
                        src="https://picsum.photos/seed/arch2/800/1000" 
                        alt="Minimalist stairs" 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
