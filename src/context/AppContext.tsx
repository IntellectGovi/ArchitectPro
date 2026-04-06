import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Task, Note, VaultItem, Document, Habit, UserProfile, AppPreferences, Screen } from '../types';
import { INITIAL_TASKS, INITIAL_NOTES, INITIAL_VAULT_ITEMS, INITIAL_DOCUMENTS, INITIAL_HABITS } from '../constants';

interface AppContextType {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  toggleTaskCompletion: (id: string) => void;
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
  vaultItems: VaultItem[];
  setVaultItems: React.Dispatch<React.SetStateAction<VaultItem[]>>;
  documents: Document[];
  setDocuments: React.Dispatch<React.SetStateAction<Document[]>>;
  habits: Habit[];
  setHabits: React.Dispatch<React.SetStateAction<Habit[]>>;
  
  // Navigation
  activeScreen: Screen;
  setActiveScreen: (screen: Screen) => void;

  // User & Settings
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  preferences: AppPreferences;
  setPreferences: React.Dispatch<React.SetStateAction<AppPreferences>>;

  // Notifications
  notifications: { id: string; message: string; type: 'success' | 'error' | 'info' }[];
  addNotification: (message: string, type?: 'success' | 'error' | 'info') => void;
  removeNotification: (id: string) => void;

