import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Building, ArrowRight, User, Mail, Lock, Briefcase } from 'lucide-react';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <main className="relative min-h-screen flex items-center justify-center px-6 py-12 overflow-hidden">
      {/* Background Motif */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <img 
          className="w-full h-full object-cover mix-blend-luminosity" 
          src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=2070&auto=format&fit=crop" 
          alt="Brutalist Architecture"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-surface via-transparent to-surface"></div>
      </div>

      <div className="relative z-10 w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-0 overflow-hidden rounded-xl shadow-2xl">
        {/* Left Side: Form */}
        <section className="bg-surface-container-highest/70 backdrop-blur-xl p-8 md:p-12 border-r border-outline-variant/10 min-h-[600px] flex flex-col">
          <div className="mb-12">
            <h1 className="text-3xl font-bold tracking-tighter text-on-surface mb-2 uppercase">Master Architect</h1>
            <p className="text-on-surface-variant text-sm tracking-widest uppercase">The Digital Curator / {isLogin ? 'Authentication' : 'Construction'}</p>
          </div>
          
          <AnimatePresence mode="wait">
            <motion.div 
              key={isLogin ? 'login' : 'signup'}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8 flex-grow"
            >
              <header>
                <h2 className="text-2xl font-light text-on-surface">{isLogin ? 'Welcome Back.' : 'Join the Archive.'}</h2>
                <p className="text-on-surface-variant mt-1">{isLogin ? 'Access your curated workspaces.' : 'Begin your architectural journey today.'}</p>
              </header>
              
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                {!isLogin && (
                  <div className="space-y-2">
                    <label className="block text-[10px] uppercase tracking-widest text-on-surface-variant">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-outline" size={16} />
                      <input 
                        className="w-full bg-surface-container-highest border-none rounded-lg p-4 pl-12 text-on-surface focus:ring-2 focus:ring-primary-container transition-all outline-none" 
                        placeholder="Julian Thorne" 
                        type="text"
                      />
                    </div>
                  </div>
                )}
                
                <div className="space-y-2">
                  <label className="block text-[10px] uppercase tracking-widest text-on-surface-variant">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-outline" size={16} />
                    <input 
                      className="w-full bg-surface-container-highest border-none rounded-lg p-4 pl-12 text-on-surface focus:ring-2 focus:ring-primary-container transition-all outline-none" 
                      placeholder="curator@architect.io" 
                      type="email"
                    />
                  </div>
                </div>

                {!isLogin && (
                  <div className="space-y-2">
                    <label className="block text-[10px] uppercase tracking-widest text-on-surface-variant">Profession / Role</label>
                    <div className="relative">
                      <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-outline" size={16} />
                      <input 
                        className="w-full bg-surface-container-highest border-none rounded-lg p-4 pl-12 text-on-surface focus:ring-2 focus:ring-primary-container transition-all outline-none" 
                        placeholder="Digital Curator" 
                        type="text"
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="block text-[10px] uppercase tracking-widest text-on-surface-variant">Password</label>
                    {isLogin && <a className="text-[10px] uppercase tracking-widest text-primary hover:text-on-surface transition-colors" href="#">Recover Keys</a>}
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-outline" size={16} />
                    <input 
                      className="w-full bg-surface-container-highest border-none rounded-lg p-4 pl-12 text-on-surface focus:ring-2 focus:ring-primary-container transition-all outline-none" 
                      placeholder="••••••••••••" 
                      type="password"
                    />
                  </div>
                </div>

                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-primary-gradient text-on-primary font-bold rounded-lg shadow-xl tracking-tight mt-4"
                  onClick={() => window.location.href = '/dashboard?login=true'}
                >
                  {isLogin ? 'Enter the Archive' : 'Construct Account'}
                </motion.button>
              </form>

              <div className="relative flex items-center py-4">
                <div className="flex-grow border-t border-outline-variant/20"></div>
                <span className="flex-shrink mx-4 text-[10px] uppercase tracking-[0.2em] text-outline">Verification Hub</span>
                <div className="flex-grow border-t border-outline-variant/20"></div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center gap-3 py-3 px-4 bg-surface-container-low hover:bg-surface-bright border border-outline-variant/10 rounded-lg transition-all group"
                >
                  <span className="text-xs font-bold uppercase tracking-widest">Google</span>
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center gap-3 py-3 px-4 bg-surface-container-low hover:bg-surface-bright border border-outline-variant/10 rounded-lg transition-all group"
                >
                  <span className="text-xs font-bold uppercase tracking-widest">Apple</span>
                </motion.button>
              </div>
            </motion.div>
          </AnimatePresence>
          
          <div className="mt-8 pt-8 border-t border-outline-variant/10 text-center">
            <p className="text-xs text-on-surface-variant">
              {isLogin ? "Don't have an instance yet?" : "Already an inhabitant?"}
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="ml-2 text-primary font-bold hover:underline"
              >
                {isLogin ? 'Create New Instance' : 'Enter the Archive'}
              </button>
            </p>
          </div>
        </section>

        {/* Right Side: Showcase */}
        <section className="bg-surface-container p-8 md:p-12 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <img 
              className="w-full h-full object-cover" 
              src="https://images.unsplash.com/photo-1518005020251-58296d80ca67?q=80&w=1964&auto=format&fit=crop" 
              alt="Texture"
              referrerPolicy="no-referrer"
            />
          </div>
          
          <div className="relative z-10">
            <div className="mb-12">
              <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-tertiary mb-4">{isLogin ? 'Returning Curator' : 'New Inhabitants'}</h3>
              <h2 className="text-4xl font-light leading-tight text-on-surface tracking-tighter">
                {isLogin ? 'Your sanctuary awaits your ' : 'Construct your '}
                <span className="font-bold text-primary italic">{isLogin ? 'return' : 'vision'}</span> 
                {isLogin ? '.' : ' from the ground up.'}
              </h2>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="mt-1 w-10 h-10 flex items-center justify-center rounded-lg bg-surface-container-high border border-outline-variant/10">
                  <Building className="text-primary" size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-on-surface">Architectural Rigor</h4>
                  <p className="text-xs text-on-surface-variant leading-relaxed">Precision-engineered interfaces for complex digital curators.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-1 w-10 h-10 flex items-center justify-center rounded-lg bg-surface-container-high border border-outline-variant/10">
                  <ShieldCheck className="text-primary" size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-on-surface">Encrypted Vaults</h4>
                  <p className="text-xs text-on-surface-variant leading-relaxed">Your data is stored within multi-layered cryptographic shards.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 pt-12">
            <p className="text-xs text-on-surface-variant mb-6 leading-relaxed">By joining the Archive, you agree to the <span className="text-primary cursor-pointer hover:underline">Terms of Construction</span> and our <span className="text-primary cursor-pointer hover:underline">Privacy Blueprints</span>.</p>
            <motion.button 
              whileHover={{ x: 10 }}
              className="group flex items-center gap-4 text-on-surface font-bold text-lg hover:text-primary transition-all"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? 'Create New Instance' : 'Enter the Archive'}
              <ArrowRight className="transform group-hover:translate-x-2 transition-transform" size={24} />
            </motion.button>
          </div>
        </section>
      </div>
    </main>
  );
}
