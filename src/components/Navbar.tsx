import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/src/lib/utils';
import { motion } from 'motion/react';

const navLinks = [
  { name: 'Features', href: '/' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export function Navbar() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300",
      isScrolled ? "glass py-3 shadow-2xl" : "bg-transparent py-6"
    )}>
      <div className="flex justify-between items-center px-8 max-w-7xl mx-auto">
        <Link to="/" className="text-xl font-bold tracking-tighter text-on-surface">
          Master Architect
        </Link>
        
        <div className="hidden md:flex space-x-12 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-on-surface",
                location.pathname === link.href 
                  ? "text-primary-container border-b-2 border-primary-container pb-1" 
                  : "text-on-surface-variant"
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <Link to="/auth">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-sm font-semibold text-on-surface-variant hover:text-on-surface transition-colors"
            >
              Login
            </motion.button>
          </Link>
          <Link to="/auth">
            <motion.button 
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary-gradient text-on-primary px-6 py-2.5 rounded-md font-bold text-sm transition-all shadow-lg shadow-primary/20"
            >
              Sign Up
            </motion.button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
