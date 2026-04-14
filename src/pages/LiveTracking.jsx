import React, { useContext, useState } from 'react';
import { Bus } from 'lucide-react';
import { TransportContext } from '../context/TransportContext';
import MapView from '../components/MapView';

const LiveTracking = () => {
  const { buses, routes } = useContext(TransportContext);

  const displayBuses = buses.map(bus => ({
    ...bus,
    routeName: routes.find(r => r.id === bus.routeId)?.name || 'Unknown Route'
  }));

  const [selectedBusId, setSelectedBusId] = useState(() => displayBuses?.[0]?.id || null);
  const activeBusId = selectedBusId;

  return (
    <div className="live-tracking-page">
      <div className="live-tracking-header">
        <div>
          <h1>Live Tracking</h1>
          <p>Real-time bus positions and route visualization</p>
        </div>
      </div>

      <div className="live-card-grid">
        {displayBuses.map(bus => (
          <div
            key={bus.id}
            className={`live-card ${bus.id === activeBusId ? 'selected' : ''}`}
            onClick={() => setSelectedBusId(bus.id)}
          >
            <div className="live-card-top">
              <div className="live-card-badge" style={{ backgroundColor: bus.colorHex || 'var(--primary-color)' }}>
                <Bus size={16} color="white" />
              </div>
              <div>
                <p className="live-card-title">GU-{bus.busNumber}</p>
                <p className="live-card-subtitle">{bus.routeName}</p>
              </div>
              {bus.id === activeBusId && (
                <span className="live-card-active">Selected</span>
              )}
            </div>

            <div className="live-card-details">
              <div>
                <strong>Status:</strong> {bus.status}
              </div>
              <div>
                <strong>Next stop:</strong> {bus.nextStop}
              </div>
              <div>
                <strong>ETA:</strong> {bus.eta}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="live-map-container">
        <MapView fullMode={true} customCenter={[29.1492, 76.6530]} selectedBusId={activeBusId} />
      </div>
    </div>
  );
};

export default LiveTracking;
