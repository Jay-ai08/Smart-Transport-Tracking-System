import React, { useContext, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { TransportContext } from '../context/TransportContext';
import MapView from '../components/MapView';

const LiveTracking = () => {
  const { buses, routes } = useContext(TransportContext);
  const [searchParams] = useSearchParams();

  const displayBuses = buses.map(bus => ({
    ...bus,
    routeName: routes.find(r => r.id === bus.routeId)?.name || 'Unknown Route'
  }));

  const [selectedBusId, setSelectedBusId] = useState(() => displayBuses?.[0]?.id || null);
  const activeBusId = searchParams.get('busId') || selectedBusId;

  const visualBusGrid = displayBuses;

  return (
    <div className="live-tracking-page">
      <div className="live-tracking-header">
        <div>
          <h1>Live Tracking</h1>
          <p>Real-time bus positions and route visualization</p>
        </div>
      </div>

      <div className="live-card-grid">
        {visualBusGrid.slice(0, 8).map(bus => (
          <div
            key={bus.id}
            className={`live-card ${bus.id === activeBusId ? 'selected' : ''}`}
            onClick={() => setSelectedBusId(bus.id)}
          >
            <div className="live-card-top">
              <div className="live-card-badge" style={{ backgroundColor: bus.colorHex || 'var(--primary-color)' }} />
              <div>
                <p className="live-card-title">GU-{bus.busNumber}</p>
                <p className="live-card-subtitle">{bus.routeName}</p>
              </div>
              {bus.id === activeBusId && (
                <span className="live-card-active">Active</span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="live-map-container">
        <MapView fullMode={true} customCenter={[29.3909, 76.9635]} selectedBusId={activeBusId} />
      </div>
    </div>
  );
};

export default LiveTracking;
