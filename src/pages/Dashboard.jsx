import React, { useContext, useState } from 'react';
import { TransportContext } from '../context/TransportContext';
import { AuthContext } from '../context/AuthContext';
import BusCard from '../components/BusCard';
import { ArrowRight, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { buses } = useContext(TransportContext);
  const { user } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const filteredBuses = buses.filter(bus => 
    bus.busNumber.includes(searchTerm) || bus.routeId.includes(searchTerm)
  );

  const onTimeCount = buses.filter(b => b.status === 'On Time').length;
  const delayedCount = buses.filter(b => b.status === 'Delayed').length;
  const displayName = user?.email?.split('@')[0] || 'Driver';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%' }}>
      
      {/* Header Block */}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 'bold', color: 'var(--text-primary)', margin: 0, lineHeight: '1.2' }}>
            Welcome, {displayName}
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Signed in as {user?.role?.toUpperCase() || 'USER'} for campus transport tracking.
          </p>
        </div>
        <button 
          onClick={() => navigate('/live')}
          className="btn btn-primary" 
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'var(--primary-color)', color: '#000', fontWeight: '600', padding: '0.6rem 1.25rem', borderRadius: '8px', border: 'none', cursor: 'pointer', marginBottom: '0.2rem' }}
        >
          View Live Map <ArrowRight size={16} />
        </button>
      </div>

      {/* Dark Search Bar */}
      <div style={{ position: 'relative', marginTop: '0.5rem' }}>
        <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center' }}>
          <Search size={18} />
        </div>
        <input 
          type="text" 
          placeholder="Search by bus number or route..." 
          style={{ 
            width: '100%',
            padding: '1rem 1rem 1rem 3rem', 
            borderRadius: '12px', 
            backgroundColor: 'var(--surface-color)', 
            border: '1px solid var(--border-color)',
            outline: 'none',
            fontSize: '0.9rem',
            color: 'var(--text-primary)',
            boxSizing: 'border-box'
          }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* User Info Row */}
      {user && (
        <div className="card" style={{ padding: '1.25rem', backgroundColor: 'var(--surface-color)', display: 'grid', gridTemplateColumns: '1fr', gap: '1rem', alignItems: 'center' }}>
          <div>
            <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Current user</p>
            <h2 style={{ margin: '0.65rem 0 0', fontSize: '1.45rem', color: 'var(--text-primary)' }}>{user.email}</h2>
            <p style={{ margin: '0.5rem 0 0', color: 'var(--text-secondary)' }}>Role: {user.role.toUpperCase()}</p>
          </div>
        </div>
      )}

      {/* Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
        <div className="card" style={{ padding: '1.25rem', backgroundColor: 'var(--surface-color)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <span style={{ fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '0.25rem', color: 'var(--success-color)' }}>{onTimeCount}</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>On Time</span>
        </div>
        <div className="card" style={{ padding: '1.25rem', backgroundColor: 'var(--surface-color)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <span style={{ fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '0.25rem', color: 'var(--danger-color)' }}>{delayedCount}</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Delayed</span>
        </div>
        <div className="card" style={{ padding: '1.25rem', backgroundColor: 'var(--surface-color)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <span style={{ fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '0.25rem', color: 'var(--primary-color)' }}>{buses.length}</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Total Buses</span>
        </div>
      </div>

      {/* Bus Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem', marginTop: '1.5rem', position: 'relative' }}>
        {filteredBuses.map(bus => (
          <BusCard key={bus.id} bus={bus} />
        ))}
        {filteredBuses.length === 0 && (
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>No buses found.</p>
        )}
      </div>
      
    </div>
  );
};

export default Dashboard;
