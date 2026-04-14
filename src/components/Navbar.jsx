import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { MapPin, LayoutDashboard, Route, Settings, Bell, Moon, Sun } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-2 px-3 py-2 border-radius-md transition-colors ${
      isActive ? 'text-primary font-bold bg-[rgba(59,130,246,0.1)]' : 'text-secondary hover:text-primary'
    }`;

  return (
    <nav className="card flex items-center justify-between mt-4 mb-6" style={{ padding: '1rem', borderRadius: 'var(--radius-xl)' }}>
      <div className="flex items-center gap-2">
        <div className="bg-primary-color p-2" style={{ borderRadius: 'var(--radius-md)', backgroundColor: 'var(--primary-color)' }}>
          <MapPin color="white" size={24} />
        </div>
        <span className="font-bold text-xl text-primary">SmartCampus</span>
      </div>

      <ul className="flex items-center gap-4 hidden md:flex">
        <li>
          <NavLink to="/" className={navLinkClass}>
            <LayoutDashboard size={18} /> Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/live" className={navLinkClass}>
            <MapPin size={18} /> Live Tracking
          </NavLink>
        </li>
        <li>
          <NavLink to="/routes" className={navLinkClass}>
            <Route size={18} /> Routes
          </NavLink>
        </li>
        <li>
          <NavLink to="/notifications" className={navLinkClass}>
            <Bell size={18} /> Alerts
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin" className={navLinkClass}>
            <Settings size={18} /> Admin
          </NavLink>
        </li>
      </ul>

      <button onClick={toggleTheme} className="btn btn-outline" style={{ padding: '0.5rem', borderRadius: '50%' }}>
        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
      </button>
    </nav>
  );
};

export default Navbar;
