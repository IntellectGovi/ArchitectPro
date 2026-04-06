import React from 'react';
import { motion } from 'motion/react';
import { Mail, Building2, Send, HelpCircle } from 'lucide-react';

export default function Contact() {
  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-12 gap-12 items-start">
        {/* Left Column */}
        <div className="lg:col-span-5 space-y-12">
          <header className="space-y-6">
            <span className="text-tertiary font-bold tracking-[0.2em] uppercase text-xs">Get in Touch</span>
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tighter leading-[1.1] text-on-surface">
              Let’s Build the <span className="text-primary">Next Layer.</span>
            </h1>
            <p className="text-on-surface-variant text-lg leading-relaxed max-w-md">
              Whether you're curious about features, pricing, or enterprise-scale deployments, our curators are ready to assist.
            </p>
          </header>

          <div className="grid gap-4">
            <div className="group bg-surface-container-low p-8 rounded-xl transition-all duration-300 hover:bg-surface-container">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-surface-container-highest flex items-center justify-center text-primary">
                  <Mail size={24} />
                </div>
                <h3 className="text-xl font-bold">General Support</h3>
              </div>
              <p className="text-on-surface-variant mb-4">Immediate assistance with your workspace and architectural tools.</p>
              <a className="text-primary font-semibold flex items-center gap-2 group-hover:gap-3 transition-all" href="mailto:support@masterarchitect.com">
                support@masterarchitect.com
              </a>
            </div>

            <div className="group bg-surface-container-low p-8 rounded-xl transition-all duration-300 hover:bg-surface-container">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-surface-container-highest flex items-center justify-center text-tertiary">
                  <Building2 size={24} />
                </div>
                <h3 className="text-xl font-bold">Enterprise Solutions</h3>
              </div>
              <p className="text-on-surface-variant mb-4">Custom deployments, SLA guarantees, and dedicated infrastructure.</p>
              <a className="text-tertiary font-semibold flex items-center gap-2 group-hover:gap-3 transition-all" href="mailto:enterprise@masterarchitect.com">
                enterprise@masterarchitect.com
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Form */}
        <div className="lg:col-span-7">
          <div className="bg-surface-container p-1 rounded-2xl shadow-2xl">
            <div className="bg-surface p-8 md:p-12 rounded-[calc(1rem-2px)]">
              <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant ml-1">Full Name</label>
                    <input 
                      className="w-full bg-surface-container-highest border-none rounded-lg p-4 text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary-container transition-all outline-none" 
                      placeholder="John Doe" 
                      type="text"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant ml-1">Email Address</label>
                    <input 
                      className="w-full bg-surface-container-highest border-none rounded-lg p-4 text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary-container transition-all outline-none" 
                      placeholder="john@example.com" 
                      type="email"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant ml-1">Subject</label>
                  <select className="w-full bg-surface-container-highest border-none rounded-lg p-4 text-on-surface focus:ring-2 focus:ring-primary-container transition-all outline-none appearance-none">
                    <option>Technical Question</option>
                    <option>Billing Inquiry</option>
                    <option>Partnership Proposal</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant ml-1">Your Message</label>
                  <textarea 
                    className="w-full bg-surface-container-highest border-none rounded-lg p-4 text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary-container transition-all outline-none resize-none" 
                    placeholder="Describe your architectural vision..." 
                    rows={6}
                  ></textarea>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-primary-gradient text-on-primary py-5 rounded-lg font-black text-lg tracking-tight hover:brightness-110 transition-all flex items-center justify-center gap-3" 
                  type="submit"
                >
                  Dispatch Message
                  <Send size={20} />
                </motion.button>
              </form>
            </div>
          </div>

          <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-6 p-8 bg-surface-container-low rounded-xl border border-outline-variant/10">
            <div className="flex items-center gap-5">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <HelpCircle size={20} />
              </div>
              <div>
                <h4 className="font-bold">Need a quick answer?</h4>
                <p className="text-sm text-on-surface-variant">Browse our extensive documentation and architectural guides.</p>
              </div>
            </div>
            <a className="whitespace-nowrap px-6 py-3 bg-surface-container-high rounded-full text-sm font-bold text-on-surface hover:bg-surface-bright transition-colors" href="#">
              Visit Help Center
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
