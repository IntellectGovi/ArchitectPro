import React, { useState } from 'react';
import { Settings, Moon, Sun, Bell, Layout, Globe, Save, Palette } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { motion } from 'motion/react';

export default function Preferences() {
  const { preferences, setPreferences, addNotification } = useApp();

  const togglePreference = (key: keyof typeof preferences) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
    addNotification('Preference updated', 'success');
  };

  return (
    <div className="p-4 md:p-10 max-w-4xl mx-auto space-y-12">
      <section className="space-y-2">
        <h2 className="text-4xl font-black tracking-tighter text-on-surface italic">System Preferences</h2>
        <p className="text-on-surface-variant">Customize your architectural environment and digital workflow.</p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Appearance Section */}
        <div className="bg-surface-container rounded-[2rem] p-8 border border-outline-variant/10 space-y-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-xl text-primary">
              <Palette className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-on-surface">Appearance</h3>
          </div>
          <p className="text-xs text-on-surface-variant leading-relaxed">Choose your visual aesthetic. Dark mode is optimized for architectural focus.</p>
          
          <div className="flex gap-4">
            <button 
              onClick={() => setPreferences(prev => ({ ...prev, theme: 'dark' }))}
              className={`flex-1 p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 ${preferences.theme === 'dark' ? 'border-primary bg-primary/10' : 'border-outline-variant/20 bg-surface-container-lowest'}`}
            >
              <Moon className={`w-8 h-8 ${preferences.theme === 'dark' ? 'text-primary' : 'text-on-surface-variant'}`} />
              <span className="text-xs font-black uppercase tracking-widest">Dark Mode</span>
            </button>
            <button 
              onClick={() => setPreferences(prev => ({ ...prev, theme: 'light' }))}
              className={`flex-1 p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 ${preferences.theme === 'light' ? 'border-primary bg-primary/10' : 'border-outline-variant/20 bg-surface-container-lowest'}`}
            >
              <Sun className={`w-8 h-8 ${preferences.theme === 'light' ? 'text-primary' : 'text-on-surface-variant'}`} />
              <span className="text-xs font-black uppercase tracking-widest">Light Mode</span>
            </button>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="bg-surface-container rounded-[2rem] p-8 border border-outline-variant/10 space-y-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-tertiary/10 rounded-xl text-tertiary">
              <Bell className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-on-surface">Notifications</h3>
          </div>
          <p className="text-xs text-on-surface-variant leading-relaxed">Manage how the system communicates with you. Top-center alerts are enabled by default.</p>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-surface-container-lowest rounded-xl">
              <span className="text-sm font-bold">System Alerts</span>
              <button 
                onClick={() => togglePreference('notificationsEnabled')}
                className={`w-12 h-6 rounded-full p-1 transition-colors ${preferences.notificationsEnabled ? 'bg-primary' : 'bg-surface-container-highest'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${preferences.notificationsEnabled ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
            </div>
            <div className="flex items-center justify-between p-4 bg-surface-container-lowest rounded-xl">
              <span className="text-sm font-bold">Sound Effects</span>
              <button 
                onClick={() => togglePreference('soundEnabled')}
                className={`w-12 h-6 rounded-full p-1 transition-colors ${preferences.soundEnabled ? 'bg-primary' : 'bg-surface-container-highest'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${preferences.soundEnabled ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Language Section */}
        <div className="md:col-span-2 bg-surface-container rounded-[2rem] p-8 border border-outline-variant/10 space-y-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-xl text-primary">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-on-surface">Language & Region</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">System Language</label>
              <select 
                value={preferences.language}
                onChange={e => setPreferences(prev => ({ ...prev, language: e.target.value }))}
                className="w-full bg-surface-container-lowest border-none rounded-xl p-4 text-on-surface focus:ring-2 focus:ring-primary/50 transition-all"
              >
                <option value="en">English (US)</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Time Zone</label>
              <select className="w-full bg-surface-container-lowest border-none rounded-xl p-4 text-on-surface focus:ring-2 focus:ring-primary/50 transition-all">
                <option>UTC -04:00 (Eastern Time)</option>
                <option>UTC +00:00 (Greenwich Mean Time)</option>
                <option>UTC +01:00 (Central European Time)</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