  // Translation
  t: (key: string) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [activeScreen, setActiveScreen] = useState<Screen>('dashboard');

  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('architect_tasks');
    return saved ? JSON.parse(saved) : INITIAL_TASKS;
  });

  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('architect_profile');
    return saved ? JSON.parse(saved) : {
      name: 'Govind Upadhayay',
      email: 'govind.upadhayay19@gmail.com',
      role: 'Lead Architect',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDByS77IFKVQ0VqgVemyJoaB2BCe9Y8qvyZWN7a5xHG4zsxz6PmgFAquO-AQxsnO6HiLL93Xh48W6mS-p9KFXYsEx1zkN_AV6S09nLweqAfWxnWvAzsU9XFTuc_7z7ORhtoSpexLLzFJVu88ViCd6tSOPKU35IPr4bDEdBIQbU6ufxSe4GG__38MjOExWNs1exVM8PFCk2N1QKt3RK-_qpNWiZk0BWZ8d6THGPfCQrg5G412ujpcKE8ACOPNyRh0K6cPcbV2VEe9W8',
      bio: 'Architecting digital ecosystems with precision and purpose.'
    };
  });

  const [preferences, setPreferences] = useState<AppPreferences>(() => {
    const saved = localStorage.getItem('architect_preferences');
    return saved ? JSON.parse(saved) : {
      theme: 'dark',
      notificationsEnabled: true,
      compactMode: false,
      accentColor: '#818cf8'
    };
  });

  const [notes, setNotes] = useState<Note[]>(() => {
    const saved = localStorage.getItem('architect_notes');
    return saved ? JSON.parse(saved) : INITIAL_NOTES;
  });

  const [vaultItems, setVaultItems] = useState<VaultItem[]>(() => {
    const saved = localStorage.getItem('architect_vault');
    return saved ? JSON.parse(saved) : INITIAL_VAULT_ITEMS;
  });

  const [documents, setDocuments] = useState<Document[]>(() => {
    const saved = localStorage.getItem('architect_documents');
    return saved ? JSON.parse(saved) : INITIAL_DOCUMENTS;
  });

  const [habits, setHabits] = useState<Habit[]>(() => {
    const saved = localStorage.getItem('architect_habits');
    return saved ? JSON.parse(saved) : INITIAL_HABITS;
  });

  const [notifications, setNotifications] = useState<{ id: string; message: string; type: 'success' | 'error' | 'info' }[]>([]);

  useEffect(() => {
    localStorage.setItem('architect_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('architect_notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('architect_vault', JSON.stringify(vaultItems));
  }, [vaultItems]);

  useEffect(() => {
    localStorage.setItem('architect_documents', JSON.stringify(documents));
  }, [documents]);

  useEffect(() => {
    localStorage.setItem('architect_habits', JSON.stringify(habits));
  }, [habits]);

  useEffect(() => {
    localStorage.setItem('architect_profile', JSON.stringify(userProfile));
  }, [userProfile]);

  useEffect(() => {
    localStorage.setItem('architect_preferences', JSON.stringify(preferences));
  }, [preferences]);

  const toggleTaskCompletion = (id: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id === id) {
        const completed = !t.completed;
        if (completed) addNotification(`Task "${t.title}" completed!`, 'success');
        return { ...t, completed, completedAt: completed ? new Date().toISOString() : undefined };
      }
      return t;
    }));
  };

  const addNotification = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => removeNotification(id), 3000);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const translations: Record<string, Record<string, string>> = {
    en: {
      dashboard: 'Dashboard',
      tasks: 'Tasks',
      notes: 'Notes',
      vault: 'Vault',
      documents: 'Documents',
      calendar: 'Calendar',
      habits: 'Habits',
      profile: 'Profile',
      security: 'Security',
      preferences: 'Preferences',
      welcome: 'Welcome back, Architect',
      stronghold: 'The Digital Sanctuary',
    },
    es: {
      dashboard: 'Tablero',
      tasks: 'Tareas',
      notes: 'Notas',
      vault: 'Bóveda',
      documents: 'Documentos',
      calendar: 'Calendario',
      habits: 'Hábitos',
      profile: 'Perfil',
      security: 'Seguridad',
      preferences: 'Preferencias',
      welcome: 'Bienvenido de nuevo, Arquitecto',
      stronghold: 'El Santuario Digital',
    },
    fr: {
      dashboard: 'Tableau de bord',
      tasks: 'Tâches',
      notes: 'Notes',
      vault: 'Coffre-fort',
      documents: 'Documents',
      calendar: 'Calendrier',
      habits: 'Habitudes',
      profile: 'Profil',
      security: 'Sécurité',
      preferences: 'Préférences',
      welcome: 'Bon retour, Architecte',
      stronghold: 'Le Sanctuaire Numérique',
    },
    de: {
      dashboard: 'Dashboard',
      tasks: 'Aufgaben',
      notes: 'Notizen',
      vault: 'Tresor',
      documents: 'Dokumente',
      calendar: 'Kalender',
      habits: 'Gewohnheiten',
      profile: 'Profil',
      security: 'Sicherheit',
      preferences: 'Einstellungen',
      welcome: 'Willkommen zurück, Architekt',
      stronghold: 'Das Digitale Heiligtum',
    }
  };

  const t = (key: string) => {
    return translations[preferences.language]?.[key] || key;
  };

  return (
    <AppContext.Provider value={{
      tasks, setTasks, toggleTaskCompletion,
      notes, setNotes,
      vaultItems, setVaultItems,
      documents, setDocuments,
      habits, setHabits,
      activeScreen, setActiveScreen,
      userProfile, setUserProfile,
      preferences, setPreferences,
      notifications, addNotification, removeNotification,
      t
    }}>
      {children}
      
      {/* Global Notifications UI - TOP POSITION */}
      <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[200] flex flex-col gap-3 pointer-events-none w-full max-w-md px-4">
        {notifications.map(n => (
          <div 
            key={n.id} 
            className={`pointer-events-auto px-6 py-3 rounded-xl shadow-2xl border border-white/10 backdrop-blur-xl animate-in fade-in slide-in-from-top-4 duration-300 ${
              n.type === 'success' ? 'bg-primary/90 text-on-primary' : 
              n.type === 'error' ? 'bg-error/90 text-on-error' : 
              'bg-surface-container-high/90 text-on-surface'
            }`}
          >
            <p className="text-sm font-bold tracking-wide text-center">{n.message}</p>
          </div>
        ))}
      </div>
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
