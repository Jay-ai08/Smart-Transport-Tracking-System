import React, { useContext, useState } from 'react';
import { TransportContext } from '../context/TransportContext';
import { Settings, Plus } from 'lucide-react';

const AdminPanel = () => {
  const { buses, addBus, routes } = useContext(TransportContext);
  const [newBus, setNewBus] = useState({ busNumber: '', routeId: routes[0]?.id || '', status: 'On Time', lat: 0, lng: 0, nextStop: '', eta: '', pathIndex: 0 });

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newBus.busNumber) return;
    
    // Pick start location of selected route
    const route = routes.find(r => r.id === newBus.routeId);
    if (route) {
        addBus({ ...newBus, lat: route.path[0][0], lng: route.path[0][1], nextStop: route.stops[1]?.name || 'Unknown', eta: 'Calculating...' });
        setNewBus({ busNumber: '', routeId: routes[0]?.id || '', status: 'On Time', lat: 0, lng: 0, nextStop: '', eta: '', pathIndex: 0 });
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-[800px] mx-auto">
      <div className="flex items-center gap-3">
        <Settings size={28} className="text-primary" />
        <h1 className="text-2xl font-bold">Admin Panel</h1>
      </div>

      <div className="card">
        <h2 className="text-xl font-bold mb-4">Add New Bus</h2>
        <form onSubmit={handleAdd} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label>Bus Number</label>
              <input 
                type="text" 
                className="card" style={{ padding: '0.5rem', borderRadius: 'var(--radius-sm)' }}
                value={newBus.busNumber} 
                onChange={e => setNewBus({...newBus, busNumber: e.target.value})} 
                required 
              />
            </div>
            <div className="flex flex-col gap-2">
              <label>Route</label>
              <select 
                className="card" style={{ padding: '0.5rem', borderRadius: 'var(--radius-sm)' }}
                value={newBus.routeId} 
                onChange={e => setNewBus({...newBus, routeId: e.target.value})}
              >
                {routes.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
              </select>
            </div>
          </div>
          <button type="submit" className="btn btn-primary mt-2 self-start">
            <Plus size={18} /> Add Bus
          </button>
        </form>
      </div>

      <div className="card">
        <h2 className="text-xl font-bold mb-4">Active Fleet ({buses.length})</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
           {buses.map(bus => (
               <div key={bus.id} className="p-3 border-radius-md" style={{ border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
                   <p className="font-bold">Bus {bus.busNumber}</p>
                   <p className="text-sm text-secondary">Status: {bus.status}</p>
               </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
