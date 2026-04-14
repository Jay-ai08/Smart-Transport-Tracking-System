import React, { useContext } from 'react';
import MapView from '../components/MapView';
import BusCard from '../components/BusCard';
import { TransportContext } from '../context/TransportContext';

const LiveTracking = () => {
  const { buses } = useContext(TransportContext);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Live Tracking</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <MapView fullMode={true} />
        </div>
        
        <div className="flex flex-col gap-4 max-h-[600px]" style={{ overflowY: 'auto' }}>
          <h2 className="text-xl font-bold">Active Buses</h2>
          {buses.map(bus => (
            <BusCard key={bus.id} bus={bus} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LiveTracking;
