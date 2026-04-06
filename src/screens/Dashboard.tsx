import React from 'react';
import { Shield, Lock, Check, Plus, BarChart3 } from 'lucide-react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { cn } from '../lib/utils';

export default function Dashboard() {
  const { tasks, notes, toggleTaskCompletion, addNotification } = useApp();
  
  const remainingTasksCount = tasks.filter(t => !t.completed).length;

  const handleQuickAdd = () => {
    addNotification('Use the Tasks screen to add new tasks for full control', 'info');
  };

  return (
    <div className="p-4 md:p-8 space-y-8">
      {/* Hero Header */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-1">
          <p className="text-primary font-bold tracking-[0.3em] uppercase text-xs">Command Center</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-on-surface tracking-tight">The Digital Sanctuary</h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-on-surface-variant text-xs uppercase tracking-widest font-bold">Local Time</p>
            <p className="text-xl font-bold text-on-surface">22:14 <span className="text-sm font-medium text-outline">EDT</span></p>
          </div>
          <div className="h-10 w-[1px] bg-outline-variant/20"></div>
          <div className="text-right">
            <p className="text-on-surface-variant text-xs uppercase tracking-widest font-bold">System Load</p>
            <p className="text-xl font-bold text-tertiary">Optimized</p>
          </div>
        </div>
      </section>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Security Overview (Wide Card) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:col-span-12 lg:col-span-8 bg-surface-container rounded-[2rem] p-6 md:p-8 indigo-glow relative overflow-hidden flex flex-col md:flex-row gap-8"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
          <div className="relative z-10 flex-1 space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Shield className="text-primary w-6 h-6 fill-primary" />
              </div>
              <h3 className="text-xl font-bold text-on-surface">Security Protocol</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-surface-container-low p-4 rounded-xl">
                <p className="text-on-surface-variant text-[10px] uppercase tracking-widest font-bold mb-1">Encrypted Vaults</p>
                <p className="text-2xl font-bold text-on-surface">14</p>
              </div>
              <div className="bg-surface-container-low p-4 rounded-xl">
                <p className="text-on-surface-variant text-[10px] uppercase tracking-widest font-bold mb-1">Threats Blocked</p>
                <p className="text-2xl font-bold text-tertiary">0</p>
              </div>
            </div>
            <div className="pt-2">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-on-surface-variant font-medium">Network Integrity</span>
                <span className="text-xs text-primary font-bold">98%</span>
              </div>
              <div className="w-full bg-surface-container-highest rounded-full h-1.5 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '98%' }}
                  className="bg-gradient-to-r from-primary-container to-primary h-full"
                ></motion.div>
              </div>
            </div>
          </div>
          <div className="relative z-10 w-full md:w-48 flex flex-col justify-center items-center text-center p-6 bg-surface-container-highest/40 rounded-3xl backdrop-blur-md">
            <Lock className="text-primary w-12 h-12 mb-2" />
            <p className="text-sm font-bold text-on-surface mb-1">Session Active</p>
            <p className="text-[10px] text-on-surface-variant leading-relaxed">Identity verified via Biometric Mesh</p>
            <button className="mt-4 text-[10px] uppercase tracking-tighter text-primary font-black hover:underline">Re-authenticate</button>
          </div>
        </motion.div>

        {/* Today's Tasks (Tall Card) */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="md:col-span-12 lg:col-span-4 md:row-span-2 bg-surface-container-low rounded-[2rem] p-6 md:p-8 flex flex-col border border-outline-variant/5"
        >
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold text-on-surface">Today's Tasks</h3>
            <span className="px-2 py-1 bg-surface-container-highest rounded text-[10px] font-bold text-on-surface-variant">{remainingTasksCount} REMAINING</span>
          </div>
          <div className="space-y-4 flex-1 overflow-y-auto custom-scrollbar max-h-[400px] lg:max-h-none">
            {tasks.slice(0, 6).map((task) => (
              <div 
                key={task.id} 
                onClick={() => toggleTaskCompletion(task.id)}
                className={cn(
                  "group flex items-start gap-4 p-4 rounded-2xl transition-colors cursor-pointer",
                  task.completed ? "bg-surface-container/50" : "hover:bg-surface-container"
                )}
              >
                <div className={cn(
                  "mt-1 w-5 h-5 rounded-md flex items-center justify-center transition-all",
                  task.completed ? "bg-primary" : "border-2 border-primary/40 group-hover:border-primary"
                )}>
                  {task.completed && <Check className="text-on-primary w-3 h-3 stroke-[3]" />}
                  {!task.completed && <div className="w-2.5 h-2.5 bg-primary rounded-sm opacity-0 group-hover:opacity-20 transition-opacity"></div>}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={cn(
                    "text-sm font-semibold truncate",
                    task.completed ? "text-on-surface-variant line-through" : "text-on-surface"
                  )}>{task.title}</p>
                  <p className={cn(
                    "text-[10px]",
                    task.completed ? "text-outline" : "text-on-surface-variant"
                  )}>
                    {task.completed ? `Completed at ${task.completedAt || 'Just now'}` : (task.dueDate || task.category)}
                  </p>
                </div>
              </div>
            ))}
            {tasks.length === 0 && (
              <div className="text-center py-10 text-on-surface-variant/40 italic text-sm">
                No tasks for today.
              </div>
            )}
          </div>
          <button 
            onClick={handleQuickAdd}
            className="mt-8 flex items-center justify-center gap-2 py-4 rounded-xl border border-dashed border-outline-variant/30 text-on-surface-variant hover:border-primary/50 hover:text-primary transition-all text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            Quick Add Task
          </button>
        </motion.div>

        {/* Recent Archives (Wide Grid Section) */}
        <div className="md:col-span-12 lg:col-span-8 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-on-surface tracking-tight">Recent Archives</h3>
            <button className="text-xs font-bold text-primary tracking-widest uppercase hover:underline">View All</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {notes.slice(0, 2).map((note) => (
              <motion.div 
                key={note.id}
                whileHover={{ y: -5 }}
                className="bg-surface-container p-6 rounded-3xl group hover:bg-surface-container-high transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="p-2 bg-surface-container-low rounded-xl text-primary">
                    <BarChart3 className="w-5 h-5" />
                  </span>
                  <span className="text-[10px] text-outline font-bold uppercase">{note.lastEdited}</span>
                </div>
                <h4 className="text-sm font-bold text-on-surface mb-2 tracking-tight group-hover:text-primary transition-colors">{note.title}</h4>
                <p className="text-xs text-on-surface-variant leading-relaxed line-clamp-2">{note.content}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {note.tags.map(tag => (
                    <span key={tag} className="text-[9px] px-2 py-0.5 bg-surface-container-highest rounded-full text-on-surface-variant font-bold uppercase tracking-tighter">{tag}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Interactive Data Card */}
          <div className="bg-gradient-to-br from-surface-container to-surface-container-lowest p-6 rounded-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between border-l-4 border-primary gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <BarChart3 className="text-primary w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-on-surface">Weekly Archive Growth</p>
                <p className="text-xs text-on-surface-variant">+2.4 GB synced this week</p>
              </div>
            </div>
            <div className="flex -space-x-2">
              <img 
                src="https://picsum.photos/seed/user1/64/64" 
                alt="collaborator 1" 
                className="w-8 h-8 rounded-full border-2 border-surface-container object-cover"
                referrerPolicy="no-referrer"
              />
              <img 
                src="https://picsum.photos/seed/user2/64/64" 
                alt="collaborator 2" 
                className="w-8 h-8 rounded-full border-2 border-surface-container object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="w-8 h-8 rounded-full bg-surface-container-highest border-2 border-surface-container flex items-center justify-center text-[10px] font-bold">+3</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
