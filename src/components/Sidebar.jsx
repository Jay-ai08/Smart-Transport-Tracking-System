import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { MapPin, LayoutDashboard, Route, Settings, Bell, Bus, X } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';

const Sidebar = ({ isOpen, closeSidebar }) => {
  const { theme } = useContext(ThemeContext);

  const getNavLinkStyle = (isActive) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.75rem 1rem',
    borderRadius: 'var(--radius-md)',
    transition: 'background-color 0.2s, color 0.2s',
    borderLeft: isActive ? '3px solid var(--primary-color)' : '3px solid transparent',
    color: isActive ? 'var(--primary-color)' : 'var(--text-secondary)',
    backgroundColor: isActive ? 'rgba(6,182,212,0.1)' : 'transparent',
    fontWeight: isActive ? 'bold' : 'normal',
    textDecoration: 'none'
  });

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      {/* Brand Profile */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '2.5rem', padding: '0 0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ backgroundColor: 'var(--primary-color)', padding: '0.4rem', borderRadius: '8px', minWidth: '38px', minHeight: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Bus color="white" size={24} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontWeight: 'bold', fontSize: '1.1rem', lineHeight: '1.1', color: 'var(--text-primary)' }}>Geeta University</span>
            <span style={{ fontSize: '0.65rem', color: 'var(--text-secondary)' }}>Campus Transport System</span>
          </div>
        </div>
        <button className="hamburger-menu" onClick={closeSidebar} style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', padding: '0.2rem', marginTop: '0.5rem' }}>
          <X size={24} />
        </button>
      </div>

      {/* Nav Links */}
      <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1, listStyle: 'none', padding: 0 }}>
        <li>
          <NavLink to="/" style={({ isActive }) => getNavLinkStyle(isActive)}>
            <LayoutDashboard size={18} style={{ flexShrink: 0 }} /> <span>Dashboard</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/live" style={({ isActive }) => getNavLinkStyle(isActive)}>
            <MapPin size={18} style={{ flexShrink: 0 }} /> <span>Live Tracking</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/routes" style={({ isActive }) => getNavLinkStyle(isActive)}>
            <Route size={18} style={{ flexShrink: 0 }} /> <span>Routes & Stops</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/notifications" style={({ isActive }) => getNavLinkStyle(isActive)}>
            <Bell size={18} style={{ flexShrink: 0 }} /> <span>ETA & Alerts</span>
          </NavLink>
        </li>
        <li style={{ marginTop: '2rem' }}>
          <NavLink to="/admin" style={({ isActive }) => getNavLinkStyle(isActive)}>
            <Settings size={18} style={{ flexShrink: 0 }} /> <span>Admin Panel</span>
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
