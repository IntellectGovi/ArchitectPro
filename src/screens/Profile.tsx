import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Camera, Save, Trash2, AlertTriangle, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { motion, AnimatePresence } from 'motion/react';

export default function Profile() {
  const { userProfile, setUserProfile, addNotification } = useApp();
  const [formData, setFormData] = useState(userProfile);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSave = () => {
    setUserProfile(formData);
    addNotification('Profile updated successfully', 'success');
  };

  const handleDeleteAccount = () => {
    addNotification('Account deletion request received. This action is irreversible.', 'error');
    setIsDeleting(false);
  };

  return (
    <div className="p-4 md:p-10 max-w-4xl mx-auto space-y-12">
      <section className="space-y-2">
        <h2 className="text-4xl font-black tracking-tighter text-on-surface italic">Architect Identity</h2>
        <p className="text-on-surface-variant">Update your professional profile and digital presence.</p>
      </section>

      <div className="bg-surface-container rounded-[2.5rem] p-6 md:p-10 shadow-xl border border-outline-variant/10">
        <div className="flex flex-col md:flex-row gap-10">
          {/* Avatar Section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20 bg-surface-container-highest">
                <img 
                  src={formData.avatar || 'https://picsum.photos/seed/architect/200/200'} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <button className="absolute bottom-0 right-0 p-2 bg-primary text-on-primary rounded-full shadow-lg hover:scale-110 transition-transform">
                <Camera className="w-5 h-5" />
              </button>
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">System Administrator</p>
          </div>

          {/* Form Section */}
          <div className="flex-1 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant flex items-center gap-2">
                  <User className="w-3 h-3" /> Full Name
                </label>
                <input 
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full bg-surface-container-lowest border-none rounded-xl p-4 text-on-surface focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant flex items-center gap-2">
                  <Mail className="w-3 h-3" /> Email Address
                </label>
                <input 
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full bg-surface-container-lowest border-none rounded-xl p-4 text-on-surface focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant flex items-center gap-2">
                  <Phone className="w-3 h-3" /> Phone Number
                </label>
                <input 
                  type="text"
                  value={formData.phone}
                  onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full bg-surface-container-lowest border-none rounded-xl p-4 text-on-surface focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant flex items-center gap-2">
                  <MapPin className="w-3 h-3" /> Location
                </label>
                <input 
                  type="text"
                  value={formData.location}
                  onChange={e => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  className="w-full bg-surface-container-lowest border-none rounded-xl p-4 text-on-surface focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Professional Bio</label>
              <textarea 
                value={formData.bio}
                onChange={e => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                rows={4}
                className="w-full bg-surface-container-lowest border-none rounded-xl p-4 text-on-surface focus:ring-2 focus:ring-primary/50 transition-all resize-none"
              />
            </div>

            <button 
              onClick={handleSave}
              className="w-full md:w-auto px-10 py-4 bg-primary text-on-primary rounded-xl font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              Save Changes
            </button>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <section className="bg-error/5 border border-error/20 rounded-[2rem] p-8 space-y-6">
        <div className="flex items-center gap-4 text-error">
          <AlertTriangle className="w-6 h-6" />
          <h3 className="text-xl font-bold">Danger Zone</h3>
        </div>
        <p className="text-sm text-on-surface-variant">Deleting your account will permanently remove all your architectural archives, vault entries, and preferences. This action cannot be undone.</p>
        <button 
          onClick={() => setIsDeleting(true)}
          className="px-6 py-3 bg-error text-on-error rounded-xl font-bold text-sm hover:bg-error/90 transition-colors flex items-center gap-2"
        >
          <Trash2 className="w-4 h-4" />
          Delete Account
        </button>
      </section>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {isDeleting && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDeleting(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-surface-container-high rounded-[2rem] p-8 shadow-2xl border border-error/20"
            >
              <div className="text-center space-y-6">
                <div className="w-16 h-16 bg-error/10 rounded-full flex items-center justify-center mx-auto">
                  <Trash2 className="text-error w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-on-surface tracking-tighter italic">Final Manifestation?</h3>
                  <p className="text-sm text-on-surface-variant">Are you absolutely sure you want to delete your account? All your data will be purged from the architectural grid.</p>
                </div>
                
                <div className="flex gap-3">
                  <button 
                    onClick={() => setIsDeleting(false)}
                    className="flex-1 py-3 rounded-xl bg-surface-container-highest text-on-surface font-bold text-sm"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleDeleteAccount}
                    className="flex-1 py-3 rounded-xl bg-error text-on-error font-bold text-sm shadow-lg shadow-error/20"
                  >
                    Yes, Delete Everything
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
