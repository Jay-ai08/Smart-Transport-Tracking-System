import React, { useContext, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TransportContext } from '../context/TransportContext';
import { Bus, X } from 'lucide-react';

const Routes = () => {
  const navigate = useNavigate();
  const { routes, buses } = useContext(TransportContext);
  const [activeRoute, setActiveRoute] = useState(null);

  const routeCards = useMemo(() => {
    return routes.map(route => {
      const bus = buses.find(b => b.routeId === route.id);
      const previewStops = route.stops.slice(0, 3);
      const extraStops = route.stops.length - previewStops.length;

      return { route, bus, previewStops, extraStops };
    });
  }, [routes, buses]);

  const closeModal = () => setActiveRoute(null);

  const trackBus = busId => navigate(`/live?busId=${busId}`);
  const activeBus = activeRoute ? buses.find(b => b.routeId === activeRoute.id) : null;

  return (
    <div className="routes-page">
      <div className="routes-header">
        <div>
          <h1 className="text-2xl font-bold">Routes & Stops</h1>
          <p className="text-secondary mt-2">Browse all campus routes and their stops</p>
        </div>
      </div>

      <div className="routes-grid">
        {routeCards.map(({ route, bus, previewStops, extraStops }) => {
          const isActiveRoute = activeRoute?.id === route.id;

          return (
            <div
              key={route.id}
              role="button"
              className={`route-card ${isActiveRoute ? 'active' : ''}`}
              aria-pressed={isActiveRoute}
              onClick={() => setActiveRoute(prev => (prev?.id === route.id ? null : route))}
            >
              <div className="route-card-top">
                <div className="route-card-icon">
                  <Bus size={18} />
                </div>
                <div>
                  <p className="route-card-bus">{bus ? `GU-${bus.busNumber}` : 'GU-000'}</p>
                  <h2 className="route-card-name">{route.name}</h2>
                </div>
              </div>

              <div className="route-card-meta">
                <span className="route-card-pill">{route.stops.length} STOPS</span>
                {bus && (
                  <button
                    type="button"
                    className="route-card-track-btn"
                    onClick={e => {
                      e.stopPropagation();
                      trackBus(bus.id);
                    }}
                  >
                    Track Live
                  </button>
                )}
              </div>

              <div className="route-card-stops">
                {previewStops.map(stop => (
                  <div key={stop.id} className="route-card-stop">
                    <span className="stop-bullet" />
                    <span>{stop.name}</span>
                  </div>
                ))}
                {extraStops > 0 && (
                  <div className="route-card-more">+{extraStops} more stops</div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {activeRoute && (
        <div className="route-modal-overlay">
          <div className="route-modal">
            <div className="route-modal-header">
              <div className="route-modal-title-block">
                <div className="route-modal-badge" />
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-secondary">Bus</p>
                  <h2 className="text-xl font-bold">{activeRoute.name}</h2>
                  <p className="text-sm text-secondary mt-1">
                    {activeBus ? `Bus: GU-${activeBus.busNumber}` : 'Bus information unavailable'}
                  </p>
                </div>
              </div>
              <button type="button" className="route-modal-close" onClick={closeModal}>
                <X size={18} />
              </button>
            </div>

            <div className="route-modal-subtitle">
              <p className="text-sm uppercase tracking-[0.18em] text-secondary">
                All Stops ({activeRoute.stops.length})
              </p>
            </div>

            <div className="route-modal-list">
              {activeRoute.stops.map((stop, index) => (
                <div key={stop.id} className="route-modal-stop">
                  <div>
                    <p className="font-semibold">{stop.name}</p>
                    <p className="text-xs text-secondary mt-1">
                      Lat: {stop.lat.toFixed(4)}, Lng: {stop.lng.toFixed(4)}
                    </p>
                  </div>
                  <span className="route-modal-stop-time">{`${2 + index * 3} min`}</span>
                </div>
              ))}
            </div>

            <div className="route-modal-footer">
              <div>
                <span className="text-sm text-secondary">Current Status</span>
                <span
                  className={`route-modal-status ${
                    activeBus?.status === 'Delayed' ? 'delayed' : 'ontime'
                  }`}
                >
                  {activeBus?.status || 'On Time'}
                </span>
              </div>
              {activeBus && (
                <button type="button" className="route-card-track-btn" onClick={() => trackBus(activeBus.id)}>
                  Track Live
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Routes;
