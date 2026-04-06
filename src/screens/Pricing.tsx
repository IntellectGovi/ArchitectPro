import React from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

const tiers = [
  {
    name: 'Apprentice',
    price: '0',
    description: 'For the casual curator starting their architectural journey.',
    features: [
      '1 Core Vault (Todos)',
      'Basic Markdown Notes',
      'Standard Encryption',
      'Mobile Access',
    ],
    cta: 'Start Building',
    featured: false,
  },
  {
    name: 'Architect',
    price: '12',
    description: 'The standard for modern professionals seeking structural depth.',
    features: [
      'All Core Vaults',
      'Visual Insights Matrix',
      'Advanced Encryption Shards',
      'Priority Archival Support',
      'Custom Themes',
    ],
    cta: 'Enter the Sanctuary',
    featured: true,
  },
  {
    name: 'Master',
    price: '29',
    description: 'Enterprise-grade infrastructure for high-fidelity legacies.',
    features: [
      'Unlimited Vault Instances',
      'Team Collaboration Layers',
      'SLA Guarantee',
      'Dedicated Infrastructure',
      'White-glove Onboarding',
    ],
    cta: 'Contact Sales',
    featured: false,
  },
];

export default function Pricing() {
  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4 block"
          >
            Investment Tiers
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6"
          >
            Pricing for <span className="text-primary-container">Legacies.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-on-surface-variant text-xl max-w-2xl mx-auto"
          >
            Choose the structural integrity that matches your ambition. No hidden fees, just pure architectural focus.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className={`relative p-8 rounded-2xl flex flex-col h-full transition-all duration-500 ${
                tier.featured 
                  ? 'bg-surface-container-highest border-2 border-primary/30 shadow-2xl scale-105 z-10' 
                  : 'bg-surface-container border border-outline-variant/10 hover:border-outline-variant/30'
              }`}
            >
              {tier.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-on-primary px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">
                  Most Popular
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-black">${tier.price}</span>
                  <span className="text-on-surface-variant text-sm">/month</span>
                </div>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  {tier.description}
                </p>
              </div>

              <div className="space-y-4 mb-12 flex-grow">
                {tier.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <div className="mt-1 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Check size={12} className="text-primary" />
                    </div>
                    <span className="text-sm text-on-surface-variant">{feature}</span>
                  </div>
                ))}
              </div>

              <motion.button 
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 group ${
                  tier.featured 
                    ? 'bg-primary-gradient text-on-primary shadow-lg shadow-primary/20' 
                    : 'bg-surface-container-high text-on-surface hover:bg-surface-bright'
                }`}
              >
                {tier.cta}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Comparison Table Link */}
        <div className="mt-24 text-center">
          <p className="text-on-surface-variant mb-6">Need a custom blueprint for your organization?</p>
          <button className="text-primary font-bold hover:underline underline-offset-8 decoration-2">
            Explore Enterprise Architecture
          </button>
        </div>
      </div>
    </div>
  );
}
