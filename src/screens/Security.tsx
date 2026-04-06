import React, { useState } from 'react';
import { Shield, Lock, Fingerprint, Key, Smartphone, AlertTriangle, Save } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { motion, AnimatePresence } from 'motion/react';

export default function Security() {
  const { preferences, setPreferences, addNotification } = useApp();
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const togglePreference = (key: keyof typeof preferences) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
    addNotification('Security settings updated', 'success');
  };

  return (
    <div className="p-4 md:p-10 max-w-4xl mx-auto space-y-12">
      <section className="space-y-2">
        <h2 className="text-4xl font-black tracking-tighter text-on-surface italic">Security Stronghold</h2>
        <p className="text-on-surface-variant">Manage your cryptographic keys, biometric access, and vault protocols.</p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Password Section */}
        <div className="bg-surface-container rounded-[2rem] p-8 border border-outline-variant/10 space-y-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-xl text-primary">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-on-surface">Master Key</h3>
          </div>
          <p className="text-xs text-on-surface-variant leading-relaxed">Your master key encrypts all data in the Vault. Change it regularly to maintain structural integrity.</p>
          <button 
            onClick={() => setIsChangingPassword(!isChangingPassword)}
            className="w-full py-4 rounded-xl bg-surface-container-highest text-on-surface font-black uppercase tracking-widest text-xs hover:bg-primary hover:text-on-primary transition-all"
          >
            {isChangingPassword ? 'Cancel' : 'Change Master Key'}
          </button>
          
          <AnimatePresence>
            {isChangingPassword && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4 pt-4"
              >
                <input type="password" placeholder="Current Master Key" className="w-full bg-surface-container-lowest border-none rounded-xl p-4 text-on-surface" />
                <input type="password" placeholder="New Master Key" className="w-full bg-surface-container-lowest border-none rounded-xl p-4 text-on-surface" />
                <button className="w-full py-4 bg-primary text-on-primary rounded-xl font-black uppercase tracking-widest text-xs">Update Key</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 2FA Section */}
        <div className="bg-surface-container rounded-[2rem] p-8 border border-outline-variant/10 space-y-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-tertiary/10 rounded-xl text-tertiary">
              <Smartphone className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-on-surface">Multi-Factor Auth</h3>
          </div>
          <p className="text-xs text-on-surface-variant leading-relaxed">Add an extra layer of defense by requiring a secondary verification code.</p>
          <div className="flex items-center justify-between p-4 bg-surface-container-lowest rounded-xl">
            <div className="flex items-center gap-3">
              <Fingerprint className="w-5 h-5 text-on-surface-variant" />
              <span className="text-sm font-bold">Biometric Unlock</span>
            </div>
            <button 
              onClick={() => togglePreference('biometricEnabled')}
              className={`w-12 h-6 rounded-full p-1 transition-colors ${preferences.biometricEnabled ? 'bg-primary' : 'bg-surface-container-highest'}`}
            >
              <div className={`w-4 h-4 rounded-full bg-white transition-transform ${preferences.biometricEnabled ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
          </div>
        </div>

        {/* Sessions Section */}
        <div className="md:col-span-2 bg-surface-container rounded-[2rem] p-8 border border-outline-variant/10 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-xl text-primary">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-on-surface">Active Sessions</h3>
            </div>
            <button className="text-[10px] font-black uppercase tracking-widest text-error hover:underline">Revoke All</button>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-surface-container-lowest rounded-xl border-l-4 border-primary">
              <div className="flex items-center gap-4">
                <Smartphone className="w-5 h-5 text-on-surface-variant" />
                <div>
                  <p className="text-sm font-bold">Current Session (iPhone 15 Pro)</p>
                  <p className="text-[10px] text-on-surface-variant uppercase">New York, USA • Active Now</p>
                </div>
              </div>
              <span className="text-[10px] font-black uppercase text-primary">Current</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
