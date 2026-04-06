import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            className="w-full h-full object-cover opacity-40 grayscale" 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
            alt="Architecture"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/60 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-8 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="inline-block py-1 px-3 mb-6 rounded-full bg-surface-container-highest/50 border border-outline-variant/20 text-primary text-xs font-bold tracking-[0.2em] uppercase">
              The Indigo Archive
            </span>
            <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter text-on-surface mb-8 leading-[0.9]">
              Architectural <br/>
              <span className="text-primary-container">Depth</span> in Productivity
            </h1>
            <p className="text-xl md:text-2xl text-on-surface-variant font-light mb-12 max-w-xl leading-relaxed">
              Step into your Digital Sanctuary. A place where tasks are masterpieces and focus is the primary design principle.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <motion.button 
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary-gradient text-on-primary px-10 py-5 rounded-lg text-lg font-bold shadow-lg shadow-primary-container/20 transition-all"
              >
                Start Your Archive
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05, backgroundColor: "rgba(var(--color-surface-bright), 0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="border border-outline/30 text-on-surface px-10 py-5 rounded-lg text-lg font-semibold backdrop-blur-sm transition-all"
              >
                View Philosophy
              </motion.button>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-12 right-8 hidden xl:block">
          <div className="flex items-center gap-4 text-outline rotate-90 origin-right">
            <span className="text-xs uppercase tracking-[0.5em] font-bold">Scroll to Explore</span>
            <div className="w-12 h-[1px] bg-outline-variant/40"></div>
          </div>
        </div>
      </section>

      {/* Core Vaults Section */}
      <section className="py-32 px-8 bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-on-surface mb-4">Core Vaults</h2>
              <p className="text-on-surface-variant text-lg max-w-md">Your intellectual assets, organized with structural integrity.</p>
            </div>
            <div className="h-[1px] w-32 bg-primary-container/30 self-center mb-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: 'Todos', desc: 'The blueprint for your daily execution. Precision-engineered task management.', icon: 'CheckCircle2' },
              { title: 'Notes', desc: 'A cavernous space for raw thought and refined strategy to coexist.', icon: 'Edit3', offset: true },
              { title: 'Passwords', desc: 'Fortified encryption layers for your most sensitive digital keys.', icon: 'Key' },
              { title: 'Documents', desc: 'Structural archiving for high-fidelity assets and important files.', icon: 'Folder', offset: true },
            ].map((vault, i) => (
              <motion.div
                key={vault.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className={`group bg-surface-container-low hover:bg-surface-container transition-all duration-500 p-10 rounded-xl relative overflow-hidden border border-transparent hover:border-outline-variant/10 ${vault.offset ? 'lg:mt-8' : ''}`}
              >
                <div className="text-primary mb-8">
                  {/* Placeholder for icons */}
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <CheckCircle2 size={24} />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-on-surface">{vault.title}</h3>
                <p className="text-on-surface-variant font-light">{vault.desc}</p>
                <div className="absolute -bottom-4 -right-4 opacity-5 group-hover:opacity-10 transition-opacity">
                   <CheckCircle2 size={120} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Insights Section */}
      <section className="py-32 px-8 bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Visual Insights</h2>
            <p className="text-on-surface-variant max-w-xl mx-auto">Observe the geometry of your time. Our matrix visualization reveals patterns that hidden lists cannot.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 bg-surface-container rounded-3xl p-12 overflow-hidden relative shadow-2xl">
              <div className="relative z-10">
                <div className="flex justify-between items-center mb-12">
                  <h3 className="text-2xl font-bold">Habit Matrix</h3>
                  <div className="px-4 py-1 rounded-full bg-tertiary-container/20 border border-tertiary/30 text-tertiary text-xs font-bold tracking-widest uppercase">Live View</div>
                </div>
                <div className="grid grid-cols-7 gap-2">
                  {Array.from({ length: 35 }).map((_, i) => (
                    <div 
                      key={i} 
                      className={`aspect-square rounded-sm ${Math.random() > 0.4 ? 'bg-primary-container opacity-80' : 'bg-surface-container-highest opacity-30'}`}
                    ></div>
                  ))}
                </div>
                <div className="mt-8 flex justify-between text-on-surface-variant text-xs font-bold uppercase tracking-widest">
                  <span>Mon</span>
                  <span>Sun</span>
                </div>
              </div>
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-primary/10 blur-[100px]"></div>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-8">
              <div className="bg-surface-container rounded-3xl p-10 flex-1 border border-outline-variant/10">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <span className="text-primary">📅</span>
                  Temporal View
                </h3>
                <div className="space-y-6">
                  {[
                    { time: '09:00 AM', title: 'Deep Focus Session', active: true },
                    { time: '01:30 PM', title: 'Archival Review', active: false },
                    { time: '04:00 PM', title: 'Core Vault Maintenance', active: false },
                  ].map((item, i) => (
                    <div key={i} className={`flex gap-4 items-start border-l-2 ${item.active ? 'border-primary-container' : 'border-outline-variant/30'} pl-4 py-1`}>
                      <div>
                        <div className={`text-xs font-bold uppercase ${item.active ? 'text-primary' : 'text-on-surface-variant'}`}>{item.time}</div>
                        <div className={`font-semibold ${item.active ? 'text-on-surface' : 'text-on-surface-variant'}`}>{item.title}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-surface-container to-surface-container-high rounded-3xl p-10 flex-1 flex flex-col justify-center">
                <div className="text-5xl font-black text-primary mb-2">98.4%</div>
                <div className="text-on-surface font-bold text-lg mb-2">Focus Consistency</div>
                <p className="text-on-surface-variant text-sm">You've maintained peak cognitive output for 12 consecutive days.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 px-8 overflow-hidden relative">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-1/2 relative">
            <div className="relative z-10 aspect-square rounded-tr-[5rem] rounded-bl-[5rem] overflow-hidden">
              <img 
                className="w-full h-full object-cover" 
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop" 
                alt="Workspace"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -top-10 -left-10 w-40 h-40 border-t border-l border-primary/40"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 border-b border-r border-primary/40"></div>
          </div>
          <div className="w-full md:w-1/2">
            <span className="text-primary font-bold tracking-[0.3em] uppercase mb-6 block">Our Philosophy</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">Quiet Work. <br/>Lasting Foundations.</h2>
            <p className="text-on-surface-variant text-lg mb-8 leading-relaxed">
              We reject the chaotic noise of modern tools. Master Architect is built on the premise that true productivity comes from a calm, focused environment. Our interface doesn't scream for your attention; it waits silently for your brilliance.
            </p>
            <ul className="space-y-4 mb-10">
              {['Zero-distraction workspace layout', 'Intentional cognitive loading', 'Asynchronous structural flow'].map((item) => (
                <li key={item} className="flex items-center gap-4 text-on-surface">
                  <CheckCircle2 className="text-primary" size={20} />
                  {item}
                </li>
              ))}
            </ul>
            <button className="group flex items-center gap-4 font-bold text-primary hover:text-on-surface transition-colors">
              Read the Manifesto
              <ArrowRight className="group-hover:translate-x-2 transition-transform" size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-8 bg-surface">
        <div className="max-w-5xl mx-auto bg-surface-container rounded-[2rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-8">Ready to Build Your <br/>Legacy?</h2>
            <p className="text-on-surface-variant text-xl mb-12 max-w-2xl mx-auto">The Archive is open. Enter the Digital Sanctuary today and experience productivity in high fidelity.</p>
            <motion.button 
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary text-on-primary px-12 py-5 rounded-lg text-xl font-black shadow-xl shadow-primary/10 hover:shadow-primary/30 transition-all"
            >
              Start Your Archive Now
            </motion.button>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[120px]"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-container/10 blur-[120px]"></div>
        </div>
      </section>
    </div>
  );
}
