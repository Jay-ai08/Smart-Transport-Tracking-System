import React, { useContext } from 'react';
import { TransportContext } from '../context/TransportContext';
import { MapPin } from 'lucide-react';

const Routes = () => {
  const { routes } = useContext(TransportContext);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Routes & Stops</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {routes.map(route => (
          <div key={route.id} className="card">
            <h2 className="text-xl font-bold text-primary mb-4">{route.name}</h2>
            
            <div className="flex flex-col gap-4 relative">
              {/* Connecting line */}
              <div 
                className="absolute left-[11px] top-[24px] bottom-[24px]" 
                style={{ width: '2px', backgroundColor: 'var(--border-color)', zIndex: 0 }}
              />
              
              {route.stops.map((stop, index) => (
                <div key={stop.id} className="flex items-start gap-4 relative" style={{ zIndex: 1 }}>
                  <div className="bg-surface-color p-1" style={{ borderRadius: '50%', border: '2px solid var(--primary-color)' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: index === 0 || index === route.stops.length - 1 ? 'var(--primary-color)' : 'transparent' }} />
                  </div>
                  <div>
                    <h3 className="font-bold">{stop.name}</h3>
                    <p className="text-sm text-secondary flex items-center gap-1 mt-1">
                      <MapPin size={14} /> Lat: {stop.lat.toFixed(4)}, Lng: {stop.lng.toFixed(4)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Routes;
