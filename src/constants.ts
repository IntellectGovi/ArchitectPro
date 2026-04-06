import { Task, Note, VaultItem, Document, Habit } from './types';

export const INITIAL_TASKS: Task[] = [
  { id: '1', title: 'Review encryption logs', priority: 'high', category: 'Security', dueDate: '2026-04-06', completed: false },
  { id: '2', title: 'Biometric calibration', priority: 'medium', category: 'System', completed: true, completedAt: '09:00' },
  { id: '3', title: 'Update firewall node', priority: 'high', category: 'Security', completed: false },
  { id: '4', title: 'Architectural review', priority: 'low', category: 'Project: Sanctuary 2.0', completed: false },
  { id: '5', title: 'Finalize Architecture Blueprints', priority: 'high', category: 'Work', dueDate: '2026-04-06', completed: false },
  { id: '6', title: 'Review Quarterly Performance', priority: 'medium', category: 'Work', dueDate: '2026-04-07', completed: false },
  { id: '7', title: 'Schedule Gallery Visit', priority: 'low', category: 'Personal', dueDate: '2026-04-10', completed: false },
  { id: '8', title: 'Pick up Archival Supplies', priority: 'urgent', category: 'Errands', dueDate: '2026-04-06', completed: false },
];

export const INITIAL_NOTES: Note[] = [
  { 
    id: '1', 
    title: 'Architectural Calm', 
    content: 'The concept of "Architectural Calm" focuses on the intentional removal of visual friction. In a digital world dominated by attention-seeking interfaces, the silent scaffolding of a well-curated space provides the ultimate luxury: Focus.',
    status: 'active',
    lastEdited: '2m ago',
    tags: ['Design', 'Draft']
  },
  { 
    id: '2', 
    title: 'Neural Net Schematics', 
    content: 'Initial drafting for the core intelligence interface. Focus on latent response times and...',
    status: 'draft',
    lastEdited: '2h ago',
    tags: ['Design', 'Draft']
  },
  { 
    id: '3', 
    title: 'Recovery Seed Phase II', 
    content: 'Protocol for off-site backup nodes confirmed. The sequence requires three-factor...',
    status: 'active',
    lastEdited: 'Yesterday',
    tags: ['Security', 'Vital']
  },
  {
    id: '4',
    title: 'Indigo Theory',
    content: 'The psychology of naval charcoals and deep indigo light sources.',
    status: 'draft',
    lastEdited: '1h ago',
    tags: ['Color', 'Theory']
  }
];

export const INITIAL_VAULT_ITEMS: VaultItem[] = [
  { id: '1', name: 'Chase', email: 'personal-banking@vault.io', category: 'financial', lastUsed: '2m ago', logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAvOZjeSEeZjwbXnH9lRY0Vvj5loOy-rB78HrWVuc5SzzuvXML9GxiDit3r8i2eamzwrgfoQJiSieLSLhAObn_Snyv_NSamqyL3UYyXBEkZ1UaJvnEMLHgYq_cKvFROUJK_rRwb44QuVVQHpe78gQO0LAkkobdP146RSkQTgai5PEKKN1vha-uVhdmPe2IE5CRvtn23OT3EhEA_-0J67CdHOzpB54vZTybrNdZYlwUTovMEGhEao7YwhGTYAn64019mTgk5NdgRWxM', password: 'password123' },
  { id: '2', name: 'Microsoft', email: 'admin.arch@outlook.com', category: 'cloud', lastUsed: '1h ago', logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBf-tvk_JlUrOXzleoduaHtiyzuC190XabfDJ1d_6HH8V7-B2CLj1zqQSopBiJIN2DO-Mvu5Q4jL7j0QivViMung9Q3FuvLfmsPXMVxyIFEwsZOjKo0sqbQnqOk9vYXxr6RSa-jU6pVgML3-RsilKwusty07aNG-VRODVwrAIDbspyZKmTWnXBp6xcltkRTAdKqGD0f3fN-bGPqPCYe9z2SHZokWBIfHDbtHoldtUNyImlmfQ2oheH2tcvgnb3jLqEwpqHozhnf5LA', password: 'microsoft_pass' },
  { id: '3', name: 'Github', email: 'git-master@architect.pro', category: 'development', lastUsed: '4h ago', logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArcUlWMMGMB8h7yMvhm2XowTbwaaGIRUFzmGLItPr6RyRU-gVpn6gxRJq__AXGP91ckkNYHs3wHxtBfSiz_uNHX0AY8230M-6ytmT0Efqv3a7vLKIPPqyzsmUFf4iq6mJg6mvZZDd3A4wujgYAp-3L6BpTGUmZkM7pYpMClEaocJypo5PLg9wjPIKfhyOeRV3cNwUqcGzF_nj20j6ZMRH_Lwf489G1qW92FMSbIUFeE9-33XEG0cvrq4n4j0gg7AH6LzwFtJJBefQ', password: 'github_token_xyz' },
];

export const INITIAL_DOCUMENTS: Document[] = [
  { id: '1', name: 'Obsidian_Sanctuary_v2.pdf', type: 'pdf', size: '12.4 MB', modifiedAt: '2h ago', status: 'draft', project: 'Project Obsidian' },
  { id: '2', name: 'Facade_Lighting_Night.jpg', type: 'jpg', size: '4.2 MB', modifiedAt: '5h ago', project: 'Project Obsidian' },
  { id: '3', name: 'Material_Costs_Q4.xlsx', type: 'xlsx', size: '1.1 MB', modifiedAt: 'Yesterday', status: 'review', project: 'Project Obsidian' },
  { id: '4', name: 'Client_Brief_Redux.docx', type: 'docx', size: '842 KB', modifiedAt: '2d ago', project: 'Project Obsidian' },
];

export const INITIAL_HABITS: Habit[] = [
  { id: '1', name: 'Hydration Protocol', desc: '3L of Water • Daily', streak: 42, icon: 'Droplets', color: 'text-[#4db6ac]', bg: 'bg-[#004d40]/30', completedDays: [] },
  { id: '2', name: 'Physical Optimization', desc: '45m High Intensity • Daily', streak: 12, icon: 'Dumbbell', color: 'text-primary', bg: 'bg-primary-container/20', completedDays: [] },
  { id: '3', name: 'Deep Wisdom', desc: '30 Pages • Non-Fiction', streak: 7, icon: 'BookOpen', color: 'text-tertiary', bg: 'bg-tertiary/10', completedDays: [] },
  { id: '4', name: 'Cognitive Silence', desc: '20m Mindfulness • Daily', streak: 14, icon: 'Wind', color: 'text-on-surface-variant', bg: 'bg-surface-container-highest', completedDays: [] },
];
