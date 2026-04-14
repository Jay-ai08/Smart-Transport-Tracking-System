import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Bus } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Signup = () => {
  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [role, setRole] = useState('user');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phase, setPhase] = useState('intro');
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('transition'), 800);
    const t2 = setTimeout(() => setPhase('login'), 1300);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  useEffect(() => {
    if (user) {
      navigate('/', { replace: true });
    }
  }, [user, navigate]);

  useEffect(() => {
    const handleMove = (event) => setMouse({ x: event.clientX, y: event.clientY });
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentUser = {
      email,
      role,
      loggedAt: new Date().toISOString(),
    };
    login(currentUser);
    navigate('/', { replace: true });
  };

  return (
    <div className="auth-page">
      <div className="auth-bg" />
      <div
        className="auth-glow"
        style={{ transform: `translate3d(${mouse.x - 120}px, ${mouse.y - 120}px, 0)` }}
      />

      {phase === 'intro' && (
        <div className="auth-intro">
          <div>
            <h1>Welcome to GTTS</h1>
            <p>Fast access to campus transport controls and live tracking.</p>
          </div>
        </div>
      )}

      {phase === 'transition' && <div className="auth-transition" />}

      {phase === 'login' && (
        <div className="auth-content">
          <div className="auth-card">
            <div className="auth-badge">
              <Bus size={20} />
              GTTS Sign In
            </div>

            <div className="auth-role-toggle">
              {['user', 'admin'].map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`auth-role-button ${role === option ? 'active' : ''}`}
                  onClick={() => setRole(option)}
                >
                  {option.toUpperCase()}
                </button>
              ))}
            </div>

            <h2 className="auth-title">{role === 'admin' ? 'ADMIN ACCESS' : 'USER LOGIN'}</h2>
            <p className="auth-subtitle">Enter your credentials to continue with the campus transport dashboard.</p>

            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="auth-input-wrapper">
                <Mail className="auth-field-icon" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="auth-input"
                  required
                />
              </div>

              <div className="auth-input-wrapper">
                <Lock className="auth-field-icon" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="auth-input"
                  required
                />
              </div>

              <button type="submit" className="auth-submit">
                {role === 'admin' ? 'ENTER ADMIN' : 'LOGIN'}
              </button>
            </form>

            <div className="auth-footer">
              <Link to="/" className="auth-link">Back to dashboard</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;
