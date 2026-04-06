import React, { useState, useMemo } from 'react';
import { Filter, SortAsc, Calendar, Tag, MoreVertical, Edit2, MapPin, Plus, X, Trash2, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';
import { cn } from '../lib/utils';
import { Task } from '../types';

export default function Tasks() {
  const { tasks, setTasks, addNotification } = useApp();
  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'date' | 'priority' | 'title'>('date');
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  
  const [newTask, setNewTask] = useState<Partial<Task>>({
    title: '',
    priority: 'medium',
    category: 'Work',
    dueDate: new Date().toISOString().split('T')[0],
    completed: false
  });

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed, completedAt: !t.completed ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : undefined } : t));
    addNotification('Task status updated', 'success');
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
    addNotification('Task removed', 'info');
  };

  const handleSaveTask = () => {
    if (!newTask.title) return;

    if (editingTask) {
      setTasks(prev => prev.map(t => t.id === editingTask.id ? { ...t, ...newTask } as Task : t));
      addNotification('Task updated', 'success');
    } else {
      const task: Task = {
        ...newTask,
        id: Math.random().toString(36).substring(2, 9),
      } as Task;
      setTasks(prev => [task, ...prev]);
      addNotification('New task created', 'success');
    }
    
    setIsAddingTask(false);
    setEditingTask(null);
    setNewTask({ title: '', priority: 'medium', category: 'Work', dueDate: new Date().toISOString().split('T')[0], completed: false });
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setNewTask(task);
    setIsAddingTask(true);
  };

  const categories = useMemo(() => {
    const cats = Array.from(new Set(tasks.map(t => t.category)));
    return cats.map(name => ({
      name,
      count: tasks.filter(t => t.category === name).length,
      color: name === 'Security' ? 'bg-primary' : name === 'Work' ? 'bg-tertiary' : 'bg-error'
    }));
  }, [tasks]);

  const filteredAndSortedTasks = useMemo(() => {
    let result = [...tasks];
    
    if (filterCategory) {
      result = result.filter(t => t.category === filterCategory);
    }

    result.sort((a, b) => {
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      if (sortBy === 'priority') {
        const pMap = { urgent: 0, high: 1, medium: 2, low: 3 };
        return pMap[a.priority] - pMap[b.priority];
      }
      return (a.dueDate || '').localeCompare(b.dueDate || '');
    });

    return result;
  }, [tasks, filterCategory, sortBy]);

  const completionRate = Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100) || 0;

  return (
    <div className="px-8 py-8 max-w-7xl mx-auto">
      {/* Hero Header */}
      <section className="mb-12 flex justify-between items-end">
        <div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-on-surface mb-2">The Digital Sanctuary</h2>
          <p className="text-on-surface-variant text-lg">Systematic clarity for your creative workflow.</p>
        </div>
        <button 
          onClick={() => setIsAddingTask(true)}
          className="bg-primary text-on-primary px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-primary/20 active:scale-95 transition-all"
        >
          <Plus className="w-5 h-5" />
          New Task
        </button>
      </section>

      {/* Bento Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Category Sidebar */}
        <div className="md:col-span-3 space-y-4">
          <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/5">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-on-surface-variant">Focal Points</h3>
              {filterCategory && (
                <button onClick={() => setFilterCategory(null)} className="text-[10px] text-primary font-bold uppercase">Clear</button>
              )}
            </div>
            <div className="space-y-4">
              {categories.map(cat => (
                <button 
                  key={cat.name} 
                  onClick={() => setFilterCategory(cat.name)}
                  className={cn(
                    "w-full flex items-center justify-between group transition-all",
                    filterCategory === cat.name ? "translate-x-1" : ""
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span className={cn(
                      "w-2 h-2 rounded-full transition-all", 
                      cat.color,
                      filterCategory === cat.name ? "scale-150 shadow-[0_0_10px_currentColor]" : "opacity-60"
                    )}></span>
                    <span className={cn(
                      "text-sm font-semibold transition-colors",
                      filterCategory === cat.name ? "text-primary" : "text-on-surface group-hover:text-primary"
                    )}>{cat.name}</span>
                  </div>
                  <span className="text-[10px] bg-surface-container-high px-2 py-0.5 rounded text-on-surface-variant">{cat.count}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="bg-gradient-to-br from-surface-container to-surface-container-low p-6 rounded-xl relative overflow-hidden">
            <div className="relative z-10">
              <h4 className="text-sm font-bold text-on-surface mb-2">Architect's Tip</h4>
              <p className="text-xs text-on-surface-variant leading-relaxed">Deep work sessions are most effective when scheduled before 11 AM.</p>
            </div>
            <div className="absolute -right-4 -bottom-4 opacity-10">
              <span className="text-6xl font-black italic">A</span>
            </div>
          </div>
        </div>

        {/* Active Tasks Centerpiece */}
        <div className="md:col-span-9 space-y-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <h3 className="text-xl font-bold tracking-tight text-on-surface">Active Horizon</h3>
              <span className="bg-primary/10 text-primary text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                {filterCategory || 'All Tasks'}
              </span>
            </div>
            <div className="flex gap-2">
              <div className="relative group">
                <button className="p-2 rounded-lg bg-surface-container hover:bg-surface-bright transition-colors text-on-surface-variant flex items-center gap-2">
                  <SortAsc className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">{sortBy}</span>
                </button>
                <div className="absolute top-full right-0 mt-2 w-32 bg-surface-container-high rounded-xl shadow-2xl border border-white/5 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all z-20 overflow-hidden">
                  {(['date', 'priority', 'title'] as const).map(s => (
                    <button 
                      key={s}
                      onClick={() => setSortBy(s)}
                      className={cn(
                        "w-full text-left px-4 py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-primary/10 transition-colors",
                        sortBy === s ? "text-primary" : "text-on-surface-variant"
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Task List */}
          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {filteredAndSortedTasks.map((task) => (
                <motion.div 
                  key={task.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="group bg-surface-container hover:bg-surface-container-high p-5 rounded-xl transition-all duration-300 flex items-center justify-between"
                >
                  <div className="flex items-center gap-6">
                    <div className="relative flex items-center justify-center">
                      <input 
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleTask(task.id)}
                        className="w-6 h-6 rounded border-2 border-outline-variant bg-transparent checked:bg-primary checked:border-primary focus:ring-0 transition-all cursor-pointer"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className={cn(
                          "font-semibold group-hover:text-primary transition-colors",
                          task.completed ? "text-on-surface-variant line-through" : "text-on-surface"
                        )}>{task.title}</h4>
                        {task.priority === 'high' && <span className="bg-error-container/30 text-error text-[10px] px-2 py-0.5 rounded font-bold tracking-tighter uppercase">High Priority</span>}
                        {task.priority === 'urgent' && <span className="bg-error-container/20 text-error/80 text-[10px] px-2 py-0.5 rounded font-bold tracking-tighter uppercase">Urgent</span>}
                        {task.priority === 'medium' && <span className="bg-tertiary-container/30 text-tertiary text-[10px] px-2 py-0.5 rounded font-bold tracking-tighter uppercase">Medium</span>}
                      </div>
                      <div className="flex items-center gap-4 text-xs text-on-surface-variant">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" /> {task.dueDate || 'No date'}
                        </span>
                        <span className="flex items-center gap-1">
                          {task.priority === 'urgent' ? <MapPin className="w-3.5 h-3.5" /> : <Tag className="w-3.5 h-3.5" />} {task.category}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                    <button onClick={() => handleEdit(task)} className="p-2 hover:bg-surface-container-highest rounded-lg text-on-surface-variant"><Edit2 className="w-4 h-4" /></button>
                    <button onClick={() => deleteTask(task.id)} className="p-2 hover:bg-error/20 rounded-lg text-error"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Progress Visualization */}
          <div className="mt-12 bg-surface-container-lowest p-8 rounded-2xl">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-on-surface-variant mb-2">Clarity Pulse</h3>
                <p className="text-3xl font-black text-on-surface">{completionRate}%</p>
                <p className="text-xs text-tertiary">Total tasks completed</p>
              </div>
              <div className="flex items-end gap-1.5 h-20">
                {[40, 60, 30, 80, 100, 20, 15].map((h, i) => (
                  <div 
                    key={i} 
                    className={cn(
                      "w-2 rounded-full transition-all duration-500",
                      i === 4 ? "bg-primary shadow-[0_0_15px_rgba(189,194,255,0.3)]" : "bg-primary/20"
                    )}
                    style={{ height: `${h}%` }}
                  ></div>
                ))}
              </div>
            </div>
            <div className="w-full bg-surface-container rounded-full h-1">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${completionRate}%` }}
                className="bg-primary h-full rounded-full shadow-[0_0_10px_rgba(189,194,255,0.5)]"
              ></motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {isAddingTask && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddingTask(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-surface-container-high rounded-[2.5rem] p-10 shadow-2xl border border-white/5"
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-black text-on-surface tracking-tighter italic">
                  {editingTask ? 'Edit Objective' : 'New Objective'}
                </h3>
                <button onClick={() => setIsAddingTask(false)} className="p-2 hover:bg-surface-container-highest rounded-full transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Title</label>
                  <input 
                    type="text"
                    value={newTask.title}
                    onChange={e => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="What needs to be done?"
                    className="w-full bg-surface-container-lowest border-none rounded-xl p-4 text-on-surface placeholder:text-on-surface-variant/30 focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Priority</label>
                    <select 
                      value={newTask.priority}
                      onChange={e => setNewTask(prev => ({ ...prev, priority: e.target.value as any }))}
                      className="w-full bg-surface-container-lowest border-none rounded-xl p-4 text-on-surface focus:ring-2 focus:ring-primary/50 transition-all"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Category</label>
                    <input 
                      type="text"
                      value={newTask.category}
                      onChange={e => setNewTask(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full bg-surface-container-lowest border-none rounded-xl p-4 text-on-surface focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Due Date</label>
                  <input 
                    type="date"
                    value={newTask.dueDate}
                    onChange={e => setNewTask(prev => ({ ...prev, dueDate: e.target.value }))}
                    className="w-full bg-surface-container-lowest border-none rounded-xl p-4 text-on-surface focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>

                <button 
                  onClick={handleSaveTask}
                  className="w-full py-4 bg-primary text-on-primary rounded-xl font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all mt-4"
                >
                  {editingTask ? 'Update Objective' : 'Deploy Task'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
