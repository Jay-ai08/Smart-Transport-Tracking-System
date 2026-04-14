import React, { useContext, useState } from 'react';
import { TransportContext } from '../context/TransportContext';
import BusCard from '../components/BusCard';
import MapView from '../components/MapView';

const Dashboard = () => {
  const { buses } = useContext(TransportContext);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBuses = buses.filter(bus => 
    bus.busNumber.includes(searchTerm) || bus.routeId.includes(searchTerm)
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Campus Dashboard</h1>
        <input 
          type="text" 
          placeholder="Search bus or route..." 
          className="card"
          style={{ padding: '0.5rem 1rem', width: '300px' }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 flex flex-col gap-4">
          <h2 className="text-xl font-bold">Fleet Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredBuses.map(bus => (
              <BusCard key={bus.id} bus={bus} />
            ))}
            {filteredBuses.length === 0 && (
              <p className="text-secondary">No buses found.</p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold">Quick Map Map</h2>
          <MapView fullMode={false} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
