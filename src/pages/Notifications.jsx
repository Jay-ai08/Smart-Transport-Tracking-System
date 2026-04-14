import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { TransportContext } from '../context/TransportContext';
import { AlertTriangle, Info, Clock4, MapPin, ArrowRight } from 'lucide-react';

const Notifications = () => {
  const navigate = useNavigate();
  const { buses, routes } = useContext(TransportContext);

  const displayBuses = buses.map(bus => ({
    ...bus,
    routeName: routes.find(r => r.id === bus.routeId)?.name || 'Unknown Route'
  }));

  const delayedBuses = displayBuses.filter(b => b.status === 'Delayed');
  const onTimeBuses = displayBuses.filter(b => b.status === 'On Time');
  const liveUpdates = displayBuses.slice(0, 4);

  const trackBus = busId => navigate(`/live?busId=${busId}`);

  return (
    <div className="notifications-page">
      <div className="notifications-header">
        <div>
          <h1>ETA & Notifications</h1>
          <p>Real-time arrival updates and delay alerts for campus transport.</p>
        </div>
      </div>

      <div className="notifications-summary">
        <div className="status-card status-card-success">
          <div className="status-card-icon">
            <Clock4 size={20} />
          </div>
          <div>
            <span className="status-card-label">On Time</span>
            <strong>{onTimeBuses.length}</strong>
          </div>
        </div>

        <div className="status-card status-card-warning">
          <div className="status-card-icon">
            <AlertTriangle size={20} />
          </div>
          <div>
            <span className="status-card-label">Delayed</span>
            <strong>{delayedBuses.length}</strong>
          </div>
        </div>
      </div>

      <div className="live-updates-section">
        <div className="section-headline">
          <div>
            <h2>Live Updates</h2>
            <p>Latest bus progress and ETA details with direct tracking links.</p>
          </div>
        </div>

        <div className="live-update-grid">
          {liveUpdates.map(bus => (
            <div key={bus.id} className="live-update-card">
              <div className="live-update-card-top">
                <div>
                  <p className="live-update-bus">GU-{bus.busNumber}</p>
                  <p className="live-update-route">{bus.routeName}</p>
                </div>
                <span className={`live-update-status ${bus.status === 'Delayed' ? 'delayed' : 'ontime'}`}>
                  {bus.status}
                </span>
              </div>

              <div className="live-update-details">
                <div>
                  <p className="live-update-label">Next stop</p>
                  <p>{bus.nextStop || 'N/A'}</p>
                </div>
                <div>
                  <p className="live-update-label">ETA</p>
                  <p>{bus.eta || 'Calculating'}</p>
                </div>
              </div>

              <div className="live-update-footer">
                <div className="live-update-meta">
                  <MapPin size={16} />
                  <span>{bus.routeName}</span>
                </div>
                <button type="button" className="track-link" onClick={() => trackBus(bus.id)}>
                  Track Live <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="alert-cards-grid">
        {delayedBuses.length > 0 ? (
          delayedBuses.map(bus => (
            <div key={`alert-${bus.id}`} className="notification-alert-card notification-alert-card-warning">
              <div className="notification-alert-icon">
                <AlertTriangle size={20} />
              </div>
              <div className="notification-alert-body">
                <div className="notification-alert-head">
                  <h3>Bus GU-{bus.busNumber} Delayed</h3>
                  <button type="button" className="track-link" onClick={() => trackBus(bus.id)}>
                    Track Live <ArrowRight size={14} />
                  </button>
                </div>
                <p>Expected delay of approx {bus.delayMinutes || 5} minutes due to traffic on route to {bus.nextStop}.</p>
                <span className="notification-alert-time">Just now</span>
              </div>
            </div>
          ))
        ) : (
          <div className="notification-alert-card notification-alert-card-empty">
            <Info size={28} />
            <div>
              <h3>All buses are on schedule</h3>
              <p>No active delays. Keep monitoring live updates for the latest arrivals.</p>
            </div>
          </div>
        )}

        <div className="notification-alert-card notification-alert-card-info">
          <div className="notification-alert-icon">
            <Info size={20} />
          </div>
          <div className="notification-alert-body">
            <h3>System Maintenance Update</h3>
            <p>The tracking system will undergo brief maintenance tonight at 2 AM. Live tracking might be inaccurate for 10 minutes.</p>
            <span className="notification-alert-time">2 hours ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
