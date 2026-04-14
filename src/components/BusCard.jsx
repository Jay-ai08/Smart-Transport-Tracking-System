import React from 'react';
import { Bus, MapPin, Gauge } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BusCard = ({ bus }) => {
  const isDelayed = bus.status === 'Delayed';
  const statusColor = isDelayed ? 'var(--danger-color)' : 'var(--success-color)';
  
  // Custom theme colors for icon boxes based on status to match Image 2
  const iconBgColor = isDelayed ? 'rgba(239, 68, 68, 0.15)' : 'rgba(16, 185, 129, 0.15)';

  const navigate = useNavigate();

  return (
    <div 
      className="card" 
      onClick={() => navigate('/live')} 
      style={{ 
        padding: '1.25rem', 
        display: 'flex', 
        flexDirection: 'column', 
        height: '100%',
        minHeight: '200px',
        backgroundColor: 'var(--surface-color)', 
        border: '1px solid var(--border-color)',
        borderRadius: '12px',
        cursor: 'pointer',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
      }}
      onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.boxShadow = '0 0 15px rgba(6, 182, 212, 0.5)'; // Skyblue/cyan glow
          e.currentTarget.style.borderColor = 'var(--primary-color)';
      }}
      onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
          e.currentTarget.style.borderColor = 'var(--border-color)';
      }}
    >
      
      {/* Top Header Row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ backgroundColor: iconBgColor, padding: '0.6rem', borderRadius: '8px', minWidth: '40px', minHeight: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Bus style={{ color: statusColor }} size={20} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontWeight: 'bold', fontSize: '1.125rem', lineHeight: '1', marginBottom: '0.25rem', color: 'var(--text-primary)' }}>GU-{bus.busNumber}</h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{bus.routeId === 'r1' ? 'North Campus Loop' : 'South Campus Express'}</p>
          </div>
        </div>
        
        {/* Status Dot with Pulse Animation */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <div style={{ 
              width: '6px', 
              height: '6px', 
              borderRadius: '50%', 
              backgroundColor: statusColor,
              boxShadow: `0 0 8px ${statusColor}`,
              animation: 'pulse 2s infinite'
          }} />
          <style>
             {`
               @keyframes pulse {
                 0% { opacity: 1; transform: scale(1); }
                 50% { opacity: 0.6; transform: scale(1.2); }
                 100% { opacity: 1; transform: scale(1); }
               }
             `}
          </style>
          <span style={{ fontSize: '0.75rem', letterSpacing: '0.02em', color: 'var(--text-primary)', fontWeight: '500' }}>{bus.status}</span>
        </div>
      </div>
      
      {/* Middle Specs */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginTop: '1.5rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
           <MapPin size={14} style={{ color: 'var(--primary-color)' }} />
           <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Next Stop: <span style={{ color: 'var(--text-primary)', marginLeft: '0.25rem', fontWeight: '500' }}>{bus.nextStop || 'Admin Block'}</span></p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
           <Gauge size={14} style={{ color: 'var(--primary-color)' }} />
           <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Speed: <span style={{ color: 'var(--text-primary)', marginLeft: '0.25rem', fontWeight: '500' }}>{isDelayed ? '18.3' : '25.5'} km/h</span></p>
        </div>
      </div>

      {/* Footer Coords */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border-color)', opacity: 0.5 }}>
        <p style={{ fontSize: '10px', color: 'var(--text-primary)', letterSpacing: '0.05em', fontFamily: 'monospace' }}>Lat: {bus.lat ? bus.lat.toFixed(4) : '29.4726'}</p>
        <p style={{ fontSize: '10px', color: 'var(--text-primary)', letterSpacing: '0.05em', fontFamily: 'monospace' }}>Lng: {bus.lng ? bus.lng.toFixed(4) : '77.6949'}</p>
      </div>

    </div>
  );
};

export default BusCard;
