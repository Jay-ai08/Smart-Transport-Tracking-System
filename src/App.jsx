import React, { useEffect, useContext, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import LiveTracking from './pages/LiveTracking';
import RoutesPage from './pages/Routes';
import Notifications from './pages/Notifications';
import AdminPanel from './pages/AdminPanel';
import { ThemeContext } from './context/ThemeContext';
import { Moon, Sun, Menu } from 'lucide-react';
import './App.css';

function App() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    // Request Desktop Notification Permission for Geofencing
    if ("Notification" in window) {
      if (Notification.permission !== "granted" && Notification.permission !== "denied") {
        Notification.requestPermission();
      }
    }
  }, []);

  return (
    <div className="app-layout">
      {/* Responsive Background Overlay */}
      <div className={`sidebar-overlay ${isSidebarOpen ? 'open' : ''}`} onClick={toggleSidebar}></div>
      
      <Sidebar isOpen={isSidebarOpen} closeSidebar={() => setIsSidebarOpen(false)} />
      
      <div className="main-content" style={{ display: 'flex', flexDirection: 'column' }}>
        
        {/* Top Navbar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)', marginBottom: '1.5rem', width: '100%' }}>
          
          <button onClick={toggleSidebar} className="btn hamburger-menu" style={{ padding: '0.6rem', borderRadius: '8px', backgroundColor: 'var(--surface-color)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', cursor: 'pointer', alignItems: 'center', justifyContent: 'center' }}>
            <Menu size={18} />
          </button>
          
          <div style={{ flex: 1 }}></div>

          <button onClick={toggleTheme} className="btn" style={{ padding: '0.6rem', borderRadius: '8px', backgroundColor: 'var(--surface-color)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {theme === 'dark' ? <Sun size={18} className="text-warning-color"/> : <Moon size={18} />}
          </button>
        </div>

        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/live" element={<LiveTracking />} />
            <Route path="/routes" element={<RoutesPage />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
