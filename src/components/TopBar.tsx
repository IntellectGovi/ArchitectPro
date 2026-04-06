import React, { useState } from 'react';
import { Search, Bell, User, Settings, LogOut, Shield, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';
import { cn } from '../lib/utils';

export default function TopBar() {
  const { setActiveScreen, userProfile } = useApp();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="h-20 bg-surface-container-low border-b border-outline-variant/10 px-4 md:px-8 flex items-center justify-end z-40 sticky top-0 backdrop-blur-xl">
      <div className="flex items-center gap-6">
        <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-low text-on-surface-variant text-[10px] font-bold uppercase tracking-widest border border-outline-variant/10">
          <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
          Architect Mode
        </div>
        
        <div className="w-px h-6 bg-outline-variant/10 hidden md:block"></div>
        
        <div className="relative">
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-3 p-1.5 hover:bg-surface-container-highest rounded-full transition-all active:scale-95 group"
          >
            <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center overflow-hidden group-hover:border-primary/50 transition-all">
              <img 
                src={userProfile.avatar || 'https://picsum.photos/seed/architect/64/64'} 
                alt="User profile" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="hidden md:block text-left">
              <p className="text-xs font-black text-on-surface leading-tight">{userProfile.name}</p>
              <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest">Lead Architect</p>
            </div>
            <ChevronDown className={cn("w-4 h-4 text-on-surface-variant transition-transform", isProfileOpen && "rotate-180")} />
          </button>

          <AnimatePresence>
            {isProfileOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)} />
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-56 bg-surface-container-high rounded-2xl shadow-2xl border border-outline-variant/10 p-2 z-50"
                >
                  <div className="p-4 border-b border-outline-variant/10 mb-2">
                    <p className="text-xs font-black text-on-surface">Architect Pro</p>
                    <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest mt-1">Enterprise Edition</p>
                  </div>
                  
                  <button 
                    onClick={() => { setActiveScreen('profile'); setIsProfileOpen(false); }}
                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-surface-container-highest text-on-surface transition-colors"
                  >
                    <User className="w-4 h-4 text-primary" />
                    <span className="text-xs font-bold">Profile Settings</span>
                  </button>
                  <button 
                    onClick={() => { setActiveScreen('security'); setIsProfileOpen(false); }}
                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-surface-container-highest text-on-surface transition-colors"
                  >
                    <Shield className="w-4 h-4 text-tertiary" />
                    <span className="text-xs font-bold">Security Vault</span>
                  </button>
                  <button 
                    onClick={() => { setActiveScreen('preferences'); setIsProfileOpen(false); }}
                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-surface-container-highest text-on-surface transition-colors"
                  >
                    <Settings className="w-4 h-4 text-on-surface-variant" />
                    <span className="text-xs font-bold">Preferences</span>
                  </button>
                  
                  <div className="h-px bg-outline-variant/10 my-2" />
                  
                  <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-error/10 text-error transition-colors">
                    <LogOut className="w-4 h-4" />
                    <span className="text-xs font-bold">Sign Out</span>
                  </button>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
