import React from 'react';
import { motion } from 'motion/react';
import { 
  LayoutDashboard, 
  CheckSquare, 
  FileText, 
  Key, 
  Folder, 
  Settings, 
  LogOut,
  Bell,
  Search,
  User
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/src/lib/utils';

const sidebarLinks = [
  { name: 'Overview', icon: LayoutDashboard, href: '/dashboard' },
  { name: 'Todos', icon: CheckSquare, href: '/dashboard/todos' },
  { name: 'Notes', icon: FileText, href: '/dashboard/notes' },
  { name: 'Passwords', icon: Key, href: '/dashboard/passwords' },
  { name: 'Documents', icon: Folder, href: '/dashboard/documents' },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 h-screen bg-surface-container-low border-r border-outline-variant/10 flex flex-col sticky top-0">
      <div className="p-8">
        <Link to="/" className="text-xl font-black tracking-tighter text-on-surface">
          MASTER ARCHITECT
        </Link>
      </div>

      <nav className="flex-grow px-4 space-y-2">
        <div className="text-[10px] font-bold text-outline uppercase tracking-[0.2em] px-4 mb-4">The Archive</div>
        {sidebarLinks.map((link) => (
          <Link
            key={link.name}
            to={link.href}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-lg transition-all group",
              location.pathname === link.href 
                ? "bg-primary/10 text-primary" 
                : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
            )}
          >
            <link.icon size={20} className={cn(
              "transition-transform group-hover:scale-110",
              location.pathname === link.href ? "text-primary" : "text-outline"
            )} />
            <span className="text-sm font-semibold">{link.name}</span>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-outline-variant/10 space-y-2">
        <Link
          to="/settings"
          className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container hover:text-on-surface rounded-lg transition-all"
        >
          <Settings size={20} />
          <span className="text-sm font-semibold">Settings</span>
        </Link>
        <button
          className="w-full flex items-center gap-3 px-4 py-3 text-tertiary hover:bg-tertiary/10 rounded-lg transition-all"
          onClick={() => window.location.href = '/'}
        >
          <LogOut size={20} />
          <span className="text-sm font-semibold">Logout</span>
        </button>
      </div>
    </aside>
  );
}

export function DashboardHeader() {
  return (
    <header className="h-20 border-b border-outline-variant/10 flex items-center justify-between px-8 bg-surface/50 backdrop-blur-md sticky top-0 z-40">
      <div className="flex items-center gap-4 bg-surface-container-high px-4 py-2 rounded-full w-96 border border-outline-variant/10">
        <Search size={18} className="text-outline" />
        <input 
          type="text" 
          placeholder="Search your archive..." 
          className="bg-transparent border-none outline-none text-sm w-full text-on-surface placeholder:text-outline"
        />
      </div>

      <div className="flex items-center gap-6">
        <button className="relative p-2 text-on-surface-variant hover:text-on-surface transition-colors">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full border-2 border-surface"></span>
        </button>
        <div className="h-8 w-[1px] bg-outline-variant/20"></div>
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <div className="text-sm font-bold text-on-surface leading-tight">Julian Thorne</div>
            <div className="text-[10px] font-bold text-primary uppercase tracking-widest">Master Curator</div>
          </div>
          <div className="w-10 h-10 rounded-full bg-primary-gradient flex items-center justify-center text-on-primary font-black text-sm border-2 border-surface shadow-lg">
            JT
          </div>
        </div>
      </div>
    </header>
  );
}
