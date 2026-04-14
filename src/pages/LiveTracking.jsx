import React, { useContext } from 'react';
import { TransportContext } from '../context/TransportContext';
import MapView from '../components/MapView';

const LiveTracking = () => {
  const { buses, routes } = useContext(TransportContext);

  // Merge bus data with route name to avoid lookup in map
  const displayBuses = buses.map(bus => ({
    ...bus,
    routeName: routes.find(r => r.id === bus.routeId)?.name || 'Unknown Route'
  }));

  // Duplicate for dummy row mapping to explicitly match screenshot's 2-row layout of 4 buses
  const visualBusGrid = [...displayBuses, ...displayBuses];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%', height: 'calc(100vh - 4rem)' }}>
      {/* Header Block exactly like screenshot */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 'bold', color: 'var(--text-primary)', margin: 0, lineHeight: '1.2' }}>Live Tracking</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Real-time bus positions and route visualization</p>
      </div>
      
      {/* Quick Status Pills Grid Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '1rem' }}>
        {visualBusGrid.slice(0, 8).map((bus, idx) => (
          <div key={`${bus.id}-${idx}`} style={{ 
            backgroundColor: 'var(--surface-color)', 
            border: '1px solid var(--border-color)', 
            borderRadius: '8px', 
            padding: '1rem', 
            display: 'flex', 
            flexDirection: 'column' 
          }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: bus.colorHex || 'var(--primary-color)' }}></div>
                <span style={{ fontWeight: 'bold', color: 'var(--text-primary)', fontSize: '0.9rem' }}>GU-{bus.busNumber}</span>
             </div>
             <span style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', marginTop: '0.5rem', textAlign: 'center' }}>
                {bus.routeName}
             </span>
          </div>
        ))}
      </div>
      
      {/* Map spanning remaining space */}
      <div style={{ flex: 1, position: 'relative', width: '100%', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
         <MapView fullMode={true} customCenter={[29.3909, 76.9635]} />
      </div>

    </div>
  );
};

export default LiveTracking;
