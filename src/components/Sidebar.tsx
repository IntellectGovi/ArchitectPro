import React from 'react';
import { 
  LayoutGrid, 
  CheckCircle2, 
  FileText, 
  Lock, 
  FolderOpen, 
  Calendar as CalendarIcon, 
  Repeat, 
  Plus, 
  HelpCircle, 
  LogOut,
  Building2
} from 'lucide-react';
import { Screen } from '../types';
import { cn } from '../lib/utils';
import { useApp } from '../context/AppContext';

interface SidebarProps {
  activeScreen: Screen;
  onScreenChange: (screen: Screen) => void;
}

export default function Sidebar({ activeScreen, onScreenChange }: SidebarProps) {
  const { t } = useApp();
  const navItems = [
    { id: 'dashboard', label: t('dashboard'), icon: LayoutGrid },
    { id: 'tasks', label: t('tasks'), icon: CheckCircle2 },
    { id: 'notes', label: t('notes'), icon: FileText },
    { id: 'vault', label: t('vault'), icon: Lock },
    { id: 'documents', label: t('documents'), icon: FolderOpen },
    { id: 'calendar', label: t('calendar'), icon: CalendarIcon },
    { id: 'habits', label: t('habits'), icon: Repeat },
  ] as const;

  return (
    <aside className="h-full w-full flex flex-col py-8 shadow-[24px_0_48px_rgba(15,23,42,0.5)] bg-surface-container-low">
      <div className="px-6 mb-10 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-container to-primary flex items-center justify-center">
          <Building2 className="text-on-primary-container w-6 h-6" />
        </div>
        <div>
          <h2 className="text-on-surface font-black italic tracking-tight">The Curator</h2>
          <p className="text-[10px] uppercase tracking-[0.2em] text-on-surface-variant font-bold">Productivity Suite</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onScreenChange(item.id)}
            className={cn(
              "w-full flex items-center py-3 px-6 transition-all duration-300 text-sm uppercase tracking-widest font-medium",
              activeScreen === item.id 
                ? "text-primary-container bg-surface-container border-l-4 border-primary-container rounded-r-full" 
                : "text-on-surface-variant hover:bg-surface-container/50 hover:text-on-surface hover:translate-x-1"
            )}
          >
            <item.icon className="mr-3 w-5 h-5" />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}
