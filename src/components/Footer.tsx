import React from 'react';

export function Footer() {
  return (
    <footer className="bg-surface-dim w-full py-12 px-8 border-t border-outline-variant/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col md:items-start items-center">
            <div className="text-lg font-black text-on-surface mb-2">Master Architect</div>
            <p className="text-on-surface-variant text-xs uppercase tracking-widest text-center md:text-left">
              © 2024 MASTER ARCHITECT. BUILT FOR THE DIGITAL CURATOR.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8">
            {['Privacy Policy', 'Terms of Service', 'Twitter', 'LinkedIn'].map((item) => (
              <a 
                key={item}
                href="#" 
                className="text-on-surface-variant hover:text-primary text-xs uppercase tracking-widest transition-opacity opacity-80 hover:opacity-100"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
