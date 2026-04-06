export type Screen = 'dashboard' | 'tasks' | 'notes' | 'vault' | 'documents' | 'habits' | 'calendar' | 'profile' | 'security' | 'preferences';

export interface UserProfile {
  name: string;
  email: string;
  role: string;
  avatar?: string;
  bio?: string;
}

export interface AppPreferences {
  theme: 'dark' | 'light' | 'system';
  notificationsEnabled: boolean;
  compactMode: boolean;
  accentColor: string;
}

export interface Task {
  id: string;
  title: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: string;
  dueDate?: string;
  completed: boolean;
  completedAt?: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  status: 'active' | 'draft' | 'archive';
  lastEdited: string;
  tags: string[];
}

export interface VaultItem {
  id: string;
  name: string;
  email: string;
  category: 'financial' | 'cloud' | 'enterprise' | 'development' | 'secure-notes';
  lastUsed: string;
  logo: string;
  password?: string;
}

export interface Document {
  id: string;
  name: string;
  type: 'pdf' | 'jpg' | 'xlsx' | 'docx';
  size: string;
  modifiedAt: string;
  status?: 'draft' | 'review';
  project: string;
}

export interface Habit {
  id: string;
  name: string;
  desc: string;
  streak: number;
  icon: string;
  color: string;
  bg: string;
  completedDays: string[]; // ISO dates
}
