import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon, Clock, MapPin, Users, X, MoreVertical, PlusCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';
import { cn } from '../lib/utils';
import { Task } from '../types';

export default function Calendar() {
  const { tasks, setTasks, addNotification } = useApp();
  const [view, setView] = useState<'week' | 'month' | 'year'>('month');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const [newTask, setNewTask] = useState<Partial<Task>>({
    title: '',
    priority: 'medium',
    category: 'Design',
    completed: false
  });

  const daysInMonth = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const days = new Date(year, month + 1, 0).getDate();
    
    const result = [];
    // Padding for first week
    for (let i = 0; i < firstDay; i++) {
      result.push(null);
    }
    for (let i = 1; i <= days; i++) {
      result.push(new Date(year, month, i));
    }
    return result;
  }, [currentDate]);

  const monthName = currentDate.toLocaleString('default', { month: 'long' });
  const year = currentDate.getFullYear();

  const handlePrev = () => {
    const newDate = new Date(currentDate);
    if (view === 'month') newDate.setMonth(newDate.getMonth() - 1);
    else if (view === 'week') newDate.setDate(newDate.getDate() - 7);
    else newDate.setFullYear(newDate.getFullYear() - 1);
    setCurrentDate(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(currentDate);
    if (view === 'month') newDate.setMonth(newDate.getMonth() + 1);
    else if (view === 'week') newDate.setDate(newDate.getDate() + 7);
    else newDate.setFullYear(newDate.getFullYear() + 1);
    setCurrentDate(newDate);
  };

  const getTasksForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return tasks.filter(t => t.dueDate.startsWith(dateStr));
  };

  const handleAddTask = () => {
    if (!newTask.title || !selectedDate) return;
    const task: Task = {
      ...newTask,
      id: Math.random().toString(36).substring(2, 9),
      dueDate: selectedDate.toISOString(),
    } as Task;
    setTasks(prev => [...prev, task]);
    setIsAddingTask(false);
    setNewTask({ title: '', priority: 'medium', category: 'Design', completed: false });
    addNotification('Task added to calendar', 'success');
  };

  const selectedDateTasks = getTasksForDate(selectedDate);

  return (
    <div className="flex-1 flex flex-col lg:flex-row h-full bg-surface overflow-hidden">
      {/* Calendar Grid Container */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 custom-scrollbar flex flex-col">
        {/* Calendar Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-on-surface tracking-tight italic">{monthName} {year}</h2>
            <p className="text-on-surface-variant font-medium mt-1 text-xs md:text-sm">You have {tasks.filter(t => t.dueDate.startsWith(currentDate.toISOString().slice(0, 7))).length} events scheduled this month.</p>
          </div>
          <div className="flex flex-wrap items-center gap-2 md:gap-4">
            <div className="flex items-center gap-1 bg-surface-container-low p-1 rounded-full border border-outline-variant/10">
              <button onClick={handlePrev} className="p-1.5 hover:bg-surface-container-highest rounded-full transition-colors">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button onClick={handleNext} className="p-1.5 hover:bg-surface-container-highest rounded-full transition-colors">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="flex bg-surface-container-low p-1 rounded-full border border-outline-variant/10">
              {(['week', 'month', 'year'] as const).map(v => (
                <button 
                  key={v}
                  onClick={() => setView(v)}
                  className={cn(
                    "px-4 py-1.5 rounded-full text-sm font-semibold transition-all",
                    view === v ? "bg-primary-container text-on-primary-container shadow-sm" : "text-on-surface-variant hover:text-on-surface"
                  )}
                >
                  {v.charAt(0).toUpperCase() + v.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Calendar Weekday Labels */}
        <div className="grid grid-cols-7 mb-4 border-b border-outline-variant/15">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="py-3 text-center text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/60">{day}</div>
          ))}
        </div>

        {/* Actual Grid */}
        <div className="flex-1 grid grid-cols-7 gap-px bg-outline-variant/10 rounded-xl overflow-hidden border border-outline-variant/15 shadow-2xl min-h-[400px]">
          {daysInMonth.map((date, idx) => {
            const isToday = date && date.toDateString() === new Date().toDateString();
            const isSelected = date && date.toDateString() === selectedDate.toDateString();
            const dateTasks = date ? getTasksForDate(date) : [];
            
            return (
              <div 
                key={idx} 
                onClick={() => { if (date) setSelectedDate(date); }}
                className={cn(
                  "bg-surface p-1 md:p-3 min-h-[60px] md:min-h-[100px] flex flex-col hover:bg-surface-container-low transition-colors group relative cursor-pointer",
                  !date && "bg-surface-container-lowest/50 opacity-40 cursor-default",
                  isSelected && "bg-surface-container ring-2 ring-primary-container/40 ring-inset shadow-[inset_0_0_24px_rgba(129,140,248,0.1)]"
                )}
              >
                {date && (
                  <>
                    <span className={cn(
                      "text-[10px] md:text-xs font-bold mb-1 md:mb-2",
                      isToday ? "bg-primary text-on-primary w-5 h-5 md:w-6 md:h-6 flex items-center justify-center rounded-full" : "text-on-surface",
                      isSelected && !isToday ? "text-primary font-black" : ""
                    )}>
                      {date.getDate()}
                    </span>
                    <div className="space-y-0.5 md:space-y-1">
                      {dateTasks.slice(0, 2).map(task => (
                        <div 
                          key={task.id}
                          className={cn(
                            "px-1 md:px-2 py-0.5 rounded text-[7px] md:text-[9px] font-bold truncate",
                            task.priority === 'high' ? "bg-error/10 text-error border border-error/20" :
                            task.priority === 'medium' ? "bg-primary/10 text-primary border border-primary/20" :
                            "bg-tertiary/10 text-tertiary border border-tertiary/20"
                          )}
                        >
                          <span className="hidden md:inline">{task.title}</span>
                          <span className="md:hidden">•</span>
                        </div>
                      ))}
                      {dateTasks.length > 2 && (
                        <div className="text-[7px] md:text-[9px] text-on-surface-variant/40 font-bold pl-1">
                          + {dateTasks.length - 2}
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Detail Panel */}
      <aside className="w-full lg:w-80 xl:w-96 bg-surface-container-low border-t lg:border-t-0 lg:border-l border-outline-variant/10 flex flex-col overflow-y-auto custom-scrollbar shrink-0">
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-black text-on-surface tracking-tighter uppercase text-xs opacity-50 tracking-widest">Selected Day</h3>
            <span className="text-[10px] font-bold bg-primary/10 text-primary px-2 py-0.5 rounded uppercase tracking-tighter">
              {selectedDate.toLocaleDateString(undefined, { month: 'long', day: 'numeric' })}
            </span>
          </div>

          <div className="space-y-6">
            {selectedDateTasks.length > 0 ? (
              selectedDateTasks.map(task => (
                <div 
                  key={task.id}
                  className="bg-surface-container-high rounded-xl p-5 shadow-2xl shadow-black/20 border border-outline-variant/15 relative overflow-hidden group"
                >
                  <div className={cn(
                    "absolute top-0 left-0 w-1 h-full",
                    task.priority === 'high' ? "bg-error" : task.priority === 'medium' ? "bg-primary" : "bg-tertiary"
                  )}></div>
                  <div className="flex justify-between items-start mb-4">
                    <div className={cn(
                      "text-[10px] font-black uppercase tracking-widest",
                      task.priority === 'high' ? "text-error" : task.priority === 'medium' ? "text-primary" : "text-tertiary"
                    )}>{task.category}</div>
                    <MoreVertical className="text-on-surface-variant w-4 h-4" />
                  </div>
                  <h4 className="text-lg font-bold text-on-surface mb-1">{task.title}</h4>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-on-surface-variant mb-6">
                    <Clock className="w-3.5 h-3.5" /> {task.dueDate.split('T')[1]?.slice(0, 5) || 'All Day'}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-surface-container-highest rounded-full flex items-center justify-center mx-auto opacity-20">
                  <CalendarIcon className="w-8 h-8" />
                </div>
                <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">No events scheduled</p>
              </div>
            )}

            {/* Visual Callout */}
            <div className="mt-8 relative rounded-xl overflow-hidden aspect-video group">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0J3v6a_cBdbjk09YaTbti1OXdltqXNR8Wv_5ee0FakcIF_u3P4qh9TkyL55ojwXjyrRWEFtP4hs7QjIYDqQXat8Abunm4Oev1Ossjkxn-xe7hJ3wGxYGrp9to5iBHxWfXWOyohYTDkOqrdThVvXPIDX6B086VTfqORpWwhmVtOAz8Knqo7Ee_zF94_l4OanwlZVpS7ojWtuZ_VI9xk9XxPp6sqcGbW9OIp7uyI8wCtSCNRSlzVMw5TUgU2zRJrTWYBsjJ6QRvk1M" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                alt="Workspace"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-dim via-surface-dim/40 to-transparent"></div>
              <div className="absolute bottom-4 left-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-primary">Workspace Note</p>
                <p className="text-xs font-medium text-on-surface leading-tight mt-1">Review the Curator's guide for the upcoming architecture migration.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-auto p-8 bg-surface-container-lowest/30 border-t border-outline-variant/10">
          <button 
            onClick={() => setIsAddingTask(true)}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-lg border border-outline-variant/20 text-on-surface-variant text-[10px] font-bold uppercase tracking-widest hover:bg-surface-bright/20 transition-colors active:scale-95"
          >
            <PlusCircle className="w-4 h-4" />
            Quick Task
          </button>
        </div>
      </aside>

      {/* Add Task Modal */}
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
                <h3 className="text-2xl font-black text-on-surface tracking-tighter italic">Schedule Event</h3>
                <button onClick={() => setIsAddingTask(false)} className="p-2 hover:bg-surface-container-highest rounded-full transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Event Title</label>
                  <input 
                    type="text"
                    autoFocus
                    value={newTask.title}
                    onChange={e => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g. Site Inspection, Client Review"
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
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Category</label>
                    <select 
                      value={newTask.category}
                      onChange={e => setNewTask(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full bg-surface-container-lowest border-none rounded-xl p-4 text-on-surface focus:ring-2 focus:ring-primary/50 transition-all"
                    >
                      <option value="Design">Design</option>
                      <option value="Planning">Planning</option>
                      <option value="Review">Review</option>
                      <option value="Site">Site</option>
                    </select>
                  </div>
                </div>

                <div className="p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/10 flex items-center gap-4">
                  <CalendarIcon className="w-5 h-5 text-primary" />
                  <div className="flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Selected Date</p>
                    <p className="text-sm font-bold text-on-surface">{selectedDate?.toLocaleDateString(undefined, { dateStyle: 'full' })}</p>
                  </div>
                </div>

                <button 
                  onClick={handleAddTask}
                  className="w-full py-4 bg-primary text-on-primary rounded-xl font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all mt-4"
                >
                  Confirm Schedule
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
