import React, { useContext } from 'react';
import { TransportContext } from '../context/TransportContext';
import { AlertTriangle, Info } from 'lucide-react';

const Notifications = () => {
  const { buses } = useContext(TransportContext);
  
  // Filter out any delayed buses to create dynamic alerts
  const delayedBuses = buses.filter(b => b.status === 'Delayed');

  return (
    <div className="flex flex-col gap-6 max-w-[800px] mx-auto">
      <h1 className="text-2xl font-bold">ETA & Notifications</h1>

      <div className="flex flex-col gap-4">
        {delayedBuses.length > 0 ? (
          delayedBuses.map(bus => (
            <div key={`alert-${bus.id}`} className="card flex items-start gap-4" style={{ borderLeft: '4px solid var(--warning-color)' }}>
              <AlertTriangle className="text-warning-color" style={{ color: 'var(--warning-color)' }} />
              <div>
                <h3 className="font-bold text-lg">Bus {bus.busNumber} Delayed</h3>
                <p className="text-secondary">Expected delay of approx {bus.delayMinutes || 5} minutes due to traffic on route to {bus.nextStop}.</p>
                <span className="text-xs text-secondary mt-2 block">Just now</span>
              </div>
            </div>
          ))
        ) : (
          <div className="card text-center flex flex-col items-center justify-center p-8 text-secondary">
             <Info size={32} className="mb-2 opacity-50" />
             <p>No active delays. All buses are running on schedule!</p>
          </div>
        )}

        {/* Static demo alert */}
        <div className="card flex items-start gap-4" style={{ borderLeft: '4px solid var(--primary-color)' }}>
            <Info className="text-primary-color" style={{ color: 'var(--primary-color)' }} />
            <div>
            <h3 className="font-bold text-lg">System Maintenance Update</h3>
            <p className="text-secondary">The tracking system will undergo brief maintenance tonight at 2 AM. Live tracking might be inaccurate for 10 minutes.</p>
            <span className="text-xs text-secondary mt-2 block">2 hours ago</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
