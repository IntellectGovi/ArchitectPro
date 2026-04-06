import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { AppProvider, useApp } from './context/AppContext';

// Public Website
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Dashboard Layout
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import { CursorFollower } from './components/CursorFollower';

// Old Screens (keep animation system)
import Dashboard from './screens/Dashboard';
import Tasks from './screens/Tasks';
import Notes from './screens/Notes';
import Vault from './screens/Vault';
import Documents from './screens/Documents';
import Habits from './screens/Habits';
import Calendar from './screens/Calendar';
import Profile from './screens/Profile';
import Security from './screens/Security';
import Preferences from './screens/Preferences';

import { Menu, X } from 'lucide-react';
import { cn } from './lib/utils';
import Home from './screens/Home';
import About from './screens/About';
import Pricing from './screens/Pricing';
import Contact from './screens/Contact';
import Auth from './screens/Auth';

/* ---------------- Dashboard Animated System ---------------- */

function DashboardApp() {
  const { activeScreen, setActiveScreen, preferences } = useApp();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(preferences.theme);
  }, [preferences.theme]);

  const renderScreen = () => {
    switch (activeScreen) {
      case 'dashboard': return <Dashboard />;
      case 'tasks': return <Tasks />;
      case 'notes': return <Notes />;
      case 'vault': return <Vault />;
      case 'documents': return <Documents />;
      case 'habits': return <Habits />;
      case 'calendar': return <Calendar />;
      case 'profile': return <Profile />;
      case 'security': return <Security />;
      case 'preferences': return <Preferences />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-surface text-on-surface overflow-hidden relative">
      <CursorFollower />

      {/* Mobile Sidebar Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed bottom-6 right-6 z-[60] w-14 h-14 bg-primary text-on-primary rounded-full shadow-2xl flex items-center justify-center"
      >
        {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-0 z-50 lg:relative lg:z-0 transition-all duration-500",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div
          className={cn("absolute inset-0 bg-black/60 lg:hidden", isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none")}
          onClick={() => setIsSidebarOpen(false)}
        />
        <div className="relative h-full w-64">
          <Sidebar
            activeScreen={activeScreen}
            onScreenChange={(s) => {
              setActiveScreen(s);
              setIsSidebarOpen(false);
            }}
          />
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeScreen}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              {renderScreen()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

/* ---------------- Main App ---------------- */

function AppRoutes() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('login') === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      {isAuthenticated ? (
        <Routes>
          <Route path="/dashboard/*" element={<DashboardApp />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      ) : (
        <div className="min-h-screen flex flex-col">
          <CursorFollower />
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
          <Footer />
        </div>
      )}
    </Router>
  );
}
export default function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}