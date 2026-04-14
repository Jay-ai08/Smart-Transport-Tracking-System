import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Bus, Moon, Sun } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="card app-navbar flex items-center justify-between" style={{ padding: '1rem 1.75rem', borderRadius: '0' }}>
      <div className="flex items-center" style={{ gap: '1rem' }}>
        <div className="bg-primary-color" style={{ width: '52px', height: '52px', borderRadius: '18px', display: 'grid', placeItems: 'center', backgroundColor: 'var(--primary-color)' }}>
          <Bus color="white" size={26} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '0.2rem', minWidth: 0 }}>
          <h1 className="font-bold text-xl text-primary" style={{ margin: 0, lineHeight: 1.1, whiteSpace: 'nowrap' }}>Geeta University</h1>
          <p className="text-sm text-secondary" style={{ margin: 0, fontSize: '0.95rem', whiteSpace: 'nowrap' }}>Campus Transport</p>
        </div>
      </div>

      <div className="navbar-actions flex items-center gap-3">
        <button onClick={toggleTheme} className="btn btn-outline icon-btn" style={{ minWidth: '44px', minHeight: '44px' }}>
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        {user ? (
          <button onClick={logout} className="btn btn-outline" style={{ padding: '0.8rem 1.2rem' }}>
            Logout
          </button>
        ) : (
          <Link to="/signup" className="btn btn-primary sign-in-btn" style={{ padding: '0.8rem 1.2rem' }}>
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
