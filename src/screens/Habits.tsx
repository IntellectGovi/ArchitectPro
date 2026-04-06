import React, { useState, useMemo } from 'react';
import { Plus, Check, Flame, Target, Trophy, Droplets, Zap, Moon, Sun, Activity, X, BarChart3, TrendingUp, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';
import { cn } from '../lib/utils';
import { Habit } from '../types';

const ICON_MAP: Record<string, any> = {
  'Droplets': Droplets,
  'Zap': Zap,
  'Moon': Moon,
  'Sun': Sun,
  'Activity': Activity,
};

export default function Habits() {
  const { habits, setHabits, addNotification } = useApp();
  const [isAddingHabit, setIsAddingHabit] = useState(false);
  const [newHabit, setNewHabit] = useState<Partial<Habit>>({
    name: '',
    icon: 'Droplets',
    color: 'primary',
    target: 1,
    completedDays: []
  });

  const today = new Date().toISOString().split('T')[0];

  const toggleHabit = (id: string) => {
    setHabits(prev => prev.map(h => {
      if (h.id === id) {
        const isCompletedToday = h.completedDays.includes(today);
        const newCompletedDays = isCompletedToday 
          ? h.completedDays.filter(d => d !== today)
          : [...h.completedDays, today];
        
        if (!isCompletedToday) addNotification(`Habit "${h.name}" completed for today!`, 'success');
        
        return { ...h, completedDays: newCompletedDays };
      }
      return h;
    }));
  };

  const handleAddHabit = () => {
    if (!newHabit.name) return;
    const habit: Habit = {
      ...newHabit,
      id: Math.random().toString(36).substring(2, 9),
      streak: 0,
      completion: 0,
      completedDays: []
    } as Habit;
    setHabits(prev => [...prev, habit]);
    setIsAddingHabit(false);
    setNewHabit({ name: '', icon: 'Droplets', color: 'primary', target: 1, completedDays: [] });
    addNotification('New habit established', 'success');
  };

  const calculateStats = (habit: Habit) => {
    const totalDays = 30; // Last 30 days for completion %
    const completion = Math.round((habit.completedDays.length / totalDays) * 100);
    
    // Simple streak calculation (consecutive days including today or yesterday)
    let streak = 0;
    const sortedDays = [...habit.completedDays].sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
    
    if (sortedDays.length > 0) {
      const lastDay = new Date(sortedDays[0]);
      const todayDate = new Date(today);
      const diff = (todayDate.getTime() - lastDay.getTime()) / (1000 * 3600 * 24);
      
      if (diff <= 1) {
        streak = 1;
        for (let i = 0; i < sortedDays.length - 1; i++) {
          const d1 = new Date(sortedDays[i]);
          const d2 = new Date(sortedDays[i+1]);
          const dDiff = (d1.getTime() - d2.getTime()) / (1000 * 3600 * 24);
          if (dDiff === 1) streak++;
          else break;
        }
      }
    }
    
    return { streak, completion };
  };

  const overallCompletion = useMemo(() => {
    if (habits.length === 0) return 0;
    const completedToday = habits.filter(h => h.completedDays.includes(today)).length;
    return Math.round((completedToday / habits.length) * 100);
  }, [habits, today]);

  return (
    <div className="p-10 max-w-7xl mx-auto space-y-12 bg-surface min-h-screen">
      <section className="flex flex-col md:flex-row justify-between items-end gap-6">
        <div className="space-y-2">
          <span className="text-primary font-bold tracking-[0.3em] uppercase text-[10px]">Performance Archive</span>
          <h2 className="text-5xl font-extrabold tracking-tighter text-on-surface italic">The Ritual Engine</h2>
          <p className="text-on-surface-variant max-w-lg">Forging discipline through architectural repetition. Track your consistency matrix and maintain the structural integrity of your routine.</p>
        </div>
        <button 
          onClick={() => setIsAddingHabit(true)}
          className="bg-primary text-on-primary px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-primary/20 active:scale-95 transition-all"
        >
          <Plus className="w-5 h-5" />
          New Ritual
        </button>
      </section>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface-container p-8 rounded-2xl relative overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:scale-110 transition-transform">
            <Target className="w-32 h-32" />
          </div>
          <p className="text-xs font-black uppercase tracking-[0.3em] text-primary mb-2">Daily Integrity</p>
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-black tracking-tighter">{overallCompletion}%</span>
            <span className="text-on-surface-variant text-sm font-bold">Completion</span>
          </div>
          <div className="mt-6 h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${overallCompletion}%` }}
              className="h-full bg-primary"
            />
          </div>
        </div>

        <div className="bg-surface-container p-8 rounded-2xl relative overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:scale-110 transition-transform">
            <Flame className="w-32 h-32" />
          </div>
          <p className="text-xs font-black uppercase tracking-[0.3em] text-tertiary mb-2">Peak Momentum</p>
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-black tracking-tighter">
              {Math.max(...habits.map(h => calculateStats(h).streak), 0)}
            </span>
            <span className="text-on-surface-variant text-sm font-bold">Day Streak</span>
          </div>
          <p className="mt-4 text-xs text-on-surface-variant/60 font-medium italic">"Consistency is the architecture of excellence."</p>
        </div>

        <div className="bg-surface-container p-8 rounded-2xl relative overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:scale-110 transition-transform">
            <Trophy className="w-32 h-32" />
          </div>
          <p className="text-xs font-black uppercase tracking-[0.3em] text-on-surface-variant mb-2">Rituals Established</p>
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-black tracking-tighter">{habits.length}</span>
            <span className="text-on-surface-variant text-sm font-bold">Active</span>
          </div>
          <div className="mt-6 flex gap-1">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className={cn("h-1 flex-1 rounded-full", i < habits.length ? "bg-primary" : "bg-surface-container-highest")} />
            ))}
          </div>
        </div>
      </div>

      {/* Habits Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {habits.map((habit) => {
            const { streak, completion } = calculateStats(habit);
            const isCompletedToday = habit.completedDays.includes(today);
            const Icon = ICON_MAP[habit.icon] || Droplets;
            
            return (
              <motion.div 
                key={habit.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/10 flex items-center gap-6 group hover:bg-surface-container transition-all"
              >
                <button 
                  onClick={() => toggleHabit(habit.id)}
                  className={cn(
                    "w-16 h-16 rounded-2xl flex items-center justify-center transition-all relative overflow-hidden",
                    isCompletedToday ? "bg-primary text-on-primary shadow-lg shadow-primary/30" : "bg-surface-container-highest text-on-surface-variant hover:scale-105"
                  )}
                >
                  {isCompletedToday ? <Check className="w-8 h-8" /> : <Icon className="w-8 h-8" />}
                  {isCompletedToday && (
                    <motion.div 
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1.5, opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0 bg-white rounded-full"
                    />
                  )}
                </button>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-lg truncate">{habit.name}</h4>
                    <div className="flex items-center gap-1 text-tertiary">
                      <Flame className="w-3.5 h-3.5 fill-current" />
                      <span className="text-xs font-black">{streak}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/60">
                      <span>{completion}% Consistency</span>
                      <span>{habit.completedDays.length} / 30 Days</span>
                    </div>
                    <div className="h-1 w-full bg-surface-container-highest rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${completion}%` }}
                        className={cn("h-full", habit.color === 'primary' ? "bg-primary" : "bg-tertiary")}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  {Array.from({ length: 7 }).map((_, i) => {
                    const date = new Date();
                    date.setDate(date.getDate() - (6 - i));
                    const dateStr = date.toISOString().split('T')[0];
                    const isDone = habit.completedDays.includes(dateStr);
                    return (
                      <div 
                        key={i} 
                        className={cn(
                          "w-2 h-2 rounded-sm transition-colors",
                          isDone ? "bg-primary" : "bg-surface-container-highest"
                        )}
                        title={dateStr}
                      />
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Add Habit Modal */}
      <AnimatePresence>
        {isAddingHabit && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddingHabit(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-surface-container-high rounded-[2.5rem] p-10 shadow-2xl border border-white/5"
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-black text-on-surface tracking-tighter italic">Establish Ritual</h3>
                <button onClick={() => setIsAddingHabit(false)} className="p-2 hover:bg-surface-container-highest rounded-full transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Ritual Name</label>
                  <input 
                    type="text"
                    autoFocus
                    value={newHabit.name}
                    onChange={e => setNewHabit(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g. Morning Meditation, Deep Work"
                    className="w-full bg-surface-container-lowest border-none rounded-xl p-4 text-on-surface placeholder:text-on-surface-variant/30 focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Icon</label>
                    <div className="grid grid-cols-5 gap-2">
                      {Object.keys(ICON_MAP).map(iconName => {
                        const Icon = ICON_MAP[iconName];
                        return (
                          <button 
                            key={iconName}
                            onClick={() => setNewHabit(prev => ({ ...prev, icon: iconName }))}
                            className={cn(
                              "p-2 rounded-lg border transition-all",
                              newHabit.icon === iconName ? "bg-primary/20 border-primary text-primary" : "bg-surface-container-lowest border-transparent text-on-surface-variant"
                            )}
                          >
                            <Icon className="w-5 h-5 mx-auto" />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Color Theme</label>
                    <div className="flex gap-2">
                      {['primary', 'tertiary'].map(color => (
                        <button 
                          key={color}
                          onClick={() => setNewHabit(prev => ({ ...prev, color: color as any }))}
                          className={cn(
                            "w-8 h-8 rounded-full border-2 transition-all",
                            color === 'primary' ? "bg-primary" : "bg-tertiary",
                            newHabit.color === color ? "border-white scale-110" : "border-transparent"
                          )}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <button 
                  onClick={handleAddHabit}
                  className="w-full py-4 bg-primary text-on-primary rounded-xl font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all mt-4"
                >
                  Initiate Ritual
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
