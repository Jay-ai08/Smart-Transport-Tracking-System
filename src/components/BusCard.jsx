import React from 'react';
import { Bus, Clock } from 'lucide-react';

const BusCard = ({ bus }) => {
  const isDelayed = bus.status === 'Delayed';

  return (
    <div className="card flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-[rgba(59,130,246,0.1)] p-3 border-radius-md" style={{ borderRadius: 'var(--radius-lg)' }}>
            <Bus className="text-primary-color" style={{ color: 'var(--primary-color)' }} size={24} />
          </div>
          <div>
            <h3 className="font-bold text-lg">Bus {bus.busNumber}</h3>
            <p className="text-sm text-secondary">Route: {bus.routeId === 'r1' ? 'North Campus' : 'South Express'}</p>
          </div>
        </div>
        <span className={`badge ${isDelayed ? 'badge-warning' : 'badge-success'}`}>
          {bus.status}
        </span>
      </div>
      
      <div className="flex items-center justify-between mt-2 pt-4" style={{ borderTop: '1px solid var(--border-color)' }}>
        <div>
          <p className="text-sm text-secondary">Next Stop</p>
          <p className="font-medium">{bus.nextStop}</p>
        </div>
        <div className="flex items-center gap-2">
          <Clock size={16} className={isDelayed ? 'status-delayed' : 'status-on-time'} />
          <p className={`font-bold ${isDelayed ? 'status-delayed' : 'status-on-time'}`}>
            {bus.eta}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BusCard;
