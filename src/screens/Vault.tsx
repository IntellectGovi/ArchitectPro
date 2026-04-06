import React, { useState, useMemo } from 'react';
import { Key, Copy, RefreshCw, CreditCard, Cloud, Briefcase, Shield, Plus, X, Trash2, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';
import { cn } from '../lib/utils';
import { VaultItem } from '../types';

export default function Vault() {
  const { vaultItems, setVaultItems, addNotification } = useApp();
  const [password, setPassword] = useState('7xK-9pQ!2m-VwZ');
  const [passLength, setPassLength] = useState(16);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>({});
  const [promptingId, setPromptingId] = useState<string | null>(null);
  const [promptPassword, setPromptPassword] = useState('');

  const [newItem, setNewItem] = useState<Partial<VaultItem>>({
    name: '',
    email: '',
    category: 'financial',
    password: '',
    logo: 'https://cdn-icons-png.flaticon.com/512/281/281764.png'
  });
  
  const generatePassword = () => {
    let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeNumbers) chars += "0123456789";
    if (includeSymbols) chars += "!@#$%^&*()_+";
    
    let newPass = "";
    for (let i = 0; i < passLength; i++) {
      newPass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(newPass);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    addNotification('Copied to clipboard', 'success');
  };

  const handleSaveItem = () => {
    if (!newItem.name || !newItem.email) return;
    const item: VaultItem = {
      ...newItem,
      id: Math.random().toString(36).substring(2, 9),
      lastUsed: 'Just now',
    } as VaultItem;
    setVaultItems(prev => [item, ...prev]);
    setIsAddingItem(false);
    setNewItem({ name: '', email: '', category: 'financial', password: '', logo: 'https://cdn-icons-png.flaticon.com/512/281/281764.png' });
    addNotification('New vault entry created', 'success');
  };

  const deleteItem = (id: string) => {
    setVaultItems(prev => prev.filter(i => i.id !== id));
    addNotification('Vault entry removed', 'info');
  };

  const toggleShowPassword = (id: string) => {
    if (showPasswords[id]) {
      setShowPasswords(prev => ({ ...prev, [id]: false }));
    } else {
      setPromptingId(id);
      setPromptPassword('');
    }
  };

  const handleVerifyPassword = () => {
    // For demo purposes, we'll check against 'admin123'
    if (promptPassword === 'admin123' || promptPassword === 'password') {
      if (promptingId) {
        setShowPasswords(prev => ({ ...prev, [promptingId]: true }));
        setPromptingId(null);
        addNotification('Identity verified', 'success');
      }
    } else {
      addNotification('Incorrect security key. Try "admin123"', 'error');
    }
  };

  const categories = [
    { id: 'financial', name: 'Financial', icon: CreditCard },
    { id: 'cloud', name: 'Cloud Services', icon: Cloud },
    { id: 'enterprise', name: 'Enterprise', icon: Briefcase },
    { id: 'secure-notes', name: 'Secure Notes', icon: Shield },
    { id: 'development', name: 'Development', icon: Key },
  ];

  const filteredItems = useMemo(() => {
    if (!activeCategory) return vaultItems;
    return vaultItems.filter(item => item.category === activeCategory);
  }, [vaultItems, activeCategory]);

  return (
    <div className="p-10 max-w-7xl mx-auto space-y-12">
      <section className="flex flex-col md:flex-row justify-between items-end gap-6">
        <div className="space-y-2">
          <h2 className="text-5xl font-extrabold tracking-tighter text-on-surface italic">The Digital Sanctuary</h2>
          <p className="text-on-surface-variant max-w-lg">Your architectural stronghold for digital identities and cryptographic keys. Quiet. Secure. Precise.</p>
        </div>
        <button 
          onClick={() => setIsAddingItem(true)}
          className="bg-primary text-on-primary px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-primary/20 active:scale-95 transition-all"
        >
          <Plus className="w-5 h-5" />
          New Entry
        </button>
      </section>

      <div className="grid grid-cols-12 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="col-span-12 lg:col-span-8 bg-surface-container p-8 rounded-xl relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-8 text-primary/10">
            <Key className="w-32 h-32" />
          </div>
          <div className="relative z-10 space-y-6">
            <div className="space-y-1">
              <span className="text-tertiary font-bold uppercase tracking-widest text-xs">Security Pulse</span>
              <h3 className="text-2xl font-bold text-on-surface">Cryptographic Generator</h3>
            </div>
            <div className="flex items-center gap-4 bg-surface-container-lowest p-6 rounded-lg border border-outline-variant/10">
              <span className="text-3xl font-mono text-primary font-light tracking-widest flex-1 truncate">{password}</span>
              <button 
                onClick={() => handleCopy(password)}
                className="bg-surface-bright text-on-surface p-3 rounded-lg hover:bg-primary hover:text-on-primary transition-all"
              >
                <Copy className="w-5 h-5" />
              </button>
              <button 
                onClick={generatePassword}
                className="bg-surface-bright text-on-surface p-3 rounded-lg hover:bg-tertiary hover:text-on-tertiary transition-all"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-xs text-on-surface-variant uppercase tracking-widest font-bold">Length: {passLength}</label>
                </div>
                <input 
                  type="range" 
                  min="8" 
                  max="32" 
                  value={passLength} 
                  onChange={(e) => setPassLength(parseInt(e.target.value))}
                  className="w-full accent-primary bg-surface-container-highest h-1.5 rounded-full appearance-none cursor-pointer"
                />
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setIncludeSymbols(!includeSymbols)}
                  className={cn(
                    "w-10 h-6 rounded-full relative p-1 transition-colors",
                    includeSymbols ? "bg-primary-container" : "bg-surface-container-highest"
                  )}
                >
                  <motion.div 
                    animate={{ x: includeSymbols ? 16 : 0 }}
                    className={cn("w-4 h-4 rounded-full", includeSymbols ? "bg-on-primary-container" : "bg-on-surface-variant")}
                  />
                </button>
                <span className="text-sm font-medium">Symbols</span>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setIncludeNumbers(!includeNumbers)}
                  className={cn(
                    "w-10 h-6 rounded-full relative p-1 transition-colors",
                    includeNumbers ? "bg-primary-container" : "bg-surface-container-highest"
                  )}
                >
                  <motion.div 
                    animate={{ x: includeNumbers ? 16 : 0 }}
                    className={cn("w-4 h-4 rounded-full", includeNumbers ? "bg-on-primary-container" : "bg-on-surface-variant")}
                  />
                </button>
                <span className="text-sm font-medium">Numbers</span>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="col-span-12 lg:col-span-4 bg-surface-container-low p-8 rounded-xl flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-on-surface">Categories</h3>
            {activeCategory && (
              <button onClick={() => setActiveCategory(null)} className="text-[10px] text-primary font-bold uppercase">Clear</button>
            )}
          </div>
          <div className="flex flex-col gap-2">
            {categories.map(cat => (
              <button 
                key={cat.id} 
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "group flex items-center justify-between p-4 rounded-lg transition-all",
                  activeCategory === cat.id ? "bg-primary/20 border-l-2 border-primary" : "bg-surface-container hover:bg-primary-container/20"
                )}
              >
                <div className="flex items-center gap-4">
                  <cat.icon className={cn("w-5 h-5", activeCategory === cat.id ? "text-primary" : "text-on-surface-variant group-hover:text-primary")} />
                  <span className={cn("font-medium", activeCategory === cat.id ? "text-primary" : "text-on-surface")}>{cat.name}</span>
                </div>
                <span className="text-xs font-bold text-on-surface-variant">{vaultItems.filter(i => i.category === cat.id).length} Items</span>
              </button>
            ))}
          </div>
        </div>

        <div className="col-span-12 bg-surface p-0">
          <div className="flex items-baseline justify-between mb-8">
            <h3 className="text-2xl font-bold italic tracking-tight">
              {activeCategory ? `${categories.find(c => c.id === activeCategory)?.name} Records` : 'Recent Manifestations'}
            </h3>
            <button className="text-primary text-sm font-bold uppercase tracking-widest hover:underline">View All Records</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <motion.div 
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  whileHover={{ y: -5 }}
                  className="bg-surface-container border-l-4 border-primary p-6 hover:bg-surface-container-high transition-colors group cursor-pointer relative"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-12 h-12 bg-surface-container-highest rounded-lg flex items-center justify-center overflow-hidden">
                      <img src={item.logo} alt={item.name} className="w-8 h-8 object-contain" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex gap-2">
                      <span className="text-[10px] bg-tertiary/20 text-tertiary px-2 py-1 rounded font-black uppercase">{item.category}</span>
                      <button 
                        onClick={(e) => { e.stopPropagation(); deleteItem(item.id); }}
                        className="opacity-0 group-hover:opacity-100 p-1 hover:text-error transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="space-y-1 mb-6">
                    <h4 className="font-bold text-lg">{item.name}</h4>
                    <p className="text-sm text-on-surface-variant">{item.email}</p>
                  </div>
                  <div className="flex items-center justify-between gap-2 bg-surface-container-lowest p-3 rounded-lg border border-outline-variant/10">
                    <span className="text-xs font-mono text-primary truncate flex-1">
                      {showPasswords[item.id] ? (item.password || '••••••••') : '••••••••'}
                    </span>
                    <div className="flex gap-1">
                      <button 
                        onClick={(e) => { e.stopPropagation(); toggleShowPassword(item.id); }}
                        className="p-1.5 hover:bg-surface-container-highest rounded transition-colors"
                      >
                        {showPasswords[item.id] ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleCopy(item.password || ''); }}
                        className="p-1.5 hover:bg-surface-container-highest rounded transition-colors"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Add Entry Modal */}
      <AnimatePresence>
        {isAddingItem && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddingItem(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-surface-container-high rounded-[2.5rem] p-10 shadow-2xl border border-white/5"
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-black text-on-surface tracking-tighter italic">New Vault Entry</h3>
                <button onClick={() => setIsAddingItem(false)} className="p-2 hover:bg-surface-container-highest rounded-full transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Service Name</label>
                  <input 
                    type="text"
                    value={newItem.name}
                    onChange={e => setNewItem(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g. Netflix, AWS, etc."
                    className="w-full bg-surface-container-lowest border-none rounded-xl p-4 text-on-surface placeholder:text-on-surface-variant/30 focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Email / Username</label>
                  <input 
                    type="text"
                    value={newItem.email}
                    onChange={e => setNewItem(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full bg-surface-container-lowest border-none rounded-xl p-4 text-on-surface focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Category</label>
                    <select 
                      value={newItem.category}
                      onChange={e => setNewItem(prev => ({ ...prev, category: e.target.value as any }))}
                      className="w-full bg-surface-container-lowest border-none rounded-xl p-4 text-on-surface focus:ring-2 focus:ring-primary/50 transition-all"
                    >
                      {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Password</label>
                    <div className="relative">
                      <input 
                        type="text"
                        value={newItem.password}
                        onChange={e => setNewItem(prev => ({ ...prev, password: e.target.value }))}
                        className="w-full bg-surface-container-lowest border-none rounded-xl p-4 pr-12 text-on-surface focus:ring-2 focus:ring-primary/50 transition-all"
                      />
                      <button 
                        onClick={() => {
                          let c = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
                          let p = "";
                          for (let i = 0; i < 12; i++) p += c.charAt(Math.floor(Math.random() * c.length));
                          setNewItem(prev => ({ ...prev, password: p }));
                        }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-primary/20 text-primary rounded transition-colors"
                      >
                        <RefreshCw className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={handleSaveItem}
                  className="w-full py-4 bg-primary text-on-primary rounded-xl font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all mt-4"
                >
                  Encrypt & Save
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Security Verification Modal */}
      <AnimatePresence>
        {promptingId && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPromptingId(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-surface-container-high rounded-[2rem] p-8 shadow-2xl border border-primary/20"
            >
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Shield className="text-primary w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-on-surface">Security Verification</h3>
                <p className="text-sm text-on-surface-variant">Please enter your master security key to reveal this credential.</p>
                
                <input 
                  type="password"
                  autoFocus
                  value={promptPassword}
                  onChange={e => setPromptPassword(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleVerifyPassword()}
                  placeholder="Enter Security Key"
                  className="w-full bg-surface-container-lowest border-none rounded-xl p-4 text-center text-lg tracking-widest focus:ring-2 focus:ring-primary/50 transition-all"
                />
                
                <div className="flex gap-3 pt-4">
                  <button 
                    onClick={() => setPromptingId(null)}
                    className="flex-1 py-3 rounded-xl bg-surface-container-highest text-on-surface font-bold text-sm"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleVerifyPassword}
                    className="flex-1 py-3 rounded-xl bg-primary text-on-primary font-bold text-sm shadow-lg shadow-primary/20"
                  >
                    Verify
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
