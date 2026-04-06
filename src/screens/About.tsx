import React from 'react';
import { motion } from 'motion/react';
import { Layers, Diamond, Eye, Building } from 'lucide-react';

export default function About() {
  return (
    <div className="pt-32 pb-20">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-8 mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <span className="inline-block px-3 py-1 bg-surface-container-high text-tertiary text-xs font-bold tracking-[0.1em] uppercase rounded-sm mb-6">The Digital Curator</span>
            <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter text-on-surface mb-8 leading-[0.9]">
              Building the <br/><span className="text-primary">Digital Sanctuary.</span>
            </h1>
            <p className="text-xl text-on-surface-variant max-w-2xl leading-relaxed">
              In an era of digital noise, we build spaces of silence and focus. Master Architect is the scaffolding for the modern professional’s intellectual workspace.
            </p>
          </div>
          <div className="lg:col-span-5 relative">
            <div className="aspect-square rounded-xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2069&auto=format&fit=crop" 
                alt="Digital Sanctuary" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 p-6 bg-surface-container-highest/80 backdrop-blur-xl rounded-xl border border-outline/10 shadow-xl hidden md:block">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container">
                  <Building size={24} />
                </div>
                <div>
                  <div className="text-xs text-primary font-bold uppercase tracking-widest">Philosophy</div>
                  <div className="text-on-surface font-semibold">Architectural Integrity</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-surface-container-low py-32">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col md:flex-row gap-16">
            <div className="md:w-1/3">
              <h2 className="text-4xl font-bold tracking-tight text-on-surface">Our Mission</h2>
              <div className="h-1 w-12 bg-tertiary mt-4"></div>
            </div>
            <div className="md:w-2/3">
              <p className="text-3xl font-light text-on-surface leading-snug mb-12">
                To empower the Digital Curator by providing a medium where thoughts are not just stored, but curated with the precision of an architect and the soul of a gallery owner.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-8 bg-surface-container rounded-xl">
                  <Diamond className="text-primary mb-4" size={32} />
                  <h3 className="text-on-surface font-bold text-xl mb-2">Intentionality</h3>
                  <p className="text-on-surface-variant">Every interaction is designed to minimize cognitive load and maximize creative flow.</p>
                </div>
                <div className="p-8 bg-surface-container rounded-xl">
                  <Eye className="text-primary mb-4" size={32} />
                  <h3 className="text-on-surface font-bold text-xl mb-2">Clarity</h3>
                  <p className="text-on-surface-variant">We strip away the non-essential to reveal the structural beauty of your data.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Section */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-on-surface mb-4">The Architectural Approach</h2>
            <p className="text-on-surface-variant">How we build the sanctuary.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[600px]">
            <div className="md:col-span-8 bg-surface-container-high rounded-xl overflow-hidden relative group p-8 flex flex-col justify-end">
              <img 
                src="https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=2070&auto=format&fit=crop" 
                alt="Structural Fluidity" 
                className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity"
                referrerPolicy="no-referrer"
              />
              <div className="relative z-10">
                <h3 className="text-3xl font-bold text-on-surface mb-2">Structural Fluidity</h3>
                <p className="text-on-surface-variant max-w-lg">Our interface adapts to your workflow, creating a seamless transition between high-level curation and deep-dive analysis.</p>
              </div>
            </div>
            <div className="md:col-span-4 bg-primary-container rounded-xl p-8 flex flex-col justify-between text-on-primary-container">
              <Layers size={48} />
              <div>
                <h3 className="text-2xl font-bold mb-2">Layered Intelligence</h3>
                <p className="opacity-80">A hierarchy of surfaces designed to keep your most important insights within reach at all times.</p>
              </div>
            </div>
            <div className="md:col-span-4 bg-surface-container rounded-xl p-8 border border-outline/5">
              <div className="flex items-center gap-2 text-tertiary mb-4">
                <span className="text-xs font-bold uppercase tracking-widest">Editorial Accent</span>
              </div>
              <h3 className="text-xl font-bold text-on-surface mb-2">The Progress Prism</h3>
              <p className="text-on-surface-variant">Real-time status indicators that provide high-importance feedback without disrupting the sanctuary's peace.</p>
            </div>
            <div className="md:col-span-8 bg-surface-container-highest rounded-xl p-8 flex items-center justify-between">
              <div className="max-w-md">
                <h3 className="text-xl font-bold text-on-surface mb-2">Nocturnal Design</h3>
                <p className="text-on-surface-variant">Optimized for low-light environments, reducing eye strain for the late-night visionaries.</p>
              </div>
              <div className="text-6xl text-primary/20">🌙</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-surface-container-lowest py-32">
        <div className="max-w-7xl mx-auto px-8">
          <div className="mb-16">
            <h2 className="text-4xl font-bold tracking-tight text-on-surface">The Architects</h2>
            <p className="text-on-surface-variant mt-2 uppercase tracking-widest text-sm">Designers, Dreamers, Curators.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: 'Julian Thorne', role: 'Chief Curator', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop' },
              { name: 'Elena Rossi', role: 'Lead Architect', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop' },
              { name: 'Marcus Chen', role: 'Systems Engineer', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop' },
              { name: 'Sophia Vance', role: 'Experience Director', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1974&auto=format&fit=crop' },
            ].map((member) => (
              <div key={member.name} className="group">
                <div className="aspect-[4/5] bg-surface-container rounded-sm overflow-hidden mb-4 relative">
                  <img 
                    src={member.img} 
                    alt={member.name} 
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <h4 className="text-on-surface font-bold text-lg">{member.name}</h4>
                <p className="text-primary text-sm uppercase tracking-widest">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
