import React, { useContext, useEffect, useState } from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import LiveTracking from './pages/LiveTracking';
import RoutesPage from './pages/Routes';
import Notifications from './pages/Notifications';
import AdminPanel from './pages/AdminPanel';
import Signup from './pages/Signup';
import { AuthContext } from './context/AuthContext';
import './App.css';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useContext(AuthContext);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const RequireAuth = ({ children, adminOnly = false }) => {
    if (!user) return <Navigate to="/signup" replace />;
    if (adminOnly && user.role !== 'admin') return <Navigate to="/" replace />;
    return children;
  };

  useEffect(() => {
    // Request Desktop Notification Permission for Geofencing
    if ("Notification" in window) {
      if (Notification.permission !== "granted" && Notification.permission !== "denied") {
        Notification.requestPermission();
      }
    }
  }, []);

  return (
    <div className="app-root">
      <Navbar onMenuToggle={toggleSidebar} />
      <div className="app-layout">
        {user && (
          <>
            <div className={`sidebar-overlay ${isSidebarOpen ? 'open' : ''}`} onClick={toggleSidebar}></div>
            <Sidebar isOpen={isSidebarOpen} closeSidebar={() => setIsSidebarOpen(false)} />
          </>
        )}

        <div className="main-content" style={{ display: 'flex', flexDirection: 'column' }}>
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={user ? <Dashboard /> : <Navigate to="/signup" replace />} />
              <Route path="/live" element={<RequireAuth><LiveTracking /></RequireAuth>} />
              <Route path="/routes" element={<RequireAuth><RoutesPage /></RequireAuth>} />
              <Route path="/notifications" element={<RequireAuth><Notifications /></RequireAuth>} />
              <Route path="/admin" element={<RequireAuth adminOnly><AdminPanel /></RequireAuth>} />
              <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
