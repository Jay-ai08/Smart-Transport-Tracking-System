import React, { useContext, useState } from 'react';
import { TransportContext } from '../context/TransportContext';
import { Settings, Plus, Bus, Edit3, Trash2 } from 'lucide-react';

const AdminPanel = () => {
  const { buses, addBus, routes } = useContext(TransportContext);
  const [activeTab, setActiveTab] = useState('buses');
  const [newBus, setNewBus] = useState({ busNumber: '', routeId: routes[0]?.id || '', status: 'On Time', lat: 0, lng: 0, nextStop: '', eta: '', pathIndex: 0 });

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newBus.busNumber) return;
    const route = routes.find(r => r.id === newBus.routeId);
    if (route) {
      addBus({ ...newBus, lat: route.path[0][0], lng: route.path[0][1], nextStop: route.stops[1]?.name || 'Unknown', eta: 'Calculating...' });
      setNewBus({ busNumber: '', routeId: routes[0]?.id || '', status: 'On Time', lat: 0, lng: 0, nextStop: '', eta: '', pathIndex: 0 });
    }
  };

  return (
    <div className="admin-panel">
      <div className="admin-panel-top">
        <div className="admin-panel-title">
          <div className="admin-panel-icon">
            <Settings size={24} />
          </div>
          <div>
            <h1>Admin Panel</h1>
            <p>Manage buses and routes</p>
          </div>
        </div>

        <div className="admin-panel-actions">
          <button className={`admin-tab ${activeTab === 'buses' ? 'active' : ''}`} onClick={() => setActiveTab('buses')}>
            Buses
          </button>
          <button className={`admin-tab ${activeTab === 'routes' ? 'active' : ''}`} onClick={() => setActiveTab('routes')}>
            Routes
          </button>
          <button className="btn btn-primary admin-add-button" onClick={() => setActiveTab('buses')}>
            <Plus size={16} /> Add Bus
          </button>
        </div>
      </div>

      <div className="card admin-panel-card">
        {activeTab === 'buses' ? (
          <>
            <div className="admin-card-header">
              <div>
                <h2>Add New Bus</h2>
                <p>Keep fleet details up to date for live tracking.</p>
              </div>
            </div>

            <form onSubmit={handleAdd} className="admin-form-grid">
              <div className="form-control">
                <label>Bus Number</label>
                <input
                  type="text"
                  value={newBus.busNumber}
                  onChange={e => setNewBus({ ...newBus, busNumber: e.target.value })}
                  placeholder="Enter bus number"
                />
              </div>
              <div className="form-control">
                <label>Route</label>
                <select value={newBus.routeId} onChange={e => setNewBus({ ...newBus, routeId: e.target.value })}>
                  {routes.map(route => (
                    <option key={route.id} value={route.id}>{route.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-control">
                <label>Status</label>
                <select value={newBus.status} onChange={e => setNewBus({ ...newBus, status: e.target.value })}>
                  <option value="On Time">On Time</option>
                  <option value="Delayed">Delayed</option>
                </select>
              </div>
              <div className="form-control form-control-end">
                <button type="submit" className="btn btn-primary admin-submit-btn">
                  <Plus size={16} /> Add Bus
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            <div className="admin-card-header">
              <div>
                <h2>Manage Routes</h2>
                <p>Review route names, stops, and live route data.</p>
              </div>
            </div>

            <div className="admin-route-grid">
              {routes.map(route => (
                <div key={route.id} className="admin-route-card">
                  <div>
                    <p className="route-label">{route.name}</p>
                    <p className="route-meta">{route.stops.length} stops • {route.stops[0]?.name} → {route.stops[route.stops.length - 1]?.name}</p>
                  </div>
                  <button className="btn btn-outline">View</button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="card admin-bus-list-card">
        <div className="admin-card-header">
          <div>
            <h2>Active Fleet ({buses.length})</h2>
            <p>Live details for each active bus on the network.</p>
          </div>
        </div>

        <div className="admin-bus-list">
          {buses.map(bus => (
            <div key={bus.id} className="admin-bus-card">
              <div className="admin-bus-card-left">
                <div className="admin-bus-icon">
                  <Bus size={20} />
                </div>
                <div className="admin-bus-info">
                  <p className="admin-bus-title">GU-{bus.busNumber}</p>
                  <p className="admin-bus-meta">{routes.find(route => route.id === bus.routeId)?.name || 'Route unavailable'}</p>
                </div>
              </div>

              <div className="admin-bus-details">
                <span className={`admin-bus-status ${bus.status === 'Delayed' ? 'delayed' : ''}`}>{bus.status}</span>
                <span>{bus.nextStop ? `Next Stop: ${bus.nextStop}` : 'Next stop unknown'}</span>
                <span>Speed: {bus.speed || '—'} km/h</span>
                <span>Lat: {bus.lat.toFixed(4)}</span>
                <span>Lng: {bus.lng.toFixed(4)}</span>
              </div>

              <div className="admin-bus-actions">
                <button type="button" className="btn btn-outline" aria-label="Edit bus">
                  <Edit3 size={16} />
                </button>
                <button type="button" className="btn btn-outline danger" aria-label="Delete bus">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
