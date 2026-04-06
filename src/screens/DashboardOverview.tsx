import React from 'react';
import { motion } from 'motion/react';
import { 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  ArrowUpRight,
  MoreVertical
} from 'lucide-react';

export default function DashboardOverview() {
  const stats = [
    { label: 'Active Tasks', value: '12', icon: CheckCircle2, color: 'text-primary' },
    { label: 'Notes Created', value: '148', icon: TrendingUp, color: 'text-tertiary' },
    { label: 'Vault Health', value: '98%', icon: AlertCircle, color: 'text-primary-container' },
    { label: 'Focus Time', value: '4.2h', icon: Clock, color: 'text-secondary' },
  ];

  return (
    <div className="p-8 space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome back, Curator.</h1>
        <p className="text-on-surface-variant">Your digital sanctuary is synchronized and secure.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/10"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={cn("p-2 rounded-lg bg-surface-container-high", stat.color)}>
                <stat.icon size={20} />
              </div>
              <button className="text-outline hover:text-on-surface">
                <MoreVertical size={16} />
              </button>
            </div>
            <div className="text-3xl font-black mb-1">{stat.value}</div>
            <div className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-8 bg-surface-container-low rounded-2xl border border-outline-variant/10 overflow-hidden">
          <div className="p-6 border-b border-outline-variant/10 flex justify-between items-center">
            <h3 className="font-bold">Recent Archival Activity</h3>
            <button className="text-xs font-bold text-primary uppercase tracking-widest hover:underline">View All</button>
          </div>
          <div className="divide-y divide-outline-variant/10">
            {[
              { title: 'Project Blueprint Updated', type: 'Note', time: '2 mins ago', status: 'Synced' },
              { title: 'Secure Key Rotation', type: 'Security', time: '45 mins ago', status: 'Success' },
              { title: 'Quarterly Strategy Draft', type: 'Document', time: '2 hours ago', status: 'Draft' },
              { title: 'Weekly Sprint Review', type: 'Todo', time: '5 hours ago', status: 'Completed' },
            ].map((activity, i) => (
              <div key={i} className="p-6 flex items-center justify-between hover:bg-surface-container transition-colors group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center text-xs font-bold">
                    {activity.type[0]}
                  </div>
                  <div>
                    <div className="font-semibold text-on-surface group-hover:text-primary transition-colors">{activity.title}</div>
                    <div className="text-xs text-on-surface-variant">{activity.type} • {activity.time}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded bg-surface-container-high text-on-surface-variant">
                    {activity.status}
                  </span>
                  <ArrowUpRight size={16} className="text-outline group-hover:text-primary transition-all" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-primary-gradient p-8 rounded-2xl text-on-primary shadow-xl shadow-primary/20 relative overflow-hidden group">
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-2">New Entry</h3>
              <p className="text-sm opacity-80 mb-6 leading-relaxed">Add a new thought, task, or document to your archive instantly.</p>
              <button className="bg-surface text-on-surface px-6 py-3 rounded-lg font-bold text-sm hover:shadow-lg transition-all active:scale-95">
                Create Now
              </button>
            </div>
            <div className="absolute -bottom-8 -right-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
              <TrendingUp size={160} />
            </div>
          </div>

          <div className="bg-surface-container-low p-8 rounded-2xl border border-outline-variant/10">
            <h3 className="font-bold mb-6">Vault Utilization</h3>
            <div className="space-y-6">
              {[
                { name: 'Todos', usage: 45, color: 'bg-primary' },
                { name: 'Notes', usage: 82, color: 'bg-tertiary' },
                { name: 'Passwords', usage: 12, color: 'bg-primary-container' },
              ].map((vault) => (
                <div key={vault.name} className="space-y-2">
                  <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                    <span>{vault.name}</span>
                    <span className="text-on-surface-variant">{vault.usage}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${vault.usage}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className={cn("h-full rounded-full", vault.color)}
                    ></motion.div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { cn } from '@/src/lib/utils';
