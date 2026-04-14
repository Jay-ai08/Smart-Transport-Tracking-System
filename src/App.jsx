import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import LiveTracking from './pages/LiveTracking';
import RoutesPage from './pages/Routes';
import Notifications from './pages/Notifications';
import AdminPanel from './pages/AdminPanel';

function App() {
  return (
    <div className="container">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/live" element={<LiveTracking />} />
          <Route path="/routes" element={<RoutesPage />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
